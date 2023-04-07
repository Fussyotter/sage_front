// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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