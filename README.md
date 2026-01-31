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

## 🧪 Testing Environment

Testing mode allows:

- Mocked user data
- Disabled destructive actions
- Backoffice access

Controlled via runtime environment flags.

---

## ⚙️ Environment Variables

```
VITE_API_BASE_URL=
VITE_PUBLIC_POSTHOG_KEY=
VITE_PUBLIC_POSTHOG_HOST=
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
