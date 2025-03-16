import { createContext, useMemo } from 'react';
import { useContext } from 'react';
import { getTherapistLatestAvailability } from '@psycron/api/user';
import { getAvailabilityByDayId } from '@psycron/api/user';
import { getAppointmentDetailsBySlotId } from '@psycron/api/user/availability';
import type { IDateInfo } from '@psycron/api/user/index.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import type {
	AvailabilityContextType,
	AvailabilityProviderProps,
} from './AvailabilityContext.types';

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(
	undefined
);

export const AvailabilityProvider = ({
	children,
}: AvailabilityProviderProps) => {
	const { therapistId } = useUserDetails();

	const { data, isLoading } = useQuery({
		queryKey: ['therapistAvailability', therapistId],
		queryFn: async () => getTherapistLatestAvailability(therapistId),
		enabled: !!therapistId,
		staleTime: 1000 * 60 * 5,
	});

	const pageStatus = useMemo(() => {
		if (!data?.dates.length) return null;

		return {
			firstDate: data?.dates.at(0),
			latestDate: data?.dates.at(-1),
		};
	}, [data?.dates]);

	return (
		<AvailabilityContext.Provider
			value={{
				availabilityData: data,
				availabilityDataIsLoading: isLoading,
				isAvailabilityDatesEmpty: data?.isEmpty,
				firstDate: pageStatus?.firstDate,
				lastDate: pageStatus?.latestDate,
				totalPages: data?.totalPages,
			}}
		>
			{children}
		</AvailabilityContext.Provider>
	);
};

export const useAvailability = (
	initialDaySelected?: IDateInfo,
	slotId?: string
) => {
	const context = useContext(AvailabilityContext);
	if (!context) {
		throw new Error(
			'useAvailability must be used within an AvailabilityProvider'
		);
	}

	const { therapistId } = useUserDetails();

	const {
		data: dataFromSelectedDayRes,
		isLoading: isDataFromSelectedDayLoading,
		fetchNextPage,
		fetchPreviousPage,
		isFetchingNextPage,
		isFetchingPreviousPage,
		hasNextPage,
		hasPreviousPage,
	} = useInfiniteQuery({
		queryKey: ['availabilityByDay', initialDaySelected?.dateId],
		queryFn: async ({ pageParam }) => {
			return getAvailabilityByDayId(therapistId, {
				dateId: initialDaySelected?.dateId,
				cursor: pageParam,
			});
		},
		enabled: !!therapistId && !!initialDaySelected?.dateId,
		initialPageParam: null,
		getPreviousPageParam: (firstPage) => {
			return firstPage.pagination?.previousCursor;
		},
		getNextPageParam: (lastPage) => lastPage.pagination?.nextCursor,
		placeholderData: (prev) => prev,
		staleTime: 1000 * 60 * 5,
	});

	const firstPage = dataFromSelectedDayRes?.pages?.[0];
	const latestPage = dataFromSelectedDayRes?.pages?.at(-1);

	const lastAvailableItem = latestPage?.availabilityDates?.at(-1);
	const lastAvailableDate = lastAvailableItem?.date ?? null;
	const lastAvailableDateIdFromPagination =
		lastAvailableItem?._id?.toString() ?? null;

	const consultationDuration = firstPage?.consultationDuration;

	const availabilityDayId = initialDaySelected?.dateId ?? null;

	const {
		data: appointmentDetailsBySlotId,
		isLoading: isAppointmentDetailsBySlotIdLoading,
	} = useQuery({
		queryKey: ['getAppointmentDetailsBySlotId', availabilityDayId],
		queryFn: () =>
			getAppointmentDetailsBySlotId(therapistId, availabilityDayId, slotId),
		enabled: !!therapistId && !!slotId,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	return {
		...context,
		dataFromSelectedDayRes,
		consultationDuration,
		isDataFromSelectedDayLoading,
		hasNextPage,
		hasPreviousPage,
		fetchNextPage,
		fetchPreviousPage,
		lastAvailableDate,
		lastAvailableDateIdFromPagination,
		appointmentDetailsBySlotId,
		isAppointmentDetailsBySlotIdLoading,
		isFetchingNextPage,
		isFetchingPreviousPage,
	};
};
