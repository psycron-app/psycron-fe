# Psycron Frontend

Frontend application for **Psycron**, a platform designed to help independent therapists manage their practice — including authentication, scheduling, patients, billing, and settings — with a strong focus on UX, privacy, and scalability.

This repository contains the **web client** used by:

- Therapists (main app)
- Internal workers (backoffice & testing environment)

---

## 🧠 Tech Stack

- **React** (18)
- **TypeScript**
- **Vite**
- **React Router**
- **React Hook Form**
- **TanStack Query (React Query)**
- **Material UI (MUI)**
- **i18next**
- **PostHog**

---

## 📦 Project Structure

```
src/
├─ api/
├─ components/
├─ context/
├─ features/
├─ hooks/
├─ layouts/
├─ pages/
├─ theme/
├─ utils/
├─ i18n/
├─ App.tsx
└─ main.tsx
```

---

## 🔐 App Areas

### Therapist App

- Email/password or Google OAuth
- User settings, patients, appointments, billing

### Worker / Backoffice

- Google OAuth only
- Internal testing & QA tooling

---

## 📊 Analytics (PostHog)

- Explicit event tracking only
- No autocapture
- Identify users after authentication
- Reset analytics on logout

Helper used across the app:

```ts
export const capture = (
	event: string,
	props?: Record<string, string | number | boolean | null>
): void => {
	posthog.capture(event, props);
};
```

---

## 🌍 Internationalization

- i18next
- Locale in URL: `/:locale/...`
- EN / PT supported

---

## 🧪 Runtime Modes

The app has two runtime areas:

- `app`: therapist/public main experience
- `test`: internal testing + backoffice support

Mode resolution is:

1. If hostname starts with `test.`, runtime is always `test`.
2. Otherwise, `VITE_TEST_MODE` can override:
   - `test`, `true`, `1` -> `test`
   - `app`, `false`, `0` -> `app`
3. If no override is set, default is `app`.

Testing mode supports:

- Internal backoffice entrypoints
- Testing banner visibility when worker auth exists
- Non-final/placeholder admin navigation items

### Accessing `test.psycron.app` (internal)

1. Open `https://test.psycron.app`.
2. Sign in with Google using worker flow.
3. Access `https://test.psycron.app/en/backoffice` (or your locale).

Notes:

- Backoffice routes require worker token (`_psyw_at`).
- Some admin tasks are intentionally disabled placeholders in current UI.
- If banner is missing on public pages, verify worker auth is active.

---

## ⚙️ Environment Variables

```
VITE_PSYCRON_BASE_API_URL=
VITE_RUNTIME_ENV=dev|staging|prod
VITE_TEST_MODE=false|app|true|test
VITE_PSYCRON_BASE_URL=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=
VITE_SENTRY_DSN=
VITE_ENABLE_SUBSCRIPTION_MOCK=
```

Environment validation runs at startup.  
Production build fails if required variables are missing.

---

## ▶️ Running the Project

```bash
npm install
npm run dev
```

### Local Main App (No `test.`)

1. Set `VITE_TEST_MODE=false` (or `app`) in FE `.env`.
2. Run `npm run dev`.
3. Open `http://localhost:5173/en`.
4. Do not use `http://test.localhost:5173`.

### Local Testing App (`test.` host)

1. Run `npm run dev`.
2. Open `http://test.localhost:5173/en`.
3. Sign in with worker Google flow for backoffice.

### FE + BE Host Alignment (Important)

If login from `http://localhost:5173` redirects to `http://test.localhost:5173`, check backend env:

- BE `FRONTEND_URL` controls OAuth redirect host.
- For local main flow, set BE `FRONTEND_URL=http://localhost:5173`.
- Restart BE after changing `.env`.

Local session reset if behavior looks stale:

- Clear browser storage keys: `_psyw_at`, `_psyw_rt`, `_psyw_persist`.
- Restart FE dev server after env changes.

Build:

```bash
npm run build
npm run preview
```

---

## 🧩 Architecture Notes

- Strict TypeScript (no `any`)
- Side effects in providers/hooks
- Feature-driven structure
- Clear separation between therapist app and backoffice

---

## 📄 License

Private repository — all rights reserved.
