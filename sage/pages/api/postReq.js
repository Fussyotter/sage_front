import cors from 'cors';

const corsMiddleware = cors({
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin: '*',
});

export default function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(400).json({ message: 'Only POST requests allowed' });
	}
	const {
		recipient = '',
		relationship = '',
		interest1 = '',
		interest2 = '',
	} = req.body;

	const prompt = `Give me a gift idea for "${recipient}", they are my "${relationship}" and they like "${interest1}" and "${interest2}".  Limit the response to 5 items, and can I please have links to these items.`;

	corsMiddleware(req, res, async () => {
		try {
			const apiKey = process.env.OPENAI_API_KEY;
			const response = await fetch('https://api.openai.com/v1/completions', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${apiKey}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					prompt,
					model: 'text-davinci-003',
					max_tokens: 1500,
					temperature: 1.0,
				}),
			});
			const data = await response.json();
			res.status(200).json(data);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	});
}
