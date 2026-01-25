import { PlaceHolderImagesMap } from './placeholder-images';

export const initialServices = [
  {
    name: 'Taxi Service (Sedan)',
    description: 'Our comfortable and reliable sedan taxis are perfect for city travel, airport transfers, and short trips around the Kangra valley. Enjoy a smooth ride with a professional driver.',
    pricing: 'From ₹15/km',
    imageUrl: PlaceHolderImagesMap.get('service-taxi')?.imageUrl,
    capacity: 'Up to 4 passengers',
    features: ['Air Conditioning', 'Music System', 'Professional Driver'],
    idealFor: 'Solo travelers, couples, and small families.'
  },
  {
    name: 'Innova / SUV',
    description: 'Travel in style and comfort with our spacious SUVs like the Toyota Innova. With ample legroom and luggage space, they are the ideal choice for long-distance journeys and family vacations.',
    pricing: 'From ₹22/km',
    imageUrl: PlaceHolderImagesMap.get('service-innova')?.imageUrl,
    capacity: 'Up to 7 passengers',
    features: ['Extra Luggage Space', 'Air Conditioning', 'Comfortable Seating'],
    idealFor: 'Families, group travelers, and long-distance travel.'
  },
  {
    name: 'Tempo Traveller',
    description: 'Our Tempo Travellers are perfect for large groups and extended family tours. With comfortable seating and a spacious interior, everyone can travel together without compromising on comfort.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-tempo')?.imageUrl,
    capacity: 'Up to 12 passengers',
    features: ['Spacious Interiors', 'Push-back Seats', 'Music System'],
    idealFor: 'Large groups, family functions, and corporate outings.'
  },
  {
    name: 'Alto (Hatchback)',
    description: 'The compact and efficient Maruti Alto is an excellent choice for budget-conscious travelers. Its small size makes it perfect for navigating the narrow and winding roads of the Himalayas.',
    pricing: 'From ₹12/km',
    imageUrl: PlaceHolderImagesMap.get('service-alto')?.imageUrl,
    capacity: 'Up to 4 passengers',
    features: ['Fuel Efficient', 'Compact Size', 'Easy to Park'],
    idealFor: 'Budget travel and navigating narrow roads.'
  },
  {
    name: 'Sumo / Jeep',
    description: 'For the adventurous at heart, our rugged vehicles like the Tata Sumo or similar jeeps are built to conquer the challenging terrains of the Himalayas. Ideal for off-road trips and remote destinations.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-sumo')?.imageUrl,
    capacity: 'Up to 9 passengers',
    features: ['Robust Build', 'High Ground Clearance', '4x4 Capability'],
    idealFor: 'Adventure tours and exploring remote areas.'
  },
].filter(service => service.imageUrl);
