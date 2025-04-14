import styled from '@emotion/styled';
import { FormControl, InputLabel, Select } from '@mui/material';
import { spacing } from '@psycron/theme/spacing/spacing.theme';

export const ControlledWrapper = styled(FormControl)<{ width?: string }>`
	.MuiInputLabel-root {
		padding: ${spacing.small};
		padding-right: 0;
		margin-left: 0;
	}
	width: ${({ width }) => width};

	& svg {
		height: auto !important;
	}
`;

export const StyledInputLabel = styled(InputLabel)`
	top: -0.3125rem;
	left: -0.3125rem;
`;

export const StyledMUISelect = styled(Select)`
	.MuiSelect-select {
		padding-left: ${spacing.small};
	}
`;
