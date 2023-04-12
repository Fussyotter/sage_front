import React, { useState, useEffect } from 'react';

const Background = () => {
  const [moving, setMoving] = useState(true);
  const [typedText, setTypedText] = useState('');
  const containerClass = moving ? 'container moving' : 'container fixed';

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
  return (
		<div className={containerClass} onClick={() => setMoving(!moving)}>
			<div className='overlay'>
				<div className='bubble'>
					<span id='typed-text'>{typedText}</span>
				</div>
			</div>
			<div className='background'></div>
		</div>
	);
};

export default Background;
