import React, { useContext, useState, useEffect } from 'react';
import { GiftContext } from '@/context/CurrentGiftContext';

export default function GiftParams() {
	const {
		gift,
		setGift,
	

		relationship,
		setRelationship,
		interest1,
		setInterest1,
		interest2,
		setInterest2,
	} = useContext(GiftContext);

	useEffect(() => {
		// console.log(gift);
	}, [gift]);

	const handleClick = async () => {
		const response = await fetch('/api/postReq', {
			method: 'POST',
			body: JSON.stringify({ relationship, interest1, interest2 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.text();
		const trimmedResponse = data.trim();
const formattedResponse = trimmedResponse.replace(/\n\n(\d+\.\s)/g, '\n\n$1');

		const json = JSON.parse(formattedResponse);
		console.log(json);
		setGift(json.choices[0].text);


	};

	return (
		<div className='gift-params-container'>
			<input
				className='input-field'
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
				placeholder='Relationship'
			/>
			<input
				className='input-field'
				value={interest1}
				onChange={(e) => setInterest1(e.target.value)}
				placeholder='Interest 1'
			/>
			<input
				className='input-field'
				value={interest2}
				onChange={(e) => setInterest2(e.target.value)}
				placeholder='Interest 2'
			/>
			<button className='submit-button' onClick={handleClick}>
				Get Gift Idea
			</button>
			{gift && (
				<div>
					<p>Your gift idea:</p>
					<div dangerouslySetInnerHTML={{ __html: gift }}></div>
				</div>
			)}
		</div>
	);
}
// import React, { useState } from 'react';
{/* {gift && gift.choices && gift.choices[0] && (
	<div className='gift-result-container'>
		<p className='gift-result-text'>{gift.choices[0].text}</p>
	</div> */}
{/* )} */}

// export default function GiftParams() {
// 	const [gift, setGift] = useState('');
// 	const [recipient, setRecipient] = useState('');
// 	const [relationship, setRelationship] = useState('');
// 	const [interest1, setInterest1] = useState('');
// 	const [interest2, setInterest2] = useState('');

// 	const handleClick = async () => {
// 		const response = await fetch('/api/postReq', {
// 			method: 'POST',
// 			body: JSON.stringify({ recipient, relationship, interest1, interest2 }),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 		const data = await response.json();
// 		setGift(data);
//         console.log(gift)
// 	};

// 	return (
// 		<>
// 			<input
// 				value={recipient}
// 				onChange={(e) => setRecipient(e.target.value)}
// 				placeholder='Recipient'
// 			/>
// 			<input
// 				value={relationship}
// 				onChange={(e) => setRelationship(e.target.value)}
// 				placeholder='Relationship'
// 			/>
// 			<input
// 				value={interest1}
// 				onChange={(e) => setInterest1(e.target.value)}
// 				placeholder='Interest 1'
// 			/>
// 			<input
// 				value={interest2}
// 				onChange={(e) => setInterest2(e.target.value)}
// 				placeholder='Interest 2'
// 			/>
// 			<button onClick={handleClick}>Get Gift Idea</button>
			
//             <div>
//                       {gift && <p>{gift.choices[0].text}</p>}

//             </div>
// 		</>
// 	);
// }
