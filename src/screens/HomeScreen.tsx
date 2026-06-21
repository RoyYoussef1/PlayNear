import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, font, spacing } from '../theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🛝</Text>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          Playgrounds and events will show up here.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  subtitle: {
    fontSize: font.md,
    color: colors.body,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
