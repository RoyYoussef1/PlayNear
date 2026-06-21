export type PlaygroundType = 'outdoor' | 'indoor';

export type AmenityKey =
  | 'cafe'
  | 'restaurant'
  | 'parking'
  | 'restroom'
  | 'wifi'
  | 'pets'
  | 'shade'
  | 'water';

export interface Playground {
  id: string;
  name: string;
  type: PlaygroundType;
  area: string;
  rating: number;
  reviewCount: number;
  distanceKm: number; 
  price: 'Free' | string;
  image: string;
  amenities: AmenityKey[];
  featured?: boolean;
}
