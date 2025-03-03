import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Loader } from '@psycron/components/loader/Loader';
import i18n from '@psycron/i18n';
import { AppLayout } from '@psycron/layouts/app/app-layout/AppLayout';
import { LanguageLayout } from '@psycron/layouts/language-layout/LanguageLayout';
import { PublicLayout } from '@psycron/layouts/public-layout/PublicLayout';

import privateRoutes from './PrivateRoutes';
import publicRoutes from './PublicRoutes';

const Router = () => {
	return (
		<HelmetProvider>
			<Suspense fallback={<Loader />}>
				<Routes>
					<Route
						path='/'
						element={<Navigate to={`/${i18n.resolvedLanguage}`} replace />}
					/>
					<Route path='/:locale' element={<LanguageLayout />}>
						<Route element={<PublicLayout />}>
							{publicRoutes.map(({ path, element }, index) => (
								<Route key={index} path={path} element={element} />
							))}
						</Route>

						<Route element={<AppLayout />}>
							{privateRoutes.map(({ path, element }, index) => (
								<Route key={index} path={path} element={element} />
							))}
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</HelmetProvider>
	);
};

export default Router;
