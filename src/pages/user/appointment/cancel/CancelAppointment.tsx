import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import type { SelectChangeEvent } from '@mui/material';
import { Box, TextField } from '@mui/material';
import type { ICancelAppointment } from '@psycron/api/appointment/index.types';
import { Button } from '@psycron/components/button/Button';
import { Checkbox } from '@psycron/components/checkbox/Checkbox';
import { NavigateLink } from '@psycron/components/link/navigate/NavigateLink';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import { Select } from '@psycron/components/select/Select';
import { Table } from '@psycron/components/table/Table';
import { Text } from '@psycron/components/text/Text';
import { useAppointmentActions } from '@psycron/context/appointment/appointment-actions/AppointmentActionsContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import useViewport from '@psycron/hooks/useViewport';
import { formatDate } from '@psycron/utils/variables';

export const CancelAppointment = () => {
	const { isMobile, isTablet } = useViewport();

	const { patientId, locale } = useParams<{
		locale: string;
		patientId: string;
	}>();

	const { t } = useTranslation();
	const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
	const [openCancelConfirmation, setOpenCancelConfirmation] =
		useState<boolean>(false);

	const [reasonsMap, setReasonsMap] = useState<
		Map<string, { customReason?: string; reasonCode: number }>
	>(new Map());

	const [allReason, setAllReason] = useState<{
		customReason?: string;
		reasonCode: number;
	}>({
		customReason: '',
		reasonCode: 1,
	});

	const cancellationReasons = [
		{ name: t('globals.cancellation-reason.1'), value: 1 },
		{ name: t('globals.cancellation-reason.2'), value: 2 },
		{ name: t('globals.cancellation-reason.3'), value: 3 },
		{ name: t('globals.cancellation-reason.4'), value: 4 },
		{ name: t('globals.cancellation-reason.5'), value: 5 },
		{ name: t('globals.cancellation-reason.6'), value: 6 },
		{ name: t('globals.cancellation-reason.7'), value: 7 },
	];

	const { patientDetails, isPatientDetailsLoading } = usePatient(patientId);

	const { therapistId } = useUserDetails();

	const { cancelAppointmentMttn, isCancelAppointmentLoading } =
		useAppointmentActions();

	if (isPatientDetailsLoading || isCancelAppointmentLoading) {
		return <Loader />;
	}

	const { sessionDates, firstName, lastName } = patientDetails;

	const patientName = `${firstName} ${lastName}`;

	const latestSessionDate = sessionDates?.slice(-1)[0];

	const sortedSessions = latestSessionDate?.sessions
		.map((session) => ({
			...session,
			slots: session.slots.filter((slot) => slot.status === 'BOOKED'),
		}))
		.filter((session) => session.slots.length > 0)
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	const isAllSelected =
		selectedSlots.length === sortedSessions.flatMap((s) => s.slots).length;

	const selectedAppointments = sortedSessions.flatMap((session) =>
		session.slots
			.filter((slot) => selectedSlots.includes(slot._id))
			.map((slot) => ({
				date: formatDate(session.date, locale),
				startTime: slot.startTime,
				endTime: slot.endTime,
				slotId: slot._id,
			}))
	);

	const toggleSelectAll = () => {
		if (isAllSelected) {
			setSelectedSlots([]);
			setReasonsMap(new Map());
		} else {
			const allSlots = sortedSessions.flatMap((s) =>
				s.slots.map((slot) => slot._id)
			);
			setSelectedSlots(allSlots);
			setReasonsMap(
				new Map(allSlots.map((slotId) => [slotId, { reasonCode: 1 }]))
			);
		}
	};

	const toggleSlotSelection = (slotId: string) => {
		setSelectedSlots((prevSelected) => {
			const newSelected = prevSelected.includes(slotId)
				? prevSelected.filter((id) => id !== slotId)
				: [...prevSelected, slotId];

			// Atualiza o mapa de razões
			setReasonsMap((prevMap) => {
				const newMap = new Map(prevMap);
				if (newSelected.includes(slotId)) {
					newMap.set(slotId, { reasonCode: 1 });
				} else {
					newMap.delete(slotId);
				}
				return newMap;
			});
			return newSelected;
		});
	};

	const handleReasonChange = (
		slotId: string,
		event: SelectChangeEvent<string>
	) => {
		const selectedValue = Number(event.target.value);
		setReasonsMap((prevMap) => {
			const newMap = new Map(prevMap);
			newMap.set(slotId, {
				reasonCode: selectedValue,
				customReason: selectedValue === 7 ? '' : undefined,
			});
			return newMap;
		});
	};

	const handleAllReasonChange = (event: SelectChangeEvent<string>) => {
		const selectedValue = Number(event.target.value);
		setAllReason({
			reasonCode: selectedValue,
			customReason: selectedValue === 7 ? '' : undefined,
		});

		setReasonsMap(
			new Map(
				selectedSlots.map((slotId) => [slotId, { reasonCode: selectedValue }])
			)
		);
	};

	const handleCustomReasonChange = (
		slotId: string,
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setReasonsMap((prevMap) => {
			const newMap = new Map(prevMap);
			const currentEntry = newMap.get(slotId);
			if (currentEntry) {
				newMap.set(slotId, {
					...currentEntry,
					customReason: event.target.value,
				});
			}
			return newMap;
		});
	};

	const handleCustomAllReasonChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAllReason((prev) => ({ ...prev, customReason: event.target.value }));
		setReasonsMap(
			new Map(
				selectedSlots.map((slotId) => [
					slotId,
					{ reasonCode: 7, customReason: event.target.value },
				])
			)
		);
	};

	const headItem = [
		{
			id: 'date',
			numeric: false,
			icon: false,
			label: t('globals.date'),
		},
		{
			id: 'startTime',
			numeric: false,
			icon: false,
			label: t('globals.starts'),
		},
		{
			id: 'endTime',
			numeric: false,
			icon: false,
			label: t('globals.ends'),
		},
		{
			id: 'checkbox',
			numeric: false,
			icon: false,
			label: (
				<Checkbox
					shouldBold
					labelKey={
						isMobile || isTablet
							? ''
							: t('components.agenda.cancel-appointment.select-all', {
									select: isAllSelected
										? t('globals.unselect')
										: t('globals.select'),
								})
					}
					register={null}
					checked={
						selectedSlots.length ===
						sortedSessions.flatMap((s) => s.slots).length
					}
					onChange={toggleSelectAll}
				/>
			),
		},
	];

	const tableBody = sortedSessions.flatMap((session) =>
		session.slots.map((slot) => [
			{
				id: 'date',
				label: formatDate(session.date, locale),
				numeric: false,
				isPatients: true,
				itemId: slot._id,
			},
			{
				id: 'startTime',
				label: slot.startTime,
				numeric: false,
				isPatients: false,
				itemId: slot._id,
			},
			{
				id: 'endTime',
				label: slot.endTime,
				numeric: false,
				isPatients: false,
				itemId: slot._id,
			},
			{
				id: 'checkbox',
				label: (
					<Checkbox
						labelKey={''}
						register={null}
						checked={selectedSlots.includes(slot._id)}
						onChange={() => toggleSlotSelection(slot._id)}
					/>
				),
				numeric: false,
				isPatients: false,
				itemId: slot._id,
				onCellClick: () => toggleSlotSelection(slot._id),
			},
		])
	);

	const handleCancelAppointments = () => {
		if (!patientId || !therapistId) return;

		const cancelData: ICancelAppointment = {
			therapistId,
			data: {
				patientId,
				appointments: selectedSlots.map((id) => ({
					slotId: id,
					reasonCode: reasonsMap.get(id)?.reasonCode ?? 1,
					customReason: reasonsMap.get(id)?.customReason ?? '',
				})),
			},
		};

		cancelAppointmentMttn(cancelData);
	};

	return (
		<>
			<Box>
				<Box>
					<Text fontSize='1.5rem' fontWeight={600}>
						{t('page.cancel-appointment.title')}
					</Text>
					<Box>
						<Text>{t('page.cancel-appointment.sub-title')}</Text>
					</Box>
				</Box>

				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					px={6}
				>
					<NavigateLink isBack />
					<Box>
						<Button onClick={() => setOpenCancelConfirmation(true)}>
							{t('components.agenda.cancel-appointment.title')}
						</Button>
					</Box>
				</Box>
				<Box display='flex' pl={6}>
					<Text fontWeight={600} pr={1} fontSize='1.2rem'>
						{t('globals.patient')}:
					</Text>
					<Text fontSize='1.2rem'>{patientName}</Text>
				</Box>
				<Box>
					<Table
						columnsToHideMobile={[]}
						columnsToHideTablet={[]}
						headItems={headItem}
						bodyItems={tableBody}
					/>
				</Box>
			</Box>
			<Modal
				title={t('components.agenda.cancel-appointment.review')}
				cardActionsProps={{
					actionName: t('globals.proceed'),
					onClick: handleCancelAppointments,
				}}
				openModal={openCancelConfirmation}
				onClose={() => setOpenCancelConfirmation(false)}
			>
				<Box maxHeight='70vh' overflow='auto'>
					{isAllSelected ? (
						<Box>
							<Text fontWeight={500}>
								{t('components.agenda.cancel-appointment.confirmation')}
							</Text>
							<Box display='flex' alignItems='center' pt={4}>
								<Text fontSize='0.8rem'>
									{t('components.agenda.cancel-appointment.global-reason')}
								</Text>
								<Select
									selectLabel={t('globals.reason')}
									items={cancellationReasons}
									onChangeSelect={handleAllReasonChange}
									value={String(allReason.reasonCode) || ''}
								/>
							</Box>
							{allReason.reasonCode === 7 && (
								<Box mt={2}>
									<TextField
										label={t('globals.global-reason')}
										variant='outlined'
										fullWidth
										multiline
										rows={2}
										value={allReason.customReason}
										onChange={handleCustomAllReasonChange}
									/>
								</Box>
							)}
						</Box>
					) : (
						<Box>
							{selectedAppointments.map(
								({ date, startTime, endTime, slotId }) => (
									<Box key={slotId}>
										<Box
											display='flex'
											justifyContent='space-between'
											alignItems='center'
											pb={1}
										>
											<Text
												fontSize='0.8rem'
												fontWeight={600}
												textTransform='capitalize'
											>
												{date}
											</Text>
											<Text fontSize='0.8rem'>
												{startTime} - {endTime}
											</Text>
											<Box width={'50%'}>
												<Select
													selectLabel={t('globals.reason')}
													items={cancellationReasons}
													onChangeSelect={(e) => handleReasonChange(slotId, e)}
													value={String(
														reasonsMap.get(slotId)?.reasonCode || ''
													)}
												/>
											</Box>
										</Box>
										{reasonsMap.get(slotId)?.reasonCode === 7 ? (
											<TextField
												label={t('globals.custom-reason')}
												variant='outlined'
												fullWidth
												maxRows={2}
												value={reasonsMap.get(slotId)?.customReason || ''}
												onChange={(e) => handleCustomReasonChange(slotId, e)}
											/>
										) : null}
									</Box>
								)
							)}
						</Box>
					)}
				</Box>
			</Modal>
		</>
	);
};
