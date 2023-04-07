import cors from 'cors';

const corsMiddleware = cors({
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	origin: '*',
});

export default function handler(req, res) {
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
          prompt: 'what is ketchup?',
          model: 'text-davinci-003',
          max_tokens: 30,
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
