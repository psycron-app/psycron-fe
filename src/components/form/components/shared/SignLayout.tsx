import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { LogoColor } from '@psycron/components/icons/brand/LogoColor';
import { Link } from '@psycron/components/link/Link';
import { NavigateLink } from '@psycron/components/link/navigate/NavigateLink';
import { Loader } from '@psycron/components/loader/Loader';
import { SIGNIN, SIGNUP } from '@psycron/pages/urls';

import type { ISignLayout } from './SignLayout.types';
import { LogoWrapper, SignUpWrapper } from './styles';

export const SignLayout: FC<ISignLayout> = ({
	children,
	isSignin,
	isReset,
	isLoading,
}: ISignLayout) => {
	const { t } = useTranslation();

	return (
		<SignUpWrapper>
			<LogoWrapper>
				<LogoColor />
			</LogoWrapper>
			{!isLoading ? (
				<>
					{children}
					<Box display='flex' justifyContent='flex-start' alignItems='center'>
						{isReset ? (
							<NavigateLink isBack />
						) : (
							<>
								<Typography variant='caption'>
									{isSignin
										? t('components.form.signin.dont-have-acc')
										: t('components.form.signup.already-have-acc')}
								</Typography>
								<Link to={`${isSignin ? SIGNUP : SIGNIN}`} firstLetterUpper>
									{isSignin
										? t('components.form.signin.signup-here-link')
										: t('components.form.signup.signin-here-link')}
								</Link>
							</>
						)}
					</Box>
				</>
			) : (
				<Loader />
			)}
		</SignUpWrapper>
	);
};
