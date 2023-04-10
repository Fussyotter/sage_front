import '@/styles/globals.css'
import { UserContext, UserProvider } from '@/context/context'
import { StrictMode } from 'react';

export default function App({ Component, pageProps }) {
  return (
		<StrictMode>
			<UserProvider>
				<Component {...pageProps} />
			</UserProvider>
		</StrictMode>
	);
}
