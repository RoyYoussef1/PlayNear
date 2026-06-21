import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, font } from "../theme";

interface Props {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active: boolean;
  onPress: () => void;
}

export default function CategoryChip({ label, icon, active, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={16}
          color={active ? colors.white : colors.body}
        />
      )}
      <Text
        style={[styles.label, active ? styles.labelActive : styles.labelIdle]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 38,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
  },
  chipIdle: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: { fontSize: font.sm, fontWeight: "600" },
  labelIdle: { color: colors.body },
  labelActive: { color: colors.white },
});
