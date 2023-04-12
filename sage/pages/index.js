
import { Inter } from 'next/font/google'
// import { StrictMode } from 'react';
import ChatDisplay from './chatDisplay'
import GiftParams from '@/components/GiftParams';
import Login from '@/components/Login';
import UserMessage from '@/components/UserToUserMessage';
import Background from '@/components/Background';
import axios from 'axios'
import Cors from 'cors';



export default function Home() {

  return (
  
    <>
    <div className='nav'>
      <Login/>
      <UserMessage/>
      <ChatDisplay/>

    </div>
    <Background/>
      <GiftParams/>
    </>
  )
}
