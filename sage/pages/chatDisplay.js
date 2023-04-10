import { useEffect, useState,useContext } from 'react';
import { UserContext } from '@/context/context';
import { fetchChat, chatTest, userToUserMessage } from './api/hello';

import axios from 'axios';
import Cors from 'cors';

export default function ChatDisplay() {
	const [loggedInUser, setLoggedInUser] = useContext(UserContext);
	const [chatData, setChatData] = useState([]);

	useEffect(() => {
		const getChatData = async () => {
			const data = await fetchChat(loggedInUser);
			setChatData(data);
		};
		getChatData();
	}, [loggedInUser]);
	return (
		<>
			<table>
				<thead>
					<tr>
						<th>Chat ID</th>
						<th>Customer Name</th>
						<th>Product Name</th>
					</tr>
				</thead>
				<tbody>
					{chatData.map((chat) => (
						<tr key={chat.id}>
							<td>{chat.id}</td>
							<td>{chat.customerName}</td>
							<td>{chat.productName}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}