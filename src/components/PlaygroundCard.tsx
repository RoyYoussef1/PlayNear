import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Playground } from "../types";
import { colors, radius, spacing, font } from "../theme";
import { AMENITY_META } from "../utils/amenities";

export function FeaturedCard({
  item,
  onPress,
}: {
  item: Playground;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.fCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.fImage} />
        {/* type badge */}
        <View style={styles.fBadge}>
          <Ionicons
            name={item.type === "indoor" ? "home" : "leaf"}
            size={12}
            color={colors.white}
          />
          <Text style={styles.fBadgeText}>
            {item.type === "indoor" ? "Indoor" : "Outdoor"}
          </Text>
        </View>
        {/* rating pill */}
        <View style={styles.fRating}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.fRatingText}>{item.rating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.fBody}>
        <Text style={styles.fName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color={colors.body} />
          <Text style={styles.fMeta} numberOfLines={1}>
            {item.area} · {item.distanceKm} km
          </Text>
        </View>
        <Text style={styles.fPrice}>
          {item.price === "Free" ? "Free entry" : item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function PlaygroundRow({
  item,
  onPress,
}: {
  item: Playground;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.rCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <Image source={{ uri: item.image }} style={styles.rImage} />
      <View style={styles.rBody}>
        <Text style={styles.rName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.row}>
          <Ionicons name="location-outline" size={13} color={colors.body} />
          <Text style={styles.rMeta} numberOfLines={1}>
            {item.area} · {item.distanceKm} km
          </Text>
        </View>
        <View style={styles.rFooter}>
          <View style={styles.rRating}>
            <Ionicons name="star" size={13} color="#F59E0B" />
            <Text style={styles.rRatingText}>{item.rating.toFixed(1)}</Text>
            <Text style={styles.rReviews}>({item.reviewCount})</Text>
          </View>
          <View style={styles.rAmenities}>
            {item.amenities.slice(0, 3).map((a) => (
              <Ionicons
                key={a}
                name={AMENITY_META[a].icon}
                size={14}
                color={colors.body}
                style={{ marginLeft: 8 }}
              />
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 4 },

  fCard: {
    width: 240,
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    overflow: "hidden",
  },
  fImage: { width: "100%", height: 140, backgroundColor: colors.surface },
  fBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(15,23,42,0.72)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  fBadgeText: { color: colors.white, fontSize: 11, fontWeight: "700" },
  fRating: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  fRatingText: { color: colors.ink, fontSize: 12, fontWeight: "700" },
  fBody: { padding: spacing.md },
  fName: { fontSize: font.md, fontWeight: "700", color: colors.ink },
  fMeta: { fontSize: font.sm, color: colors.body, flexShrink: 1 },
  fPrice: {
    fontSize: font.sm,
    color: colors.primary,
    fontWeight: "700",
    marginTop: 6,
  },

  rCard: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.line,
    padding: spacing.sm,
    gap: spacing.md,
  },
  rImage: {
    width: 92,
    height: 92,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  rBody: { flex: 1, justifyContent: "space-between", paddingVertical: 2 },
  rName: { fontSize: font.md, fontWeight: "700", color: colors.ink },
  rMeta: { fontSize: font.sm, color: colors.body, flexShrink: 1 },
  rFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  rRatingText: { fontSize: font.sm, fontWeight: "700", color: colors.ink },
  rReviews: { fontSize: 12, color: colors.body },
  rAmenities: { flexDirection: "row", alignItems: "center" },
});
