import React, { useContext, useState, useEffect } from 'react';
import { GiftContext } from '@/context/CurrentGiftContext';
import { BackgroundContext } from '@/context/BackgroundContext';
import { UserContext } from '@/context/context';

export default function GiftResult() {
	const {
		gift,
		setGift,

		relationship,
		setRelationship,
		interest,
		setInterest,
	} = useContext(GiftContext);
	if (!gift) {
		return null;
	}

	return (
		<div className='gift-result'>
			<p>MAGIC GIFT IDEA FOR YOU</p>
			<div dangerouslySetInnerHTML={{ __html: gift }}></div>
		</div>
	);
}