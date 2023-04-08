import { useEffect, useState } from 'react';
import { fetchChat, chatTest, } from './api/hello';
import axios from 'axios';
import Cors from 'cors';

export default function ChatDisplay() {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		async function fetchChatData() {
			const data = await fetchChat();
			setOrders(data);
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
					{orders.map((order) => (
						<tr key={order.id}>
							<td>{order.id}</td>
							<td>{order.content}</td>
							<td>{order.recipient}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
