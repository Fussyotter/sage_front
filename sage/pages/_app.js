import '@/styles/globals.css'
import { UserContext, UserProvider } from '@/context/context'
import { StrictMode } from 'react';
import { BackgroundProvider } from '@/context/BackgroundContext';

export default function App({ Component, pageProps }) {
  return (
		<StrictMode>
			<UserProvider>
				<BackgroundProvider>
					<Component {...pageProps} />
				</BackgroundProvider>
			</UserProvider>
		</StrictMode>
	);
}
