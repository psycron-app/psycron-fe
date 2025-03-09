import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableContainer } from '@mui/material';
import { Modal } from '@psycron/components/modal/Modal';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { APPOINTMENTS } from '@psycron/pages/urls';
import { generateTimeSlots, generateWeekDays } from '@psycron/utils/variables';
import {
	addDays,
	format,
	isAfter,
	isEqual,
	startOfWeek,
	subDays,
} from 'date-fns';

import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaTableBody } from './components/agenda-table-body/AgendaTableBody';
import { AgendaTableHead } from './components/agenda-table-head/AgendaTableHead';
import { filteredAvailabilityBasedOnRange } from './helpers/agendaHelpers';
import type { IAgendaProps } from './Agenda.types';

export const Agenda = ({
	daySelectedFromCalendar,
	mode,
	therapistId,
}: IAgendaProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const {
		dataFromSelectedDay,
		isDataFromSelectedDayLoading,
		goToNextWeek,
		goToPreviousWeek,
		lastAvailableDate,
	} = useAvailability(therapistId, daySelectedFromCalendar);

	const dataFromAvailability = dataFromSelectedDay;

	const selectedDayOrToday = daySelectedFromCalendar ?? daySelectedFromCalendar;
	const [dayFromCalendar, setDayFromCalendar] = useState<Date>(
		selectedDayOrToday?.date
	);

	const [weekDays, setWeekDays] = useState<string[]>(
		generateWeekDays(selectedDayOrToday?.date)
	);
	useEffect(() => {
		setWeekDays(generateWeekDays(dayFromCalendar));
	}, [dayFromCalendar]);

	// READING DETAILS STATE
	const [openReadDetailsModal, setOpenReadDetailsModal] =
		useState<boolean>(false);

	const dayHoursGeneratedByApptDuration = generateTimeSlots(
		dataFromAvailability?.latestAvailability?.consultationDuration
	);

	const { filteredHoursRange } = filteredAvailabilityBasedOnRange(
		dayHoursGeneratedByApptDuration,
		dataFromAvailability?.latestAvailability?.availabilityDates
	);

	const weekStart = useMemo(
		() => startOfWeek(dayFromCalendar, { weekStartsOn: 0 }),
		[dayFromCalendar]
	);

	const hasPreviousDates = useMemo(() => {
		return dataFromSelectedDay?.latestAvailability?.availabilityDates?.some(
			({ date }) => new Date(date) < weekStart
		);
	}, [dataFromSelectedDay?.latestAvailability?.availabilityDates, weekStart]);

	const hasNextDates = useMemo(() => {
		return dataFromSelectedDay?.latestAvailability?.availabilityDates?.some(
			({ date }) => new Date(date) >= addDays(weekStart, 7)
		);
	}, [dataFromSelectedDay?.latestAvailability?.availabilityDates, weekStart]);

	const filteredAvailabilityPerWeek = useMemo(() => {
		return dataFromAvailability?.latestAvailability?.availabilityDates?.filter(
			({ date }) => {
				const formattedDate = new Date(date);
				return (
					formattedDate >= weekStart && formattedDate < addDays(weekStart, 7)
				);
			}
		);
	}, [weekStart, dataFromAvailability]);

	const fullWeekAvailability = useMemo(() => {
		return weekDays.map((weekDay, index) => {
			const weekDate = addDays(weekStart, index);
			const formattedWeekDate = format(weekDate, 'yyyy-MM-dd');

			const existingDay = filteredAvailabilityPerWeek?.find(({ date }) => {
				const formattedAvailableDate = format(date, 'yyyy-MM-dd');
				return formattedAvailableDate === formattedWeekDate;
			});

			return {
				weekDay,
				date: weekDate.toISOString(),
				_id: existingDay?._id ?? `empty-${weekDate.getTime()}-${index}`,
				slots: existingDay?.slots ?? [],
			};
		});
	}, [weekDays, weekStart, filteredAvailabilityPerWeek]);

	const [isTableLoading, setIsTableLoading] = useState(true);

	useEffect(() => {
		if (!isDataFromSelectedDayLoading && fullWeekAvailability.length > 0) {
			setTimeout(() => {
				setIsTableLoading(false);
			}, 500);
		} else {
			setIsTableLoading(true);
		}
	}, [isDataFromSelectedDayLoading, fullWeekAvailability]);

	useEffect(() => {
		const lastLoadedDate = fullWeekAvailability.slice(-1)[0]?.date;

		const isLastLoadedWeek =
			isAfter(new Date(lastLoadedDate), new Date(lastAvailableDate)) ||
			(isEqual(new Date(lastLoadedDate), new Date(lastAvailableDate)) &&
				hasNextDates);

		if (isLastLoadedWeek && !isDataFromSelectedDayLoading) {
			goToNextWeek();
		}
	}, [
		fullWeekAvailability,
		hasNextDates,
		isDataFromSelectedDayLoading,
		goToNextWeek,
		lastAvailableDate,
	]);

	const handleNextWeek = () => {
		setDayFromCalendar((prev) => addDays(prev, 7));
	};
	const handlePreviousWeek = () => {
		setDayFromCalendar((prev) => subDays(prev, 7));
		goToPreviousWeek();
	};

	// GENERAL CLICK SLOT
	// const handleGeneralClickSlot = (
	// 	selectedSlotDetails: ISelectedSlot,
	// 	mode: IAgendaViewMode
	// ) => {
	// 	if (!selectedSlotDetails.availabilityDayId) return;

	// 	const { availabilityDayId, slot } = selectedSlotDetails;

	// 	setSelectedSlotDetails({
	// 		availabilityDayId,
	// 		slot,
	// 	});

	// 	switch (mode) {
	// 		case 'view':
	// 			setOpenReadDetailsModal(true);
	// 			break;

	// 		case 'edit':
	// 			// Navegar para a tela de edição
	// 			break;

	// 		case 'cancel':
	// 			break;

	// 		case 'book':
	// 			// Implementação do fluxo de booking
	// 			break;

	// 		default:
	// 			console.error('Ação desconhecida:', mode);
	// 	}
	// };

	// HANDLE EDIT APPOINTMENT
	const handleEditAppointment = (availabilityDayId: string, slotId: string) => {
		if (!availabilityDayId || !slotId) return;

		const foundDate =
			dataFromSelectedDay?.latestAvailability?.availabilityDates?.find(
				(dateObj) => dateObj._id === availabilityDayId
			);

		if (!foundDate) return;

		const formattedDate = new Date(foundDate.date).toISOString().split('T')[0];

		navigate(
			`../${APPOINTMENTS}/edit/${availabilityDayId}?slot=${slotId}&date=${formattedDate}`
		);
	};

	// HANDLE NAVIGATE TO DELETE APPOINTMENT
	// const handleDeleteAppointment = (patientId: string) => {
	// 	navigate(`../${APPOINTMENTS}/cancel/${patientId}`);
	// };

	return (
		<>
			<TableContainer component={Paper} style={{ width: '100%', height: 500 }}>
				<Table stickyHeader>
					<AgendaTableHead
						daySelectedFromCalendar={dayFromCalendar}
						fullWeekAvailability={fullWeekAvailability}
					/>
					<AgendaTableBody
						filteredHoursRange={filteredHoursRange}
						fullWeekAvailability={fullWeekAvailability}
						isLoading={isTableLoading}
						mode={'view'}
					/>
				</Table>
			</TableContainer>
			{/* SLOTS COLUMNS ENDS */}

			{/* PAGINATION STARTS */}
			<AgendaPagination
				onGoToNextWeek={() => handleNextWeek()}
				onGoToPreviousWeek={handlePreviousWeek}
				onGoToToday={() => setDayFromCalendar(selectedDayOrToday.date)}
				onGoToMonthView={() => console.log('Open month view')}
				disablePrevious={!hasPreviousDates}
				disableNext={!hasNextDates}
				mode={mode}
			/>
			{/* PAGINATION ENDS */}
			{/* READING DETAILS MODAL STARTS */}
			{/* <Modal
				openModal={openReadDetailsModal}
				title={t('components.agenda.appointment-details.title')}
				onClose={() => setOpenReadDetailsModal(false)}
				cardActionsProps={{
					actionName: t(
						'components.agenda.appointment-details.edit-patient-appointment'
					),
					onClick: () => {
						handleEditAppointment(
							selectedSlotDetails.availabilityDayId,
							selectedSlotDetails.slot._id
						);
					},
					hasSecondAction: true,
					secondActionName: t('components.agenda.cancel-appointment.title'),
					// secondAction: () => handleDeleteAppointment(latestPatientId),
				}}
			>
				<AgendaAppointmentDetails
					selectedSlot={selectedSlotDetails}
					handleEditAppointment={handleEditAppointment}
				/>
			</Modal> */}
			{/* READING DETAILS MODAL ENDS */}
		</>
	);
};
