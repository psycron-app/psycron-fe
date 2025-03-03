import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { Loader } from '@psycron/components/loader/Loader';
import { Modal } from '@psycron/components/modal/Modal';
import { Text } from '@psycron/components/text/Text';
import type { ISlot } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { APPOINTMENTS } from '@psycron/pages/urls';
import { generateTimeSlots } from '@psycron/utils/variables';
import { addDays, subDays } from 'date-fns';

import { AgendaAppointmentDetails } from './components/agenda-appointment-details/AgendaAppointmentDetails';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaSlotNew } from './components/agenda-slot/AgendaSlotNew';
import { WeekDaysHeader } from './components/week-days/WeekDaysHeader';
import {
	filteredAvailabilityBasedOnRange,
	getAvailableSlotsForDay,
} from './helpers/agendaHelpers';
import { HourSlotWrapper } from './AgendaNew.styles';
import type {
	IAgendaPropsNew,
	IAgendaViewMode,
	ISelectedSlot,
} from './AgendaNew.types';

export const AgendaNew = ({
	availability,
	daySelectedFromCalendar,
	mode,
}: IAgendaPropsNew) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [selectedSlotDetails, setSelectedSlotDetails] =
		useState<ISelectedSlot | null>(null);

	// HILIGHTED DAY SELECTED FROM CALENDAR
	const [dayFromCalendar, setDayFromCalendar] = useState<Date>(
		daySelectedFromCalendar
	);
	// READING DETAILS STATE
	const [openReadDetailsModal, setOpenReadDetailsModal] =
		useState<boolean>(false);

	// HOVER HOUR SLOT 1st COLUMN ITEM
	const isHoveringTable = useRef(false);
	const [hoveredRowHour, setHoveredRowHour] = useState<string | null>(null);
	const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(
		null
	);

	if (!availability || !availability.latestAvailability) {
		return <Loader />;
	}

	const {
		latestAvailability: { consultationDuration, availabilityDates },
	} = availability;

	const dayHoursGeneratedByApptDuration =
		generateTimeSlots(consultationDuration);

	const { filteredHoursRange, filteredAvailabilityItem } =
		filteredAvailabilityBasedOnRange(
			dayHoursGeneratedByApptDuration,
			availabilityDates
		);

	const filteredAvailabilityPerWeek = filteredAvailabilityItem
		.filter((dateObj) => {
			const date = new Date(dateObj.date);
			return date >= dayFromCalendar && date < addDays(dayFromCalendar, 7);
		})
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

	const visibleAvailabilityPerWeek = filteredAvailabilityPerWeek.map(
		(dateObj) => ({
			date: dateObj.date,
			_id: dateObj._id,
			slots: getAvailableSlotsForDay(dateObj),
		})
	);

	const allWeekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];

	// Criamos um mapa com os dias disponíveis
	const availableDaysMap = new Map(
		visibleAvailabilityPerWeek.map((day) => [
			new Date(day.date).toDateString(),
			day,
		])
	);

	// Garantimos que todos os dias da semana aparecem
	const fullWeekAvailability = allWeekDays.map((weekDay, index) => {
		const weekDate = addDays(dayFromCalendar, index);
		const dayKey = weekDate.toDateString();
		const existingDay = availableDaysMap.get(dayKey);

		return {
			weekDay,
			date: weekDate,
			_id: existingDay?._id ?? `empty-${weekDate.getTime()}`,
			slots: existingDay?.slots ?? [],
		};
	});

	// HANDLE PAGINATION ACTIONS
	const goToNextWeek = () => {
		const nextWeekStart = addDays(dayFromCalendar, 7);
		setDayFromCalendar(nextWeekStart);
	};
	const goToPreviousWeek = () => {
		const previousWeekStart = daySelectedFromCalendar
			? subDays(dayFromCalendar, 7)
			: undefined;

		if (daySelectedFromCalendar) setDayFromCalendar(previousWeekStart);
	};
	const hasPreviousDates = () => {
		return availabilityDates.some(
			(date) => new Date(date.date) < dayFromCalendar
		);
	};
	const hasNextDates = () => {
		return availabilityDates.some(
			(date) => new Date(date.date) >= addDays(dayFromCalendar, 7)
		);
	};

	// HANDLE HOVER HOUR
	const handleHourHoverClick = (hour: string) => {
		if (hoveredRowHour !== hour) {
			setHoveredRowHour(hour);
		}
		isHoveringTable.current = true;
	};
	const handleColumnHoverClick = (columnIndex: number) => {
		if (hoveredColumnIndex !== columnIndex) {
			setHoveredColumnIndex(columnIndex);
		}
		isHoveringTable.current = true;
	};

	const handleSlotMouseEnterLeave = (hour: string, columnIndex: number) => {
		if (hoveredRowHour !== hour) {
			setHoveredRowHour(null);
		}
		if (hoveredColumnIndex !== columnIndex) {
			setHoveredColumnIndex(null);
		}
		isHoveringTable.current = true;
	};

	const handleMouseLeaveTable = () => {
		isHoveringTable.current = false;
		setHoveredRowHour(null);
		setHoveredColumnIndex(null);
	};

	const isHighlightedRow = (hour: string) => hoveredRowHour === hour;
	const isHighlightedColumn = (columnIndex: number) =>
		hoveredColumnIndex === columnIndex;

	const isLastInColumn = (rowIndex: number, totalRows: number) => {
		return rowIndex === totalRows - 1;
	};

	// GENERAL CLICK SLOT
	const handleGeneralClickSlot = (
		selectedSlotDetails: ISelectedSlot,
		mode: IAgendaViewMode
	) => {
		console.log('00:', selectedSlotDetails.availabilityDayId);
		console.log('01:', selectedSlotDetails.slot);

		if (!selectedSlotDetails.availabilityDayId) return;

		const { availabilityDayId, slot } = selectedSlotDetails;

		setSelectedSlotDetails({
			availabilityDayId,
			slot,
		});

		switch (mode) {
			case 'view':
				setOpenReadDetailsModal(true);
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
				console.error('Ação desconhecida:', mode);
		}
	};

	// HANDLE EDIT APPOINTMENT
	const handleEditAppointment = (availabilityDayId: string, slotId: string) => {
		if (!availabilityDayId || !slotId || !availability) return;

		const foundDate = availability.latestAvailability.availabilityDates.find(
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
			<Grid
				container
				width='100%'
				overflow={'auto'}
				height={'100%'}
				onMouseLeave={handleMouseLeaveTable}
			>
				<WeekDaysHeader
					selectedDay={dayFromCalendar}
					hoveredColumnIndex={hoveredColumnIndex}
					onColumnHover={handleColumnHoverClick}
					onColumnClick={handleColumnHoverClick}
				/>
				<Grid container columns={8} mt={5}>
					{/* HOURS COLUMN STARTS*/}
					<Grid item xs={1}>
						{filteredHoursRange.map((hour, index) => (
							<HourSlotWrapper
								key={index}
								onClick={() => handleHourHoverClick(hour)}
								onMouseEnter={() => handleHourHoverClick(hour)}
								isHighlighted={hoveredRowHour === hour}
							>
								<Text variant='caption'>{hour}</Text>
							</HourSlotWrapper>
						))}
					</Grid>
					{/* HOURS COLUMN ENDS*/}

					{/* SLOTS COLUMNS STARTS */}
					{fullWeekAvailability.map(
						({ _id: availabilityDayId, slots }, columnIndex, array) => (
							<Grid item xs={1} key={availabilityDayId}>
								{filteredHoursRange.map((hour, hourIndex) => {
									const slot = slots.find((slot) => slot.startTime === hour);
									const isLastInRow = columnIndex === array.length - 1;

									const dummySlot: ISlot = {
										startTime: hour,
										status: 'EMPTY',
										endTime: slot?.endTime,
										_id: slot?._id,
									};

									const totalRows = filteredHoursRange.length;

									return (
										<AgendaSlotNew
											key={hourIndex}
											isSlotDetailsOpen={false}
											isTherapistView={true}
											slot={slot ?? dummySlot}
											isLastInRow={isLastInRow}
											isLastInColumn={isLastInColumn(hourIndex, totalRows)}
											isHighlightedRow={isHighlightedRow(hour)}
											isHighlightedColumn={isHighlightedColumn(columnIndex)}
											onMouseEnter={() =>
												handleSlotMouseEnterLeave(hour, columnIndex)
											}
											onMouseLeave={() =>
												handleSlotMouseEnterLeave(hour, columnIndex)
											}
											onClick={() =>
												handleGeneralClickSlot(
													{ slot, availabilityDayId },
													mode
												)
											}
										/>
									);
								})}
							</Grid>
						)
					)}
					{/* SLOTS COLUMNS ENDS */}
				</Grid>
				{/* PAGINATION STARTS */}
				<AgendaPagination
					onGoToNextWeek={goToNextWeek}
					onGoToPreviousWeek={goToPreviousWeek}
					onGoToToday={() => setDayFromCalendar(daySelectedFromCalendar)}
					onGoToMonthView={() => console.log('Open month view')}
					disablePrevious={!hasPreviousDates()}
					disableNext={!hasNextDates()}
					isTherapist={true}
				/>
				{/* PAGINATION ENDS */}
			</Grid>
			{/* READING DETAILS MODAL STARTS */}
			<Modal
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
			</Modal>
			{/* READING DETAILS MODAL ENDS */}
		</>
	);
};
