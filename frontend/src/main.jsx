import { NextUIProvider } from '@nextui-org/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import '@/styles/index.css';

import App from '@/App';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<NextUIProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</NextUIProvider>
	</StrictMode>
);
