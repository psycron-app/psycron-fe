import { useTranslation } from 'react-i18next';
import { EditUser } from '@psycron/components/icons';
import { Text } from '@psycron/components/text/Text';
import { Tooltip } from '@psycron/components/tooltip/Tooltip';
import { useAppointmentActions } from '@psycron/context/appointment/appointment-actions/AppointmentActionsContext';
import { formatDateTime } from '@psycron/utils/variables';

import {
	DateCell,
	FullAmountItem,
	HasDiscountCell,
	StyledCellWrapper,
	StyledIconWrapper,
	StyledStatusCell,
} from './TableCell.styles';
import type { ITableCellProps } from './TableCell.types';

export const TableCell = ({
	icon,
	numeric,
	label,
	action,
	isHead,
	isPatients,
	id,
	tooltip,
	iconElements,
	session,
}: ITableCellProps) => {
	const { t } = useTranslation();

	const { handleEditClick, handleCancelClick } = useAppointmentActions();

	const align = (icon?: boolean, numeric?: boolean) => {
		if (icon || numeric) return 'center';
		return 'left';
	};

	const renderContent = () => {
		if (isHead) {
			return (
				<Text
					width='100%'
					textAlign={align(icon, numeric)}
					variant='subtitle2'
					fontSize='0.8rem'
					textTransform='capitalize'
					m={1}
				>
					{label}
				</Text>
			);
		}

		if (id.startsWith('status-')) {
			const status = id.split('-')[1];

			return (
				<StyledStatusCell
					borderBottom={'1px solid red'}
					textAlign={align(icon, numeric)}
					variant='body2'
					status={status}
				>
					{label}
				</StyledStatusCell>
			);
		}

		switch (id) {
			case 'nextSession':
			case 'latestPayment':
				return (
					<DateCell id={id}>
						<Text
							width='100%'
							textAlign={align(icon, numeric)}
							variant='body2'
							fontSize='0.8rem'
						>
							{formatDateTime(label, t)}
						</Text>
					</DateCell>
				);

			case 'hasDiscount':
				return (
					<HasDiscountCell label={label}>
						<Text
							textAlign={align(icon, numeric)}
							variant='body2'
							fontSize='0.8rem'
						>
							{label}
						</Text>
					</HasDiscountCell>
				);

			case 'fullAmount':
				return (
					<FullAmountItem>
						<Text
							textAlign={align(icon, numeric)}
							variant='body2'
							fontSize='0.8rem'
						>
							{label}
						</Text>
					</FullAmountItem>
				);

			default:
				return (
					<Text
						width='100%'
						textAlign={align(icon, numeric)}
						variant='body2'
						fontSize='0.8rem'
						p={2}
					>
						{label}
					</Text>
				);
		}
	};

	const handleClick = (key: string) => {
		if (key?.includes('edit')) {
			handleEditClick(session);
		} else if (key?.includes('close')) {
			handleCancelClick(session);
		}
	};

	return (
		<StyledCellWrapper>
			{action ? (
				!isHead ? (
					<StyledIconWrapper>
						{Array.isArray(iconElements) &&
							iconElements.map((element, index) => {
								return (
									<Tooltip
										key={index}
										onClick={() => handleClick(element.key)}
										title={
											isPatients
												? t('components.patients-table.manage')
												: tooltip?.[index]
										}
									>
										{isPatients ? <EditUser /> : element}
									</Tooltip>
								);
							})}
					</StyledIconWrapper>
				) : null
			) : (
				renderContent()
			)}
		</StyledCellWrapper>
	);
};
