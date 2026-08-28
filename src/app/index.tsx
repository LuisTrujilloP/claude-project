import { Redirect } from 'expo-router';

import { useAuth } from '@/context/auth';

/**
 * Entry route (`/`) and router "anchor": whenever a `Stack.Protected` guard in
 * the root layout flips, expo-router sends the user here, and this redirect
 * forwards them to the correct stack.
 */
export default function Index() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return null;
  }

  return <Redirect href={user ? '/home' : '/login'} />;
}
