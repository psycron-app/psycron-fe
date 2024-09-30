import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { startOfToday } from 'date-fns';
import { enGB, ptBR } from 'date-fns/locale';

export const useDashboardLogic = () => {
	const { locale } = useParams<{ locale: string }>();
	const {
		isUserDetailsLoading,
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
	} = useUserDetails();

	const [isDateClicked, setIsDateClicked] = useState<boolean>(false);
	const [selectedDay, setSelectedDay] = useState<Date | null>(null);

	const dateLocale = locale.includes('en') ? enGB : ptBR;
	const today = startOfToday();

	const handleDayClick = useCallback((day: Date) => {
		setIsDateClicked(true);
		setSelectedDay(day);
	}, []);

	return {
		isUserDetailsLoading,
		therapistLatestAvailability,
		therapistLatestAvailabilityLoading,
		userDetails,
		dateLocale,
		today,
		isDateClicked,
		selectedDay,
		setIsDateClicked,
		handleDayClick,
	};
};
