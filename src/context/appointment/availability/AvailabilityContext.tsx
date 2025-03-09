import { createContext, useContext } from 'react';
import {
	getAvailabilityByDay,
	getTherapistLatestAvailability,
} from '@psycron/api/user';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type {
	AvailabilityContextType,
	AvailabilityProviderProps,
} from './AvailabilityContext.types';
import { mergeAvailabilityData } from './helpers';

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(
	undefined
);

export const AvailabilityProvider = ({
	children,
}: AvailabilityProviderProps) => {
	const { userDetails } = useUserDetails();
	const therapistId = userDetails?._id;

	const { data, isLoading } = useQuery({
		queryKey: ['therapistAvailability', therapistId],
		queryFn: async ({ pageParam = 1 }) =>
			getTherapistLatestAvailability(therapistId, Number(pageParam)),
		enabled: !!therapistId,
		staleTime: 1000 * 60 * 5,
	});

	const isAvailabilityDatesEmpty =
		!data?.latestAvailability?.dates?.length || data?.totalPages === 0;

	return (
		<AvailabilityContext.Provider
			value={{
				availabilityData: data,
				availabilityDataIsLoading: isLoading,
				isAvailabilityDatesEmpty,
			}}
		>
			{children}
		</AvailabilityContext.Provider>
	);
};

export const useAvailability = (
	therapistId?: string,
	daySelectedFromCalendar?: IDateInfo
) => {
	const context = useContext(AvailabilityContext);
	if (!context) {
		throw new Error(
			'useAvailability must be used within an AvailabilityProvider'
		);
	}

	const {
		data: dataFromSelectedDay,
		isLoading: isDataFromSelectedDayLoading,
		fetchNextPage,
		fetchPreviousPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: [
			'availabilityByDay',
			therapistId,
			daySelectedFromCalendar?.date,
			daySelectedFromCalendar?.dateId,
		],
		queryFn: async () =>
			getAvailabilityByDay(therapistId, {
				date: daySelectedFromCalendar?.date,
				dateId: daySelectedFromCalendar?.dateId,
			}),
		enabled: !!therapistId && !!daySelectedFromCalendar?.dateId,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const nextPage = allPages.length + 1;
			return nextPage <= lastPage.totalPages ? nextPage : undefined;
		},
		select: (data) => {
			return {
				pages: data.pages.map((page) => ({
					latestAvailability: {
						...page.latestAvailability,
						availabilityDates: page.latestAvailability?.availabilityDates ?? [],
						dates: page.latestAvailability?.dates ?? [],
					},
					totalPages: page.totalPages,
				})),
			};
		},

		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
	});

	const latestPage =
		dataFromSelectedDay?.pages?.[dataFromSelectedDay.pages.length - 1];

	const lastAvailableDate =
		latestPage?.latestAvailability?.availabilityDates?.slice(-1)[0]?.date ?? '';

	const goToPreviousWeek = async () => {
		await fetchPreviousPage();
	};

	const goToNextWeek = async () => {
		await fetchNextPage();
	};

	return {
		...context,
		dataFromSelectedDay: mergeAvailabilityData(dataFromSelectedDay),
		isDataFromSelectedDayLoading,
		hasNextPage: !!hasNextPage,
		hasPreviousPage: dataFromSelectedDay?.pages?.length > 1,
		goToPreviousWeek,
		goToNextWeek,
		lastAvailableDate,
	};
};
