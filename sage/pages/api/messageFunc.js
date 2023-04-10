// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';



export default function handler(req, res) {
	res.status(200).json({ name: 'John Doe' });
}

export async function fetchChat(loggedInUser) {
	const token = localStorage.getItem('token'); // Get the token from local storage
	const headers = { Authorization: `Token ${token}` }; // Add the token to the headers

	const response = await fetch(`http://localhost:8000/chat/${loggedInUser}`, {
		headers,
	});
	const data = await response.json();
	return data;
}

export async function chatTest() {
	const token = localStorage.getItem('token');
	const headers = { Authorization: `Token ${token}`, 'Content-Type': 'application/json' };
	const response = await fetch('http://localhost:8000/chat/logintest/', {
		method: 'POST',
		// headers: {
		// 	'Content-Type': 'application/json',
		// },
		headers,
		body: JSON.stringify({ content: 'bigtest' }),
	});
	console.log(response);
	const data = await response.json();
	return data;
}
// const { receiver = '', content = '' } = req.body;
export async function userToUserMessage(receiver, content) {
	const token = localStorage.getItem('token'); // Get the token from local storage
	// console.log(token)
	const headers = {
		'Content-Type': 'application/json',
		// i was using bearer and not Token ${token}, fixed.
		Authorization: `Token ${token}`, 
	};
	console.log(headers)

	const response = await fetch(`http://localhost:8000/chat/${receiver}/`, {
		method: 'POST',
		headers,
		body: JSON.stringify({ content }),
	});

	console.log(response);

	const data = await response.json();
	return data;
}
// f u function below

// export async function gptTest() {
// 	const apiKey = process.env.OPENAI_API_KEY;
// 	const headers = {
// 		'Content-Type': 'application/json',
// 	};
// 	console.log('API Key:', apiKey);

// 	const response = await fetch('https://api.openai.com/v1/completions', {
// 		method: 'POST',
// 		headers: {
// 			...headers,
// 			Authorization: `Bearer ${apiKey}`,
// 		},
// 		body: JSON.stringify({
// 			prompt: 'why does my dog have a wet nose?',
// 			model: 'text-davinci-003',
// 			max_tokens: 30,
// 			temperature: 1.0,
// 		}),
// 	});
// 	console.log('Response:', response);

// 	const data = await response.json();
// 	console.log('Data:', data);
// }
