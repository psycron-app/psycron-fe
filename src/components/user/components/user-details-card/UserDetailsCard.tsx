import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Dialog, DialogTitle } from '@mui/material';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { Avatar } from '@psycron/components/avatar/Avatar';
import { Button } from '@psycron/components/button/Button';
import {
	Account,
	Close,
	Download,
	EditUser,
	Patients,
	Phone,
	Security,
	Subscription,
} from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import useClickOutside from '@psycron/hooks/useClickoutside';
import useViewport from '@psycron/hooks/useViewport';
import i18n from '@psycron/i18n';
import { externalUrls, PATIENTS } from '@psycron/pages/urls';

import { AccountSectionContent } from './components/account/AccountSectionContent';
import { ContactSectionContent } from './components/contact/ContactSectionContent';
import { PatientsSectionContent } from './components/patients/PatientsSectionContent';
import { UserDetailsSection } from './components/section/UserDetailsSection';
import { SecuritySectionContent } from './components/security/SecuritySectionContent';
import { mapUserToSubscriptionUIModel } from './components/subscription/subscription.mapper';
import { SubscriptionSectionContent } from './components/subscription/SubscriptionSectionContent';
import {
	DeleteAccountDialogContent,
	DeleteDialogActions,
	DownloadWrapper,
	UserDestailsTopInfo,
	UserDestailsTopInfoWrapper,
	UserDetailsBody,
	UserDetailsCardTop,
	UserDetailsCardWrapper,
	UserDetailsSectionWrapper,
	UserDetailsTopActionButton,
	UserDetailsTopActionsWrapper,
} from './UserDetailsCard.styles';
import type { IUserDetailsCardProps } from './UserDetailsCard.types';

const enableSubscriptionMock =
	import.meta.env.DEV &&
	import.meta.env.VITE_ENABLE_SUBSCRIPTION_MOCK === 'true';

