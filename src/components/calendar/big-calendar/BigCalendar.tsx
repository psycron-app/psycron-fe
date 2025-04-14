import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Modal } from '@psycron/components/modal/Modal';
import { useAvailability } from '@psycron/context/appointment/availability/AvailabilityContext';
import { usePatient } from '@psycron/context/patient/PatientContext';
import type { ISlotStatus } from '@psycron/context/user/auth/UserAuthenticationContext.types';
import { useAppointmentParams } from '@psycron/hooks/useAppointmentParams';
import { useCalendarWeekData } from '@psycron/hooks/useCalendarData';
import { useTherapistId } from '@psycron/hooks/useTherapistId';
import { useTranslatedStatus } from '@psycron/hooks/useTranslatedStatus';
import useViewport from '@psycron/hooks/useViewport';
import { ADDPATIENT, APPOINTMENTS } from '@psycron/pages/urls';
import { addDays, format, isSameDay, subDays } from 'date-fns';

import { AppointmentDetails } from './components/appointment-details/AppointmentDetails';
import { BigCalendarBody } from './components/big-calendar-body/BigCalendarBody';
import { BigCalendarHeader } from './components/big-calendar-header/BigCalendarHeader';
import { BookingAppointment } from './components/booking-appointment/BookingAppointment';
import type { IBookingAppointmentRef } from './components/booking-appointment/BookingAppointment.types';
import { BigCalendarPagination } from './components/pagination/BigCalendarPagination';
import type {
	IBigCalendarProps,
	IBigCalendarView,
	ISelectedSlot,
} from './BigCalendar.types';

