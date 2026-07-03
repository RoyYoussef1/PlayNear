import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Playground } from "../types";
import { colors, radius, spacing, font, shadow } from "../theme";
import { AMENITY_META } from "../utils/amenities";

const { width: SCREEN_W } = Dimensions.get("window");
export const FEATURED_W = Math.round(SCREEN_W * 0.72);


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
      activeOpacity={0.92}
      onPress={onPress}
    >
      <Image source={{ uri: item.image }} style={styles.fImage} />

      <LinearGradient
        colors={["transparent", "rgba(7,25,18,0.82)"]}
        style={styles.fGradient}
      />

      <View style={styles.fRating}>
        <Ionicons name="star" size={12} color={colors.amber} />
        <Text style={styles.fRatingText}>{item.rating.toFixed(1)}</Text>
      </View>

      <View style={styles.fBadge}>
        <Ionicons
          name={item.type === "indoor" ? "home" : "leaf"}
          size={11}
          color={colors.white}
        />
        <Text style={styles.fBadgeText}>
          {item.type === "indoor" ? "Indoor" : "Outdoor"}
        </Text>
      </View>

      <View style={styles.fInfo}>
        <Text style={styles.fName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.fMetaRow}>
          <Ionicons name="location" size={12} color="rgba(255,255,255,0.85)" />
          <Text style={styles.fMeta} numberOfLines={1}>
            {item.area} · {item.distanceKm} km
          </Text>
          <View style={styles.fDot} />
          <Text style={styles.fPrice}>
            {item.price === "Free" ? "Free" : item.price}
          </Text>
        </View>
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
      activeOpacity={0.92}
      onPress={onPress}
    >
      <View>
        <Image source={{ uri: item.image }} style={styles.rImage} />
        <View style={styles.rDistance}>
          <Text style={styles.rDistanceText}>{item.distanceKm} km</Text>
        </View>
      </View>

      <View style={styles.rBody}>
        <View style={styles.rTop}>
          <Text style={styles.rName} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.rRating}>
            <Ionicons name="star" size={12} color={colors.amber} />
            <Text style={styles.rRatingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.rMetaRow}>
          <Ionicons name="location-outline" size={13} color={colors.body} />
          <Text style={styles.rMeta} numberOfLines={1}>
            {item.area}
          </Text>
        </View>

        <View style={styles.rFooter}>
          <View
            style={[
              styles.rTypePill,
              item.type === "indoor" ? styles.rTypeIndoor : styles.rTypeOutdoor,
            ]}
          >
            <Text
              style={[
                styles.rTypeText,
                item.type === "indoor"
                  ? styles.rTypeTextIndoor
                  : styles.rTypeTextOutdoor,
              ]}
            >
              {item.type === "indoor" ? "Indoor" : "Outdoor"}
            </Text>
          </View>
          <View style={styles.rAmenities}>
            {item.amenities.slice(0, 3).map((a) => (
              <View key={a} style={styles.rAmenity}>
                <Ionicons
                  name={AMENITY_META[a].icon}
                  size={13}
                  color={colors.primaryDark}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fCard: {
    width: FEATURED_W,
    height: 200,
    borderRadius: radius.lg,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },
  fImage: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  fGradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
  },
  fRating: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(255,255,255,0.94)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  fRatingText: { color: colors.ink, fontSize: font.xs, fontWeight: "800" },
  fBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(7,25,18,0.55)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radius.sm,
  },
  fBadgeText: { color: colors.white, fontSize: 11, fontWeight: "700" },
  fInfo: { position: "absolute", left: 14, right: 14, bottom: 12 },
  fName: { color: colors.white, fontSize: font.lg, fontWeight: "800" },
  fMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  fMeta: { color: "rgba(255,255,255,0.85)", fontSize: font.xs, flexShrink: 1 },
  fDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  fPrice: { color: colors.white, fontSize: font.xs, fontWeight: "700" },

  /* row */
  rCard: {
    flexDirection: "row",
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.sm,
    gap: spacing.md,
    ...shadow,
  },
  rImage: {
    width: 100,
    height: 100,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  rDistance: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(7,25,18,0.65)",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
  },
  rDistanceText: { color: colors.white, fontSize: 10, fontWeight: "700" },
  rBody: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingRight: 4,
  },
  rTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  rName: { flex: 1, fontSize: font.md, fontWeight: "700", color: colors.ink },
  rRating: { flexDirection: "row", alignItems: "center", gap: 3 },
  rRatingText: { fontSize: font.xs, fontWeight: "800", color: colors.ink },
  rMetaRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  rMeta: { fontSize: font.sm, color: colors.body, flexShrink: 1 },
  rFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rTypePill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  rTypeOutdoor: { backgroundColor: colors.mint },
  rTypeIndoor: { backgroundColor: "#EDE9FE" },
  rTypeText: { fontSize: 11, fontWeight: "700" },
  rTypeTextOutdoor: { color: colors.primaryDark },
  rTypeTextIndoor: { color: "#6D28D9" },
  rAmenities: { flexDirection: "row", gap: 4 },
  rAmenity: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
});
