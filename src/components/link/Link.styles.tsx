import { Link as RRDLink } from 'react-router-dom';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { isMobileMedia } from '@psycron/theme/media-queries/mediaQueries';
import { palette } from '@psycron/theme/palette/palette.theme';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

import type { ILinkStyledProps } from './Link.types';

const baseLinkStyles = css`
	padding: 0 ${spacing.xxs};
	text-decoration: none;
	color: ${palette.brand.purple};
	transition: color 0.2s ease-out;

	display: flex;
	align-items: center;

	&:hover {
		color: ${palette.brand.dark};
		transition: transform 0.2s ease-out;
	}

	${isMobileMedia} {
		font-size: small;
	}
`;

const baseFirstLetterStyles = css`
	&::first-letter {
		text-transform: uppercase;
	}
`;

const baseHeaderStyles = css`
	font-size: 1.2rem;
	font-weight: 500;
`;

export const StyledLink = styled(RRDLink, {
	shouldForwardProp: (prop) =>
		prop !== 'firstLetterUpper' && prop !== 'isHeader',
})<ILinkStyledProps>`
	${baseLinkStyles};

	${({ firstLetterUpper }) => firstLetterUpper && baseFirstLetterStyles}

	${({ isHeader }) => isHeader && baseHeaderStyles}
`;

export const StyledAnchor = styled('a', {
	shouldForwardProp: (prop) =>
		prop !== 'firstLetterUpper' && prop !== 'isHeader',
})<ILinkStyledProps>`
	${baseLinkStyles};

	${({ firstLetterUpper }) => firstLetterUpper && baseFirstLetterStyles}

	${({ isHeader }) => isHeader && baseHeaderStyles}
`;
