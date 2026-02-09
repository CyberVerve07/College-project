import { PlaceHolderImagesMap } from './placeholder-images';

export const initialServices = [
  {
    id: 'maruti-alto',
    name: 'Maruti Alto',
    description: 'Budget-friendly hatchback perfect for couples and navigating narrow mountain roads.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-alto')?.imageUrl,
    capacity: '4 Passengers',
    features: ['Fuel Efficient', 'Compact Size', 'Best for Narrow Roads'],
    idealFor: 'Budget travel, couples, narrow mountain roads'
  },
  {
    id: 'swift-dzire',
    name: 'Maruti Swift Dzire',
    description: 'Reliable sedan offering a comfortable ride for small families and airport transfers.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-dzire')?.imageUrl,
    capacity: '4 Passengers + Luggage',
    features: ['AC Cab', 'Comfortable Seating', 'Boot Space'],
    idealFor: 'Small families, airport transfers, city tours'
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    description: 'Spacious sedan known for its legroom and smooth ride on highways.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-etios')?.imageUrl,
    capacity: '4 Passengers + Luggage',
    features: ['Spacious Cabin', 'Smooth Ride', 'Large Boot'],
    idealFor: 'Families, commercial travel, highway trips'
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    description: 'Premium SUV offering superior comfort and power for long-distance mountain journeys.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-innova')?.imageUrl,
    capacity: '6-7 Passengers',
    features: ['Captain Seats', 'AC Blower in Rear', 'Ample Legroom'],
    idealFor: 'Families, long-distance comfort, premium travel'
  },
  {
    id: 'maruti-ertiga',
    name: 'Maruti Ertiga',
    description: 'Smart hybrid MPV offering a balance of comfort and economy for family trips.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-ertiga')?.imageUrl,
    capacity: '6 Passengers',
    features: ['Hybrid Tech', 'Comfortable', 'Budget Friendly'],
    idealFor: 'Families, budget groups, city & hill drive'
  },
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    description: 'Luxury 4x4 SUV for exclusive travel with maximum power and presence.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-fortuner')?.imageUrl,
    capacity: '7 Passengers',
    features: ['Luxury Interiors', '4x4 Power', 'Premium Status'],
    idealFor: 'VIP travel, luxury tours, off-road comfort'
  },
  {
    id: 'mahindra-bolero',
    name: 'Mahindra Bolero',
    description: 'Rugged SUV built for rough terrains and larger groups on a budget.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-bolero')?.imageUrl,
    capacity: '7-8 Passengers',
    features: ['Rugged Build', 'High Ground Clearance', 'Spacious'],
    idealFor: 'Rural travel, rough roads, budget groups'
  },
  {
    id: 'tata-sumo',
    name: 'Tata Sumo Gold',
    description: 'The workhorse of the mountains, ideal for local transport and tough roads.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-sumo')?.imageUrl,
    capacity: '7-9 Passengers',
    features: ['Tough Build', 'Good Ground Clearance', 'Cost Effective'],
    idealFor: 'Budget groups, rough terrain, local transport'
  },
  {
    id: 'mini-bus',
    name: 'Mini Bus Service',
    description: 'Comfortable mini bus for large groups travelling together with ample seating and luggage space.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-tempo')?.imageUrl,
    capacity: '12-16 Passengers',
    features: ['Comfortable Seating', 'Ample Space', 'Group Travel'],
    idealFor: 'Large groups, corporate outings, school trips'
  },
  {
    id: 'mahindra-thar',
    name: 'Mahindra Thar',
    description: 'Iconic 4x4 jeep made for off-road adventures and scenic open-top experiences.',
    pricing: 'Contact for Price',
    imageUrl: PlaceHolderImagesMap.get('service-thar')?.imageUrl,
    capacity: '4-6 Passengers',
    features: ['4x4 Capability', 'Convertible Soft Top', 'High Torque'],
    idealFor: 'Off-road adventure, Spiti Valley, photography trips'
  }
].filter(service => service.imageUrl);
