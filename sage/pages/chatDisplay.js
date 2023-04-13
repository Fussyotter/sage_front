import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/context';
import { fetchChat, chatTest, messageRead } from './api/messageFunc';

export default function ChatDisplay() {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [chatData, setChatData] = useState([]);
	const [chatUpdate, setChatUpdate] = useState(Date.now());
	const [isOpen, setIsOpen] = useState(false);

	const handleFetchChat = async () => {
		const data = await fetchChat(loggedInUser);
		setChatData(data);
	};

	useEffect(() => {
		if (loggedInUser) {
			handleFetchChat();
		}
	}, [loggedInUser, chatUpdate]);

	const handleChatTestClick = () => {
		chatTest();
		setChatUpdate(Date.now());
	};

	const handleMarkAsRead = async (messageId) => {
		try {
			await messageRead(loggedInUser, messageId);
			handleFetchChat();
		} catch (error) {
			console.error(error);
		}
	};

	const handleToggleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
		    <div className="chat-container">

		
			<button className='ChatDisplay__toggle' onClick={handleToggleClick}>
				{isOpen ? 'X' : 'Chat'}
			</button>
			<div className={`ChatDisplay ${isOpen ? 'ChatDisplay--open' : ''}`}>
				<div className='ChatDisplay__scroll'>
					{Array.isArray(chatData) && chatData.length ? (
						<table>
							<thead>
								<tr>
									<th>Read/Unread</th>
									<th>Message</th>
									<th>Recipient</th>
								</tr>
							</thead>
							<tbody>
								{chatData
									.sort((a, b) => {
										if (a.is_seen && !b.is_seen) {
											return 1;
										} else if (!a.is_seen && b.is_seen) {
											return -1;
										} else {
											return 0;
										}
									})
									.map((chat) => (
										<tr key={chat.id}>
											{chat.is_seen ? (
												<td>read</td>
											) : (
												<td>
													<div>unread</div>
													<button onClick={() => handleMarkAsRead(chat.id)}>
														Mark as Read
													</button>
												</td>
											)}
											<td>{chat.content}</td>
											<td>{chat.recipient}</td>
											
										</tr>
									))}
							</tbody>
							
							
						</table>
					) : (
						<p>
							{loggedInUser
								? 'No chat data to display'
								: 'Please log in to see chat data.'}
						</p>
					)}
				</div>
			</div>
			</div>
		</>
	);
}