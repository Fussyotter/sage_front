import { useEffect, useState,useContext } from 'react';
import { UserContext } from '@/context/context';
import { fetchChat, chatTest, userToUserMessage } from './api/hello';

import axios from 'axios';
import Cors from 'cors';

export default function ChatDisplay() {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [chatData, setChatData] = useState([]);

	useEffect(() => {
		const handleFetchChat = async () => {
			const data = await fetchChat(loggedInUser);
			setChatData(data);
		};
		if (loggedInUser) {
			handleFetchChat();
		}
	}, [loggedInUser]);
	return (
		<>
			<div>
				<button onClick={chatTest}>yea pls god</button>
			</div>
			{loggedInUser ? (
				<table>
					<thead>
						<tr>
							<th>Chat ID</th>
							<th>Customer Name</th>
							<th>Product Name</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(chatData) ? (
							chatData.map((chat) => (
								<tr key={chat.id}>
									<td>{chat.id}</td>
									<td>{chat.content}</td>
									<td>{chat.recipient}</td>
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
		</>
	);
}