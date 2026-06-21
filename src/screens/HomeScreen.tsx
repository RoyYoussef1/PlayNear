import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { colors, font, spacing, radius } from "../theme";
import { useAuth } from "../context/AuthContext";
import { PLAYGROUNDS } from "../data/playgrounds";
import SearchBar from "../components/SearchBar";
import CategoryChip from "../components/CategoryChip";
import { FeaturedCard, PlaygroundRow } from "../components/PlaygroundCard";

type Filter = "all" | "outdoor" | "indoor" | "top" | "free";

const FILTERS: {
  key: Filter;
  label: string;
  icon?: keyof typeof import("@expo/vector-icons").Ionicons.glyphMap;
}[] = [
  { key: "all", label: "All" },
  { key: "outdoor", label: "Outdoor", icon: "leaf-outline" },
  { key: "indoor", label: "Indoor", icon: "home-outline" },
  { key: "top", label: "Top rated", icon: "star-outline" },
  { key: "free", label: "Free", icon: "pricetag-outline" },
];

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const firstName = (user?.displayName || "there").split(" ")[0];
  const featured = useMemo(() => PLAYGROUNDS.filter((p) => p.featured), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLAYGROUNDS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q);
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "outdoor"
            ? p.type === "outdoor"
            : filter === "indoor"
              ? p.type === "indoor"
              : filter === "top"
                ? p.rating >= 4.5
                : filter === "free"
                  ? p.price === "Free"
                  : true;
      return matchesQuery && matchesFilter;
    }).sort((a, b) => a.distanceKm - b.distanceKm);
  }, [query, filter]);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.hello}>Hi {firstName} 👋</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={colors.primary} />
              <Text style={styles.location}>Baabda, Mount Lebanon</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={signOut}
            hitSlop={8}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        {/* Featured carousel */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
        >
          {featured.map((item) => (
            <FeaturedCard key={item.id} item={item} />
          ))}
        </ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((f) => (
            <CategoryChip
              key={f.key}
              label={f.label}
              icon={f.icon}
              active={filter === f.key}
              onPress={() => setFilter(f.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {query || filter !== "all" ? "Results" : "Nearby playgrounds"}
          </Text>
          <Text style={styles.count}>{results.length}</Text>
        </View>

        <View style={styles.list}>
          {results.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="search" size={32} color={colors.line} />
              <Text style={styles.emptyTitle}>No playgrounds found</Text>
              <Text style={styles.emptyText}>
                Try a different search or clear the filters.
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => {
                  setQuery("");
                  setFilter("all");
                }}
              >
                <Text style={styles.emptyBtnText}>Reset</Text>
              </TouchableOpacity>
            </View>
          ) : (
            results.map((item) => <PlaygroundRow key={item.id} item={item} />)
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  hello: { fontSize: font.xl, fontWeight: "800", color: colors.ink },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 2,
  },
  location: { fontSize: font.sm, color: colors.body },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  block: { paddingHorizontal: spacing.xl },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: font.lg, fontWeight: "800", color: colors.ink },
  seeAll: { fontSize: font.sm, color: colors.primary, fontWeight: "700" },
  count: { fontSize: font.sm, color: colors.body, fontWeight: "600" },

  carousel: { paddingHorizontal: spacing.xl, gap: spacing.md },
  filters: {
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  list: { paddingHorizontal: spacing.xl, gap: spacing.md },

  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxl,
    gap: 6,
  },
  emptyTitle: {
    fontSize: font.md,
    fontWeight: "700",
    color: colors.ink,
    marginTop: spacing.sm,
  },
  emptyText: { fontSize: font.sm, color: colors.body, textAlign: "center" },
  emptyBtn: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.line,
  },
  emptyBtnText: { color: colors.ink, fontWeight: "700", fontSize: font.sm },
});
