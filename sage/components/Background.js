import React, { useState, useEffect, useContext } from 'react';
import { BackgroundContext } from '@/context/BackgroundContext';

const Background = () => {
	const [typedText, setTypedText] = useState('');
	const [ moving, setMoving, animationProgress, setAnimationProgress ] =
		useContext(BackgroundContext);

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

	useEffect(() => {
		if (moving) {
			const animationDuration = 10000; // 11 seconds
			const intervalId = setInterval(() => {
				setAnimationProgress((prevProgress) => {
					const newProgress = prevProgress + 20;
					if (newProgress >= 100) {
						clearInterval(intervalId);
						setMoving(false);
						setAnimationProgress(0); // Resetting the state
					}
					return newProgress;
				});
			}, animationDuration / 5);
			return () => clearInterval(intervalId);
		}
	}, [moving, setMoving, setAnimationProgress]);

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
					transform: `translateX(${animationProgress}%)`,
				}}></div>
		</div>
	);
};

export default Background;
