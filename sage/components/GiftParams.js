import React, { useState } from 'react';

export default function GiftParams() {
	const [gift, setGift] = useState('');
	const [recipient, setRecipient] = useState('');
	const [relationship, setRelationship] = useState('');
	const [interest1, setInterest1] = useState('');
	const [interest2, setInterest2] = useState('');

	const handleClick = async () => {
		const response = await fetch('/api/postReq', {
			method: 'POST',
			body: JSON.stringify({ recipient, relationship, interest1, interest2 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		setGift(data);
        console.log(gift)
	};

	return (
		<>
			<input
				value={recipient}
				onChange={(e) => setRecipient(e.target.value)}
				placeholder='Recipient'
			/>
			<input
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
				placeholder='Relationship'
			/>
			<input
				value={interest1}
				onChange={(e) => setInterest1(e.target.value)}
				placeholder='Interest 1'
			/>
			<input
				value={interest2}
				onChange={(e) => setInterest2(e.target.value)}
				placeholder='Interest 2'
			/>
			<button onClick={handleClick}>Get Gift Idea</button>
			{/* <p>{answer}</p> */}
            <div>
                      {gift && <p>{gift.choices[0].text}</p>}

            </div>
		</>
	);
}
