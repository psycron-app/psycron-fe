import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { capture } from '@psycron/analytics/posthog/AppAnalytics';
import { Button } from '@psycron/components/button/Button';
import { Alert, Patients } from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import { useRuntimeEnv } from '@psycron/context/runtime/RuntimeEnvContext';

import {
	PatientsCard,
	PatientsCardIcon,
	PatientsCardMeta,
	PatientsCardRow,
	PatientsCardValue,
	PatientsCardWrapper,
	PatientsEmptyState,
	PatientsEmptyTitle,
} from './PatientsSectionContent.styles';
import type { PatientsSectionContentProps } from './PatientsSectionContent.types';

export const PatientsSectionContent = ({
	patients,
	onGoToPatients,
}: PatientsSectionContentProps) => {
	const { t } = useTranslation();

	const { isTestingEnv } = useRuntimeEnv();

	const total = useMemo(() => patients?.length ?? 0, [patients]);
	const hasPatients = total > 0;

	const handleGoToPatients = (): void => {
		capture('user details patients cta clicked', {
			state: hasPatients ? 'has_patients' : 'empty',
			total,
			disabled: isTestingEnv,
		});
		onGoToPatients();
	};

	if (!hasPatients) {
		return (
			<>
				<PatientsEmptyState>
					<PatientsCardWrapper>
						<PatientsEmptyTitle>
							{t(
								'components.user-details.patients.empty.title',
								'No patients yet'
							)}
						</PatientsEmptyTitle>
						<PatientsCardIcon alert>
							<Alert />
						</PatientsCardIcon>
					</PatientsCardWrapper>

					<Text variant='body2'>
						{t(
							'components.user-details.patients.empty.body',
							'When you add or book your first patient, the total will show up here.'
						)}
					</Text>
				</PatientsEmptyState>

				<Button
					type='button'
					tertiary
					variant='outlined'
					onClick={handleGoToPatients}
					fullWidth
					disabled={isTestingEnv}
				>
					{t('components.user-details.patients.cta', 'Go to patients')}
				</Button>
			</>
		);
	}

	return (
		<PatientsCard>
			<PatientsCardRow>
				<PatientsCardMeta>
					<Text variant='body2'>
						{t('components.user-details.patients.total', 'Active patients')}
					</Text>
					<PatientsCardValue>{total}</PatientsCardValue>
				</PatientsCardMeta>

				<PatientsCardIcon>
					<Patients />
				</PatientsCardIcon>
			</PatientsCardRow>

			<Button
				type='button'
				tertiary
				variant='outlined'
				onClick={handleGoToPatients}
				fullWidth
				disabled={isTestingEnv}
			>
				{t('components.user-details.patients.cta', 'Go to patients')}
			</Button>
		</PatientsCard>
	);
};
