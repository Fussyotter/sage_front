import { createContext, useState } from 'react';

export const GiftContext = createContext();

export const GiftProvider = ({ children }) => {
	const [gift, setGift] = useState(null);


	const [relationship, setRelationship] = useState('');
	const [interest1, setInterest1] = useState('');
	const [interest2, setInterest2] = useState('');

	return (
		<GiftContext.Provider
			value={{
				gift,
				setGift,
			
				// recipient,
				// setRecipient,
				relationship,
				setRelationship,
				interest1,
				setInterest1,
				interest2,
				setInterest2,
			}}>
			{children}
		</GiftContext.Provider>
	);
};
