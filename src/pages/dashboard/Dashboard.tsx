import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Modal, Skeleton } from '@mui/material';
import { Agenda } from '@psycron/components/agenda/Agenda';
import { Calendar } from '@psycron/components/calendar/Calendar';
import { Loader } from '@psycron/components/loader/Loader';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { startOfToday } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

import { StyledPaperModal } from './Dashboard.styled';

export const Dashboard = () => {
	const [isDateClicked, setIsDateClicked] = useState<boolean>(false);

	const {
		isUserDetailsLoading,
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
	} = useUserDetails();

	const { locale } = useParams<{ locale: string }>();

	const dateLocale = locale.includes('en') ? enGB : ptBR;

	const today = startOfToday();

	if (isUserDetailsLoading) {
		<Loader />;
	}

	return (
		<>
			<Box>
				{userDetails?.availability?.length > 0 ? (
					<Box>
						{therapistLatestAvailabilityLoading ? (
							<Skeleton animation='wave'>
								<Calendar dateLocale={dateLocale} today={today} />
							</Skeleton>
						) : (
							<Calendar
								handleDayClick={() => setIsDateClicked(true)}
								dateLocale={dateLocale}
								today={today}
								availabilityDates={
									therapistLatestAvailability?.latestAvailability
										?.availabilityDates
								}
							/>
						)}
					</Box>
				) : null}
			</Box>
			<Modal open={true}>
				<StyledPaperModal>
					<Agenda
						selectedDay={today}
						dateLocale={dateLocale}
						availability={therapistLatestAvailability}
						isLoading={therapistLatestAvailabilityLoading}
					/>
				</StyledPaperModal>
			</Modal>
		</>
	);
};
