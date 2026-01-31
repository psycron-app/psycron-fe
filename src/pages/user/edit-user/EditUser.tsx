import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import {
	capture,
	toEditUserErrorCode,
} from '@psycron/analytics/posthog/AppAnalytics';
import type { CustomError } from '@psycron/api/error';
import { editUserById } from '@psycron/api/user';
import type { IEditUser } from '@psycron/api/user/index.types';
import { AvatarUploader } from '@psycron/components/avatar/avatar-uploader/AvatarUploader';
import { ContactsForm } from '@psycron/components/form/components/contacts/ContactsForm';
import { FormFooter } from '@psycron/components/form/components/footer/FormFooter';
import { NameForm } from '@psycron/components/form/components/name/NameForm';
import { PasswordInput } from '@psycron/components/form/components/password/PasswordInput';
import { Link } from '@psycron/components/link/Link';
import { Loader } from '@psycron/components/loader/Loader';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { Text } from '@psycron/components/text/Text';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import i18n from '@psycron/i18n';
import { PageLayout } from '@psycron/layouts/app/pages-layout/PageLayout';
import { externalUrls } from '@psycron/pages/urls';
import { useMutation } from '@tanstack/react-query';

import { EditSection } from './components/EditSection';
import { buildEditUserPayload, toEditUserDefaults } from './edituser.mapper';
import {
	EditUserDetailsAvatarWrapper,
	EditUserDetailsMarketingConsentLabel,
	EditUserDetailsMarketingConsentWrapper,
	EditUserDetailsMarketingSwitcher,
	EditUserFormContainer,
} from './EditUser.styles';
import type { EditUserFormValues } from './EditUser.types';

