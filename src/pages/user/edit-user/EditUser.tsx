import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import type { CustomError } from '@psycron/api/error';
import { editUserById } from '@psycron/api/user';
import type { IEditUser } from '@psycron/api/user/index.types';
import { Avatar } from '@psycron/components/avatar/Avatar';
import { FormFooter } from '@psycron/components/form/components/footer/FormFooter';
import { Loader } from '@psycron/components/loader/Loader';
import { Switch } from '@psycron/components/switch/components/item/Switch';
import { Text } from '@psycron/components/text/Text';
import { useAlert } from '@psycron/context/alert/AlertContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { spacing } from '@psycron/theme/spacing/spacing.theme';
import { useMutation } from '@tanstack/react-query';

import { EditButton, EditingBox, EditUserWrapper } from './EditUser.styles';

export const EditUser = () => {
	const { t } = useTranslation();
	const { userId } = useParams<{ userId: string }>();
	const { session } = useParams<{ session: string }>();

	const navigate = useNavigate();

	const { userDetails, isUserDetailsSucces, isUserDetailsLoading } =
		useUserDetails(userId);

	const [isEditName, setIsEditName] = useState<boolean>(false);

	const [isEditContacts, setIsEditContacts] = useState<boolean>(false);
	const [isEditAddress, setIsEditAddress] = useState<boolean>(false);

	const { showAlert } = useAlert();

	const { handleSubmit, getValues } = useForm();

	useEffect(() => {
		setIsEditName(session === 'name');
		setIsEditContacts(session === 'contacts');
		setIsEditAddress(session === 'address');
	}, [session]);

	const editUserMutation = useMutation({
		mutationFn: (editData: IEditUser) => editUserById(editData),
		onSuccess: () => {
			showAlert({
				message: 'Details edited successfully',
				severity: 'success',
			});

			setIsEditName(false);
			setIsEditContacts(false);
			setIsEditAddress(false);

			navigate(-1);
		},
		onError: (error: CustomError) => {
			showAlert({
				message: error.message || 'something went wrong',
				severity: 'error',
			});
		},
	});

	if (isUserDetailsLoading || !isUserDetailsSucces) {
		return <Loader />;
	}

	const handleSave = () => {
		const data = getValues();

		const editData: IEditUser = {
			userId: userDetails._id,
			data: {
				firstName: data.firstName || userDetails.firstName,
				lastName: data.lastName || userDetails.lastName,
				contacts: {
					email: data.email || userDetails.contacts.email,
					phone: data.countryCode + data.phone || userDetails.contacts.phone,
					whatsapp: data.whatsapp || userDetails.contacts.whatsapp,
				},
			},
		};

		editUserMutation.mutate(editData);
	};

	return (
		<Box width='100%' display='flex' justifyContent='center'>
			<Text variant='h6' pb={5}>
				{t('components.user-details.edit')}
			</Text>
			<EditUserWrapper as='form' onSubmit={handleSubmit(handleSave)}>
				<EditingBox isEditing={isEditName}>
					<Box display='flex' alignItems='center'>
						<Avatar
							firstName={userDetails?.firstName}
							lastName={userDetails?.lastName}
							src={''}
							large
						/>
						{/* <NameForm
							placeholderFirstName={userDetails?.firstName}
							placeholderLastName={userDetails?.lastName}
							disabled={!isEditName}
						/> */}
					</Box>
					<EditButton>
						<Switch
							label={t('components.user-details.edit')}
							defaultChecked={isEditName}
							onChange={() => setIsEditName((prev) => !prev)}
						/>
					</EditButton>
				</EditingBox>

				<Box mb={spacing.xxl}>
					<EditingBox isEditing={isEditContacts}>
						{/* <ContactsForm
							errors={errors}
							register={register}
							getPhoneValue={getValues}
							setPhoneValue={setValue}
							defaultValues={userDetails?.contacts}
							disabled={!isEditContacts}
							setValue={setValue}
						/> */}
						<EditButton>
							<Switch
								label={t('components.user-details.edit-contacts')}
								defaultChecked={isEditContacts}
								onChange={() => setIsEditContacts((prev) => !prev)}
							/>
						</EditButton>
					</EditingBox>

					<EditingBox isEditing={isEditAddress}>
						<EditButton>
							<Switch
								label={t('components.user-details.change', {
									name: t('globals.address'),
								})}
								defaultChecked={isEditAddress}
								onChange={() => setIsEditAddress((prev) => !prev)}
							/>
						</EditButton>
					</EditingBox>
				</Box>
				<FormFooter />
			</EditUserWrapper>
		</Box>
	);
};
