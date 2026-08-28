import { forwardRef } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type PressableProps,
  type TextInputProps,
  type ViewProps,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Full-height padded page container with safe-area insets. */
export function Screen({ style, children, ...rest }: ViewProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={[styles.screen, style]} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export const TextField = forwardRef<TextInput, TextInputProps & { label?: string }>(
  ({ label, style, ...rest }, ref) => (
    <View style={styles.fieldGroup}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput ref={ref} placeholderTextColor="#9aa0a6" style={[styles.input, style]} {...rest} />
    </View>
  ),
);
TextField.displayName = 'TextField';

type ButtonProps = PressableProps & { title: string; loading?: boolean };

export function PrimaryButton({ title, loading, disabled, style, ...rest }: ButtonProps) {
  const isDisabled = Boolean(disabled) || Boolean(loading);
  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={(state) => [
        styles.button,
        isDisabled && styles.buttonDisabled,
        state.pressed && styles.buttonPressed,
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonLabel}>{title}</Text>
      )}
    </Pressable>
  );
}

export function ErrorText({ children }: { children?: string | null }) {
  if (!children) {
    return null;
  }
  return <Text style={styles.error}>{children}</Text>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  screen: { flex: 1, padding: 24, gap: 16, justifyContent: 'center' },
  fieldGroup: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#3c4043' },
  input: {
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#202124',
  },
  button: {
    backgroundColor: '#1a73e8',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonPressed: { opacity: 0.85 },
  buttonDisabled: { backgroundColor: '#9ec3f5' },
  buttonLabel: { color: '#fff', fontSize: 16, fontWeight: '600' },
  error: { color: '#d93025', fontSize: 14 },
});
