import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Close, Edit } from '@psycron/components/icons';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import type { ITableCellProps } from '@psycron/components/table/components/table-cell/TableCell.types';
import { Table } from '@psycron/components/table/Table';
import { Text } from '@psycron/components/text/Text';
import { useAppointmentActions } from '@psycron/context/appointment/appointment-actions/AppointmentActionsContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import type { ISessionDate } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import useViewport from '@psycron/hooks/useViewport';
import {
	formatTimeToTimeZone,
	generateUserTimeZone,
} from '@psycron/utils/variables';
import { format } from 'date-fns-tz';

export const AppointmentsList = () => {
	const { patientId } = useParams<{
		locale: string;
		patientId: string;
	}>();

	const { t } = useTranslation();
	const { isMobile } = useViewport();
	const { openEditModal, openCancelModal, closeModals, selectedSession } =
		useAppointmentActions();

	const { patientDetails, isPatientDetailsLoading } = usePatient(patientId);

	const timeZone = generateUserTimeZone();

	const latestSession = useMemo(() => {
		if (
			!patientDetails?.sessionDates ||
			patientDetails?.sessionDates.length === 0
		) {
			return;
		}
		return patientDetails?.sessionDates[
			patientDetails?.sessionDates.length - 1
		];
	}, [patientDetails]);

	if (isPatientDetailsLoading) {
		return <Loader />;
	}
	const { _id: latestSessionId, sessions } = latestSession;

	const headItems: ITableCellProps[] = [
		{
			id: 'date',
			numeric: true,
			icon: false,
			label: t('page.appointment-list.date'),
		},
		{
			id: 'start',
			numeric: true,
			icon: false,
			label: t('page.appointment-list.starts'),
		},
		{
			id: 'end',
			numeric: true,
			icon: false,
			label: t('page.appointment-list.ends'),
		},
		{ id: 'status', numeric: true, icon: false, label: 'Status' },
		{
			id: 'action',
			numeric: true,
			icon: true,
			action: true,
			label: 'Actions',
		},
	];

	const formattedDate = (date?: Date) => {
		if (date) {
			return format(new Date(date), 'yyyy-MM-dd', {
				timeZone: timeZone,
			});
		}
		return;
	};

	const formattedSelectedTime = () => {
		if (selectedSession) {
			return formatTimeToTimeZone(
				selectedSession?.slots[0].startTime,
				selectedSession?.date,
				timeZone
			);
		}
		return;
	};

	const bodyItems: ITableCellProps[][] = sessions?.map(
		(session: ISessionDate) => {
			const slot = session.slots?.[0];

			const formattedStartTime = formatTimeToTimeZone(
				slot.startTime,
				session.date,
				timeZone
			);
			const formattedEndTime = formatTimeToTimeZone(
				slot.endTime,
				session.date,
				timeZone
			);

			return [
				{
					id: 'date',
					label: formattedDate(session?.date),
				},
				{
					id: 'start',
					label: formattedStartTime,
				},
				{
					id: 'end',
					label: formattedEndTime,
				},
				{
					id: `status-${slot.status}`,
					label: t(`globals.appointment-status.${slot.status.toLowerCase()}`),
				},
				{
					id: 'action',
					label: '',
					icon: true,
					action: true,
					iconElements: isMobile
						? [<Edit key='edit-icon' />]
						: [<Edit key='edit-icon' />, <Close key='close-icon' />],
					tooltip: isMobile
						? [t('globals.edit')]
						: [t('globals.edit'), t('globals.cancel')],
					isPatients: false,
					session: session,
				},
			];
		}
	);

	const handleCancelAction = () => {
		const data = {
			data: {
				date: selectedSession?.date,
				startTime: selectedSession?.slots[0].startTime,
				sessionId: selectedSession?._id,
				slotId: selectedSession?.slots[0]._id,
			},
			sessionDateId: latestSessionId,
			therapistId: String(patientDetails?.createdBy),
		};
		console.log('🚀 ~ handleCancelAction ~ data:', data);
		// cancelAppointmentMttn(data);
	};

	return (
		<>
			<Box>
				<Box>
					<Table
						columnsToHideMobile={[]}
						columnsToHideTablet={[]}
						headItems={headItems}
						bodyItems={bodyItems}
						isSmall
					/>
				</Box>
			</Box>
			<Modal
				openModal={openEditModal}
				cardActionsProps={{
					actionName: t('components.link.navigate.next'),
					onClick: () => console.log('clicou'),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: () => closeModals(),
				}}
				title={t('page.appointment-list.modal.title', {
					action: t('globals.edit').toLowerCase(),
				})}
			>
				<Box>
					<Text>
						{t('globals.date')}: {formattedDate(selectedSession?.date)}
					</Text>
					<Text>
						{t('globals.time')}: {formattedSelectedTime()}
					</Text>
				</Box>
			</Modal>
			<Modal
				openModal={openCancelModal}
				cardActionsProps={{
					actionName: t('components.link.navigate.next'),
					onClick: () => handleCancelAction(),
					hasSecondAction: true,
					secondActionName: t('components.link.navigate.back'),
					secondAction: () => closeModals(),
				}}
				title={t('page.appointment-list.modal.title', {
					action: t('globals.cancel').toLowerCase(),
				})}
			>
				<Box>
					<Text>
						{t('globals.date')}: {formattedDate(selectedSession?.date)}
					</Text>
					<Text>
						{t('globals.time')}: {formattedSelectedTime()}
					</Text>
				</Box>
			</Modal>
		</>
	);
};
