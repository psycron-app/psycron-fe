import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@mui/material';
import { PostHogProvider } from '@posthog/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import posthog from 'posthog-js';

import '@psycron/index.css';

import { validateEnv } from './utils/env/validateEnv';
import App from './App';
import i18n from './i18n';
import theme from './theme';

const envValidation = validateEnv();

if (!envValidation.isValid) {
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

	// eslint-disable-next-line no-console
	console.error(
		'[STARTUP] Environment validation failed. Some features may not work correctly.'
	);
}

const queryClient = new QueryClient();

const phKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
const phHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST;

if (phKey) {
	posthog.init(phKey, { api_host: phHost, defaults: '2025-11-30' });
} else {
	// eslint-disable-next-line no-console
	console.warn('[PostHog] Missing key');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<PostHogProvider client={posthog}>
			<QueryClientProvider client={queryClient}>
				<I18nextProvider i18n={i18n}>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</I18nextProvider>
			</QueryClientProvider>
		</PostHogProvider>
	</React.StrictMode>
);
