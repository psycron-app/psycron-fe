import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Paper, Table, TableContainer } from '@mui/material';
import { Modal } from '@psycron/components/modal/Modal';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { APPOINTMENTS } from '@psycron/pages/urls';
import { generateTimeSlots, generateWeekDays } from '@psycron/utils/variables';
import { addDays, format, startOfWeek, subDays } from 'date-fns';

import { AgendaAppointmentDetails } from './components/agenda-appointment-details/AgendaAppointmentDetails';
import { AgendaPagination } from './components/agenda-pagination/AgendaPagination';
import { AgendaTableBody } from './components/agenda-table-body/AgendaTableBody';
import { AgendaTableHead } from './components/agenda-table-head/AgendaTableHead';
import { filteredAvailabilityBasedOnRange } from './helpers/agendaHelpers';
import type {
	IAgendaProps,
	IAgendaViewMode,
	ISelectedSlot,
} from './Agenda.types';

export const Agenda = ({ daySelectedFromCalendar, mode }: IAgendaProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [selectedSlot, setSelectedSlot] = useState<ISelectedSlot | null>(null);

	const { ref: loadMoreRef, inView: loadMoreInView } = useInView();

	const { ref: loadPreviousRef, inView: loadPreviousInView } = useInView();

	const {
		firstDate,
		lastDate,
		dataFromSelectedDayRes,
		isDataFromSelectedDayLoading,
		appointmentDetailsBySlotId,
		consultationDuration,
		fetchNextPage,
		fetchPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
	} = useAvailability(daySelectedFromCalendar, selectedSlot?.slot?._id);

	const { availabilityDates } = useMemo(() => {
		const pages = dataFromSelectedDayRes?.pages ?? [];

		const flatDates = pages.flatMap((page) => page.availabilityDates);

		return {
			availabilityDates: flatDates ?? [],
		};
	}, [dataFromSelectedDayRes]);

	const selectedDayOrToday = daySelectedFromCalendar;
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

	const dayHoursGeneratedByApptDuration =
		generateTimeSlots(consultationDuration);

	const { filteredHoursRange } = filteredAvailabilityBasedOnRange(
		dayHoursGeneratedByApptDuration,
		availabilityDates
	);

	const weekStart = useMemo(
		() => startOfWeek(dayFromCalendar, { weekStartsOn: 0 }),
		[dayFromCalendar]
	);

	const fullWeekAvailability = useMemo(() => {
		return weekDays.map((weekDay, index) => {
			const weekDate = addDays(weekStart, index);
			const formattedWeekDate = format(weekDate, 'yyyy-MM-dd');

			const existingDay = availabilityDates?.find(({ date }) => {
				const formattedAvailableDate = format(date, 'yyyy-MM-dd');
				return formattedAvailableDate === formattedWeekDate;
			});

			return {
				weekDay,
				date: weekDate.toISOString(),
				_id: existingDay?._id ?? null,
				slots: existingDay?.slots ?? [],
			};
		});
	}, [availabilityDates, weekDays, weekStart]);

	useEffect(() => {
		if (loadMoreInView) {
			fetchNextPage();
		}
	}, [loadMoreInView, fetchNextPage]);

	useEffect(() => {
		if (loadPreviousInView) {
			fetchPreviousPage();
		}
	}, [loadPreviousInView, fetchPreviousPage]);

	useEffect(() => {
		if (loadMoreInView) {
			fetchNextPage();
		}
	}, [loadMoreInView, fetchNextPage]);

	const [isTableLoading, setIsTableLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!isDataFromSelectedDayLoading && fullWeekAvailability.length > 0) {
			setTimeout(() => {
				setIsTableLoading(false);
			}, 500);
		} else {
			setIsTableLoading(true);
		}
	}, [isDataFromSelectedDayLoading, fullWeekAvailability]);

	// GENERAL CLICK SLOT
	const handleGeneralClickSlot = (
		selectedSlotDetails: ISelectedSlot,
		mode: IAgendaViewMode
	) => {
		if (!selectedSlotDetails.availabilityDayId) return;

		setSelectedSlot(selectedSlotDetails);

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
		}
	};

	// HANDLE EDIT APPOINTMENT
	const handleEditAppointment = (availabilityDayId: string, slotId: string) => {
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
		return fullWeekAvailability?.find((date) => date._id === dateId);
	};

	const handleNextWeek = () => {
		setDayFromCalendar((prev) => addDays(prev, 7));
	};
	const handlePreviousWeek = () => {
		setDayFromCalendar((prev) => subDays(prev, 7));
	};

	const firstItemAvailable = availabilityDates?.at(0)?._id;
	const lastItemAvailable = availabilityDates?.at(-1)?._id;

	return (
		<>
			<TableContainer component={Paper} style={{ width: '100%', height: 500 }}>
				<Table stickyHeader>
					<AgendaTableHead
						fullWeekAvailability={fullWeekAvailability}
						nextCursor={lastItemAvailable}
						previousCursor={firstItemAvailable}
						previousRef={loadPreviousRef}
						ref={loadMoreRef}
					/>
					<AgendaTableBody
						filteredHoursRange={filteredHoursRange}
						fullWeekAvailability={fullWeekAvailability}
						isLoading={
							isTableLoading || isFetchingNextPage || isFetchingPreviousPage
						}
						onClick={handleGeneralClickSlot}
						mode={'view'}
					/>
				</Table>
			</TableContainer>
			{/* SLOTS COLUMNS ENDS */}

			{/* PAGINATION STARTS */}
			<AgendaPagination
				onGoToNextWeek={() => handleNextWeek()}
				onGoToPreviousWeek={() => handlePreviousWeek()}
				onGoToToday={() => setDayFromCalendar(selectedDayOrToday.date)}
				onGoToMonthView={() => console.log('Open month view')}
				disableNext={!!foundItemFromTheWeek(lastDate?.dateId)}
				disablePrevious={!!foundItemFromTheWeek(firstDate?.dateId)}
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
						// handleEditAppointment(
						// 	selectedSlotDetails.availabilityDayId,
						// 	selectedSlotDetails.slot._id
						// );
					},
					hasSecondAction: true,
					secondActionName: t('components.agenda.cancel-appointment.title'),
					// secondAction: () => handleDeleteAppointment(latestPatientId),
				}}
			>
				<AgendaAppointmentDetails
					appointmentDetails={appointmentDetailsBySlotId}
					handleEditAppointment={handleEditAppointment}
				/>
			</Modal>
			{/* READING DETAILS MODAL ENDS */}
		</>
	);
};
