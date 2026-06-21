import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, radius, font } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;
type Mode = 'login' | 'signup';

export default function AuthScreen({ navigation }: Props) {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === 'login';

  // No backend yet — both paths just continue into the app for now.
  const submit = () => navigation.replace('Home');

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          style={styles.back}
          onPress={() => navigation.goBack()}
          hitSlop={12}
        >
          <Ionicons name="chevron-back" size={24} color={colors.ink} />
        </TouchableOpacity>

        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            {isLogin ? 'Welcome back 👋' : 'Create account'}
          </Text>
          <Text style={styles.subtitle}>
            {isLogin
              ? 'Log in to find playgrounds near you'
              : 'Sign up to start exploring playgrounds'}
          </Text>

          <View style={styles.toggle}>
            {(['login', 'signup'] as const).map((m) => {
              const active = mode === m;
              return (
                <TouchableOpacity
                  key={m}
                  style={[styles.toggleBtn, active && styles.toggleBtnActive]}
                  onPress={() => setMode(m)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.toggleText, active && styles.toggleTextActive]}>
                    {m === 'login' ? 'Log In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.form}>
            {!isLogin && (
              <Field
                icon="person-outline"
                placeholder="Full name"
                value={name}
                onChangeText={setName}
              />
            )}
            <Field
              icon="mail-outline"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Field
              icon="lock-closed-outline"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              trailing={
                <TouchableOpacity onPress={() => setShowPassword((s) => !s)} hitSlop={10}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.body}
                  />
                </TouchableOpacity>
              }
            />

            {isLogin && (
              <TouchableOpacity style={styles.forgot}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.primaryBtn} onPress={submit} activeOpacity={0.85}>
              <Text style={styles.primaryBtnText}>
                {isLogin ? 'Log In' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialRow}>
            <SocialBtn icon="logo-google" onPress={submit} />
            <SocialBtn icon="logo-apple" onPress={submit} />
            <SocialBtn icon="logo-facebook" onPress={submit} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
            </Text>
            <TouchableOpacity onPress={() => setMode(isLogin ? 'signup' : 'login')}>
              <Text style={styles.footerLink}>{isLogin ? 'Sign up' : 'Log in'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({
  icon, trailing, ...rest
}: {
  icon: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'email-address' | 'default';
  secureTextEntry?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Ionicons name={icon} size={20} color={colors.body} />
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.body}
        autoCapitalize="none"
        autoCorrect={false}
        {...rest}
      />
      {trailing}
    </View>
  );
}

function SocialBtn({
  icon, onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.social} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name={icon} size={22} color={colors.ink} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  back: {
    width: 40, height: 40, alignItems: 'center', justifyContent: 'center',
    marginLeft: spacing.lg, marginTop: spacing.sm,
  },
  scroll: { paddingHorizontal: 28, paddingTop: spacing.md, paddingBottom: spacing.xxl },
  title: { fontSize: font.display, fontWeight: '800', color: colors.ink, letterSpacing: -0.5 },
  subtitle: { fontSize: font.md, color: colors.body, marginTop: 6, marginBottom: spacing.xl },
  toggle: {
    flexDirection: 'row', backgroundColor: colors.surface,
    borderRadius: radius.md, padding: 4, marginBottom: spacing.xl,
  },
  toggleBtn: { flex: 1, paddingVertical: spacing.md, borderRadius: radius.sm, alignItems: 'center' },
  toggleBtnActive: {
    backgroundColor: colors.white, shadowColor: '#000', shadowOpacity: 0.06,
    shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 2,
  },
  toggleText: { fontWeight: '600', color: colors.body, fontSize: font.md },
  toggleTextActive: { color: colors.ink },
  form: {},
  field: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.line,
    paddingHorizontal: spacing.lg, height: 54, marginBottom: spacing.md, gap: spacing.md,
  },
  input: { flex: 1, fontSize: font.md, color: colors.ink },
  forgot: { alignSelf: 'flex-end', marginBottom: spacing.lg },
  forgotText: { color: colors.primary, fontSize: font.sm, fontWeight: '600' },
  primaryBtn: {
    backgroundColor: colors.primary, height: 56, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center', marginTop: spacing.sm,
  },
  primaryBtnText: { color: colors.white, fontSize: font.lg, fontWeight: '700' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: spacing.xl },
  divider: { flex: 1, height: 1, backgroundColor: colors.line },
  dividerText: { marginHorizontal: spacing.md, color: colors.body, fontSize: font.sm },
  socialRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.lg },
  social: {
    width: 64, height: 54, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.line, backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
  },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xxl },
  footerText: { color: colors.body, fontSize: font.md },
  footerLink: { color: colors.primary, fontSize: font.md, fontWeight: '700' },
});