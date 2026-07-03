import React from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
  Image, Linking, Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { colors, spacing, radius, font, shadow } from '../theme';
import { getPlayground } from '../data/playgrounds';
import { AMENITY_META } from '../utils/amenities';

type Props = NativeStackScreenProps<RootStackParamList, 'PlaygroundDetail'>;

export default function PlaygroundDetailScreen({ route, navigation }: Props) {
  const insets = useSafeAreaInsets();
  const playground = getPlayground(route.params.id);

  if (!playground) {
    return (
      <View style={styles.missing}>
        <Text style={styles.missingText}>Playground not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.missingLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const p = playground;

  const openDirections = () => {
    const { latitude, longitude } = p.coords;
    const label = encodeURIComponent(p.name);
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });
    Linking.openURL(url).catch(() => {
      Linking.openURL(
        `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      );
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 + insets.bottom }}
      >
        <View>
          <Image source={{ uri: p.image }} style={styles.hero} />
          <LinearGradient
            colors={['rgba(7,25,18,0.45)', 'transparent']}
            style={styles.heroTopFade}
          />

          <TouchableOpacity
            style={[styles.backBtn, { top: insets.top + spacing.sm }]}
            onPress={() => navigation.goBack()}
            hitSlop={10}
          >
            <Ionicons name="chevron-back" size={22} color={colors.ink} />
          </TouchableOpacity>

          <View style={[styles.heroBadge, { top: insets.top + spacing.sm }]}>
            <Ionicons
              name={p.type === 'indoor' ? 'home' : 'leaf'}
              size={12}
              color={colors.white}
            />
            <Text style={styles.heroBadgeText}>
              {p.type === 'indoor' ? 'Indoor' : 'Outdoor'}
            </Text>
          </View>
        </View>

        <View style={styles.titleCard}>
          <Text style={styles.name}>{p.name}</Text>
          <View style={styles.metaRow}>
            <Ionicons name="location" size={14} color={colors.primary} />
            <Text style={styles.metaText}>{p.area} · {p.distanceKm} km away</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <View style={styles.statTop}>
                <Ionicons name="star" size={14} color={colors.amber} />
                <Text style={styles.statValue}>{p.rating.toFixed(1)}</Text>
              </View>
              <Text style={styles.statLabel}>{p.reviewCount} reviews</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{p.ageRange}</Text>
              <Text style={styles.statLabel}>Age range</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Text style={styles.statValue}>{p.price === 'Free' ? 'Free' : p.price}</Text>
              <Text style={styles.statLabel}>Entry</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{p.description}</Text>

          <View style={styles.hoursRow}>
            <Ionicons name="time-outline" size={16} color={colors.primaryDark} />
            <Text style={styles.hoursText}>{p.openHours}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenities}>
            {p.amenities.map((a) => (
              <View key={a} style={styles.amenity}>
                <View style={styles.amenityIcon}>
                  <Ionicons name={AMENITY_META[a].icon} size={16} color={colors.primaryDark} />
                </View>
                <Text style={styles.amenityLabel}>{AMENITY_META[a].label}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.actionBar, { paddingBottom: insets.bottom + spacing.md }]}>
        <TouchableOpacity style={styles.directionsBtn} onPress={openDirections} activeOpacity={0.88}>
          <Ionicons name="navigate" size={18} color={colors.white} />
          <Text style={styles.directionsText}>Get Directions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const HERO_H = 300;
const OVERLAP = 44;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  hero: { width: '100%', height: HERO_H, backgroundColor: colors.surface },
  heroTopFade: { position: 'absolute', top: 0, left: 0, right: 0, height: 90 },
  backBtn: {
    position: 'absolute', left: spacing.lg,
    width: 40, height: 40, borderRadius: 13,
    backgroundColor: 'rgba(255,255,255,0.95)',
    alignItems: 'center', justifyContent: 'center',
    ...shadow,
  },
  heroBadge: {
    position: 'absolute', right: spacing.lg,
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(7,25,18,0.6)',
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.sm,
  },
  heroBadgeText: { color: colors.white, fontSize: 11, fontWeight: '700' },

  titleCard: {
    marginTop: -OVERLAP,
    marginHorizontal: spacing.xl,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow,
  },
  name: { fontSize: font.xl, fontWeight: '800', color: colors.ink },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  metaText: { fontSize: font.sm, color: colors.body },

  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: spacing.lg, paddingTop: spacing.lg,
    borderTopWidth: 1, borderTopColor: colors.line,
  },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statValue: { fontSize: font.md, fontWeight: '800', color: colors.ink },
  statLabel: { fontSize: font.xs, color: colors.body },
  statDivider: { width: 1, height: 30, backgroundColor: colors.line },

  section: { paddingHorizontal: spacing.xl, marginTop: spacing.xl },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink, marginBottom: spacing.sm },
  description: { fontSize: font.md, color: colors.body, lineHeight: 24 },

  hoursRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    marginTop: spacing.md,
    backgroundColor: colors.mint,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  hoursText: { fontSize: font.sm, fontWeight: '600', color: colors.primaryDark },

  amenities: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  amenity: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: colors.card, borderRadius: radius.md,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    ...shadow,
  },
  amenityIcon: {
    width: 28, height: 28, borderRadius: 9, backgroundColor: colors.mint,
    alignItems: 'center', justifyContent: 'center',
  },
  amenityLabel: { fontSize: font.sm, fontWeight: '600', color: colors.ink },

  actionBar: {
    position: 'absolute', left: 0, right: 0, bottom: 0,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.xl, paddingTop: spacing.md,
    borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg,
    ...shadow,
  },
  directionsBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: colors.primary, height: 54, borderRadius: radius.md,
  },
  directionsText: { color: colors.white, fontSize: font.lg, fontWeight: '700' },

  missing: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.bg, gap: spacing.sm,
  },
  missingText: { fontSize: font.md, color: colors.body },
  missingLink: { fontSize: font.md, color: colors.primary, fontWeight: '700' },
});
