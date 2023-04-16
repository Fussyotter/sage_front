import { useEffect, useState, useContext } from 'react';
import React from 'react';
import { UserContext } from '@/context/context';
import { fetchChat, chatTest, messageRead,messageDelete } from './api/messageFunc';
import UserMessage from '@/components/UserToUserMessage';

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

    const handleDelete = async (messageId) => {
        try {
            await messageDelete(loggedInUser, messageId);
            handleFetchChat();
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleUserMessageUpdate = () => {
        handleFetchChat();
        setChatUpdate(Date.now());
    };

    if (!loggedInUser) {
        return <p></p>;
    }

    return (
        <>
            <div className='chat-container'>
                <button className='ChatDisplay__toggle' onClick={handleToggleClick}>
                    {isOpen ? 'X' : 'Inbox'}
                </button>
                <div
                    className={`ChatDisplay ${isOpen ? 'ChatDisplay--open' : ''}`}
                    style={{ display: isOpen ? 'block' : 'none' }}
                >
                    <UserMessage onUpdate={handleUserMessageUpdate} />
                    <div className='ChatDisplay__scroll'>
                        {Array.isArray(chatData) && chatData.length ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Read/Unread</th>
                                        <th>Message</th>
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
                                            <React.Fragment key={chat.id}>
                                                <tr>
                                                    <td>
                                                        {chat.is_seen ? (
                                                            'read'
                                                        ) : (
                                                            <>
                                                                <div>unread</div>
                                                                <button
                                                                    onClick={() => handleMarkAsRead(chat.id)}
                                                                >
                                                                    Mark as Read
                                                                </button>
                                                                <button onClick={() => handleDelete(chat.id)}>
                                                                    Delete
                                                                </button>
                                                            </>
                                                        )}
                                                    </td>
                                                    

													<td>
														<div className='message-sender'>
															{chat.sender_username} :
														</div>
														<div className='message-content'>
															{chat.content}
														</div>
													</td>
												</tr>
											</React.Fragment>
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
