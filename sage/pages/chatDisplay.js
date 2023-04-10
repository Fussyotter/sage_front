import { useEffect, useState, useContext } from 'react';
import { UserContext } from '@/context/context';
import { fetchChat, chatTest, messageRead } from './api/messageFunc';

import axios from 'axios';
import Cors from 'cors';

export default function ChatDisplay() {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [chatData, setChatData] = useState([]);
	// didn't realize i could use timestamps as state.
	const [chatUpdate, setChatUpdate] = useState(Date.now());

	const handleFetchChat = async () => {
		const data = await fetchChat(loggedInUser);
		setChatData(data);
	};
	useEffect(() => {
		if (loggedInUser) {
			handleFetchChat();
		}
	}, [loggedInUser, chatUpdate]);

	// testing timestamp state
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
	return (
		<>
			<div>
				<button onClick={handleChatTestClick}>yea pls god</button>
			</div>
			<details>
				<summary>Messages</summary>
			{loggedInUser ? (
				<table>
					<thead>
						<tr>
							<th>Chat ID</th>
							<th>Read/Unread</th>
							<th>Message</th>
							<th>Recipient</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(chatData) ? (
							chatData.map((chat) => (
								<tr key={chat.id}>
									<td>{chat.id}</td>
									<td>{chat.is_seen ? 'read' : 'unread'}</td>
									<td>{chat.content}</td>
									<td>{chat.recipient}</td>
									<td>
										{!chat.is_seen && (
											<button onClick={() => handleMarkAsRead(chat.id)}>
												Mark as Read
											</button>
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='3'>No data to display</td>
							</tr>
						)}
					</tbody>
				</table>
			) : (
				<p>Please log in to see chat data.</p>
			)}
			</details>
		</>
	);
}
