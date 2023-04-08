
import { Inter } from 'next/font/google'
import ChatDisplay from './chatDisplay'
import GiftParams from '@/components/GiftParams';
import axios from 'axios'
import Cors from 'cors';



export default function Home() {

  return (
  
    <>
      <GiftParams/>
    
      <ChatDisplay/>
    </>
  )
}
