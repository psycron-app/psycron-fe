/* eslint-disable indent */
import { Box, css, Paper, styled } from '@mui/material';
import {
	isBiggerThanMediumMedia,
	isBiggerThanTabletMedia,
	isMobileMedia,
	isTabletMedia,
} from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { shadowMain } from '@psycron/theme/shadow/shadow.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import { Text } from '../text/Text';

export const StyledTitle = styled(Box, {
	shouldForwardProp: (props) => props !== 'isBig',
})<{ isBig: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: sticky;
	top: 1.5rem;

	background-color: inherit;

	${({ isBig }) =>
		isBig
			? css`
					p {
						font-size: 1.2rem;
						font-weight: 600;

						${isMobileMedia} {
							font-size: inherit;
							font-weight: inherit;
						}
					}

					& svg {
						${isBiggerThanTabletMedia} {
							width: 2rem;
							height: 2rem;
						}
					}

					${isBiggerThanTabletMedia} {
						padding-top: 0;
						padding: ${spacing.mediumSmall};
					}
				`
			: css`
					padding: ${spacing.xs} 0 ${spacing.xs};

					p {
						font-size: inherit;
						font-weight: inherit;
					}

					& svg {
						width: 1.25rem;
						height: 1.25rem;
					}
				`}
`;

export const StyledCalendarWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'isBig',
})<{ isBig: boolean }>`
	width: 100%;
	padding: ${spacing.medium};

	${isBiggerThanTabletMedia} {
		width: ${({ isBig }) => (isBig ? '100%' : '18.75rem')};
	}

	${isBiggerThanMediumMedia} {
		height: auto;
	}
`;

export const StyledChevronWrapper = styled(Box)`
	display: flex;
	justify-content: space-between;
`;

export const StyledPaper = styled(Paper)`
	padding: ${spacing.small};
	position: relative;
	height: 100%;
`;

export const StyledWeekDays = styled(Box, {
	shouldForwardProp: (props) => props !== 'isBig',
})<{ isBig: boolean }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-auto-rows: ${({ isBig }) => isBig && '3.125rem'};
	text-align: center;
	align-items: center;

	background-color: inherit;

	position: sticky;
	top: 6rem;

	p {
		font-size: ${({ isBig }) => (isBig ? '1.2rem' : '0.875rem')};
		font-weight: ${({ isBig }) => (isBig ? 500 : 'inherit')};
	}

	${({ isBig }) =>
		isBig
			? css`
					p {
						font-size: 1.2rem;
						font-weight: 600;

						${isMobileMedia} {
							font-size: inherit;
							font-weight: inherit;
						}
					}
				`
			: css`
					p {
						font-size: inherit;
						font-weight: inherit;
					}
				`}
`;

export const DaysWrapper = styled(Box, {
	shouldForwardProp: (props) => props !== 'isBig',
})<{ isBig: boolean }>`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(6, 1.875rem);

	${({ isBig }) =>
		isBig
			? css`
					grid-template-rows: repeat(6, 3.1rem);
					padding-top: 0;

					${isBiggerThanTabletMedia} {
						padding-top: ${spacing.xs};
						grid-template-rows: repeat(6, 6rem);
					}

					${isTabletMedia} {
						grid-template-rows: repeat(6, 7rem);
					}
				`
			: css`
					grid-template-rows: repeat(6, 1.875rem);
					padding-top: ${spacing.xs};
				`}
`;

export const StyledCalendarNumberWrapper = styled(Box, {
	shouldForwardProp: (props) =>
		props !== 'isCurrentMonth' && props !== 'isBig' && props !== 'isDisabled',
})<{ isBig: boolean; isCurrentMonth: boolean; isDisabled: boolean }>`
	display: flex;
	align-items: center;
	justify-content: center;

	border-top: ${({ isBig }) => isBig && `2px dashed ${palette.gray['02']}`};

	& :hover {
		cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
		background-color: ${({ isCurrentMonth }) =>
			isCurrentMonth ? palette.primary.main : palette.primary.light};
		border-radius: 50%;
		width: ${({ isBig }) => (isBig ? '3.75rem' : '1.875rem')};
		height: ${({ isBig }) => (isBig ? '3.75rem' : '1.875rem')};
		box-shadow: ${shadowMain};
	}
`;

export const StyledCalendarNumber = styled(Text, {
	shouldForwardProp: (props) =>
		props !== 'isCurrentDay' &&
		props !== 'isCurrentMonth' &&
		props !== 'isSelected' &&
		props !== 'isBig' &&
		props !== 'isDisabled',
})<{
	isBig: boolean;
	isCurrentDay: boolean;
	isCurrentMonth: boolean;
	isDisabled: boolean;
	isSelected: boolean;
}>`
	display: flex;
	align-items: center;
	justify-content: center;

	${({ isBig }) =>
		isBig
			? css`
					font-size: inherit;

					${isBiggerThanTabletMedia} {
						font-size: 1.2rem;
					}
				`
			: css`
					font-size: inherit;
				`}

	${({ isCurrentDay, isBig, isSelected }) =>
		isSelected
			? css`
					background-color: ${palette.secondary.main};
					box-shadow: ${shadowMain};
					border-radius: 50%;
					height: ${isBig ? '3.75rem' : '1.875rem'};
					width: ${isBig ? '3.75rem' : '1.875rem'};

					${isMobileMedia} {
						height: 1.875rem;
						width: 1.875rem;
					}
				`
			: isCurrentDay
				? css`
						background-color: ${palette.secondary.action.hover};
						border-radius: 50%;
						height: ${isBig ? '3.75rem' : '1.875rem'};
						width: ${isBig ? '3.75rem' : '1.875rem'};

						${isMobileMedia} {
							height: 1.875rem;
							width: 1.875rem;
						}
					`
				: css`
						background-color: 'transparent';
					`};

	color: ${({ isCurrentMonth }) =>
		isCurrentMonth ? palette.text.primary : palette.text.disabled};

	${({ isDisabled }) =>
		isDisabled &&
		css`
			opacity: 0.3;
			:hover {
				cursor: not-allowed;
			}
		`}
`;
