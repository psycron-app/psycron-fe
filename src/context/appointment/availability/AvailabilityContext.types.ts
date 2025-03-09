import type { ReactNode } from 'react';
import type { IAvailabilityResponse } from '@psycron/api/user/index.types';

export interface AvailabilityContextType {
	availabilityData?: IAvailabilityResponse;
	availabilityDataIsLoading: boolean;
	isAvailabilityDatesEmpty: boolean;
}

export interface AvailabilityProviderProps {
	children: ReactNode;
}
