import React, { useState } from 'react';
import { userToUserMessage } from '@/pages/api/messageFunc';

export default function UserMessage(props) {
	const [receiver, setReceiver] = useState('');
	const [content, setContent] = useState('');

	const handleSendMessage = async (e) => {
		e.preventDefault();
		try {
			const data = await userToUserMessage(receiver, content);
			console.log(data);
			setReceiver('');
			setContent('');
			props.onUpdate();
		} catch (error) {
			console.error('failed to send message:', error);
		}
	};

	return (
		<div className='UserMessage'>
			<h3>Send a message</h3>
			<form onSubmit={handleSendMessage}>
				<label htmlFor='receiver'>To:</label>
				<input
					type='text'
					id='receiver'
					value={receiver}
					onChange={(e) => setReceiver(e.target.value)}
				/>
				<br></br>

				<label htmlFor='content'>Message:</label>
				<input
					id='content'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>

				<button type='submit'>Send Message</button>
			</form>
		</div>
	);
}
