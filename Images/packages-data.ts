export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  imageUrl: string;
  overview: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  destinations: string[];
}

export const initialTourPackages: TourPackage[] = [
  {
    id: 'spiti-expedition-5d',
    title: 'Spiti Valley Winter Expedition',
    subtitle: 'Kinnar to Spiti snowy wonderland circuit',
    duration: '5 Days / 4 Nights',
    price: '₹14,999 per person',
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&q=80',
    overview: 'Witness the frozen waterfall of Sissu, mystical monasteries of Kaza, and the high-altitude bridge of Chicham in an epic winter drive.',
    destinations: ['Shimla', 'Sangla', 'Kalpa', 'Kaza', 'Chicham'],
    itinerary: [
      { day: 1, title: 'Arrival in Shimla & Drive to Kalpa', description: 'Meet our local guide in Shimla, board our luxury SUV, and drive through Pinewood highways to Kalpa. Enjoy the view of Kinner Kailash peak.' },
      { day: 2, title: 'Kalpa to Kaza via Nako', description: 'Drive along the Satluj River, entering Spiti Valley. Visit Nako Lake and Monastery, and reach Kaza by night.' },
      { day: 3, title: 'Key Monastery & Kibber Village', description: 'Explore the iconic Key Gompa perched on a hill, visit Kibber village, and walk across Chicham Bridge (Asia\'s highest bridge).' },
      { day: 4, title: 'Pin Valley & Dhankar Monastery', description: 'Witness the snowy fields of Pin Valley National Park and visit the ancient cliffside Dhankar Monastery.' },
      { day: 5, title: 'Return Journey to Shimla', description: 'Start the return journey down to Shimla with memories of a lifetime.' }
    ],
    inclusions: ['4x4 Premium SUV Transport', 'Deluxe Homestay Stays', 'Breakfast & Dinner', 'Local Guide & Driver', 'Permits & Taxes'],
    exclusions: ['Lunch & Snacks', 'Adventure Activities', 'Personal Expenses', 'Flight/Train tickets to Shimla']
  },
  {
    id: 'dharamshala-adventure-4d',
    title: 'Dharamshala & Bir Billing Escape',
    subtitle: 'Trekking, monasteries, and paragliding',
    duration: '4 Days / 3 Nights',
    price: '₹8,499 per person',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    overview: 'Perfect weekend escape blending the spiritual vibes of Dharamshala, the paragliding heights of Bir, and local Kangra cuisine.',
    destinations: ['Dharamshala', 'McLeod Ganj', 'Bir Billing', 'Dharamkot'],
    itinerary: [
      { day: 1, title: 'Dharamshala Arrival & McLeod Ganj Tour', description: 'Arrive in Dharamshala. Check in to your resort, visit the Dalai Lama Temple, and explore local Tibetan markets.' },
      { day: 2, title: 'Triund Ridge Day Hike', description: 'Embark on a guided trek to Triund Peak. Enjoy panoramic views of the Dhauladhar Range and Kangra Valley.' },
      { day: 3, title: 'Drive to Bir Billing & Paragliding', description: 'Travel to Bir (the paragliding capital of India). Experience a tandem paragliding flight from Billing landing in Bir.' },
      { day: 4, title: 'Departure via Kangra Fort', description: 'Visit the historical Kangra Fort and Masrur Rock Cut Temples before checking out.' }
    ],
    inclusions: ['Private Cab for Sightseeing', 'Premium Resort Stays', 'Breakfast', 'Tandem Paragliding Flight', 'Guided Triund Trek'],
    exclusions: ['Dinner & Lunch', 'Monument Entry Fees', 'Personal Expenses']
  },
  {
    id: 'manali-solang-honeymoon-4d',
    title: 'Manali & Solang Valley Special',
    subtitle: 'Riverside stays and snowy adventures',
    duration: '4 Days / 3 Nights',
    price: '₹9,999 per person',
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80',
    overview: 'A premium retreat in Manali featuring luxury cottages by the Beas River, Solang snow sports, and Atal Tunnel excursion.',
    destinations: ['Manali', 'Old Manali', 'Solang Valley', 'Sissu'],
    itinerary: [
      { day: 1, title: 'Arrival in Manali & Riverside Walk', description: 'Arrive at our luxury riverside resort. Explore Hadimba Temple and walk around the hippie cafes of Old Manali.' },
      { day: 2, title: 'Solang Valley Adventure Day', description: 'Head to Solang Valley for snow skiing, quad biking, and zorbing. Enjoy beautiful snow capped views.' },
      { day: 3, title: 'Sissu Excursion via Atal Tunnel', description: 'Drive through the engineering marvel of Atal Tunnel to reach Sissu in Lahaul. Witness Sissu waterfall.' },
      { day: 4, title: 'Naggar Castle & Departure', description: 'Visit the heritage Naggar Castle and enjoy local Himachali food before checking out.' }
    ],
    inclusions: ['Private Cab Transport', 'Luxury Riverside Resort', 'All Breakfasts & Dinners', 'Atal Tunnel Permit', 'Driver Allowances'],
    exclusions: ['Snow activities/gear rental', 'Lunch', 'Tips & Personal Expenses']
  }
];
