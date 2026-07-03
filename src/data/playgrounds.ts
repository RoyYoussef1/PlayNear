import { Playground } from '../types';

const img = (label: string, bg: string) =>
  `https://placehold.co/600x400/${bg}/FFFFFF/png?text=${encodeURIComponent(label)}`;

export const PLAYGROUNDS: Playground[] = [
  {
    id: '1', name: 'Sioufi Garden Playground', type: 'outdoor', area: 'Achrafieh',
    rating: 4.7, reviewCount: 212, distanceKm: 1.2, price: 'Free',
    image: img('Sioufi Garden', '0EA371'),
    amenities: ['shade', 'water', 'restroom', 'parking'], featured: true,
    description:
      'A leafy neighbourhood favourite in the heart of Achrafieh. Shaded climbing frames, swings for all ages, and plenty of benches for parents. Mornings are quiet; weekends get lively.',
    coords: { latitude: 33.8781, longitude: 35.5215 },
    ageRange: '2–12 yrs', openHours: '7:00 AM – 8:00 PM',
  },
  {
    id: '2', name: 'KidzMondo Beirut', type: 'indoor', area: 'Beirut Waterfront',
    rating: 4.5, reviewCount: 489, distanceKm: 4.8, price: '$$',
    image: img('KidzMondo', '7C3AED'),
    amenities: ['cafe', 'restroom', 'wifi', 'parking'], featured: true,
    description:
      'An indoor mini-city where kids role-play real professions — pilot, doctor, firefighter and more. Air-conditioned, supervised, and great for a full-day visit whatever the weather.',
    coords: { latitude: 33.9019, longitude: 35.5108 },
    ageRange: '4–14 yrs', openHours: '10:00 AM – 7:00 PM',
  },
  {
    id: '3', name: 'Horsh Beirut Play Area', type: 'outdoor', area: 'Qasqas',
    rating: 4.3, reviewCount: 134, distanceKm: 3.1, price: 'Free',
    image: img('Horsh Beirut', '0EA5E9'),
    amenities: ['shade', 'water', 'pets'], featured: true,
    description:
      "Beirut's largest green space, with open lawns, pine shade and a fenced play corner. Bring a picnic — there's room to run that you won't find anywhere else in the city.",
    coords: { latitude: 33.8672, longitude: 35.5010 },
    ageRange: 'All ages', openHours: '7:00 AM – 7:00 PM',
  },
  {
    id: '4', name: 'Jungle Fun Park', type: 'indoor', area: 'Dbayeh',
    rating: 4.6, reviewCount: 301, distanceKm: 9.4, price: '$$',
    image: img('Jungle Fun Park', 'F59E0B'),
    amenities: ['cafe', 'restaurant', 'restroom', 'wifi', 'parking'],
    description:
      'Multi-level soft-play jungle with slides, ball pits and a toddler zone, plus a proper café so parents can actually sit down. Socks required — grippy ones sold at the desk.',
    coords: { latitude: 33.9425, longitude: 35.5872 },
    ageRange: '1–10 yrs', openHours: '10:00 AM – 9:00 PM',
  },
  {
    id: '5', name: 'Beirut Family Park', type: 'outdoor', area: 'Baabda',
    rating: 4.4, reviewCount: 88, distanceKm: 2.0, price: 'Free',
    image: img('Family Park', '14B8A6'),
    amenities: ['shade', 'restroom', 'parking', 'water'],
    description:
      'A calm, well-kept park close to Baabda with modern equipment, rubber flooring and good shade cover in the afternoon. Easy parking makes it a reliable quick outing.',
    coords: { latitude: 33.8339, longitude: 35.5442 },
    ageRange: '2–10 yrs', openHours: '8:00 AM – 8:00 PM',
  },
  {
    id: '6', name: 'Happy Land Indoor', type: 'indoor', area: 'Hazmieh',
    rating: 4.2, reviewCount: 156, distanceKm: 2.7, price: '$',
    image: img('Happy Land', 'EC4899'),
    amenities: ['cafe', 'restroom', 'wifi'],
    description:
      'Compact indoor play centre that punches above its size: trampolines, arcade corner and a snack bar. Weekday afternoons are the sweet spot for smaller crowds.',
    coords: { latitude: 33.8494, longitude: 35.5442 },
    ageRange: '3–12 yrs', openHours: '11:00 AM – 8:00 PM',
  },
  {
    id: '7', name: 'Cedars Adventure Yard', type: 'outdoor', area: 'Broummana',
    rating: 4.8, reviewCount: 174, distanceKm: 14.2, price: '$',
    image: img('Cedars Yard', '16A34A'),
    amenities: ['shade', 'water', 'restaurant', 'pets', 'parking'],
    description:
      'Mountain-air adventure playground among the pines — rope courses, wooden forts and zip lines, with a family restaurant on site. Worth the drive on a hot day; noticeably cooler than the coast.',
    coords: { latitude: 33.9081, longitude: 35.6197 },
    ageRange: '4–15 yrs', openHours: '9:00 AM – 7:00 PM',
  },
  {
    id: '8', name: 'Little Explorers Club', type: 'indoor', area: 'Jal el Dib',
    rating: 4.1, reviewCount: 97, distanceKm: 7.3, price: '$$',
    image: img('Little Explorers', '6366F1'),
    amenities: ['cafe', 'restroom', 'wifi', 'parking'],
    description:
      'A gentle sensory-play space designed for the youngest explorers, with a dedicated baby zone and story corner. Staff run short activities on the hour.',
    coords: { latitude: 33.9448, longitude: 35.5942 },
    ageRange: '0–6 yrs', openHours: '9:00 AM – 6:00 PM',
  },
];

export const getPlayground = (id: string) =>
  PLAYGROUNDS.find((p) => p.id === id);
