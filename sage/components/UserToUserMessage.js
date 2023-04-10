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
			<form onSubmit={handleSendMessage}>
				<label htmlFor='receiver'>Receiver:</label>
				<input
					type='text'
					id='receiver'
					value={receiver}
					onChange={(e) => setReceiver(e.target.value)}
				/>

				<label htmlFor='content'>Content:</label>
				<textarea
					id='content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type='submit'>Send Message</button>
			</form>
		</div>
	);
}
