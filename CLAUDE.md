# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server (port 5173)
npm run build        # Build for production (includes sitemap generation)
npm run lint         # Run ESLint with auto-fix
npm run storybook    # Start Storybook on port 6006
npm run preview      # Preview production build
```

## Path Alias

Use `@psycron/*` to import from `src/`:
```typescript
import { Button } from '@psycron/components/button/Button';
import { useAlert } from '@psycron/context/alert/AlertContext';
```

## Architecture

### Component Structure
Components follow a consistent file pattern:
- `ComponentName.tsx` - Component logic
- `ComponentName.types.ts` - TypeScript interfaces
- `ComponentName.styles.tsx` - Styled components using MUI's `styled()` API
- `ComponentName.stories.tsx` - Storybook stories (optional)

### Styling
- Uses MUI `styled()` with Emotion CSS-in-JS
- Theme tokens imported from `@psycron/theme/*` (spacing, palette, media-queries, shadow)
- Media queries: use `isBiggerThanMediumMedia`, `isBiggerThanTabletMedia` from `@psycron/theme/media-queries`
- Use `shouldForwardProp` when passing custom props to styled components

### State Management
- **React Context** for app-wide state (auth, alerts, user details)
- **React Query** (`@tanstack/react-query`) for server state
- Context hooks follow pattern: `useContextName()` with provider check

Key contexts:
- `useAuth()` - Authentication state and tokens
- `useAlert()` - Global notifications via `showAlert({ message, severity })`
- `useUserDetails()` - Current user profile with React Query integration
- `usePatient()` - Patient CRUD operations with mutations

### API Layer
- Located in `src/api/` organized by domain
- Uses axios instance (`src/api/axios-instance.ts`) with:
  - Auto-token injection
  - 401 interceptor with token refresh
- Integrate with React Query mutations in context providers

### Routing
- React Router v6 with locale prefix (`/:locale`)
- Route URLs centralized in `src/pages/urls.ts`
- `PrivateRoutes.tsx` for authenticated routes, `PublicRoutes.tsx` for public

### Internationalization
- Uses `react-i18next`
- Translation files in `src/assets/locales/{en,pt}/translation.json`
- Access via `useTranslation()` hook

## Code Conventions

### ESLint Rules
- Single quotes required
- Import sorting enforced (react first, then `@` packages, then relative)
- Interface/enum keys must be alphabetically sorted
- No explicit `any` - use proper types
- Use `type` imports: `import type { MyType } from './types'`

### Styling in styled-components
```typescript
import { styled } from '@mui/material';
import { css } from '@emotion/react';

export const MyWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>`
  ${({ isActive }) => isActive && css`...`}
`;
```

### Responsive Design
```typescript
import { useViewport } from '@psycron/hooks/useViewport';
const { isMobile, isTablet, isMedium } = useViewport();
```

### API + Mutation Pattern
```typescript
const myMutation = useMutation({
  mutationFn: myApiFunction,
  onSuccess: (data) => {
    showAlert({ message: data.message, severity: 'success' });
    queryClient.invalidateQueries({ queryKey: ['myKey'] });
  },
  onError: (error: CustomError) => {
    showAlert({ message: error.message, severity: 'error' });
  },
});
```

## Key Directories

- `src/api/` - API modules by domain
- `src/components/` - Reusable UI components
- `src/context/` - React Context providers
- `src/hooks/` - Custom hooks
- `src/layouts/` - Page layout wrappers
- `src/pages/` - Route page components
- `src/theme/` - MUI theme configuration and tokens
