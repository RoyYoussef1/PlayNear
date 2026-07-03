import React, { useMemo, useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors, font, spacing, radius } from '../theme';
import { useAuth } from '../context/AuthContext';
import { PLAYGROUNDS } from '../data/playgrounds';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';
import { FeaturedCard, PlaygroundRow, FEATURED_W } from '../components/PlaygroundCard';

type Filter = 'all' | 'outdoor' | 'indoor' | 'top' | 'free';

const FILTERS: { key: Filter; label: string; icon?: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'all', label: 'All' },
  { key: 'outdoor', label: 'Outdoor', icon: 'leaf-outline' },
  { key: 'indoor', label: 'Indoor', icon: 'home-outline' },
  { key: 'top', label: 'Top rated', icon: 'star-outline' },
  { key: 'free', label: 'Free', icon: 'pricetag-outline' },
];

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  const firstName = (user?.displayName || 'there').split(' ')[0];
  const initial = firstName.charAt(0).toUpperCase();
  const featured = useMemo(() => PLAYGROUNDS.filter((p) => p.featured), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PLAYGROUNDS
      .filter((p) => {
        const matchesQuery =
          !q || p.name.toLowerCase().includes(q) || p.area.toLowerCase().includes(q);
        const matchesFilter =
          filter === 'all' ? true :
          filter === 'outdoor' ? p.type === 'outdoor' :
          filter === 'indoor' ? p.type === 'indoor' :
          filter === 'top' ? p.rating >= 4.5 :
          p.price === 'Free';
        return matchesQuery && matchesFilter;
      })
      .sort((a, b) => a.distanceKm - b.distanceKm);
  }, [query, filter]);

  const searching = query.trim().length > 0 || filter !== 'all';

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxl + insets.bottom }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.canopy, { paddingTop: insets.top + spacing.md }]}>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={13} color="#7BE0B8" />
                <Text style={styles.location}>Baabda, Mount Lebanon</Text>
              </View>
              <Text style={styles.hello}>Hi {firstName}, where{'\n'}shall we play today?</Text>
            </View>

            <TouchableOpacity style={styles.avatar} onPress={signOut} activeOpacity={0.8}>
              <Text style={styles.avatarText}>{initial}</Text>
            </TouchableOpacity>
          </View>

          <SearchBar value={query} onChangeText={setQuery} />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          snapToInterval={FEATURED_W + spacing.md}
          decelerationRate="fast"
          snapToAlignment="start"
          style={styles.carouselWrap}
        >
          {featured.map((item) => (
            <FeaturedCard
              key={item.id}
              item={item}
              onPress={() => navigation.navigate('PlaygroundDetail', { id: item.id })}
            />
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
            {searching ? 'Results' : 'Nearby playgrounds'}
          </Text>
          <View style={styles.countPill}>
            <Text style={styles.countText}>{results.length}</Text>
          </View>
        </View>

        <View style={styles.list}>
          {results.length === 0 ? (
            <View style={styles.empty}>
              <View style={styles.emptyIcon}>
                <Ionicons name="search" size={26} color={colors.primary} />
              </View>
              <Text style={styles.emptyTitle}>No playgrounds found</Text>
              <Text style={styles.emptyText}>
                Try a different search or clear the filters.
              </Text>
              <TouchableOpacity
                style={styles.emptyBtn}
                onPress={() => { setQuery(''); setFilter('all'); }}
                activeOpacity={0.85}
              >
                <Text style={styles.emptyBtnText}>Clear search</Text>
              </TouchableOpacity>
            </View>
          ) : (
            results.map((item) => (
              <PlaygroundRow
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('PlaygroundDetail', { id: item.id })}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const CANOPY_OVERLAP = 64;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },

  canopy: {
    backgroundColor: colors.canopy,
    paddingHorizontal: spacing.xl,
    paddingBottom: CANOPY_OVERLAP + spacing.md,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 6 },
  location: { color: '#A9D9C3', fontSize: font.xs, fontWeight: '600' },
  hello: { color: colors.white, fontSize: font.xl, fontWeight: '800', lineHeight: 29 },
  avatar: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: colors.canopyLight,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.18)',
  },
  avatarText: { color: colors.white, fontSize: font.md, fontWeight: '800' },

  carouselWrap: { marginTop: -CANOPY_OVERLAP },
  carousel: { paddingHorizontal: spacing.xl, gap: spacing.md, paddingBottom: 4 },

  filters: {
    paddingHorizontal: spacing.xl, gap: spacing.sm, marginTop: spacing.xl,
  },

  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingHorizontal: spacing.xl, marginTop: spacing.xl, marginBottom: spacing.md,
  },
  sectionTitle: { fontSize: font.lg, fontWeight: '800', color: colors.ink },
  countPill: {
    minWidth: 24, height: 22, paddingHorizontal: 7, borderRadius: 11,
    backgroundColor: colors.mint, alignItems: 'center', justifyContent: 'center',
  },
  countText: { fontSize: font.xs, fontWeight: '800', color: colors.primaryDark },

  list: { paddingHorizontal: spacing.xl, gap: spacing.md },

  empty: { alignItems: 'center', paddingVertical: spacing.xxl, gap: 6 },
  emptyIcon: {
    width: 56, height: 56, borderRadius: 18, backgroundColor: colors.mint,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  emptyTitle: { fontSize: font.md, fontWeight: '700', color: colors.ink },
  emptyText: { fontSize: font.sm, color: colors.body, textAlign: 'center' },
  emptyBtn: {
    marginTop: spacing.md, paddingHorizontal: spacing.xl, height: 42,
    backgroundColor: colors.primary, borderRadius: radius.md,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyBtnText: { color: colors.white, fontWeight: '700', fontSize: font.sm },
});
