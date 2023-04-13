import { Inter } from 'next/font/google';
// import { StrictMode } from 'react';
import ChatDisplay from './chatDisplay';
import GiftParams from '@/components/GiftParams';
import Login from '@/components/Login';
import UserMessage from '@/components/UserToUserMessage';
import Background from '@/components/Background';
import axios from 'axios';
import Cors from 'cors';

export default function Home() {
	return (
		<>
			<div className='header'>
				<div className='nav'>
					<Login />
				</div>
				<div className='giftReq'>
					<GiftParams />
				</div>
				<div className='messageComponents'>
					<div className='userMessage'>
						<UserMessage />
					</div>
					<ChatDisplay />
				</div>
			</div>
			{/* need to clean these up in their own component */}
			<div id='background-wrap'>
				<div className='x1'>
					<div className='cloud'></div>
				</div>

				<div className='x2'>
					<div className='cloud'></div>
				</div>

				<div className='x3'>
					<div className='cloud'></div>
				</div>

				<div className='x4'>
					<div className='cloud'></div>
				</div>

				<div className='x5'>
					<div className='cloud'></div>
				</div>
			</div>
			<Background />
		</>
	);
}
