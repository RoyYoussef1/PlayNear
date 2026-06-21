import { Playground } from '../types';

const img = (label: string, bg: string) =>
  `https://placehold.co/600x400/${bg}/FFFFFF/png?text=${encodeURIComponent(label)}`;

export const PLAYGROUNDS: Playground[] = [
  {
    id: '1', name: 'Sioufi Garden Playground', type: 'outdoor', area: 'Achrafieh',
    rating: 4.7, reviewCount: 212, distanceKm: 1.2, price: 'Free',
    image: img('Sioufi Garden', '0EA371'),
    amenities: ['shade', 'water', 'restroom', 'parking'], featured: true,
  },
  {
    id: '2', name: 'KidzMondo Beirut', type: 'indoor', area: 'Beirut Waterfront',
    rating: 4.5, reviewCount: 489, distanceKm: 4.8, price: '$$',
    image: img('KidzMondo', '7C3AED'),
    amenities: ['cafe', 'restroom', 'wifi', 'parking'], featured: true,
  },
  {
    id: '3', name: 'Horsh Beirut Play Area', type: 'outdoor', area: 'Qasqas',
    rating: 4.3, reviewCount: 134, distanceKm: 3.1, price: 'Free',
    image: img('Horsh Beirut', '0EA5E9'),
    amenities: ['shade', 'water', 'pets'], featured: true,
  },
  {
    id: '4', name: 'Jungle Fun Park', type: 'indoor', area: 'Dbayeh',
    rating: 4.6, reviewCount: 301, distanceKm: 9.4, price: '$$',
    image: img('Jungle Fun Park', 'F59E0B'),
    amenities: ['cafe', 'restaurant', 'restroom', 'wifi', 'parking'],
  },
  {
    id: '5', name: 'Beirut Family Park', type: 'outdoor', area: 'Baabda',
    rating: 4.4, reviewCount: 88, distanceKm: 2.0, price: 'Free',
    image: img('Family Park', '14B8A6'),
    amenities: ['shade', 'restroom', 'parking', 'water'],
  },
  {
    id: '6', name: 'Happy Land Indoor', type: 'indoor', area: 'Hazmieh',
    rating: 4.2, reviewCount: 156, distanceKm: 2.7, price: '$',
    image: img('Happy Land', 'EC4899'),
    amenities: ['cafe', 'restroom', 'wifi'],
  },
  {
    id: '7', name: 'Cedars Adventure Yard', type: 'outdoor', area: 'Broummana',
    rating: 4.8, reviewCount: 174, distanceKm: 14.2, price: '$',
    image: img('Cedars Yard', '16A34A'),
    amenities: ['shade', 'water', 'restaurant', 'pets', 'parking'],
  },
  {
    id: '8', name: 'Little Explorers Club', type: 'indoor', area: 'Jal el Dib',
    rating: 4.1, reviewCount: 97, distanceKm: 7.3, price: '$$',
    image: img('Little Explorers', '6366F1'),
    amenities: ['cafe', 'restroom', 'wifi', 'parking'],
  },
];
