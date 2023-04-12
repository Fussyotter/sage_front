import '@/styles/globals.css'
import { UserContext, UserProvider } from '@/context/context'
import { StrictMode } from 'react';
import { BackgroundProvider } from '@/context/BackgroundContext';
import { GiftProvider } from '@/context/CurrentGiftContext';

export default function App({ Component, pageProps }) {
  return (
		<StrictMode>
			<UserProvider>
				<GiftProvider>
					<BackgroundProvider>
						<Component {...pageProps} />
					</BackgroundProvider>
				</GiftProvider>
			</UserProvider>
		</StrictMode>
	);
}
