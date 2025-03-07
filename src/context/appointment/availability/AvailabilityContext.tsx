import { createContext, useContext } from 'react';
import { getTherapistLatestAvailability } from '@psycron/api/user';
import type { IAvailabilityResponse } from '@psycron/api/user/index.types';
import { useUserDetails } from '@psycron/context/user/details/UserDetailsContext';
import { useInfiniteQuery } from '@tanstack/react-query';

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
	const { userDetails } = useUserDetails();
	const therapistId = userDetails?._id;

	const { data, isLoading, fetchNextPage, fetchPreviousPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: ['therapistAvailability', therapistId],
			queryFn: async ({ pageParam = 1 }) =>
				getTherapistLatestAvailability(therapistId, pageParam),
			enabled: !!therapistId,
			initialPageParam: 1,
			getNextPageParam: (lastPage, allPages) => {
				const nextPage = allPages.length + 1;
				return nextPage <= lastPage.totalPages ? nextPage : undefined;
			},
			getPreviousPageParam: (_firstPage, allPages) => {
				return allPages.length > 1 ? allPages.length - 1 : undefined;
			},
			select: (data) => {
				// 🔹 Mantemos todas as páginas carregadas corretamente
				return {
					pages: data.pages.map((page) => ({
						...page,
						latestAvailability: {
							...page.latestAvailability,
							availabilityDates:
								page.latestAvailability?.availabilityDates ?? [],
						},
					})),
				};
			},
			placeholderData: (prev) => prev,
			staleTime: 1000 * 60 * 5,
		});

	// 🔹 Agora `availabilityData` mantém todas as semanas carregadas sem sobrescrever as anteriores
	const availabilityData: IAvailabilityResponse | undefined =
		data?.pages?.reduce<IAvailabilityResponse | undefined>((acc, page) => {
			if (!acc) return page;
			return {
				...acc,
				latestAvailability: {
					...acc.latestAvailability,
					availabilityDates: [
						...(acc.latestAvailability?.availabilityDates ?? []),
						...page.latestAvailability.availabilityDates,
					],
				},
			};
		}, undefined);

	// 🔹 `latestPage` continua sendo a última página carregada corretamente
	const latestPage = data?.pages?.[data.pages.length - 1];

	// 🔹 Verificamos se os dados estão vazios corretamente
	const isAvailabilityEmpty =
		!latestPage?.latestAvailability?.availabilityDates?.length ||
		latestPage?.totalPages === 0;

	// 🔹 Corrigimos `lastAvailableDate` garantindo que sempre tenha um valor válido
	const lastAvailableDate =
		latestPage?.latestAvailability?.availabilityDates?.slice(-1)[0]?.date ?? '';

	// 🔹 Corrigimos a navegação entre semanas
	const goToPreviousWeek = async () => {
		console.log('⬅️ Fetching previous page...');
		await fetchPreviousPage();
		console.log('✅ Previous page loaded');
	};

	const goToNextWeek = async () => {
		console.log('➡️ Fetching next page...');
		await fetchNextPage();
		console.log('✅ Next page loaded');
	};

	return (
		<AvailabilityContext.Provider
			value={{
				availabilityData, // ✅ Mantemos a estrutura `IAvailabilityResponse`
				availabilityDataIsLoading: isLoading,
				hasNextPage: !!hasNextPage,
				hasPreviousPage: data?.pages?.length > 1,
				isAvailabilityEmpty,
				goToPreviousWeek,
				goToNextWeek,
				lastAvailableDate,
			}}
		>
			{children}
		</AvailabilityContext.Provider>
	);
};

export const useAvailability = () => {
	const context = useContext(AvailabilityContext);
	if (!context) {
		throw new Error(
			'useAvailability must be used within an AvailabilityProvider'
		);
	}
	return context;
};
