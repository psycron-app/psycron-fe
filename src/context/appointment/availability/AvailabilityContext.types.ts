import type { ReactNode } from 'react';
import type { IAvailabilityResponse } from '@psycron/api/user/index.types';

export interface AvailabilityContextType {
	availabilityData?: IAvailabilityResponse;
	availabilityDataIsLoading: boolean;
	goToNextWeek: () => void;
	goToPreviousWeek: () => void;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	isAvailabilityEmpty: boolean;
	lastAvailableDate: string;
}

export interface AvailabilityProviderProps {
	children: ReactNode;
}
