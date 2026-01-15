# Secret Rotation Required

## Critical Security Notice

The following secrets were previously committed to git history and **MUST be rotated immediately**:

### Exposed Secrets

| Secret | Service | Action Required |
|--------|---------|-----------------|
| `VITE_IP_GEO_KEY` | ipgeolocation.io | Generate new API key |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Cloud Console | Generate new API key |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics | Review (low risk, but verify) |
| `VITE_JWT_SECRET` | Backend | **CRITICAL: Rotate immediately** |

## Rotation Instructions

### 1. IP Geolocation API Key

1. Go to [ipgeolocation.io/dashboard](https://ipgeolocation.io/dashboard)
2. Navigate to API Keys section
3. Revoke the old key
4. Generate a new key
5. Update in deployment environment variables

### 2. Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Find the compromised API key
3. Click "Regenerate Key" or create a new one
4. **Recommended:** Add API key restrictions:
   - HTTP referrers (web sites): `*.psycron.app/*`
   - API restrictions: Maps JavaScript API, Places API only
5. Delete the old key
6. Update in deployment environment variables

### 3. JWT Secret (Backend)

**This is the most critical secret to rotate.**

1. Generate a new secure secret:
   ```bash
   openssl rand -base64 64
   ```
2. Update the backend environment configuration
3. Note: This will invalidate all existing user sessions
4. Consider: Implement a grace period or notify users

### 4. Clean Git History (Optional but Recommended)

To remove secrets from git history entirely:

```bash
# Option 1: Using git-filter-repo (recommended)
pip install git-filter-repo
git filter-repo --path .env --invert-paths

# Option 2: Using BFG Repo Cleaner
# Download from https://rtyley.github.io/bfg-repo-cleaner/
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Warning:** This rewrites git history. Coordinate with your team before doing this.

## Prevention Measures Implemented

This PR implements the following to prevent future incidents:

1. **Updated `.gitignore`** - Excludes all `.env*` files except `.env.example`
2. **Environment Validation** - Detects forbidden secrets at startup
3. **`.env.example`** - Safe template with placeholder values
4. **Documentation** - SECURITY.md and README updated

## Verification Checklist

After rotating secrets:

- [ ] Old IP Geo key no longer works
- [ ] Old Google Maps key no longer works
- [ ] Backend JWT secret rotated
- [ ] All users re-authenticated (expected after JWT rotation)
- [ ] Application works with new keys
- [ ] Deployment platforms updated with new values

## Timeline

| Date | Action |
|------|--------|
| Discovery | Secrets found in git history |
| Immediate | Remove from git tracking |
| Within 24h | Rotate all API keys |
| Within 24h | Rotate JWT secret (coordinate with backend) |
| Optional | Clean git history |

---

*This document should be deleted after all secrets have been rotated.*
