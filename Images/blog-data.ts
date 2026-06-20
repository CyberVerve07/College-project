export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  imageUrl: string;
}

export const initialBlogPosts: BlogPost[] = [
  {
    slug: 'spiti-valley-winter-guide',
    title: 'The Ultimate Guide to Spiti Valley in Winter',
    excerpt: 'Planning a road trip to Spiti Valley in the sub-zero winter temperatures? Here is everything you need to know about preparation, routes, and gear.',
    content: `
      Spiti Valley, also known as the "Middle Land" between India and Tibet, is a cold desert mountain valley located high in the Himalayas. While summer brings lush green views, winter transforms Spiti into a mystical snowy wonderland. However, exploring Spiti in winter requires meticulous planning.

      ### 1. Routes & Roads
      During winter, the Manali-Kaza route via Kunzum Pass is completely closed due to heavy snow. The only way to access Kaza (the administrative headquarters of Spiti) is via Shimla through Kinnaur. The road is open year-round, but can be blocked temporarily due to landslides.

      ### 2. Vehicle Requirements
      Do not attempt this in a standard hatchback or sedan. A 4x4 SUV with high ground clearance (like Toyota Fortuner or Mahindra Thar) is absolutely essential. Snow chains are highly recommended.

      ### 3. Fighting the Cold
      Temperatures in Kaza can drop to -25°C. Carry three layers of thermal clothing, heavy down jackets, windproof gloves, and insulated snow boots. Keep insulated water flasks, as normal water bottles will freeze solid.

      ### 4. Accommodation
      Most luxury hotels in Kaza close down. You will be staying in local homestays. This is actually a blessing in disguise as it allows you to experience authentic Spitian hospitality, eat woodfire-cooked meals, and listen to ancient folklore.
    `,
    category: 'Adventure',
    readTime: '6 min read',
    date: 'Dec 15, 2025',
    author: {
      name: 'Amit Thakur',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
      role: 'Himalayan Explorer'
    },
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=1080&q=80'
  },
  {
    slug: 'dharamshala-spiritual-retreat',
    title: 'A Spiritual Journey Through Dharamshala & Dharamkot',
    excerpt: 'Find peace, yoga, and Tibetan culture in the pine-covered hills of Kangra. Discover the best cafes, meditation centers, and trails.',
    content: `
      Nestled in the upper reaches of the Kangra Valley, Dharamshala and the neighboring village of Dharamkot offer a peaceful sanctuary for seekers, backpackers, and nature lovers alike. Surrounded by towering cedar forests and the majestic Dhauladhar range, it is the home of the Dalai Lama.

      ### 1. McLeod Ganj: The Little Lhasa
      Start your journey in McLeod Ganj. Visit the Tsuglagkhang Complex (the Dalai Lama Temple). The atmosphere here is thick with chanting, spinning prayer wheels, and the smell of butter tea. Take a peaceful walk around the Kora path that loops behind the temple.

      ### 2. Dharamkot: Yoga & Silence
      Uphill from McLeod Ganj lies Dharamkot. Unlike its busier neighbor, Dharamkot is quiet and slow-paced. It is famous for Vipassana meditation retreats, yoga centers, and organic cafes. Spend your days practicing mindfulness and sipping ginger lemon honey tea.

      ### 3. The Triund Trail
      For a physical release, embark on the popular Triund trek. It is a moderate 9 km climb starting from Dharamkot. The trail winds through oak and rhododendron forests, opening up to a vast grassy ridge directly under the snow peaks of Dhauladhar.
    `,
    category: 'Spiritual',
    readTime: '4 min read',
    date: 'Nov 28, 2025',
    author: {
      name: 'Sonam Dolma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      role: 'Local Guide'
    },
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1080&q=80'
  },
  {
    slug: 'himachal-hidden-waterfalls',
    title: '5 Hidden Waterfalls in Himachal You Must Visit',
    excerpt: 'Skip the crowded tourist spots. These secret waterfalls in Manali, Jibhi, and Dharamshala offer pure pristine nature without the crowds.',
    content: `
      Himachal Pradesh is full of cascading streams, but many of the popular waterfalls (like Bhagsu Falls) are crowded with shops and tourists. If you want to experience the raw, untouched power of mountain springs, here are 5 hidden waterfalls to add to your list.

      ### 1. Jogini Waterfall (Manali)
      While it is gaining popularity, Jogini remains beautiful. The walk from Vashisht village through pine orchards and streams is incredibly scenic. The water cascades down a cliff into a small pool where you can splash around.

      ### 2. Choie Waterfall (Tirthan Valley)
      Located near Great Himalayan National Park, a short 30-minute uphill trek from the road leads to Choie. The trail is lush and tropical, ending in a beautiful hidden falls named after a local deity.

      ### 3. Jana Waterfall (Naggar)
      Hidden inside pine forests near Naggar, this waterfall has a wooden bridge over it. Don't forget to try the authentic Siddu and local Himachali thali served at the rustic wooden shacks nearby.

      ### 4. Sissu Waterfall (Lahaul)
      Just after crossing the Atal Tunnel, look up to the cliffs of Sissu. A thin, long waterfall cascades down from the glaciers directly opposite the town. A short trek takes you right to its base, surrounded by wildflowers.
    `,
    category: 'Nature',
    readTime: '5 min read',
    date: 'Oct 12, 2025',
    author: {
      name: 'Vikram Negi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      role: 'Travel Photographer'
    },
    imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1080&q=80'
  }
];
