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
		console.log(gift);
	}, [gift]);

	const handleClick = async () => {
		const response = await fetch('/api/postReq', {
			method: 'POST',
			body: JSON.stringify({ relationship, interest1, interest2 }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		console.log(data)
		setGift(data[0]);

		// setGift1({
		// 	name: data.choices[0].text,
		// 	description: '',
		// 	price: '',
		// 	link: '',
		// 	alternativeLink: '',
		// });
		// setGift2({
		// 	name: data.choices[1].text,
		// 	description: '',
		// 	price: '',
		// 	link: '',
		// 	alternativeLink: '',
		// });
		// setGift3({
		// 	name: data.choices[2].text,
		// 	description: '',
		// 	price: '',
		// 	link: '',
		// 	alternativeLink: '',
		// });
		// setGift4({
		// 	name: data.choices[3].text,
		// 	description: '',
		// 	price: '',
		// 	link: '',
		// 	alternativeLink: '',
		// });
		// setGift5({
		// 	name: data.choices[4].text,
		// 	description: '',
		// 	price: '',
		// 	link: '',
		// 	alternativeLink: '',
		// });
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
			{/* {gift && gift.choices && gift.choices[0] && (
				<div className='gift-result-container'>
					<p className='gift-result-text'>{gift.choices[0].text}</p>
				</div> */}
			{/* )} */}
		</div>
	);
}
