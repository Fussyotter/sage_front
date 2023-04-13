import React, { useState, useEffect, useContext } from 'react';
import { BackgroundContext } from '@/context/BackgroundContext';

const Background = () => {
	const [typedText, setTypedText] = useState('');
	const [moving, setMoving] = useContext(BackgroundContext);

	const handleClick = () => {
		setMoving(!moving);
	};

	useEffect(() => {
		if (moving) {
			const text = "Hehe, I'm casting a spell for youuuuu";
			let i = 0;
			const intervalId = setInterval(() => {
				setTypedText(text.slice(0, i));
				i++;
				if (i > text.length) clearInterval(intervalId);
			}, 100);
			return () => clearInterval(intervalId);
		} else {
			const text = "I'm a real wizard, I'm for real, I promise you guys";
			let i = 0;
			const intervalId = setInterval(() => {
				setTypedText(text.slice(0, i));
				i++;
				if (i > text.length) clearInterval(intervalId);
			}, 100);
			return () => clearInterval(intervalId);
		}
	}, [moving]);

	const containerClass = moving ? 'container moving' : 'container fixed';

	return (
		<div className={containerClass} onClick={handleClick}>
			<div className='overlay'>
				<div className='bubble'>
					<span id='typed-text'>{typedText}</span>
				</div>
			</div>
			<div
				className='background'
				style={{
					animationPlayState: moving ? 'running' : 'paused',
					animationDuration: '10s',
					animationTimingFunction: 'linear',
					animationFillMode: 'forwards',
				}}></div>
		</div>
	);
};

export default Background;
