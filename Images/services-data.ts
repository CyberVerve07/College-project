import { PlaceHolderImagesMap } from './placeholder-images';

export const initialServices = [
  {
    id: 'maruti-alto',
    name: 'Maruti Alto',
    description: 'Perfect for couples and solo travelers navigating narrow mountain roads with ease.',
    pricing: '₹2,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-alto')?.imageUrl,
    capacity: '4 Passengers',
    features: ['Fuel Efficient', 'Compact Size', 'Mountain Specialist'],
    idealFor: 'Budget travel, couples, narrow roads'
  },
  {
    id: 'swift-dzire',
    name: 'Maruti Swift Dzire',
    description: 'A comfortable sedan offering a smooth ride for small families and town tours.',
    pricing: '₹3,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-dzire')?.imageUrl,
    capacity: '4 Passengers + Luggage',
    features: ['AC Cab', 'Comfortable Seating', 'Boot Space'],
    idealFor: 'Small families, airport transfers, city tours'
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    description: 'Reliable sedan known for its spacious cabin and comfort on long highway drives.',
    pricing: '₹3,800 / day',
    imageUrl: PlaceHolderImagesMap.get('service-etios')?.imageUrl,
    capacity: '4 Passengers + Luggage',
    features: ['Spacious', 'Smooth Ride', 'Large Boot'],
    idealFor: 'Families, commercial travel, highways'
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    description: 'The benchmark of luxury travel in the Himalayas with superior comfort and power.',
    pricing: '₹5,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-innova')?.imageUrl,
    capacity: '6-7 Passengers',
    features: ['Luxury Interior', 'Rear AC Blower', 'Captain Seats'],
    idealFor: 'Premium groups, long-distance comfort'
  },
  {
    id: 'maruti-ertiga',
    name: 'Maruti Ertiga',
    description: 'A smart hybrid MPV that balances group comfort with economical pricing.',
    pricing: '₹4,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-ertiga')?.imageUrl,
    capacity: '6 Passengers',
    features: ['Hybrid Tech', 'Spacious', 'Budget Friendly'],
    idealFor: 'Small groups, families, hill drives'
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    description: 'The ultimate 4x4 luxury SUV for a powerful presence and off-road capability.',
    pricing: '₹12,000 / day',
    imageUrl: PlaceHolderImagesMap.get('service-fortuner')?.imageUrl,
    capacity: '7 Passengers',
    features: ['Luxury 4x4', 'Premium Status', 'High Safety'],
    idealFor: 'VIP travel, off-road luxury'
  },
  {
    id: 'mahindra-bolero',
    name: 'Mahindra Bolero',
    description: 'Rugged and reliable, built to handle the toughest terrains of Himachal Pradesh.',
    pricing: '₹4,000 / day',
    imageUrl: PlaceHolderImagesMap.get('service-bolero')?.imageUrl,
    capacity: '7-8 Passengers',
    features: ['Rugged Build', 'High Clearance', 'Reliable'],
    idealFor: 'Rural travel, rough roads, budget groups'
  },
  {
    id: 'tata-sumo',
    name: 'Tata Sumo Gold',
    description: 'The legendary mountain workhorse, ideal for group travel on a budget.',
    pricing: '₹3,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-sumo')?.imageUrl,
    capacity: '7-9 Passengers',
    features: ['Tough Build', 'Cost Effective', 'High Capacity'],
    idealFor: 'Budget groups, local transport'
  },
  {
    id: 'mini-bus',
    name: 'Mini Bus / Tempo Traveller',
    description: 'Spacious and comfortable for large groups, ensuring everyone stays together.',
    pricing: '₹8,000 / day',
    imageUrl: PlaceHolderImagesMap.get('service-tempo')?.imageUrl,
    capacity: '12-16 Passengers',
    features: ['Group Comfort', 'Pushback Seats', 'Ample Luggage'],
    idealFor: 'Large groups, corporate trips, family events'
  },
  {
    id: 'mahindra-thar',
    name: 'Mahindra Thar',
    description: 'Adventure awaits with this iconic 4x4, perfect for Spiti and Leh expeditions.',
    pricing: '₹6,500 / day',
    imageUrl: PlaceHolderImagesMap.get('service-thar')?.imageUrl,
    capacity: '4 Passengers',
    features: ['Soft Top 4x4', 'Adventure Ready', 'High Ground Clearance'],
    idealFor: 'Off-roading, adventure lovers, photography'
  }
].filter(service => service.imageUrl);
