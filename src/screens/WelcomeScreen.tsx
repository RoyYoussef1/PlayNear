import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, radius, font } from '../theme';
import Button from '../components/Button';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <View style={styles.logo}>
          <Text style={styles.logoEmoji}>🎈</Text>
        </View>

        <Text style={styles.brand}>PlayNear</Text>
        <Text style={styles.tagline}>
          Discover playgrounds & family{'\n'}events near you
        </Text>
      </View>

      <View style={styles.actions}>
        <Button label="Get Started" onPress={() => navigation.navigate('Home')} />
        <Button
          label="I already have an account"
          variant="ghost"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 28,
    paddingVertical: spacing.xl,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  logoEmoji: { fontSize: 44 },
  brand: {
    fontSize: font.display,
    fontWeight: '800',
    color: colors.ink,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: font.md,
    color: colors.body,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  actions: {
    gap: 14,
    paddingHorizontal: 20,
  },
});
