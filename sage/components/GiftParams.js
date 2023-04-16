import React, { useContext, useState, useEffect } from 'react';
import { GiftContext } from '@/context/CurrentGiftContext';
import { BackgroundContext } from '@/context/BackgroundContext';
import { UserContext } from '@/context/context';

export default function GiftParams() {
	const {
		gift,
		setGift,
	

		relationship,
		setRelationship,
		interest,
		setInterest,

	} = useContext(GiftContext);
	const [moving, setMoving] = useContext(BackgroundContext);
	const [loggedInUser] = useContext(UserContext)
	const [displayedGift, setDisplayedGift] = useState('');

	


	useEffect(() => {
		// console.log(gift);
	}, [gift]);

	const handleClick = async () => {
		setMoving((prevMoving) => !prevMoving);
		const response = await fetch('/api/postReq', {
			method: 'POST',
			body: JSON.stringify({ relationship, interest, }),
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
		setMoving((prevMoving) => !prevMoving);



	};

	return (
		<div className='gift-params-container'>
			{loggedInUser ? ( <h1> Consult the Wizard...for gift advice.</h1>):(<h1> Consult the all powerful wizard for gift ideas. </h1>) }
			<input
				className='input-field'
				value={relationship}
				onChange={(e) => setRelationship(e.target.value)}
				placeholder='Who?'
			/>
			<input
				className='input-field'
				value={interest}
				onChange={(e) => setInterest(e.target.value)}
				placeholder='What do they like?'
			/>
			
			<button className='submit-button' onClick={handleClick}>
				Get Gift Idea
			</button>
			{/* {gift && (
				<div className="gift-result-wrapper">
					<p>Your gift idea:</p>
					<div className='gift-result'dangerouslySetInnerHTML={{ __html: gift }}></div>
				</div> */}
			{/* )} */}
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
// 	const [interest, setInterest] = useState('');
// 	const [interest2, setInterest2] = useState('');

// 	const handleClick = async () => {
// 		const response = await fetch('/api/postReq', {
// 			method: 'POST',
// 			body: JSON.stringify({ recipient, relationship, interest, interest2 }),
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
// 				value={interest}
// 				onChange={(e) => setInterest(e.target.value)}
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
