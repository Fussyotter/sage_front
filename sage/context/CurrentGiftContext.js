import { createContext, useState } from 'react';

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
	const [gift, setGift] = useState(null);


	const [relationship, setRelationship] = useState('');
	const [interest, setInterest] = useState('');

	return (
		<GiftContext.Provider
			value={{
				gift,
				setGift,
			
				// recipient,
				// setRecipient,
				relationship,
				setRelationship,
				interest,
				setInterest,
				
			}}>
			{children}
		</GiftContext.Provider>
	);
};
