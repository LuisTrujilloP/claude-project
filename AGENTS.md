# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

## This project

- Expo Router (v6) + React Native Firebase (native modules — no Expo Go, no web).
- `src/app/` is the router. Routes: `(auth)/login`, `(auth)/signup`,
  `(app)/home`, `(app)/profile`. Root `_layout.tsx` guards groups with
  `<Stack.Protected>`; `index.tsx` is the redirect anchor.
- Auth state: `src/context/auth.tsx` (`useAuth()`), backed by
  `src/lib/firebase.ts` (modular RNFirebase API).
- Config: `app.config.ts` + `.env` → `src/config/env.ts`. Do not re-add `app.json`.
- Native config `google-services.json` is git-ignored and required for the app to
  boot. See README.md.
