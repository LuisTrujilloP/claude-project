# claudeproject

React Native app scaffold — **Expo (SDK 57) + Expo Router + React Native Firebase**.

Empty environment: four routes wired into an auth flow, plus all the Firebase /
Google Cloud plumbing. No screens have real product logic yet.

---

## Stack

| Concern        | Choice                                                           |
| -------------- | --------------------------------------------------------------- |
| Framework      | Expo SDK 57 (`react-native` 0.86, React 19, New Architecture)   |
| Routing        | `expo-router` v6 — file-based, typed routes                    |
| Auth / backend | `@react-native-firebase/app` + `@react-native-firebase/auth`   |
| Builds         | EAS Build (cloud) — dev / preview / production profiles        |
| Config         | `app.config.ts` + `.env` → `Constants.expoConfig.extra`        |
| Lint / format  | `eslint-config-expo` + Prettier                                |

> **React Native Firebase uses native modules.** It does **not** run in Expo Go
> and has **no web support**. You need a *development build* (see step 4).
> iOS builds additionally require macOS — this repo is set up for **Android**.

---

## Routes

Auth state comes from `onAuthStateChanged`. The root layout
(`src/app/_layout.tsx`) mounts route groups behind `<Stack.Protected>` guards;
`src/app/index.tsx` is the redirect anchor.

| URL        | File                             | Group     | Access         |
| ---------- | -------------------------------- | --------- | -------------- |
| `/login`   | `src/app/(auth)/login.tsx`       | `(auth)`  | signed-out     |
| `/signup`  | `src/app/(auth)/signup.tsx`      | `(auth)`  | signed-out     |
| `/home`    | `src/app/(app)/home.tsx`         | `(app)`   | signed-in      |
| `/profile` | `src/app/(app)/profile.tsx`      | `(app)`   | signed-in      |

Signing in flips the guard and the user lands on `/home`; signing out sends them
back to `/login`. No manual navigation calls needed.

---

## Project layout

```
app.config.ts                 Expo config (plugins, bundle id, extra)
eas.json                      EAS Build profiles
google-services.json          Firebase Android config  (git-ignored — you add this)
google-services.json.example  Shape reference for the file above
.env / .env.example           Runtime config

src/
  app/                        expo-router routes (this dir IS the router)
    _layout.tsx               AuthProvider + guarded Stack + splash handling
    index.tsx                 "/" → redirects by auth state
    (auth)/_layout.tsx        stack for signed-out screens
    (auth)/login.tsx          ROUTE 1
    (auth)/signup.tsx         ROUTE 2
    (app)/_layout.tsx         stack for signed-in screens
    (app)/home.tsx            ROUTE 3
    (app)/profile.tsx         ROUTE 4
  components/ui.tsx           Screen / TextField / PrimaryButton / ErrorText
  context/auth.tsx            AuthProvider + useAuth()
  lib/firebase.ts             RNFirebase modular API wrappers
  config/env.ts               typed accessor over Constants.expoConfig.extra
```

---

## Setup

### 1. Install

```bash
npm install
```

### 2. Firebase project

1. Create a project at <https://console.firebase.google.com>.
2. **Add app → Android.** Use package name **`com.example.claudeproject`**
   (must match `android.package` in `app.config.ts` — change both together if
   you want your own).
3. Download **`google-services.json`** into the project root (next to
   `app.config.ts`). It is git-ignored; `google-services.json.example` shows the
   expected shape.
4. In the console: **Build → Authentication → Sign-in method → Email/Password →
   Enable.**

> Adding iOS later: register an iOS app, drop `GoogleService-Info.plist` in the
> root, and build from a Mac.

### 3. Environment

```bash
cp .env.example .env
```

Fill in `APP_API_URL` etc. `EAS_PROJECT_ID` is set for you by `eas init` (next
step).

### 4. Development build

Expo Go will not work. Pick one:

**A — EAS Build (cloud, no local Android SDK needed):**

```bash
npm install -g eas-cli
eas login                 # needs a free Expo account
eas init                  # links the project, writes EAS_PROJECT_ID
eas build --profile development --platform android
```

Install the resulting `.apk` on a device or emulator, then:

```bash
npm start                 # expo start --dev-client
```

Scan the QR / enter the URL from the dev build app.

**B — Local build (needs JDK 17 + Android Studio + SDK, `ANDROID_HOME` set):**

```bash
npm run android           # expo run:android — generates ./android and builds
```

---

## Scripts

| Script              | Does                                             |
| ------------------- | ----------------------------------------------- |
| `npm start`         | Dev server for a dev build (`--dev-client`)     |
| `npm run android`   | Local native build + run                        |
| `npm run prebuild`  | Regenerate native projects from config          |
| `npm run lint`      | `expo lint`                                     |
| `npm run format`    | Prettier write                                  |
| `npm run typecheck` | `tsc --noEmit`                                  |

---

## Adding more Firebase / Google Cloud services

1. `npx expo install @react-native-firebase/<service>`
   (`firestore`, `functions`, `storage`, `messaging`, `crashlytics`, …).
2. Add its config plugin to the `plugins` array in `app.config.ts`.
3. Rebuild the dev client (step 4) — native deps changed.
4. Import with the modular API, mirroring `src/lib/firebase.ts`:

   ```ts
   import { getFirestore, collection, getDocs } from '@react-native-firebase/firestore';
   ```

Calling **Cloud Functions**: add `@react-native-firebase/functions` and use
`httpsCallable`, or just `fetch(appConfig.apiUrl + '/...')` for plain Cloud Run /
HTTP endpoints.

---

## Notes

- `src/app/` is the router. A file there = a route. Keep non-route code in the
  sibling `src/` folders.
- Native folders (`android/`, `ios/`) are git-ignored — this is the managed
  workflow. `expo prebuild` regenerates them from `app.config.ts`.
- `google-services.json` / `.env` are git-ignored; commit the `.example` files.
