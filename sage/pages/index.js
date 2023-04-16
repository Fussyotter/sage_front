import { Inter } from 'next/font/google';
// import { StrictMode } from 'react';
import ChatDisplay from './chatDisplay';
import GiftParams from '@/components/GiftParams';
import Login from '@/components/Login';
import UserMessage from '@/components/UserToUserMessage';
import Background from '@/components/Background';
import Signup from '@/components/Signup';
import GiftResult from '@/components/GiftResult';
import axios from 'axios';
import Cors from 'cors';

export default function Home() {
	return (
		<>
			{/* <div className='big-container'> */}
				<div className='header'>
					<div className='cloudImage'></div>
						<GiftParams />
						<GiftResult/>
					</div>
				
						<ChatDisplay />
					<div className='nav'>
						<div className='loginSignup'>
							<Login />
						</div>
						<div className='signupMove'>
							<Signup />
						</div>
					<div className='result'>
			{/* <GiftParams/> */}

					</div>
				{/* </div> */}
			
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
