import React, { useContext, useState, useEffect } from 'react';
import { GiftContext } from '@/context/CurrentGiftContext';

import { useSpring, animated } from 'react-spring';

export default function GiftResult() {
	const { gift } = useContext(GiftContext);
	if (!gift) {
		return null;
	}

	const spin = useSpring({
		to: {
			transform: 'rotate(0deg)',
			opacity: 1,
		},
		from: {
			transform: 'rotate(360deg)',
			opacity: 0,
		},
		config: {
			tension: 50,
			friction: 10,
		},
	});

	return (
		<animated.div style={spin} className='gift-result'>
			<p>MAGIC GIFT IDEA FOR YOU</p>
			<div dangerouslySetInnerHTML={{ __html: gift }}></div>
		</animated.div>
	);
}