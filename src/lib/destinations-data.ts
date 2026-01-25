
import { PlaceHolderImagesMap } from './placeholder-images';

export const initialDestinations = [
  {
    name: 'Dharamshala',
    description: 'Home to the Dalai Lama, Dharamshala is a vibrant town known for its Tibetan culture, monasteries, and stunning views of the Dhauladhar range. A perfect blend of spirituality and natural beauty.',
    imageUrl: PlaceHolderImagesMap.get('dest-dharamshala')?.imageUrl,
    category: 'Spiritual & Cultural',
    bestTimeToVisit: 'March to June, September to November',
    attractions: ['McLeod Ganj', 'Namgyal Monastery', 'Bhagsu Nag Temple', 'Dal Lake'],
  },
  {
    name: 'Manali',
    description: 'A popular honeymoon and backpacking destination, Manali offers breathtaking views of snow-capped peaks, lush green valleys, and the gushing Beas River. It is a gateway to adventure sports and high-altitude Himalayan passes.',
    imageUrl: PlaceHolderImagesMap.get('dest-manali')?.imageUrl,
    category: 'Adventure & Honeymoon',
    bestTimeToVisit: 'October to June',
    attractions: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali'],
  },
  {
    name: 'Shimla',
    description: 'The former summer capital of British India, Shimla is a charming hill station with colonial architecture, a bustling mall road, and panoramic views. Its pleasant weather and accessibility make it a year-round destination.',
    imageUrl: PlaceHolderImagesMap.get('dest-shimla')?.imageUrl,
    category: 'Hill Station & Heritage',
    bestTimeToVisit: 'March to June, October to February (for snow)',
    attractions: ['The Ridge', 'Mall Road', 'Jakhoo Temple', 'Kufri'],
  },
  {
    name: 'Spiti Valley',
    description: 'A cold desert mountain valley, Spiti is a land of stark landscapes, ancient monasteries, and picturesque villages. It offers an unparalleled experience for those seeking raw, untouched nature and adventure.',
    imageUrl: PlaceHolderImagesMap.get('dest-spiti')?.imageUrl,
    category: 'Adventure & Remote',
    bestTimeToVisit: 'June to September',
    attractions: ['Key Monastery', 'Chandratal Lake', 'Kaza', 'Tabo Monastery'],
  },
  {
    name: 'Kangra Valley',
    description: 'A vast and beautiful valley, Kangra is dotted with tea gardens, ancient forts, and temples. It provides a more serene and offbeat experience compared to other bustling tourist spots.',
    imageUrl: PlaceHolderImagesMap.get('dest-kangra')?.imageUrl,
    category: 'Nature & Heritage',
    bestTimeToVisit: 'September to June',
    attractions: ['Kangra Fort', 'Masroor Rock Cut Temple', 'Palampur Tea Gardens'],
  },
  {
    name: 'Bir Billing',
    description: 'Known as the paragliding capital of India, Bir Billing is a haven for adventure enthusiasts. It offers world-class facilities for tandem paragliding flights with stunning aerial views of the Dhauladhar mountains.',
    imageUrl: PlaceHolderImagesMap.get('dest-birbilling')?.imageUrl,
    category: 'Adventure Sports',
    bestTimeToVisit: 'March to May, October to November',
    attractions: ['Paragliding', 'Chokling Monastery', 'Gunehar Waterfall', 'Bir Tea Factory'],
  },
].filter(dest => dest.imageUrl);
