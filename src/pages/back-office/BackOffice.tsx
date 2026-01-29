// src/pages/backoffice/BackofficePage.tsx
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Paper, Stack } from '@mui/material';
import { Button } from '@psycron/components/button/Button';
import { Text } from '@psycron/components/text/Text';
import {
	clearAuthTokens,
	getAccessToken,
} from '@psycron/context/user/auth/utils/tokenStorage';
import { getSafeLocale } from '@psycron/pages/auth/callback/utils/getSafeLocale';
import { SIGNIN } from '@psycron/pages/urls';

type RouteParams = {
	locale?: string;
};

type JwtPayload = {
	exp?: number;
	iat?: number;
	id?: string;
	type?: string;
};

const decodeJwtPayload = (token: string): JwtPayload | null => {
	const parts = token.split('.');
	if (parts.length !== 3) return null;

	try {
		// JWT base64url -> base64
		const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
		const padded = base64.padEnd(
			base64.length + ((4 - (base64.length % 4)) % 4),
			'='
		);

		const json = atob(padded);
		const parsed: unknown = JSON.parse(json);

		if (!parsed || typeof parsed !== 'object') return null;

		const payload = parsed as Record<string, unknown>;

		return {
			id: typeof payload.id === 'string' ? payload.id : undefined,
			type: typeof payload.type === 'string' ? payload.type : undefined,
			iat: typeof payload.iat === 'number' ? payload.iat : undefined,
			exp: typeof payload.exp === 'number' ? payload.exp : undefined,
		};
	} catch {
		return null;
	}
};

const formatEpochSeconds = (seconds?: number): string => {
	if (!seconds) return '—';
	const date = new Date(seconds * 1000);
	if (Number.isNaN(date.getTime())) return '—';
	return date.toLocaleString();
};

const maskToken = (token: string, head = 14, tail = 10): string => {
	if (token.length <= head + tail) return token;
	return `${token.slice(0, head)}…${token.slice(-tail)}`;
};

export const Backoffice = () => {
	const navigate = useNavigate();
	const { locale: localeFromRoute } = useParams<RouteParams>();
	const locale = getSafeLocale(localeFromRoute);

	const accessToken = getAccessToken();
	const payload = useMemo(
		() => (accessToken ? decodeJwtPayload(accessToken) : null),
		[accessToken]
	);

	const handleLogout = (): void => {
		clearAuthTokens();
		navigate(`/${locale}/${SIGNIN}`, { replace: true });
	};

	const handleGoSignin = (): void => {
		navigate(`/${locale}/${SIGNIN}`, { replace: true });
	};

	return (
		<Box sx={{ px: 3, py: 3 }}>
			<Stack spacing={2}>
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-between'
					gap={2}
				>
					<Box>
						<Text variant='h5' fontWeight={700}>
							Backoffice testing dashboard
						</Text>
						<Text variant='body2' sx={{ opacity: 0.75 }}>
							Validate login, tokens, and basic navigation.
						</Text>
					</Box>

					<Stack direction='row' gap={1}>
						<Button tertiary onClick={handleGoSignin}>
							Go to sign in
						</Button>
						<Button secondary onClick={handleLogout}>
							Log out
						</Button>
					</Stack>
				</Stack>

				<Paper
					elevation={0}
					sx={{ p: 2, border: '1px solid', borderColor: 'divider' }}
				>
					<Stack spacing={1}>
						<Text variant='subtitle1' fontWeight={700}>
							Session status
						</Text>

						<Text variant='body2'>
							Locale: <b>{locale}</b>
						</Text>

						<Text variant='body2'>
							Access token: <b>{accessToken ? 'present' : 'missing'}</b>
						</Text>

						{accessToken ? (
							<>
								<Text variant='body2'>
									Token preview: <b>{maskToken(accessToken)}</b>
								</Text>

								<Text variant='body2'>
									User id: <b>{payload?.id ?? '—'}</b>
								</Text>

								<Text variant='body2'>
									Token type: <b>{payload?.type ?? '—'}</b>
								</Text>

								<Text variant='body2'>
									Issued at: <b>{formatEpochSeconds(payload?.iat)}</b>
								</Text>

								<Text variant='body2'>
									Expires at: <b>{formatEpochSeconds(payload?.exp)}</b>
								</Text>
							</>
						) : (
							<Text variant='body2' sx={{ opacity: 0.75 }}>
								You are not authenticated. Use Google login or sign in, then
								come back here.
							</Text>
						)}
					</Stack>
				</Paper>
			</Stack>
		</Box>
	);
};
