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
		interest = '',
	} = req.body;

	const prompt = `Give me a gift idea for  my "${relationship}" and they like "${interest}".  Limit the response to 3 items.  Can I have the names of the 3 items in an html list, and can I have the links to these 5 items in another html list following the first. Can I also have the response in magical tone with line breaks after each sentence.`;

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
