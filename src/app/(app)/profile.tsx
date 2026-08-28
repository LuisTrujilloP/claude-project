import { Text, View } from 'react-native';

import { PrimaryButton, Screen } from '@/components/ui';
import { useAuth } from '@/context/auth';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const rows: { label: string; value: string }[] = [
    { label: 'User ID', value: user?.uid ?? '-' },
    { label: 'Email', value: user?.email ?? '-' },
    { label: 'Email verified', value: String(user?.emailVerified ?? false) },
    { label: 'Provider', value: user?.providerData[0]?.providerId ?? 'password' },
    { label: 'Created', value: user?.metadata.creationTime ?? '-' },
  ];

  return (
    <Screen style={{ justifyContent: 'flex-start' }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Profile</Text>

      <View style={{ gap: 12, marginTop: 8 }}>
        {rows.map((row) => (
          <View key={row.label} style={{ gap: 2 }}>
            <Text style={{ fontSize: 12, color: '#9aa0a6', textTransform: 'uppercase' }}>
              {row.label}
            </Text>
            <Text style={{ fontSize: 15, color: '#202124' }}>{row.value}</Text>
          </View>
        ))}
      </View>

      <View style={{ flex: 1 }} />

      <PrimaryButton title="Sign out" onPress={() => void signOut()} />
    </Screen>
  );
}
