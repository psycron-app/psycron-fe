import { useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { FloatingButton } from '@psycron/components/button/Floating/FloatingButton';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { Calendar as CalendarIcon } from '@psycron/components/icons';
import { Modal } from '@psycron/components/modal/Modal';
import { Text } from '@psycron/components/text/Text';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import {
	eachDayOfInterval,
	endOfWeek,
	startOfToday,
	startOfWeek,
} from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { AVAILABILITYPATH } from '../urls';

export const AgendaPage = () => {
	// const { t } = useTranslation();
	const { locale } = useParams<{ locale: string }>();
	const navigate = useNavigate();

	const { userDetails } = useUserDetails();

	const [isCalendarVisible, setIsCalendarVisible] = useState<boolean>(false);

	const today = startOfToday();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const generateWeek = (choosenDay: Date) => {
		return {
			start: startOfWeek(choosenDay, { locale: dateLocale }),
			end: endOfWeek(choosenDay, { locale: dateLocale }),
		};
	};

	const currentWeek = eachDayOfInterval(generateWeek(today));

	const [selectedWeek, setSelectedWeek] = useState<Date[]>(currentWeek);

	const handleDayClick = (day: Date) => {
		const daysOfSelectedWeek = eachDayOfInterval(generateWeek(day));

		setSelectedWeek(daysOfSelectedWeek);
	};

	const handleFloatingButtonClick = () => {
		setIsCalendarVisible((prev) => !prev);
	};

	const handleOutsideClick = () => {
		setIsCalendarVisible(false);
	};

	const shouldOpenModal = !userDetails?.availability?.length;

	const handleClickEdit = () => {
		navigate(`/${locale}/${AVAILABILITYPATH}/${userDetails?._id}`);
	};

	return (
		<>
			<FloatingButton
				isVisible={isCalendarVisible}
				handleClick={handleFloatingButtonClick}
				handleOutsideClick={handleOutsideClick}
				content={
					isCalendarVisible && (
						<Calendar
							handleDayClick={handleDayClick}
							dateLocale={dateLocale}
							today={today}
						/>
					)
				}
			>
				<CalendarIcon />
			</FloatingButton>

			<Agenda selectedWeek={selectedWeek} />

			<Modal
				openModal={shouldOpenModal}
				title='Oops something went wrong'
				cardActionsProps={{
					actionName: 'Set Availability',
					hasSecondAction: true,
					secondActionName: 'Later',
					secondAction: () => navigate(-1),
					onClick: handleClickEdit,
				}}
			>
				<Box>
					<Text>
						It seems you didnt set you availability yet. Please provide us more
						information related to your appointments, so your patients can
						schedule it accordingly.
					</Text>
				</Box>
			</Modal>
		</>
	);
};
