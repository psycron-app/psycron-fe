# Security Policy

## Overview

This document outlines security practices and guidelines for the Psycron frontend application. Following these practices helps protect user data and maintain application integrity.

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** create a public GitHub issue
2. Email security concerns to: [security@psycron.app](mailto:security@psycron.app)
3. Include detailed steps to reproduce the vulnerability
4. Allow reasonable time for the issue to be addressed before disclosure

## Environment Variables

### Critical Rules

1. **NEVER commit `.env` files** to version control
2. **NEVER include backend secrets** in frontend code
3. All `VITE_` prefixed variables are **exposed to the browser**
4. Use `.env.example` as a template (safe to commit)

### Forbidden Variables

The following should **NEVER** appear in frontend code:

```
VITE_JWT_SECRET          # Backend-only
VITE_DB_PASSWORD         # Backend-only
VITE_DB_CONNECTION_STRING # Backend-only
VITE_PRIVATE_KEY         # Backend-only
VITE_SECRET_KEY          # Backend-only
VITE_API_SECRET          # Backend-only
VITE_ENCRYPTION_KEY      # Backend-only (server provides via API)
```

If any of these are detected at startup, the application will refuse to run.

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_PSYCRON_BASE_API_URL` | Backend API URL | `https://api.psycron.app/api/v1` |

### Optional Variables

| Variable | Feature | Impact if Missing |
|----------|---------|-------------------|
| `VITE_IP_GEO_KEY` | Timezone detection | Manual timezone selection |
| `VITE_GOOGLE_MAPS_API_KEY` | Address autocomplete | Manual address entry |
| `VITE_GA_MEASUREMENT_ID` | Analytics tracking | No usage analytics |

## Secure Development Practices

### 1. Authentication

- JWT tokens are stored in `localStorage` (consider HttpOnly cookies for higher security)
- Tokens are validated for expiration before use
- Automatic token refresh on 401 responses
- Sensitive IDs are encrypted with AES before storage

### 2. Input Validation

- All forms use Yup schema validation
- Password requirements: 9+ chars, uppercase, lowercase, number, special character
- Email validation with regex patterns
- Trim whitespace from inputs

### 3. API Communication

- All API calls use HTTPS in production
- CORS configured with `withCredentials: true`
- Authorization headers injected automatically
- Structured error handling with status codes

### 4. XSS Prevention

When displaying user-generated content, always sanitize:

```typescript
import DOMPurify from 'dompurify';
const safeHTML = DOMPurify.sanitize(userInput);
```

### 5. Dependency Security

Run regular security audits:

```bash
npm audit
npm audit fix
```

## Secure Deployment Checklist

### Pre-Deployment

- [ ] Remove all `.env` files from git history if accidentally committed
- [ ] Ensure `.gitignore` includes `.env*` patterns
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Verify `VITE_PSYCRON_BASE_API_URL` points to production API
- [ ] Verify API URL uses HTTPS
- [ ] Remove any `console.log` statements with sensitive data

### Environment Configuration

For deployment platforms (Vercel, Netlify, etc.):

1. Set environment variables in platform dashboard (not in code)
2. Use environment-specific variables for staging vs production
3. Never expose admin/debug endpoints in production

### Backend Integration

Ensure the backend implements:

- [ ] CORS whitelist for frontend domain
- [ ] Rate limiting on API endpoints
- [ ] HTTPS enforcement
- [ ] Secure cookie settings (`HttpOnly`, `Secure`, `SameSite`)
- [ ] CSRF protection if using cookies
- [ ] Input sanitization and validation

### Security Headers

The backend should set these headers:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## Token Storage Security

### Current Implementation

| Token | Storage | TTL |
|-------|---------|-----|
| Access Token (`_psyd`) | localStorage | Until expiry |
| Refresh Token (`_psyreft`) | localStorage | Until expiry |
| Encryption Key (`_psyenk`) | sessionStorage | Session only |
| Therapist ID (`psydui`) | localStorage (encrypted) | 24 hours |
| Patient ID (`psydpi`) | sessionStorage (encrypted) | 30 minutes |

### Recommendations for High-Security Environments

For applications handling sensitive health data, consider:

1. **HttpOnly Cookies**: Work with backend to store tokens in HttpOnly cookies
2. **Shorter Token Lifetimes**: Reduce access token expiry
3. **Token Rotation**: Rotate refresh tokens on each use
4. **Device Binding**: Bind tokens to device fingerprints

## Incident Response

If a security incident occurs:

1. **Contain**: Disable affected features/endpoints
2. **Assess**: Determine scope and impact
3. **Notify**: Inform affected users if data was exposed
4. **Remediate**: Fix the vulnerability
5. **Review**: Update security practices to prevent recurrence

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-01-15 | Initial security documentation |

---

*Last updated: January 2025*