export const BigCalendar = ({
	daySelectedFromCalendar,
	mode,
}: IBigCalendarProps) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { locale } = useAppointmentParams();
	const therapistId = useTherapistId();

	const bookingRef = useRef<IBookingAppointmentRef | null>(null);

	const {
		bookAppointmentFromLinkMttnIsLoading,
		patientEditAppointmentIsLoading,
	} = usePatient();

	const { isMobile } = useViewport();
	const statusOptions = useTranslatedStatus();

	const [dayFromCalendar, setDayFromCalendar] = useState<Date>(
		new Date(daySelectedFromCalendar?.date)
	);

	const [selectedSlot, setSelectedSlot] = useState<ISelectedSlot | null>(null);
	const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
	const [openReadDetailsModal, setOpenReadDetailsModal] =
		useState<boolean>(false);

	const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

	const methods = useForm({
		defaultValues: { status: selectedSlot?.slot?.status },
	});

	const { getValues, formState } = methods;
	const { isValid } = formState;

	const COLUMN_COUNT = 7;
	const includeHourColumn = !isMobile;
	const totalColumns = includeHourColumn ? COLUMN_COUNT + 1 : COLUMN_COUNT;

	const today = new Date();
	today.setHours(0, 0, 0, 0);

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
	} = useAvailability(daySelectedFromCalendar, undefined, undefined);

	const pages = dataFromSelectedDayRes?.pages ?? [];

	const flatAvailabilityDates =
		pages?.flatMap((page) => page.availabilityDates) ?? [];

	const {
		filteredHoursRange,
		daysOfWeek,
		getSlotsForDayAndHour,
		isLastItemWithinWeek,
		isFirstItemWithinWeek,
		weekDayName,
		firstItemAvailable,
		lastItemAvailable,
		isColumnFetching,
	} = useCalendarWeekData(dayFromCalendar, flatAvailabilityDates, locale);

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

	const handleNextWeek = () => {
		setDayFromCalendar((prev) => addDays(prev, 7));
	};

	const handlePreviousWeek = () => {
		setDayFromCalendar((prev) => subDays(prev, 7));
	};

	const allDaysInPast = daysOfWeek.some((day) => {
		const normalized = new Date(day);
		normalized.setHours(0, 0, 0, 0);
		return normalized.getTime() === today.getTime();
	});

	const disablePrevious =
		mode === 'book' || mode === 'edit'
			? allDaysInPast
			: daysOfWeek.some((day) => isSameDay(day, firstDate?.date));

	const disableNext = daysOfWeek.some((day) => isSameDay(day, lastDate?.date));

	const isLoadingState = useMemo(() => {
		return isDataFromSelectedDayLoading || flatAvailabilityDates?.length === 0;
	}, [isDataFromSelectedDayLoading, flatAvailabilityDates?.length]);

	const isValidStatus = (validStatuses: ISlotStatus[]) => {
		const status = selectedSlot?.slot?.status;

		return status ? validStatuses.includes(status) : false;
	};

	const validStatusEdit = isValidStatus(['AVAILABLE', 'EMPTY']);

	const isStatusAvailable = isValidStatus(['AVAILABLE']);

	const handleGeneralClickSlot = (
		selectedSlotDetails: ISelectedSlot,
		mode: IBigCalendarView
	) => {
		if (!selectedSlotDetails.availabilityDayId) return;

		const slotStatus = selectedSlotDetails.slot?.status;

		if (mode === 'book' && slotStatus !== 'AVAILABLE') {
			return;
		}
		if (mode === 'book' || mode === 'edit') {
			handlePatientBookOrEditAppointment(selectedSlotDetails);
			return;
		}
		if (mode === 'view') {
			handleViewSlotDetails(selectedSlotDetails);
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
		const {
			date,
			availabilityDayId,
			slot: { _id: slotId },
		} = selectedSlot;
		const formattedDate = format(date, 'yyyy-MM-dd');
		navigate(
			`../${APPOINTMENTS}/edit/${availabilityDayId}?slot=${slotId}&date=${formattedDate}`
		);
	};

	// HANDLE ADD PATIENT
	const handleAddPatientFromAvailability = (selectedSlot: ISelectedSlot) => {
		const {
			availabilityDayId,
			slot: { _id },
		} = selectedSlot;

		const queryParams = new URLSearchParams();

		queryParams.append('availabilityDayId', availabilityDayId);
		queryParams.append('slotId', _id);

		navigate(`../${ADDPATIENT}?${queryParams.toString()}`);
	};

	// HANDLE NAVIGATE TO DELETE APPOINTMENT
	const handleDeleteAppointment = (selectedSlot: ISelectedSlot) => {
		const { patientId } = selectedSlot;

		navigate(`../${APPOINTMENTS}/cancel/${patientId}`);
	};

	// HANDLE BOOK OR EDIT APOOINTMENT
	const handlePatientBookOrEditAppointment = (selectedSlot: ISelectedSlot) => {
		setSelectedSlot({ ...selectedSlot, therapistId });
		setOpenBookingModal(true);
	};

	return (
		<>
			<Box position='relative'>
				{/* HEADER */}
				<BigCalendarHeader
					daysOfWeek={daysOfWeek}
					includeHourColumn={includeHourColumn}
					totalColumns={totalColumns}
					weekDayName={weekDayName}
				/>
				{/* SLOTS */}
				<BigCalendarBody
					daysOfWeek={daysOfWeek}
					filteredHoursRange={filteredHoursRange}
					getSlotsForDayAndHour={getSlotsForDayAndHour}
					includeHourColumn={includeHourColumn}
					totalColumns={totalColumns}
					nextCursor={lastItemAvailable}
					previousCursor={firstItemAvailable}
					isLoading={isLoadingState}
					isColumnFetching={isColumnFetching}
					isFetchingNextPage={isFetchingNextPage}
					isFetchingPreviousPage={isFetchingPreviousPage}
					onClick={handleGeneralClickSlot}
					consultationDuration={consultationDuration}
					mode={mode}
				/>
				{/* PAGINATION */}
				<BigCalendarPagination
					onGoToNextWeek={() => handleNextWeek()}
					onGoToPreviousWeek={() => handlePreviousWeek()}
					onGoToToday={() => setDayFromCalendar(daySelectedFromCalendar.date)}
					onGoToMonthView={() => console.log('Open month view')}
					disableNext={disableNext || isFetchingNextPage}
					disablePrevious={disablePrevious || isFetchingPreviousPage}
					mode={mode}
				/>
			</Box>
			<Modal
				openModal={openReadDetailsModal}
				title={t('components.agenda.appointment-details.title')}
				onClose={handleCloseViewDetails}
				cardActionsProps={{
					actionName: validStatusEdit
						? t('components.agenda.appointment-details.edit-availability')
						: t(
								'components.agenda.appointment-details.edit-patient-appointment'
							),
					onClick: () => {
						if (validStatusEdit) {
							handleEditSlotStatus(selectedSlot, isEditStatus);
						} else {
							handleEditAppointment(selectedSlot);
						}
					},
					hasSecondAction:
						isEditStatus ||
						(!validStatusEdit && !isEditStatus) ||
						isStatusAvailable,
					secondActionName: isEditStatus
						? t('components.link.navigate.back')
						: isStatusAvailable && !isEditStatus
							? t('components.form.add-patient.name')
							: t('components.agenda.cancel-appointment.title'),
					secondAction: () => {
						if (isEditStatus) {
							setIsEditStatus(false);
						} else if (isStatusAvailable && !isEditStatus) {
							handleAddPatientFromAvailability(selectedSlot);
						} else {
							handleDeleteAppointment(selectedSlot);
						}
					},
				}}
			>
				<FormProvider {...methods}>
					<AppointmentDetails
						appointmentDetails={selectedSlot}
						handleEditAppointment={handleEditAppointment}
						isEditingStatus={isEditStatus}
					/>
				</FormProvider>
			</Modal>
			<Modal
				openModal={openBookingModal}
				title={
					mode === 'book'
						? t('components.agenda.book-appointment.title')
						: t(
								'components.agenda.appointment-details.edit-patient-appointment'
							)
				}
				onClose={() => setOpenBookingModal(false)}
				cardActionsProps={{
					actionName: t('globals.proceed'),
					onClick: () => bookingRef.current?.submitForm(),
					disabled: !isValid,
					loading:
						patientEditAppointmentIsLoading ||
						bookAppointmentFromLinkMttnIsLoading,
				}}
			>
				<BookingAppointment ref={bookingRef} selectedSlot={selectedSlot} />
			</Modal>
		</>
	);
};
