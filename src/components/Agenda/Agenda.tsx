import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableContainer } from '@mui/material';
import { Modal } from '@psycron/components/modal/Modal';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useTranslatedStatus } from '@psycron/hooks/useTranslatedStatus';
import { APPOINTMENTS } from '@psycron/pages/urls';
import { generateWeekDays } from '@psycron/utils/variables';
import { addDays, format, startOfWeek, subDays } from 'date-fns';

import { AgendaAppointmentDetails } from './components/agenda-appointment-details/AgendaAppointmentDetails';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaTableBody } from './components/agenda-table-body/AgendaTableBody';
import { AgendaTableHead } from './components/agenda-table-head/AgendaTableHead';
import type {
	IAgendaProps,
	IAgendaViewMode,
	ISelectedSlot,
} from './Agenda.types';

export const Agenda = ({ daySelectedFromCalendar, mode }: IAgendaProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { therapistId } = useUserDetails();

	const statusOptions = useTranslatedStatus();

	const [dayFromCalendar, setDayFromCalendar] = useState<Date>(
		daySelectedFromCalendar?.date
	);
	const [selectedSlot, setSelectedSlot] = useState<ISelectedSlot | null>(null);

	const [openReadDetailsModal, setOpenReadDetailsModal] =
		useState<boolean>(false);

	const [isEditStatus, setIsEditStatus] = useState<boolean>(false);

	const { register, getValues, setValue } = useForm({
		defaultValues: { status: selectedSlot?.slot?.status },
	});

	const {
		firstDate,
		lastDate,
		dataFromSelectedDayRes,
		isDataFromSelectedDayLoading,
		fetchNextPage,
		fetchPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		consultationDuration,
		editSlotStatusMttn,
	} = useAvailability(daySelectedFromCalendar, undefined);

	const { weekStart, weekDays } = useMemo(() => {
		const weekStart = startOfWeek(dayFromCalendar, { weekStartsOn: 0 });
		const weekDays = generateWeekDays(weekStart);
		return { weekStart, weekDays };
	}, [dayFromCalendar]);

	const {
		availabilityDates,
		fullWeekAvailability,
		firstItemAvailable,
		lastItemAvailable,
	} = useMemo(() => {
		const pages = dataFromSelectedDayRes?.pages ?? [];

		const flatAvailabilityDates =
			pages?.flatMap((page) => page.availabilityDates) ?? [];

		return {
			availabilityDates: flatAvailabilityDates,
			firstItemAvailable: flatAvailabilityDates?.at(0)?._id,
			lastItemAvailable: flatAvailabilityDates?.at(-1)?._id,
			fullWeekAvailability: weekDays.map((weekDay, index) => {
				const weekDate = addDays(weekStart, index);
				const formattedWeekDate = format(weekDate, 'yyyy-MM-dd');

				const existingDay = flatAvailabilityDates.find(({ date }) => {
					return format(date, 'yyyy-MM-dd') === formattedWeekDate;
				});

				return {
					weekDay,
					date: weekDate.toISOString(),
					_id: existingDay?._id ?? null,
					slots: existingDay?.slots.length ? existingDay.slots : [],
				};
			}),
		};
	}, [dataFromSelectedDayRes, weekDays, weekStart]);

	const { isLastItemWithinWeek, isFirstItemWithinWeek } = useMemo(() => {
		return {
			isLastItemWithinWeek: fullWeekAvailability.some(
				(day) => day._id === lastItemAvailable
			),
			isFirstItemWithinWeek: fullWeekAvailability.some(
				(day) => day._id === firstItemAvailable
			),
		};
	}, [firstItemAvailable, fullWeekAvailability, lastItemAvailable]);

	const isLoadingState = useMemo(() => {
		return isDataFromSelectedDayLoading || availabilityDates?.length === 0;
	}, [isDataFromSelectedDayLoading, availabilityDates?.length]);

	const filteredHoursRange = useMemo(() => {
		const availableStartTimes = new Set(
			availabilityDates?.flatMap((date: { slots: ISlot[] }) =>
				date.slots.map((slot) => slot.startTime)
			)
		);

		return Array.from(availableStartTimes).sort();
	}, [availabilityDates]);

	useEffect(() => {
		if (isLastItemWithinWeek) {
			fetchNextPage();
		}
	}, [fetchNextPage, isLastItemWithinWeek]);

	useEffect(() => {
		if (isFirstItemWithinWeek) {
			fetchPreviousPage();
		}
	}, [fetchPreviousPage, isFirstItemWithinWeek]);

	const validStatus = ['AVAILABLE', 'EMPTY'].includes(
		selectedSlot?.slot?.status
	);

	// GENERAL CLICK SLOT
	const handleGeneralClickSlot = (
		selectedSlotDetails: ISelectedSlot,
		mode: IAgendaViewMode
	) => {
		if (!selectedSlotDetails.availabilityDayId) return;

		switch (mode) {
			case 'view':
				handleViewSlotDetails(selectedSlotDetails);
				break;

			case 'edit':
				// Navegar para a tela de edição
				break;

			case 'cancel':
				break;

			case 'book':
				// Implementação do fluxo de booking
				break;

			default:
		}
	};

	// HANDLE VIEW APPOINTMENT DETAILS
	const handleViewSlotDetails = (selectedSlotDetails: ISelectedSlot) => {
		setOpenReadDetailsModal(true);
		setSelectedSlot(selectedSlotDetails);
	};

	const handleCloseViewDetails = () => {
		setOpenReadDetailsModal(false);
		setIsEditStatus(false);
	};

	// HANDLE EDIT SLOT STATUS
	const handleEditSlotStatus = (
		selectedSlot: ISelectedSlot,
		isEditStatus: boolean
	) => {
		const {
			availabilityDayId,
			slot: { _id: slotId, startTime },
		} = selectedSlot;

		if (!isEditStatus) {
			setIsEditStatus(true);
		} else {
			const newStatus = getValues('status');

			const foundStatusVal = statusOptions.find(
				({ value }) => value === newStatus
			)?.name;

			const editSlotStatusData = {
				therapistId,
				availabilityDayId,
				slotId,
				data: {
					newStatus: foundStatusVal,
					startTime,
				},
			};

			editSlotStatusMttn(editSlotStatusData);
			setIsEditStatus(false);
			setOpenReadDetailsModal(false);
		}
	};

	// HANDLE EDIT APPOINTMENT
	const handleEditAppointment = (selectedSlot: ISelectedSlot) => {
		// if (!availabilityDayId || !slotId) return;
		// const foundDate =
		// 	dataFromSelectedDay?.latestAvailability?.availabilityDates?.find(
		// 		(dateObj) => dateObj._id === availabilityDayId
		// 	);
		// if (!foundDate) return;
		// const formattedDate = new Date(foundDate.date).toISOString().split('T')[0];
		// navigate(
		// 	`../${APPOINTMENTS}/edit/${availabilityDayId}?slot=${slotId}&date=${formattedDate}`
		// );
	};

	// HANDLE NAVIGATE TO DELETE APPOINTMENT
	// const handleDeleteAppointment = (patientId: string) => {
	// 	navigate(`../${APPOINTMENTS}/cancel/${patientId}`);
	// };

	// PAGINATION
	const foundItemFromTheWeek = (dateId: string) => {
		return fullWeekAvailability?.find(
			(date: { _id: string }) => date._id === dateId
		);
	};

	const handleNextWeek = () => {
		setDayFromCalendar((prev) => addDays(prev, 7));
	};

	const handlePreviousWeek = () => {
		setDayFromCalendar((prev) => subDays(prev, 7));
	};

	return (
		<>
			<TableContainer component={Paper} style={{ width: '100%', height: 500 }}>
				<Table stickyHeader>
					<AgendaTableHead fullWeekAvailability={fullWeekAvailability} />
					<AgendaTableBody
						filteredHoursRange={filteredHoursRange}
						fullWeekAvailability={fullWeekAvailability}
						nextCursor={lastItemAvailable}
						previousCursor={firstItemAvailable}
						onClick={handleGeneralClickSlot}
						isLoading={isLoadingState}
						isFetchingNextPage={isFetchingNextPage}
						isFetchingPreviousPage={isFetchingPreviousPage}
						consultationDuration={consultationDuration}
						mode={'view'}
					/>
				</Table>
			</TableContainer>
			{/* SLOTS COLUMNS ENDS */}

			{/* PAGINATION STARTS */}
			<AgendaPagination
				onGoToNextWeek={() => handleNextWeek()}
				onGoToPreviousWeek={() => handlePreviousWeek()}
				onGoToToday={() => setDayFromCalendar(daySelectedFromCalendar.date)}
				onGoToMonthView={() => console.log('Open month view')}
				disableNext={
					foundItemFromTheWeek(lastDate?.dateId) !== undefined ||
					isFetchingNextPage
				}
				disablePrevious={
					foundItemFromTheWeek(firstDate?.dateId) !== undefined ||
					isFetchingPreviousPage
				}
				mode={mode}
			/>
			{/* PAGINATION ENDS */}
			{/* READING DETAILS MODAL STARTS */}
			<Modal
				openModal={openReadDetailsModal}
				title={t('components.agenda.appointment-details.title')}
				onClose={handleCloseViewDetails}
				cardActionsProps={{
					actionName: validStatus
						? t('components.agenda.appointment-details.edit-availability')
						: t(
								'components.agenda.appointment-details.edit-patient-appointment'
							),
					onClick: () => {
						if (validStatus) {
							handleEditSlotStatus(selectedSlot, isEditStatus);
						} else {
							handleEditAppointment(selectedSlot);
						}
					},
					hasSecondAction: isEditStatus || (!validStatus && !isEditStatus),
					secondActionName: isEditStatus
						? t('components.link.navigate.back')
						: t('components.agenda.cancel-appointment.title'),
					secondAction: () => {
						if (isEditStatus) {
							setIsEditStatus(false);
						} else {
							// handleDeleteAppointment(latestPatientId);
						}
					},
				}}
			>
				<AgendaAppointmentDetails
					appointmentDetails={selectedSlot}
					handleEditAppointment={handleEditAppointment}
					isEditingStatus={isEditStatus}
					register={register}
					getValues={getValues}
					setValue={setValue}
				/>
			</Modal>
			{/* READING DETAILS MODAL ENDS */}
		</>
	);
};
