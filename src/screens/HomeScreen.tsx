import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, spacing, radius } from "../theme";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const greetingName = user?.displayName || user?.email || "there";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Welcome 👋</Text>
          <Text style={styles.name}>{greetingName}</Text>
        </View>
        <TouchableOpacity style={styles.signOut} onPress={signOut} hitSlop={8}>
          <Ionicons name="log-out-outline" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.emoji}>🛝</Text>
        <Text style={styles.title}>You're signed in!</Text>
        <Text style={styles.subtitle}>
          Playgrounds and events will show up here next.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
  },
  hello: { fontSize: font.md, color: colors.body },
  name: {
    fontSize: font.xl,
    fontWeight: "800",
    color: colors.ink,
    marginTop: 2,
  },
  signOut: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
  },
  emoji: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: font.xl, fontWeight: "800", color: colors.ink },
  subtitle: {
    fontSize: font.md,
    color: colors.body,
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