export const UserDetailsCard = ({ user, isPage }: IUserDetailsCardProps) => {
	const userDetailsCardRef = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { isMobile, isTablet } = useViewport();

	const {
		toggleUserDetails,
		isUserDetailsVisible,
		isDeleteOpen,
		isOwnSettings,
		handleClickEditSession,
		handleClickEditUser,
		openDeleteDialog,
		closeDeleteDialog,
		deleteMyAccount,
		isDeletePending,
		downloadMyData,
		isDownloadPending,
		pictureUrl,
	} = useUserDetails();

	const wasVisibleRef = useRef(false);

	useEffect((): void => {
		const isVisible = Boolean(isPage || isUserDetailsVisible);

		if (!isVisible) {
			wasVisibleRef.current = false;
			return;
		}

		if (wasVisibleRef.current) return;
		wasVisibleRef.current = true;

		capture('user details viewed', {
			surface: isPage ? 'page' : 'overlay',
			is_own_settings: isOwnSettings,
		});
	}, [isPage, isUserDetailsVisible, isOwnSettings]);

	const { firstName, lastName, authProvider, _id, patients, consent } = user;

	const email = user.contacts?.email ?? '';
	const phone = user.contacts?.phone ?? null;
	const whatsapp = user.contacts?.whatsapp ?? null;

	const subscriptionModel = enableSubscriptionMock
		? {
				kind: 'subscribed' as const,
				planName: 'Premium Plan',
				status: 'active' as const,
				renewsAt: '2026-02-21T00:00:00.000Z',
			}
		: mapUserToSubscriptionUIModel(user);

	const userDetailsSectionList = [
		{
			icon: <Account />,
			title: t('components.user-details.section.title.account'),
			children: (
				<AccountSectionContent
					name={`${firstName} ${lastName}`}
					email={email}
					authMethod={authProvider}
					isEmailReadOnly
				/>
			),
		},
		{
			icon: <Phone />,
			title: t('components.user-details.section.title.contact'),
			children: (
				<ContactSectionContent
					phone={phone}
					whatsapp={whatsapp}
					onEditContacts={() => handleClickEditSession(_id, 'contacts')}
				/>
			),
		},
		{
			icon: <Patients />,
			title: t('components.user-details.section.title.patients'),
			children: (
				<PatientsSectionContent
					patients={patients}
					onGoToPatients={() => {
						capture('user details patients go to clicked', {
							surface: isPage ? 'page' : 'overlay',
							patients_count: patients.length,
						});
						navigate(PATIENTS);
						toggleUserDetails();
					}}
				/>
			),
		},
		{
			icon: <Subscription />,
			title: t('components.user-details.section.title.subscription'),
			children: (
				<SubscriptionSectionContent
					model={subscriptionModel}
					onManage={() => handleClickEditSession(_id, 'subscription')}
				/>
			),
		},
		{
			icon: <Security />,
			title: t('components.user-details.section.title.security'),
			children: (
				<SecuritySectionContent
					authProvider={authProvider}
					userId={_id}
					onChangePassword={() => handleClickEditSession(_id, 'password')}
					consent={{
						userConsent: consent,
						links: {
							privacy: externalUrls(i18n.language).PRIVACY,
							terms: externalUrls(i18n.language).TERMS,
						},
					}}
				/>
			),
		},
	];

	useClickOutside(userDetailsCardRef, () => {
		if (!isDeleteOpen) {
			capture('user details dismissed', { method: 'click_outside' });
			toggleUserDetails();
		}
	});

	return (
		<UserDetailsCardWrapper
			ref={userDetailsCardRef}
			isVisible={isPage || isUserDetailsVisible}
			isPage={isPage}
		>
			<UserDetailsCardTop isPage={isPage}>
				<UserDestailsTopInfoWrapper>
					<Avatar
						src={pictureUrl}
						large={!(isMobile || isTablet)}
						firstName={firstName}
						lastName={lastName}
					/>
					<UserDestailsTopInfo>
						<Text
							variant='subtitle1'
							fontWeight={600}
						>{`${firstName} ${lastName}`}</Text>
						<Text variant='subtitle2'>{email}</Text>
					</UserDestailsTopInfo>
				</UserDestailsTopInfoWrapper>
				<UserDetailsTopActionsWrapper>
					<UserDetailsTopActionButton
						onClick={() => {
							capture('user details edit clicked', {
								surface: isPage ? 'page' : 'overlay',
							});
							handleClickEditUser(_id);
						}}
					>
						<Tooltip
							title={t('components.user-details.edit')}
							placement={isMobile || isTablet ? 'left' : 'right'}
						>
							<EditUser />
						</Tooltip>
					</UserDetailsTopActionButton>
					{!isPage ? (
						<UserDetailsTopActionButton
							onClick={() => {
								capture('user details close clicked', { surface: 'overlay' });
								toggleUserDetails();
							}}
						>
							<Tooltip title={t('globals.close')} placement='left'>
								<Close />
							</Tooltip>
						</UserDetailsTopActionButton>
					) : null}
				</UserDetailsTopActionsWrapper>
			</UserDetailsCardTop>

			<UserDetailsBody isPage={isPage}>
				{userDetailsSectionList.map(({ icon, title, children }, _index) => {
					return (
						<UserDetailsSectionWrapper key={_index}>
							<UserDetailsSection icon={icon} title={title}>
								{children}
							</UserDetailsSection>
						</UserDetailsSectionWrapper>
					);
				})}
				{isOwnSettings ? (
					<Box pt={2} display='flex' justifyContent='flex-end'>
						<Button
							variant='outlined'
							color='error'
							small
							onClick={() => {
								capture('user details delete dialog opened', {
									surface: isPage ? 'page' : 'overlay',
								});
								openDeleteDialog();
							}}
						>
							{t('components.user-details.delete.title')}
						</Button>
					</Box>
				) : null}
				<Dialog
					open={isDeleteOpen}
					onClose={(_e, reason) => {
						if (isDeletePending) return;
						if (reason === 'backdropClick') return;

						capture('user details delete dialog closed', {
							reason,
							surface: isPage ? 'page' : 'overlay',
						});

						closeDeleteDialog();
					}}
				>
					<DialogTitle>
						{t('components.user-details.delete.title')} ?
					</DialogTitle>
					<DeleteAccountDialogContent>
						<Text variant='body2'>
							{t('components.user-details.delete.description')}
						</Text>
						<DownloadWrapper
							as='button'
							onClick={() => {
								capture('user details data export clicked', {
									surface: isPage ? 'page' : 'overlay',
								});
								downloadMyData();
							}}
							disabled={isDownloadPending || isDeletePending}
						>
							<Download />
						</DownloadWrapper>
					</DeleteAccountDialogContent>
					<DeleteDialogActions>
						<Button
							onClick={() => {
								capture('user details delete dialog cancelled', {
									surface: isPage ? 'page' : 'overlay',
								});
								closeDeleteDialog();
							}}
							disabled={isDeletePending}
						>
							{t('components.link.navigate.cancel')}
						</Button>
						<Button
							onClick={() => {
								capture('user details delete confirmed', {
									surface: isPage ? 'page' : 'overlay',
								});
								deleteMyAccount();
							}}
							color='error'
							variant='contained'
							disabled={isDeletePending}
						>
							{t('components.user-details.delete.confirmation')}
						</Button>
					</DeleteDialogActions>
				</Dialog>
			</UserDetailsBody>
		</UserDetailsCardWrapper>
	);
};
