const { Client, Databases, ID } = require('appwrite');

// Replace with your values
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1') // Or 'http://localhost/v1' for self-hosted
  .setProject('YOUR_PROJECT_ID') // From Step 1
  .setKey('YOUR_API_KEY'); // From Step 2, with write permissions

const databases = new Databases(client);
const DATABASE_ID = 'PetCareDB'; // From Step 3

// Your data (paste from the provided JS file)
const petCategories =  [
  {
    id: 'cat',
    name: 'Cats',
    image: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    color: 'bg-blue-100',
    textColor: 'text-blue-800'
  },
  {
    id: 'dog',
    name: 'Dogs',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d',
    color: 'bg-amber-100',
    textColor: 'text-amber-800'
  },
  {
    id: 'rabbit',
    name: 'Rabbits',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308',
    color: 'bg-pink-100',
    textColor: 'text-pink-800'
  },
  {
    id: 'bird',
    name: 'Birds',
    image: 'https://images.unsplash.com/photo-1522926193341-e9ffd686c60f',
    color: 'bg-green-100',
    textColor: 'text-green-800'
  }
];
const careData = {
  cat: {
    diet: `Cats are obligate carnivores, meaning they require a diet primarily consisting of meat. High-quality commercial cat food that is appropriate for the cat's age, health status and activity level is recommended. Fresh water should be available at all times. Avoid feeding cats dog food, as it does not provide the necessary nutrients for felines.`,
    accommodation: `Cats need a safe, comfortable environment with access to clean litter boxes, scratching posts, and elevated spaces for climbing and perching. Provide cozy bedding in a quiet area away from heavy traffic. Indoor cats live longer, healthier lives than outdoor cats.`,
    basicCare: `Regular veterinary check-ups, vaccinations, and parasite control are essential. Groom your cat regularly to reduce shedding and hairballs. Provide mental stimulation through toys, puzzle feeders, and interactive play. Keep claws trimmed to prevent overgrowth and related problems.`,
    commonDiseases: `Common feline health issues include dental disease, obesity, urinary tract infections, kidney disease, and diabetes. Regular vet visits can help detect these conditions early. Watch for signs of illness such as changes in appetite, litter box habits, or behavior.`
  },
  dog: {
    diet: `Dogs are omnivores and require a balanced diet of proteins, carbohydrates, fats, vitamins, and minerals. High-quality commercial dog food appropriate for your dog's size, age, and activity level is recommended. Avoid feeding dogs chocolate, grapes, onions, and other toxic foods.`,
    accommodation: `Dogs need a comfortable, safe space with access to fresh water and shelter from extreme weather. Provide a comfortable bed in a quiet area. Regular exercise and mental stimulation are crucial for a dog's wellbeing.`,
    basicCare: `Regular veterinary care, vaccinations, and parasite prevention are essential. Brush your dog's coat regularly to prevent matting and distribute natural oils. Keep nails trimmed and ears clean. Provide plenty of exercise and training for mental stimulation.`,
    commonDiseases: `Common canine health issues include arthritis, dental disease, obesity, ear infections, and skin allergies. Regular check-ups can help detect problems early. Watch for changes in appetite, energy levels, or behavior that might indicate illness.`
  },
  rabbit: {
    diet: `Rabbits require a diet high in fiber, primarily consisting of hay, fresh vegetables, and a small amount of pellets. Fresh water should always be available. Avoid feeding rabbits iceberg lettuce, beans, and rhubarb as these can be harmful.`,
    accommodation: `Rabbits need a spacious enclosure with room to move around, plus time outside the enclosure for exercise. Provide hiding places and enrichment items. The habitat should be protected from extreme temperatures and predators.`,
    basicCare: `Regular grooming is essential, especially for long-haired breeds. Provide plenty of chew toys to keep teeth worn down. Rabbits need regular veterinary care, including vaccinations and check-ups. Keep their living area clean to prevent disease.`,
    commonDiseases: `Common rabbit health issues include dental problems, gastrointestinal stasis, respiratory infections, and parasites. Regular vet visits are important as rabbits often hide signs of illness until they are very sick.`
  },
  bird: {
    diet: `Birds require a varied diet including high-quality pellets, fresh fruits, vegetables, and occasional treats. The specific diet depends on the species of bird. Always provide fresh, clean water. Avoid feeding birds avocado, chocolate, caffeine, and salty foods.`,
    accommodation: `Birds need a spacious cage that allows them to fully extend their wings and move around freely. The cage should include perches of varying sizes, toys for mental stimulation, and food and water dishes.`,
    basicCare: `Regular cage cleaning is essential to prevent disease. Provide opportunities for exercise and flight outside the cage in a safe environment. Regular veterinary check-ups are important for detecting health issues early.`,
    commonDiseases: `Common avian health issues include respiratory infections, nutritional deficiencies, feather plucking, and psittacosis. Birds often hide signs of illness, so any changes in behavior, appetite, or droppings should be investigated by a vet.`
  }
};
const shopCategories = {
  food: [
    {
      id: 1,
      name: 'Premium Dry Cat Food',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
      category: 'food'
    },
    {
      id: 2,
      name: 'Grain-Free Dog Food',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1570913190147-904b85ebd63b',
      category: 'food'
    },
    {
      id: 3,
      name: 'Rabbit Pellets',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1612185280206-9da5b8e67e4c',
      category: 'food'
    },
    {
      id: 4,
      name: 'Bird Seed Mix',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a',
      category: 'food'
    }
  ],
  medicine: [
    {
      id: 101,
      name: 'Flea & Tick Treatment',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee',
      category: 'medicine'
    },
    {
      id: 102,
      name: 'Joint Supplement for Dogs',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1593085260707-5377ba37f868',
      category: 'medicine'
    },
    {
      id: 103,
      name: 'Deworming Medication',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae',
      category: 'medicine'
    },
    {
      id: 104,
      name: 'Vitamins for Birds',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1531494391841-6ac2ef3859b4',
      category: 'medicine'
    }
  ],
  accessories: [
    {
      id: 201,
      name: 'Designer Pet Collar',
      price: 15.99,
      image: 'https://images.unsplash.com/photo-1559530163-d78b536cb228',
      category: 'accessories'
    },
    {
      id: 202,
      name: 'Comfortable Pet Bed',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1551383073-648ac5d80a21',
      category: 'accessories'
    },
    {
      id: 203,
      name: 'Travel Carrier',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1591768575198-88dac53fbd0a',
      category: 'accessories'
    },
    {
      id: 204,
      name: 'Automatic Feeder',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1',
      category: 'accessories'
    }
  ],
  toys: [
    {
      id: 301,
      name: 'Interactive Puzzle Toy',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1545241047-608ce54d1d04',
      category: 'toys'
    },
    {
      id: 302,
      name: 'Chew Toys for Dogs',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1559681367-e5e1aa7eabc2',
      category: 'toys'
    },
    {
      id: 303,
      name: 'Catnip Toys',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1571875085363-25ff2544c6c4',
      category: 'toys'
    },
    {
      id: 304,
      name: 'Bird Play Gym',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1551085254-e96b210db58a',
      category: 'toys'
    }
  ]
};;
const vets = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Feline Medicine',
    experience: '12 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    available: true
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Canine Surgery',
    experience: '15 years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    available: true
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Exotic Animals',
    experience: '8 years',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
    available: false
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    experience: '10 years',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
    available: true
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Dentistry',
    experience: '7 years',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f',
    available: true
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Orthopedics',
    experience: '14 years',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d',
    available: false
  }
];

// Function to seed PetCategories
async function seedPetCategories() {
  for (const category of petCategories) {
    await databases.createDocument(DATABASE_ID, 'PetCategories', ID.unique(), category);
  }
  console.log('PetCategories seeded');
}

// Function to seed PetCareInfo
async function seedCareData() {
  for (const [petType, info] of Object.entries(careData)) {
    await databases.createDocument(DATABASE_ID, 'PetCareInfo', ID.unique(), { petType, ...info });
  }
  console.log('PetCareInfo seeded');
}

// Function to seed Products
async function seedProducts() {
  const allProducts = [...shopCategories.food, ...shopCategories.medicine, ...shopCategories.accessories, ...shopCategories.toys];
  for (const product of allProducts) {
    await databases.createDocument(DATABASE_ID, 'Products', ID.unique(), product);
  }
  console.log('Products seeded');
}

// Function to seed Vets
async function seedVets() {
  for (const vet of vets) {
    await databases.createDocument(DATABASE_ID, 'Vets', ID.unique(), vet);
  }
  console.log('Vets seeded');
}

// Run all
async function seedAll() {
  try {
    await seedPetCategories();
    await seedCareData();
    await seedProducts();
    await seedVets();
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seedAll();