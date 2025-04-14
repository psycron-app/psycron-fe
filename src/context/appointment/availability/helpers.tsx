import type { IAvailabilityResponse } from '@psycron/api/user/index.types';

export const mergeAvailabilityData = (data?: {
	pages: IAvailabilityResponse[];
}): IAvailabilityResponse | undefined => {
	if (!data?.pages?.length) return undefined;

	return data.pages.reduce<IAvailabilityResponse | undefined>((acc, page) => {
		if (!acc) return page;
		return {
			latestAvailability: {
				...acc.latestAvailability,
				availabilityDates: [
					...(acc.latestAvailability?.availabilityDates ?? []),
					...(page.latestAvailability?.availabilityDates ?? []),
				],
				dates: [
					...(acc.latestAvailability?.dates ?? []),
					...(page.latestAvailability?.dates ?? []),
				],
			},
			totalPages: page.totalPages,
		};
	}, undefined);
};
