import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@psycron/index.css';

import { validateEnv } from './utils/env/validateEnv';
import App from './App';
import i18n from './i18n';
import theme from './theme';

// Validate environment variables at startup
const envValidation = validateEnv();

if (!envValidation.isValid) {
	// In production, show a user-friendly error page
	if (import.meta.env.PROD) {
		document.getElementById('root')!.innerHTML = `
			<div style="
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				height: 100vh;
				font-family: Inter, sans-serif;
				background: #F7FAFA;
				color: #060B0E;
				padding: 20px;
				text-align: center;
			">
				<h1 style="color: #FF5450; margin-bottom: 16px;">Configuration Error</h1>
				<p style="max-width: 500px; color: rgba(6, 11, 14, 0.6);">
					The application is misconfigured. Please contact support or check the deployment configuration.
				</p>
			</div>
		`;
		throw new Error(
			`Environment validation failed: ${envValidation.errors.join(', ')}`
		);
	}
	// In development, log errors but continue (for easier debugging)
	// eslint-disable-next-line no-console
	console.error(
		'[STARTUP] Environment validation failed. Some features may not work correctly.'
	);
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</I18nextProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
