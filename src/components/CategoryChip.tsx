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
          size={15}
          color={active ? colors.white : colors.primaryDark}
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
    borderRadius: 19,
  },
  chipIdle: { backgroundColor: colors.mint },
  chipActive: { backgroundColor: colors.primary },
  label: { fontSize: font.sm, fontWeight: "600" },
  labelIdle: { color: colors.primaryDark },
  labelActive: { color: colors.white },
});
