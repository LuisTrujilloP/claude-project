import type { ExpoConfig } from 'expo/config';

/**
 * App configuration.
 *
 * `.env` files in the project root are loaded automatically by the Expo CLI
 * before this file runs, so `process.env.*` is populated here. Anything placed
 * on `extra` is readable at runtime through `src/config/env.ts`.
 */
const BUNDLE_ID = 'com.example.claudeproject';
const easProjectId = process.env.EAS_PROJECT_ID;

const config: ExpoConfig = {
  name: 'claudeproject',
  slug: 'claudeproject',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'claudeproject',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: BUNDLE_ID,
    googleServicesFile: process.env.GOOGLE_SERVICES_PLIST ?? './GoogleService-Info.plist',
  },
  android: {
    package: BUNDLE_ID,
    predictiveBackGestureEnabled: false,
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    googleServicesFile: process.env.GOOGLE_SERVICES_JSON ?? './google-services.json',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
    '@react-native-firebase/app',
    '@react-native-firebase/auth',
    [
      'expo-build-properties',
      {
        ios: { useFrameworks: 'dynamic' },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    apiUrl: process.env.APP_API_URL ?? 'https://api.example.com',
    environment: process.env.APP_ENV ?? 'development',
    ...(easProjectId ? { eas: { projectId: easProjectId } } : {}),
  },
};

export default config;
