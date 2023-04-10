import { useEffect, useState } from 'react';
import { fetchChat, chatTest, userToUserMessage } from './api/hello';
import axios from 'axios';
import Cors from 'cors';

export default function ChatDisplay() {
	const [chats, setChats] = useState([]);

	useEffect(() => {
		async function fetchChatData() {
			const data = await fetchChat();
			setChats(data);
		}

		fetchChatData();
	}, []);

	return (
		<>
        
			<div>
				<button onClick={chatTest}>yea pls god</button>
			</div>
			<table>
				<thead>
					<tr>
						<th>Order ID</th>
						<th>Customer Name</th>
						<th>Product Name</th>
					</tr>
				</thead>
				<tbody>
					{chats.map((chat) => (
						<tr key={chat.id}>
							<td>{chat.id}</td>
							<td>{chat.content}</td>
							<td>{chat.recipient}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
