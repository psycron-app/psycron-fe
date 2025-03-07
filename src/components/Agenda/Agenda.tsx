import { useEffect, useMemo, useRef, useState } from 'react';
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

import { AgendaAppointmentDetails } from './components/agenda-appointment-details/AgendaAppointmentDetails';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaTableBody } from './components/agenda-table-body/AgendaTableBody';
import { AgendaTableHead } from './components/agenda-table-head/AgendaTableHead';
import { filteredAvailabilityBasedOnRange } from './helpers/agendaHelpers';
import type { IAgendaProps, ISelectedSlot } from './Agenda.types';

export const Agenda = ({
	availabilityData,
	daySelectedFromCalendar,
	mode,
}: IAgendaProps) => {
	const {
		availabilityDataIsLoading,
		goToNextWeek,
		goToPreviousWeek,
		lastAvailableDate,
	} = useAvailability();

	const { t } = useTranslation();
	const navigate = useNavigate();

	const selectedDayOrToday = daySelectedFromCalendar || new Date();

	const [selectedSlotDetails, setSelectedSlotDetails] =
		useState<ISelectedSlot | null>(null);

	const [weekDays, setWeekDays] = useState<string[]>(
		generateWeekDays(selectedDayOrToday)
	);

	// HILIGHTED DAY SELECTED FROM CALENDAR
	const [dayFromCalendar, setDayFromCalendar] =
		useState<Date>(selectedDayOrToday);

	useEffect(() => {
		setWeekDays(generateWeekDays(dayFromCalendar));
	}, [dayFromCalendar]);

	// READING DETAILS STATE
	const [openReadDetailsModal, setOpenReadDetailsModal] =
		useState<boolean>(false);

	// HOVER HOUR SLOT 1st COLUMN ITEM
	const isHoveringTable = useRef(false);
	const [hoveredRowHour, setHoveredRowHour] = useState<string | null>(null);
	const [hoveredColumnIndex, setHoveredColumnIndex] = useState<number | null>(
		null
	);

	const dayHoursGeneratedByApptDuration = generateTimeSlots(
		availabilityData?.latestAvailability?.consultationDuration
	);

	const { filteredHoursRange } = filteredAvailabilityBasedOnRange(
		dayHoursGeneratedByApptDuration,
		availabilityData?.latestAvailability?.availabilityDates
	);

	const weekStart = useMemo(
		() => startOfWeek(dayFromCalendar, { weekStartsOn: 0 }),
		[dayFromCalendar]
	);

	const hasPreviousDates = useMemo(() => {
		return availabilityData?.latestAvailability?.availabilityDates?.some(
			({ date }) => new Date(date) < weekStart
		);
	}, [weekStart, availabilityData]);

	const hasNextDates = useMemo(() => {
		return availabilityData?.latestAvailability?.availabilityDates?.some(
			({ date }) => new Date(date) >= addDays(weekStart, 7)
		);
	}, [weekStart, availabilityData]);

	const filteredAvailabilityPerWeek = useMemo(() => {
		return availabilityData?.latestAvailability?.availabilityDates?.filter(
			({ date }) => {
				const formattedDate = new Date(date);
				return (
					formattedDate >= weekStart && formattedDate < addDays(weekStart, 7)
				);
			}
		);
	}, [weekStart, availabilityData]);

	const fullWeekAvailability = useMemo(() => {
		return weekDays.map((weekDay, index) => {
			const weekDate = addDays(weekStart, index);
			const formattedWeekDate = format(weekDate, 'yyyy-MM-dd');

			const existingDay = filteredAvailabilityPerWeek?.find(({ date }) => {
				const formattedAvailableDate = date.split('T')[0];
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
		if (!availabilityDataIsLoading && fullWeekAvailability.length > 0) {
			setTimeout(() => {
				setIsTableLoading(false);
			}, 500);
		} else {
			setIsTableLoading(true);
		}
	}, [availabilityDataIsLoading, fullWeekAvailability]);

	useEffect(() => {
		const lastLoadedDate = fullWeekAvailability.slice(-1)[0]?.date;

		const isLastLoadedWeek =
			isAfter(new Date(lastLoadedDate), new Date(lastAvailableDate)) ||
			(isEqual(new Date(lastLoadedDate), new Date(lastAvailableDate)) &&
				hasNextDates);

		if (isLastLoadedWeek && !availabilityDataIsLoading) {
			goToNextWeek();
		}
	}, [
		fullWeekAvailability,
		hasNextDates,
		availabilityDataIsLoading,
		goToNextWeek,
		lastAvailableDate,
	]);

	useEffect(() => {
		const isFirstLoadedWeek =
			fullWeekAvailability.every((day) => day.slots.length === 0) &&
			hasPreviousDates;

		if (isFirstLoadedWeek && !availabilityDataIsLoading) {
			goToPreviousWeek();
		}
	}, [
		fullWeekAvailability,
		availabilityDataIsLoading,
		hasPreviousDates,
		goToPreviousWeek,
	]);

	const handleNextWeek = () => {
		setDayFromCalendar((prev) => addDays(prev, 7));
	};
	const handlePreviousWeek = () => {
		setDayFromCalendar((prev) => subDays(prev, 7));
	};

	// HANDLE HOVER HOUR
	// const handleHourHoverClick = (hour: string) => {
	// 	if (hoveredRowHour !== hour) {
	// 		setHoveredRowHour(hour);
	// 	}
	// 	isHoveringTable.current = true;
	// };
	// const handleColumnHoverClick = (columnIndex: number) => {
	// 	if (hoveredColumnIndex !== columnIndex) {
	// 		setHoveredColumnIndex(columnIndex);
	// 	}
	// 	isHoveringTable.current = true;
	// };

	// const handleSlotMouseEnterLeave = (hour: string, columnIndex: number) => {
	// 	if (hoveredRowHour !== hour) {
	// 		setHoveredRowHour(null);
	// 	}
	// 	if (hoveredColumnIndex !== columnIndex) {
	// 		setHoveredColumnIndex(null);
	// 	}
	// 	isHoveringTable.current = true;
	// };

	// const handleMouseLeaveTable = () => {
	// 	isHoveringTable.current = false;
	// 	setHoveredRowHour(null);
	// 	setHoveredColumnIndex(null);
	// };

	// const isHighlightedRow = (hour: string) => hoveredRowHour === hour;
	// const isHighlightedColumn = (columnIndex: number) =>
	// 	hoveredColumnIndex === columnIndex;

	// const isLastInColumn = (rowIndex: number, totalRows: number) => {
	// 	return rowIndex === totalRows - 1;
	// };

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
		if (!availabilityDayId || !slotId || !availabilityData) return;

		const foundDate =
			availabilityData?.latestAvailability?.availabilityDates?.find(
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
				onGoToNextWeek={handleNextWeek}
				onGoToPreviousWeek={handlePreviousWeek}
				onGoToToday={() => setDayFromCalendar(selectedDayOrToday)}
				onGoToMonthView={() => console.log('Open month view')}
				disablePrevious={!hasPreviousDates}
				disableNext={!hasNextDates}
				mode={mode}
			/>
			{/* PAGINATION ENDS */}
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
