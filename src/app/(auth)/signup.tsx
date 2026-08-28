import { useState } from 'react';
import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

import { ErrorText, PrimaryButton, Screen, TextField } from '@/components/ui';
import { useAuth } from '@/context/auth';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    setError(null);
    setSubmitting(true);
    try {
      await signUp(email, password);
      // On success the auth listener flips the guard and routes to /home.
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to create the account.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 28, fontWeight: '700' }}>Create account</Text>
          <Text style={{ color: '#5f6368' }}>Sign up to get started</Text>
        </View>

        <TextField
          label="Email"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
        />
        <TextField
          label="Password"
          secureTextEntry
          autoComplete="new-password"
          value={password}
          onChangeText={setPassword}
          placeholder="At least 6 characters"
        />

        <ErrorText>{error}</ErrorText>

        <PrimaryButton title="Sign up" onPress={onSubmit} loading={submitting} />

        <Link href="/login" style={{ textAlign: 'center', color: '#1a73e8', fontWeight: '600' }}>
          Already have an account? Sign in
        </Link>
      </Screen>
    </KeyboardAvoidingView>
  );
}
