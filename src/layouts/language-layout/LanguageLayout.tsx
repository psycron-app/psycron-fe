import type { FC } from 'react';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { AlertProvider } from '@psycron/context/alert/AlertContext';
import { AppointmentActionsProvider } from '@psycron/context/appointment/appointment-actions/AppointmentActionsContext';
import { AvailabilityProvider } from '@psycron/context/appointment/availability/AvailabilityContext';
import { UserGeoLocationProvider } from '@psycron/context/geolocation/CountryContext';
import { PatientProvider } from '@psycron/context/patient/PatientContext';
import { RuntimeEnvProvider } from '@psycron/context/runtime/RuntimeEnvContext';
import { AuthProvider } from '@psycron/context/user/auth/UserAuthenticationContext';
import { UserDetailsProvider } from '@psycron/context/user/details/UserDetailsContext';
import i18n from '@psycron/i18n';
import { AnalyticsTracker } from '@psycron/routes/AnalyticsTracker';

export const LanguageLayout: FC = () => {
	const { locale } = useParams<{ locale: string }>();

	useEffect(() => {
		if (locale && i18n.language !== locale) {
			i18n.changeLanguage(locale);
		}
	}, [locale]);

	return (
		<RuntimeEnvProvider>
			<AlertProvider>
				<AuthProvider>
					<UserDetailsProvider>
						<AvailabilityProvider>
							<PatientProvider>
								<UserGeoLocationProvider>
									<AppointmentActionsProvider>
										<AnalyticsTracker />
										<Outlet />
									</AppointmentActionsProvider>
								</UserGeoLocationProvider>
							</PatientProvider>
						</AvailabilityProvider>
					</UserDetailsProvider>
				</AuthProvider>
			</AlertProvider>
		</RuntimeEnvProvider>
	);
};
