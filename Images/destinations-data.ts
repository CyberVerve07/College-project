
import { PlaceHolderImagesMap } from './placeholder-images';

export const initialDestinations = [
  {
    name: 'Dharamshala',
    description: 'Nestled in the Kangra Valley against the Dhauladhar mountains, Dharamshala is the winter capital of Himachal Pradesh. It is divided into Lower Dharamshala (commercial center) and Upper Dharamshala (McLeod Ganj), the abode of the Dalai Lama. It offers a unique blend of Tibetan culture, British colonial history, and spiritual serenity.',
    imageUrl: PlaceHolderImagesMap.get('dest-dharamshala')?.imageUrl,
    category: 'Spiritual & Cultural',
    bestTimeToVisit: 'March to June (Pleasant Summer), September to November (Clear Views)',
    attractions: ['McLeod Ganj', 'Namgyal Monastery', 'Bhagsu Nag Temple', 'Dal Lake'],
    coordinates: { lat: 32.2190, lng: 76.3234 }
  },
  {
    name: 'Manali',
    description: 'A popular honeymoon and backpacking destination, Manali offers breathtaking views of snow-capped peaks, lush green valleys, and the gushing Beas River. It is a gateway to adventure sports and high-altitude Himalayan passes.',
    imageUrl: PlaceHolderImagesMap.get('dest-manali')?.imageUrl,
    category: 'Adventure & Honeymoon',
    bestTimeToVisit: 'October to June',
    attractions: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali'],
    coordinates: { lat: 32.2432, lng: 77.1892 }
  },
  {
    name: 'Shimla',
    description: 'The "Queen of Hills" and former summer capital of British India, Shimla sits atop seven majestic hills. Famous for its neo-Gothic colonial architecture, the pedestrian-only Mall Road, and the UNESCO heritage Kalka-Shimla Toy Train. It remains a bustling hub of history, culture, and romance.',
    imageUrl: PlaceHolderImagesMap.get('dest-shimla')?.imageUrl,
    category: 'Hill Station & Heritage',
    bestTimeToVisit: 'March to June (Pleasant Summer), November to February (Winter/Snow)',
    attractions: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri'],
    coordinates: { lat: 31.1048, lng: 77.1734 }
  },
  {
    name: 'Spiti Valley',
    description: 'A cold desert mountain valley, Spiti is a land of stark landscapes, ancient monasteries, and picturesque villages. It offers an unparalleled experience for those seeking raw, untouched nature and adventure.',
    imageUrl: PlaceHolderImagesMap.get('dest-spiti')?.imageUrl,
    category: 'Adventure & Remote',
    bestTimeToVisit: 'June to September',
    attractions: ['Key Monastery', 'Chandratal Lake', 'Kaza', 'Tabo Monastery'],
    coordinates: { lat: 32.2461, lng: 78.0349 }
  },
  {
    name: 'Kangra',
    description: 'One of the oldest inhabited places in India, Kangra is a land of ancient spirituality and valor. Dominated by the majestic Kangra Fort and the sacred Masroor Rock Cut Temple, it is also known for its lush tea gardens and the artistic legacy of Kangra miniature paintings.',
    imageUrl: PlaceHolderImagesMap.get('dest-kangra')?.imageUrl,
    category: 'Nature & Heritage',
    bestTimeToVisit: 'September to November (Autumn), February to April (Spring)',
    attractions: ['Kangra Fort', 'Masroor Rock Cut Temple', 'Palampur Tea Gardens'],
    coordinates: { lat: 32.0998, lng: 76.2691 }
  },
  {
    name: 'Bir Billing',
    description: 'Known as the paragliding capital of India, Bir Billing is a haven for adventure enthusiasts. It offers world-class facilities for tandem paragliding flights with stunning aerial views of the Dhauladhar mountains.',
    imageUrl: PlaceHolderImagesMap.get('dest-birbilling')?.imageUrl,
    category: 'Adventure Sports',
    bestTimeToVisit: 'March to May, October to November',
    attractions: ['Paragliding', 'Chokling Monastery', 'Gunehar Waterfall', 'Bir Tea Factory'],
    coordinates: { lat: 32.0463, lng: 76.7198 }
  },
  {
    name: 'Palampur',
    description: 'The tea capital of northwest India, Palampur is famous for its lush tea gardens, pine forests, and mild climate. It offers a perfect retreat for nature lovers.',
    imageUrl: PlaceHolderImagesMap.get('dest-palampur')?.imageUrl,
    category: 'Nature & Tea Gardens',
    bestTimeToVisit: 'September to June',
    attractions: ['Tea Gardens', 'Neugal Khad', 'Baijnath Temple', 'Saurabh Van Vihar'],
    coordinates: { lat: 32.1109, lng: 76.5363 }
  },
  {
    name: 'Chamba',
    description: 'Situated on the banks of the Ravi River, Chamba is known for its untouched natural beauty, ancient temples, and rich Pahari paintings and handicrafts.',
    imageUrl: PlaceHolderImagesMap.get('dest-chamba')?.imageUrl,
    category: 'History & Culture',
    bestTimeToVisit: 'March to June, September to December',
    attractions: ['Lakshmi Narayan Temple', 'Bhuri Singh Museum', 'Chamera Lake', 'Manimahesh'],
    coordinates: { lat: 32.5534, lng: 76.1258 }
  },
  {
    name: 'Solan',
    description: 'Known as the "Mushroom City of India", Solan offers pleasant weather year-round. It is a great stopover with ancient temples and vibrant local culture.',
    imageUrl: PlaceHolderImagesMap.get('dest-solan')?.imageUrl,
    category: 'City & Culture',
    bestTimeToVisit: 'February to May, August to November',
    attractions: ['Shoolini Mata Temple', 'Jatoli Shiv Temple', 'Mohan Shakti Park', 'Kasauli (Nearby)'],
    coordinates: { lat: 30.9084, lng: 77.0999 }
  },
  {
    name: 'Baglamukhi Temple',
    description: 'A dedicated temple to Goddess Baglamukhi, believed to grant victory over enemies. A spiritual center visited by devotees from all over.',
    imageUrl: 'https://searchothings.com/wp-content/uploads/2024/09/Untitled-design-22-1024x538.png',
    category: 'Spiritual & Pilgrimage',
    bestTimeToVisit: 'Year-round',
    attractions: ['Baglamukhi Temple', 'Bankhandi', 'Kangra Fort (Nearby)', 'Chintpurni Temple (Nearby)'],
    coordinates: { lat: 31.9706, lng: 76.2165 }
  },
  {
    name: 'Bharmour',
    description: 'Ancient town with the sacred Chaurasi Temple complex consisting of 84 shrines. Gateway to the holy Manimahesh Lake pilgrimage in the Pir Panjal range.',
    imageUrl: PlaceHolderImagesMap.get('dest-bharmour')?.imageUrl,
    category: 'Spiritual & Heritage',
    bestTimeToVisit: 'April to October',
    attractions: ['Chaurasi Temple Complex', 'Manimahesh Temple', 'Bharmani Temple', 'Lakshana Devi Temple'],
    coordinates: { lat: 32.4432, lng: 76.5363 }
  },
  {
    name: 'Kullu',
    description: 'The picturesque Kullu Valley is famous for its scenic beauty, Beas River, apple orchards, and adventure sports. Known as the gateway to Lahaul-Spiti and Manali.',
    imageUrl: PlaceHolderImagesMap.get('dest-kullu')?.imageUrl,
    category: 'Nature & Adventure',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Great Himalayan National Park', 'Raghunath Temple', 'Bijli Mahadev', 'Kasol Valley'],
    coordinates: { lat: 31.9566, lng: 77.1111 }
  },
  {
    name: 'Pangi Valley',
    description: 'One of the most remote and unexplored valleys in Himachal Pradesh, Pangi offers dramatic landscapes, the Chandrabhaga River, and thrilling mountain roads.',
    imageUrl: PlaceHolderImagesMap.get('dest-pangi')?.imageUrl,
    category: 'Remote & Adventure',
    bestTimeToVisit: 'June to September',
    attractions: ['Killar', 'Sach Pass', 'Chandrabhaga River', 'Mindhal Lake'],
    coordinates: { lat: 33.0906, lng: 76.5542 }
  },
  {
    name: 'Bilaspur',
    description: 'Home to the stunning Gobind Sagar Lake and Bhakra Dam, Bilaspur offers beautiful water views, boating, and a peaceful atmosphere away from crowded tourist spots.',
    imageUrl: PlaceHolderImagesMap.get('dest-bilaspur')?.imageUrl,
    category: 'Lake & Scenic',
    bestTimeToVisit: 'October to March',
    attractions: ['Gobind Sagar Lake', 'Bhakra Dam', 'Naina Devi Temple', 'Vyas Cave'],
    coordinates: { lat: 31.3260, lng: 76.7567 }
  },
  {
    name: 'Narkanda',
    description: 'A charming hill station known for Hatu Peak, apple orchards, and skiing in winter. Offers panoramic views of snow-clad Himalayan peaks and peaceful pine forests.',
    imageUrl: PlaceHolderImagesMap.get('dest-narkanda')?.imageUrl,
    category: 'Hill Station & Winter Sports',
    bestTimeToVisit: 'December to February (for snow), March to June',
    attractions: ['Hatu Peak', 'Hatu Mata Temple', 'Skiing', 'Stokes Farm'],
    coordinates: { lat: 31.2618, lng: 77.4608 }
  },
  {
    name: 'Kasauli',
    description: 'A serene colonial-era hill station nestled in the Himalayan foothills with pine forests, scenic viewpoints like Monkey Point, and heritage churches dating back to the British era.',
    imageUrl: PlaceHolderImagesMap.get('dest-kasauli')?.imageUrl,
    category: 'Hill Station & Heritage',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Monkey Point', 'Christ Church', 'Gilbert Trail', 'Sunset Point'],
    coordinates: { lat: 30.9013, lng: 76.9649 }
  },
  {
    name: 'Dalhousie',
    description: 'A charming colonial hill station situated on five hills with beautiful views of the Pir Panjal and Dhauladhar ranges. Known for its pine-covered slopes and Victorian architecture.',
    imageUrl: PlaceHolderImagesMap.get('dest-dalhousie')?.imageUrl,
    category: 'Hill Station & Colonial',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Khajjiar', 'Dainkund Peak', 'Kalatop Wildlife Sanctuary', 'Panchpula'],
    coordinates: { lat: 32.5359, lng: 75.9647 }
  },
  {
    name: 'Kasol',
    description: 'A backpacker\'s paradise in the beautiful Parvati Valley, famous for its Israeli cafes, scenic treks to Kheerganga and Tosh, and the gushing Parvati River.',
    imageUrl: PlaceHolderImagesMap.get('dest-kasol')?.imageUrl,
    category: 'Backpacking & Trekking',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Kheerganga Trek', 'Tosh Village', 'Chalal', 'Parvati River'],
    coordinates: { lat: 32.0097, lng: 77.3150 }
  },
  {
    name: 'Khajjiar',
    description: 'Called the "Mini Switzerland of India", Khajjiar features a saucer-shaped meadow, a serene lake, and is surrounded by dense deodar forests with views of the Dhauladhar peaks.',
    imageUrl: PlaceHolderImagesMap.get('dest-khajjiar')?.imageUrl,
    category: 'Meadow & Scenic',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Khajjiar Lake', 'Khajji Nag Temple', 'Golden Devi Temple', 'Zorbing'],
    coordinates: { lat: 32.5558, lng: 76.0652 }
  },
  {
    name: 'Kufri',
    description: 'A popular winter destination near Shimla known for skiing, snow activities, and yak rides. Home to the Himalayan Nature Park with diverse wildlife.',
    imageUrl: PlaceHolderImagesMap.get('dest-kufri')?.imageUrl,
    category: 'Winter Sports & Wildlife',
    bestTimeToVisit: 'November to February (for snow), March to June',
    attractions: ['Skiing', 'Himalayan Nature Park', 'Mahasu Peak', 'Fagu'],
    coordinates: { lat: 31.0979, lng: 77.2688 }
  },
  {
    name: 'McLeod Ganj',
    description: 'Home to His Holiness the Dalai Lama and the Tibetan government-in-exile. A vibrant hub of Tibetan culture, Buddhist monasteries, cafes, and spiritual retreats.',
    imageUrl: PlaceHolderImagesMap.get('dest-mcleodganj')?.imageUrl,
    category: 'Spiritual & Cultural',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Dalai Lama Temple', 'Bhagsu Waterfall', 'Triund Trek', 'Tibetan Museum'],
    coordinates: { lat: 32.2426, lng: 76.3213 }
  },
  {
    name: 'Tabo',
    description: 'An ancient monastery town in Spiti Valley housing the 1000-year-old Tabo Monastery, a UNESCO World Heritage candidate with priceless Buddhist murals and art.',
    imageUrl: PlaceHolderImagesMap.get('dest-tabo')?.imageUrl,
    category: 'Heritage & Spiritual',
    bestTimeToVisit: 'June to September',
    attractions: ['Tabo Monastery', 'Tabo Caves', 'Ancient Murals', 'Golden Temple'],
    coordinates: { lat: 32.0924, lng: 78.3812 }
  },
  {
    name: 'Malana',
    description: 'A remote ancient village perched high in the Malana Nala, famous for its unique customs, ancient democratic system, and stunning mountain backdrop.',
    imageUrl: PlaceHolderImagesMap.get('dest-malana')?.imageUrl,
    category: 'Remote & Cultural',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Malana Village', 'Jamadagni Temple', 'Malana Dam', 'Trek to Chandrakhani Pass'],
    coordinates: { lat: 32.0626, lng: 77.2626 }
  },
  {
    name: 'Kinnaur Valley',
    description: 'A scenic valley on the Indo-Tibetan border, famous for apple orchards, the sacred Kinner Kailash peak, ancient temples, and the dramatic Sutlej River gorge.',
    imageUrl: PlaceHolderImagesMap.get('dest-kinnaur')?.imageUrl,
    category: 'Scenic & Adventure',
    bestTimeToVisit: 'April to October',
    attractions: ['Kalpa', 'Kinner Kailash', 'Reckong Peo', 'Chitkul'],
    coordinates: { lat: 31.6510, lng: 78.4754 }
  },
  {
    name: 'Chail',
    description: 'A peaceful hill station famous for having the world\'s highest cricket ground, the heritage Chail Palace, and a wildlife sanctuary with rich flora and fauna.',
    imageUrl: PlaceHolderImagesMap.get('dest-chail')?.imageUrl,
    category: 'Heritage & Wildlife',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['Chail Cricket Ground', 'Chail Palace', 'Chail Wildlife Sanctuary', 'Kali Ka Tibba'],
    coordinates: { lat: 30.9678, lng: 77.1891 }
  },
].filter(dest => dest.imageUrl);
