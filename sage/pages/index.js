
import { Inter } from 'next/font/google'
import ChatDisplay from './chatDisplay'
import GiftParams from '@/components/GiftParams';
import Login from '@/components/Login';
import UserMessage from '@/components/UserToUserMessage';
import axios from 'axios'
import Cors from 'cors';



export default function Home() {

  return (
  
    <>
      <Login/>
      <UserMessage/>
      <GiftParams/>
    
      <ChatDisplay/>
    </>
  )
}
