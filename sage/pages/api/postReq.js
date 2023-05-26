import Cors from 'cors';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Only POST requests allowed' });
  }
  const {
    recipient = '',
    relationship = '',
    interest = '',
  } = req.body;

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    await corsMiddleware(req, res); // Await the corsMiddleware function
    const prompt = `Give me a gift idea for  my "${relationship}" they like "${interest}".  5 items in an html list that are also links. Can I also have the response in magical tone with line breaks after each sentence.  Also tell my fortune`;

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
}