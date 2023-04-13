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
		relationship = '',
		interest1 = '',
		interest2 = '',
	} = req.body;

	const prompt = `Can I have one gift idea for my ${relationship} they like ${interest1}.  Please respond with a JSON object that has the following properties:
- "GiftName": a string representing the name of the gift
- "Description": a string representing the description of the gift
- "Price": a string representing the estimated price of the gift
- "Link": a string representing a link to a homepage with suggestions for similar gifts
- "AlternativeLink": a string representing a link to a homepage of an alternative website with suggestions for similar gifts

`;

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
			console.log(data)
			await fetch('http://localhost:8000/gifts/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Token d7a62d3afe9c68727989cf8c615978a2eeb3f074',
				},
				body: JSON.stringify(data.choices[0].text),
			});
			console.log
			res.status(200).json(data);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: 'Internal server error' });
		}
	});
}
