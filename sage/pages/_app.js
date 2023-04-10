import '@/styles/globals.css'
import { UserContext, UserProvider } from '@/context/context'

export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
    <Component {...pageProps} />
    
    </UserProvider>
  );
}