export const EditUser = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { showAlert } = useAlert();

	const { userId, session } = useParams<{ session?: string; userId: string }>();

	const {
		userDetails,
		isUserDetailsSucces,
		isUserDetailsLoading,
		updateMarketingConsent,
		pictureUrl,
	} = useUserDetails(userId);

	const { firstName, lastName, contacts, _id, authProvider, consent } =
		userDetails;

	const isGoogleUser = authProvider === 'google';

	useEffect((): void => {
		if (!userDetails?._id) return;

		capture('edit user viewed', {
			session: session ?? 'default',
			auth_provider: userDetails.authProvider,
		});
	}, [session, userDetails?._id, userDetails?.authProvider]);

	const canEdit = {
		name: true,
		contacts: true,
		password: !isGoogleUser,
	};

	const initialMarketingAccepted = consent.marketingEmailsAcceptedAt != null;
	const [marketingAccepted, setMarketingAccepted] = useState(
		initialMarketingAccepted
	);

	const [enabled, setEnabled] = useState({
		name: false,
		contacts: false,
		password: false,
	});

	const methods = useForm<EditUserFormValues>({
		mode: 'onBlur',
		defaultValues: {
			firstName: '',
			lastName: '',
			contacts: { email: '' },
		},
	});

	const originalDefaults = useMemo(() => {
		if (!userDetails) return null;
		return toEditUserDefaults(userDetails);
	}, [userDetails]);

	useEffect(() => {
		if (!originalDefaults) return;
		methods.reset(originalDefaults, { keepDirty: false, keepTouched: false });
	}, [originalDefaults, methods]);

	useEffect(() => {
		setEnabled({
			name: session === 'name' && canEdit.name,
			contacts: session === 'contacts' && canEdit.contacts,
			password: session === 'password' && canEdit.password,
		});
	}, [session, canEdit.name, canEdit.contacts, canEdit.password]);

	const editUserMutation = useMutation({
		mutationFn: (payload: IEditUser) => editUserById(payload),
		onSuccess: () => {
			capture('edit user succeeded', {
				session: session ?? 'default',
			});
			showAlert({
				message: t('components.user-details.edit-success'),
				severity: 'success',
			});
			navigate(-1);
		},
		onError: (error: CustomError) => {
			capture('edit user failed', {
				error_code: toEditUserErrorCode(error),
				session: session ?? 'default',
			});
			showAlert({
				message: error.message || t('globals.error.internal-server-error'),
				severity: 'error',
			});
		},
	});

	if (
		isUserDetailsLoading ||
		!isUserDetailsSucces ||
		!userDetails ||
		!originalDefaults
	) {
		return <Loader />;
	}

	const onSubmit = (values: EditUserFormValues) => {
		const effectiveEnabled = {
			...enabled,
			password: enabled.password && canEdit.password,
		};

		if (
			!effectiveEnabled.name &&
			!effectiveEnabled.contacts &&
			!effectiveEnabled.password
		) {
			capture('edit user submit blocked', {
				reason: 'no_sections_selected',
				session: session ?? 'default',
			});
			showAlert({
				message: t(
					'components.user-details.no-changes',
					'Select something to edit'
				),
				severity: 'info',
			});
			return;
		}

		const payload = buildEditUserPayload({
			userId: _id,
			values,
			enabled: effectiveEnabled,
			original: originalDefaults,
		});

		capture('edit user submitted', {
			session: session ?? 'default',
			enabled_name: Boolean(effectiveEnabled.name),
			enabled_contacts: Boolean(effectiveEnabled.contacts),
			enabled_password: Boolean(effectiveEnabled.password),
			auth_provider: authProvider,
		});
		editUserMutation.mutate(payload);
	};

	return (
		<PageLayout title={t('components.user-details.edit')}>
			<FormProvider {...methods}>
				<EditUserFormContainer
					as='form'
					onSubmit={methods.handleSubmit(onSubmit)}
				>
					<EditUserDetailsAvatarWrapper>
						<AvatarUploader
							userId={_id}
							firstName={firstName}
							lastName={lastName}
							picture={pictureUrl}
						/>
					</EditUserDetailsAvatarWrapper>

					<EditSection
						title={t('globals.name')}
						isEnabled={enabled.name}
						onToggle={() => {
							const next = !enabled.name;
							capture('edit user section toggled', {
								section: 'name',
								enabled: next,
							});
							setEnabled((s) => ({ ...s, name: next }));
						}}
					>
						<NameForm<EditUserFormValues>
							required
							disabled={!enabled.name}
							fields={{ firstName: 'firstName', lastName: 'lastName' }}
							placeholderFirstName={firstName}
							placeholderLastName={lastName}
						/>
					</EditSection>
					<EditSection
						title={t('components.user-details.section.title.contact')}
						isEnabled={enabled.contacts}
						onToggle={() => {
							const next = !enabled.contacts;
							capture('edit user section toggled', {
								section: 'contacts',
								enabled: next,
							});
							setEnabled((s) => ({ ...s, contacts: next }));
						}}
					>
						<ContactsForm<EditUserFormValues>
							disabled={!enabled.contacts}
							required
							defaultValues={contacts}
							fields={{
								email: 'contacts.email',
								phone: 'contacts.phone',
								whatsapp: 'contacts.whatsapp',
								hasWhatsApp: 'contacts.hasWhatsApp',
								isPhoneWpp: 'contacts.isPhoneWpp',
							}}
						/>
					</EditSection>
					<EditSection
						title={t('globals.password')}
						isEnabled={enabled.password}
						disabled={!canEdit.password}
						onToggle={() => {
							const next = !enabled.password;
							capture('edit user section toggled', {
								section: 'password',
								enabled: next,
								disabled: !canEdit.password,
							});
							setEnabled((s) => ({ ...s, password: next }));
						}}
					>
						<PasswordInput<EditUserFormValues>
							hasToConfirm
							disabled={!enabled.password || !canEdit.password}
							fields={{
								password: 'password',
							}}
						/>
					</EditSection>
					<EditUserDetailsMarketingConsentWrapper>
						<Text variant='subtitle1' fontWeight={700}>
							{t('globals.privacy')}
						</Text>
						<EditUserDetailsMarketingSwitcher>
							<Switch
								checked={marketingAccepted}
								label={
									<EditUserDetailsMarketingConsentLabel as='span'>
										<Trans
											i18nKey='components.form.consent.marketing'
											components={{
												marketingLink: (
													<Link
														to={externalUrls(i18n.language).MARKETING}
														onClick={() =>
															capture('edit user legal link clicked', {
																doc: 'marketing',
															})
														}
													/>
												),
											}}
										/>
									</EditUserDetailsMarketingConsentLabel>
								}
								onChange={(_, next) => {
									capture('edit user marketing consent toggled', {
										granted: next,
									});
									setMarketingAccepted(next);
									updateMarketingConsent(next, () => {
										setMarketingAccepted(!next);
									});
								}}
							/>
						</EditUserDetailsMarketingSwitcher>
					</EditUserDetailsMarketingConsentWrapper>
					<FormFooter
						disabled={!(enabled.name || enabled.contacts || enabled.password)}
					/>
				</EditUserFormContainer>
			</FormProvider>
		</PageLayout>
	);
};
