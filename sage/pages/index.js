import { Inter } from 'next/font/google';
import ChatDisplay from './chatDisplay';
import GiftParams from '@/components/GiftParams';
import Login from '@/components/Login';
import UserMessage from '@/components/UserToUserMessage';
import Background from '@/components/Background';
import Signup from '@/components/Signup';
import GiftResult from '@/components/GiftResult';
import GiftWizard from '@/components/GiftWizard';

export default function Home() {
	return (
		<>
		<div className='headerContainer'>
			<div className='header'>
				<div className='cloudImage'></div>
					<Login />
					<Signup />
			</div>
			<GiftWizard/>
			</div>

			<ChatDisplay />
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
