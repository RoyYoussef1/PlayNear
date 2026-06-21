import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { colors, radius, font } from '../theme';

type Variant = 'primary' | 'ghost';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isPrimary ? 0.85 : 0.6}
      style={[
        styles.base,
        isPrimary ? styles.primary : styles.ghost,
        style,
      ]}
    >
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.ghostLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: radius.md,
  },
  ghost: {
    height: 48,
  },
  label: {
    fontWeight: '700',
  },
  primaryLabel: {
    color: colors.white,
    fontSize: font.lg,
  },
  ghostLabel: {
    color: colors.body,
    fontSize: font.sm,
    fontWeight: '600',
  },
});
