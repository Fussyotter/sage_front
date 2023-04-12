import Background from '@/components/Background';
import React, { createContext, useState } from 'react';

export const BackgroundContext = createContext();

export const BackgroundProvider = ({ children }) => {
	const [moving, setMoving] = useState(false);
	const [animationProgress, setAnimationProgress] = useState(0); // New state here

	// const handleMovingChange = () => {
	// 	setMoving(!moving);
	// };
	return (
		<BackgroundContext.Provider
			value={[
				moving,
				setMoving,
				// handleMovingChange,
				animationProgress,
				setAnimationProgress,
			]}>
			{children}
		</BackgroundContext.Provider>
	);
};
