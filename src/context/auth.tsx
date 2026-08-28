import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

import {
  signInWithEmail,
  signOut as firebaseSignOut,
  signUpWithEmail,
  subscribeToAuthState,
  type FirebaseUser,
} from '@/lib/firebase';

type AuthContextValue = {
  /** The signed-in Firebase user, or `null` when signed out. */
  user: FirebaseUser | null;
  /** `true` until the first auth-state callback fires after launch. */
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      initializing,
      async signIn(email, password) {
        await signInWithEmail(email, password);
      },
      async signUp(email, password) {
        await signUpWithEmail(email, password);
      },
      async signOut() {
        await firebaseSignOut();
      },
    }),
    [user, initializing],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth() must be used inside an <AuthProvider>.');
  }
  return value;
}
