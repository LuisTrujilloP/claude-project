import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { PrimaryButton, Screen } from '@/components/ui';
import { appConfig } from '@/config/env';
import { useAuth } from '@/context/auth';

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <Screen style={{ justifyContent: 'flex-start' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Home</Text>
      <Text style={{ color: '#5f6368' }}>Signed in as {user?.email ?? user?.uid ?? 'unknown'}</Text>
      <Text style={{ color: '#5f6368' }}>
        {appConfig.environment} · {appConfig.apiUrl}
      </Text>

      <View style={{ height: 8 }} />

      <Link href="/profile" style={{ color: '#1a73e8', fontWeight: '600' }}>
        Go to profile
      </Link>

      <View style={{ flex: 1 }} />

      <PrimaryButton title="Sign out" onPress={() => void signOut()} />
    </Screen>
  );
}
