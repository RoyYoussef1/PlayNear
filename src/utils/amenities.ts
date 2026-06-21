import { Ionicons } from '@expo/vector-icons';
import { AmenityKey } from '../types';

type IconName = keyof typeof Ionicons.glyphMap;

export const AMENITY_META: Record<AmenityKey, { icon: IconName; label: string }> = {
  cafe: { icon: 'cafe-outline', label: 'Café' },
  restaurant: { icon: 'restaurant-outline', label: 'Restaurant' },
  parking: { icon: 'car-outline', label: 'Parking' },
  restroom: { icon: 'man-outline', label: 'Restrooms' },
  wifi: { icon: 'wifi-outline', label: 'Wi-Fi' },
  pets: { icon: 'paw-outline', label: 'Pet friendly' },
  shade: { icon: 'umbrella-outline', label: 'Shade' },
  water: { icon: 'water-outline', label: 'Water' },
};
