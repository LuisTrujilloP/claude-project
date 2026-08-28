import Constants from 'expo-constants';

export type AppEnvironment = 'development' | 'preview' | 'production';

export type AppConfig = {
  /** Base URL for your backend / Cloud Run / Cloud Functions API. */
  apiUrl: string;
  /** Logical environment name, driven by the `APP_ENV` variable. */
  environment: AppEnvironment;
};

const extra = (Constants.expoConfig?.extra ?? {}) as Record<string, unknown>;

function readString(key: keyof AppConfig, fallback: string): string {
  const value = extra[key];
  if (typeof value === 'string' && value.length > 0) {
    return value;
  }
  if (__DEV__) {
    console.warn(
      `[config] "${key}" is not set — using fallback "${fallback}". ` +
        'Define it in .env (see .env.example).',
    );
  }
  return fallback;
}

export const appConfig: AppConfig = {
  apiUrl: readString('apiUrl', 'https://api.example.com'),
  environment: readString('environment', 'development') as AppEnvironment,
};
