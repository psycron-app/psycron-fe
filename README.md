# Psycron Frontend

A modern React application for therapists to manage appointments, availability, and patient scheduling.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI) with Emotion
- **State Management:** React Query + React Context
- **Forms:** React Hook Form + Yup validation
- **Routing:** React Router v6
- **Internationalization:** i18next

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/psycron-app/psycron-fe.git
cd psycron-fe

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
# Required
VITE_PSYCRON_BASE_API_URL=http://localhost:8080/api/v1

# Optional (features disabled if not set)
VITE_IP_GEO_KEY=your_key_here
VITE_GOOGLE_MAPS_API_KEY=your_key_here
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> **Security Note:** Never commit `.env` files. See [SECURITY.md](./SECURITY.md) for details.

### Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Start Storybook
npm run storybook
```

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── api/          # API modules and axios configuration
├── components/   # Reusable UI components
├── context/      # React Context providers
├── hooks/        # Custom React hooks
├── layouts/      # Page layout components
├── pages/        # Route page components
├── routes/       # Router configuration
├── theme/        # MUI theme and design tokens
└── utils/        # Utility functions
```

## Deployment

### Environment Variables

Set these in your deployment platform (Vercel, Netlify, etc.):

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_PSYCRON_BASE_API_URL` | Yes | Backend API URL |
| `VITE_IP_GEO_KEY` | No | IP Geolocation API key |
| `VITE_GOOGLE_MAPS_API_KEY` | No | Google Maps API key |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics ID |

### Deployment Checklist

- [ ] Set all required environment variables
- [ ] Verify API URL uses HTTPS
- [ ] Run `npm audit` before deployment
- [ ] Test authentication flow
- [ ] Verify CORS configuration with backend

### Backend Integration

Ensure the backend is configured with:

- CORS whitelist including your frontend domain
- HTTPS enabled
- Proper security headers (see [SECURITY.md](./SECURITY.md))

## Security

See [SECURITY.md](./SECURITY.md) for:

- Environment variable guidelines
- Secure development practices
- Deployment security checklist
- Vulnerability reporting

## Contributing

1. Create a feature branch from `dev`
2. Follow the coding standards in [CLAUDE.md](./CLAUDE.md)
3. Run `npm run lint` before committing
4. Submit a PR with clear description

## License

Proprietary - All rights reserved.
