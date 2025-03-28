import type { Country } from 'react-phone-number-input';

export type CountryDataFull = {
	countryCode2?: Country;
	countryCode3?: string;
	countryEmoji?: string;
	countryFlag?: string;
	countryName?: string;
	currency?: {
		code: string;
		name: string;
		symbol: string;
	};
	ip: string;
	languages: string;
	timeZone: { currentTime: string; name: string };
} & CountryDataSimple;

export interface CountryDataSimple {
	callingCode: string | null;
	countryCode2?: Country;
	countryEmoji?: string;
}

export interface UserGeoLocationContextType {
	countryData: CountryDataFull | CountryDataSimple;
}
