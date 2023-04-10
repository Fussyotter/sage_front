// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// 4/10/23 11:49.  refactoring my tokens and authorization outside of functions to see if that still works
import axios from 'axios';


export default function handler(req, res) {
	res.status(200).json({ name: 'John Doe' });
}
// line 9/10 are being executed before local storage is available and causing errors.  If i comment them out and then back in after the page loads it's fine.  Trying another way on 12/13

// const token = localStorage.getItem('token');
// const headers = {Authorization: `Token ${token}`}

let token = '';
let headers = {};

if (typeof window !== 'undefined') {
	token = localStorage.getItem('token');
	headers = { Authorization: `Token ${token}` };
}
export async function fetchChat(loggedInUser) {
	const response = await fetch(`http://localhost:8000/chat/${loggedInUser}`, {
		headers,
	});
	const data = await response.json();
	return data;
}

export async function chatTest() {
	const headersWithContentType = { ...headers, 'Content-Type': 'application/json' }
	const response = await fetch('http://localhost:8000/chat/logintest/', {
		method: 'POST',
		headers: headersWithContentType,
		body: JSON.stringify({ content: 'bigtest' }),
	});
	console.log(response);
	const data = await response.json();
	return data;
}
export async function userToUserMessage(receiver, content) {
	const headersWithContentType = {
		...headers,
		'Content-Type': 'application/json',
	};
	console.log(headers)

	const response = await fetch(`http://localhost:8000/chat/${receiver}/`, {
		method: 'POST',
		headers: headersWithContentType,
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
