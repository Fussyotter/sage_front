// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

export async function fetchChat() {
	const response = await fetch('http://localhost:8000/chat/chattwo');
	const data = await response.json();
	return data;
}

export async function chatTest() {
	const response = await fetch('http://localhost:8000/chat/chattwo/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ content: 'bigtest' }),
	});
	console.log(response);
	const data = await response.json();
	return data;
}

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
