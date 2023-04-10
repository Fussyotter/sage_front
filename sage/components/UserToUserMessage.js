import React, { useState } from 'react';
import { userToUserMessage } from '@/pages/api/messageFunc';

export default function UserMessage() {
	const [receiver, setReceiver] = useState('');
	const [content, setContent] = useState('');

	const handleSendMessage = async (e) => {
		e.preventDefault();
		try {
			const data = await userToUserMessage(receiver, content);
			console.log(data);
		} catch (error) {
			console.error('failed to send message:', error);
		}
	};

	return (
		<div>
			<details>
				<summary>Send a message</summary>
			<form onSubmit={handleSendMessage}>
				<label htmlFor='receiver'>Recipient:</label>
				<input
					type='text'
					id='receiver'
					value={receiver}
					onChange={(e) => setReceiver(e.target.value)}
				/>

				<label htmlFor='content'>Message:</label>
				<textarea
					id='content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type='submit'>Send Message</button>
			</form>
		</details>
		</div>
	);
}
