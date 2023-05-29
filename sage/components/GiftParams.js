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
	const [loggedInUser] = useContext(UserContext);
	const [displayedGift, setDisplayedGift] = useState('');

	useEffect(() => {
		// console.log(gift);
	}, [gift]);
	const callApi = async (relationship, interest) => {
		const response = await fetch('/api/postReq', {
			method: 'POST',
			body: JSON.stringify({ relationship, interest }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.text();
		const trimmedResponse = data.trim();
		const formattedResponse = trimmedResponse.replace(
			/\n\n(\d+\.\s)/g,
			'\n\n$1'
		);
		console.log(formattedResponse);
		const json = JSON.parse(formattedResponse);
		return json;
	};

const handleClick = async () => {
	setMoving(true);
	try {
		const json = await callApi(relationship, interest);
		if (json && json.choices && json.choices[0] && json.choices[0].text) {
			setGift(json.choices[0].text);
		} else {
			console.error('Invalid response format:', json);
		}
	} catch (error) {
		console.error('API call failed:', error);
	} finally {
		setMoving(false);
	}
};
	return (
		<div className='gift-params-container'>
			{loggedInUser ? (
				<h1> Consult the Wizard...for gift advice.</h1>
			) : (
				<h1> Consult the all powerful wizard for gift ideas. </h1>
			)}
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
		</div>
	);
}

{
	/* {gift && (
	<div className="gift-result-wrapper">
		<p>Your gift idea:</p>
		<div className='gift-result'dangerouslySetInnerHTML={{ __html: gift }}></div>
	</div> */
}
{
	/* )} */
}
