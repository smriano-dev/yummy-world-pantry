export interface Nutrition {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cuisine?: string;
  continent: 'North America' | 'Central America' | 'South America' | 'Europe' | 'East Asia' | 'South Asia' | 'Africa' | 'Oceania' | 'International';
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage';
  nutrition: Nutrition;
  image: string; // URL or placeholder
}

// Map cuisine to continent
function getContinent(cuisine?: string): Recipe['continent'] {
  const cuisineMap: Record<string, Recipe['continent']> = {
    'Italian': 'Europe',
    'French': 'Europe',
    'Spanish': 'Europe',
    'Greek': 'Europe',
    'Mediterranean': 'Europe',
    'Chinese': 'East Asia',
    'Japanese': 'East Asia',
    'Korean': 'East Asia',
    'Thai': 'East Asia',
    'Vietnamese': 'East Asia',
    'Indian': 'South Asia',
    'Pakistani': 'South Asia',
    'Mexican': 'Central America',
    'Colombian': 'South America',
    'Brazilian': 'South America',
    'North American': 'North America',
    'Canadian': 'North America',
    'International': 'International',
    'Asian': 'East Asia',
  };
  return cuisine ? (cuisineMap[cuisine] || 'International') : 'International';
}

// Recipe database with many recipes
export const recipes: Recipe[] = [
  // EUROPE - Italian
  {
    id: '1',
    name: 'Garlic Pasta',
    description: 'Simple and delicious pasta with garlic and olive oil',
    ingredients: ['Penne Rigate Pasta', 'Garlic', 'Extra Virgin Olive Oil', 'Butter Sticks'],
    instructions: [
      'Cook pasta according to package directions',
      'Heat olive oil and butter in a pan',
      'Add minced garlic and cook until fragrant',
      'Toss cooked pasta with garlic oil',
      'Serve hot'
    ],
    cuisine: 'Italian',
    continent: 'Europe',
    prepTime: '5 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 420, protein: 12, carbs: 58, fat: 16, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
  },
  {
    id: '2',
    name: 'Pasta with Tomato Sauce',
    description: 'Classic pasta with simple tomato sauce',
    ingredients: ['Penne Rigate Pasta', 'Tomatoes', 'Garlic', 'Extra Virgin Olive Oil', 'Cilantro'],
    instructions: [
      'Cook pasta',
      'Heat oil and sauté garlic',
      'Add chopped tomatoes and cook until soft',
      'Season with salt and pepper',
      'Toss with pasta and fresh herbs'
    ],
    cuisine: 'Italian',
    continent: 'Europe',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 385, protein: 11, carbs: 62, fat: 12, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
  },
  {
    id: '3',
    name: 'Linguini Aglio e Olio',
    description: 'Traditional Italian pasta with garlic and olive oil',
    ingredients: ['Linguini Pasta', 'Garlic', 'Extra Virgin Olive Oil', 'Red Onions'],
    instructions: [
      'Cook linguini until al dente',
      'Heat olive oil in a large pan',
      'Add sliced garlic and cook until golden',
      'Add cooked pasta and toss',
      'Season with salt and pepper'
    ],
    cuisine: 'Italian',
    continent: 'Europe',
    prepTime: '5 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 395, protein: 10, carbs: 60, fat: 14, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop'
  },
  {
    id: '4',
    name: 'Mediterranean Chickpea Salad',
    description: 'Healthy and protein-rich Mediterranean salad',
    ingredients: ['Chickpeas', 'Tomatoes', 'Bell Peppers', 'Cilantro', 'Extra Virgin Olive Oil'],
    instructions: [
      'Drain and rinse chickpeas',
      'Chop vegetables',
      'Mix everything in a bowl',
      'Dress with olive oil',
      'Season with salt and pepper'
    ],
    cuisine: 'Mediterranean',
    continent: 'Europe',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 220, protein: 9, carbs: 28, fat: 8, fiber: 8 },
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop'
  },

  // EAST ASIA - Chinese, Thai, Japanese
  {
    id: '5',
    name: 'Stir-Fried Chinese Greens',
    description: 'Quick and healthy stir-fry with Chinese greens',
    ingredients: ['Chinese Greens (Gai Lan)', 'Garlic', 'Soy Sauce', 'Sesame Oil', 'Canola Oil'],
    instructions: [
      'Wash and cut Chinese greens',
      'Heat oil in a wok or large pan',
      'Add garlic and stir-fry for 30 seconds',
      'Add greens and stir-fry for 2-3 minutes',
      'Add soy sauce and sesame oil',
      'Serve hot'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 2,
    mealType: 'lunch',
    nutrition: { calories: 85, protein: 4, carbs: 8, fat: 5, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '6',
    name: 'Thai Jasmine Rice with Stir-Fry',
    description: 'Fragrant jasmine rice with mixed vegetables',
    ingredients: ['Thai Jasmine Rice', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil'],
    instructions: [
      'Cook jasmine rice according to package directions',
      'Cut vegetables into strips',
      'Heat oil in a pan and stir-fry vegetables',
      'Add soy sauce and sesame oil',
      'Serve over rice'
    ],
    cuisine: 'Thai',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 320, protein: 8, carbs: 62, fat: 6, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },
  {
    id: '7',
    name: 'Fried Rice',
    description: 'Classic fried rice with vegetables',
    ingredients: ['Thai Jasmine Rice', 'Eggs', 'Soy Sauce', 'Sesame Oil', 'Green Onions', 'Carrots', 'Bell Peppers'],
    instructions: [
      'Cook rice and let cool',
      'Scramble eggs and set aside',
      'Heat oil in a wok',
      'Add vegetables and stir-fry',
      'Add rice and eggs',
      'Season with soy sauce and sesame oil',
      'Garnish with green onions'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 295, protein: 10, carbs: 48, fat: 8, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '8',
    name: 'Soup Dumplings',
    description: 'Steamed soup dumplings',
    ingredients: ['Soup Dumplings', 'Soy Sauce'],
    instructions: [
      'Steam dumplings for 8-10 minutes',
      'Serve hot with soy sauce',
      'Be careful - they\'re hot inside!'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '2 min',
    cookTime: '10 min',
    servings: 2,
    mealType: 'snack',
    nutrition: { calories: 180, protein: 8, carbs: 28, fat: 4, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop'
  },
  {
    id: '9',
    name: 'Chicken Stir-Fry',
    description: 'Quick and healthy chicken stir-fry',
    ingredients: ['Frozen Chicken', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Thaw and cut chicken into strips',
      'Heat oil in a wok',
      'Stir-fry chicken until cooked',
      'Add vegetables and stir-fry',
      'Add soy sauce and sesame oil',
      'Serve hot'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 285, protein: 28, carbs: 15, fat: 12, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '10',
    name: 'Vegetable Stir-Fry',
    description: 'Colorful mixed vegetable stir-fry',
    ingredients: ['Chinese Greens (Gai Lan)', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Cut all vegetables into uniform pieces',
      'Heat oil in a wok',
      'Add garlic and stir-fry for 30 seconds',
      'Add vegetables and stir-fry for 3-4 minutes',
      'Add soy sauce and sesame oil',
      'Serve hot'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '8 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 95, protein: 3, carbs: 12, fat: 4, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '11',
    name: 'Hot & Sour Soup',
    description: 'Tangy and spicy Chinese soup',
    ingredients: ['Hot & Sour Chicken Soup Mix', 'Eggs', 'Green Onions', 'Soy Sauce'],
    instructions: [
      'Prepare soup mix according to package',
      'Beat eggs and drizzle into soup',
      'Garnish with green onions',
      'Serve hot'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    mealType: 'lunch',
    nutrition: { calories: 120, protein: 8, carbs: 12, fat: 4, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '12',
    name: 'Pan-Fried Noodles',
    description: 'Crispy pan-fried noodles with vegetables',
    ingredients: ['Penne Rigate Pasta', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Cook pasta until al dente',
      'Heat oil in a large pan',
      'Add garlic and vegetables',
      'Add cooked pasta and pan-fry until crispy',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 310, protein: 10, carbs: 55, fat: 8, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '13',
    name: 'Thai Basil Fried Rice',
    description: 'Aromatic Thai-style fried rice',
    ingredients: ['Thai Jasmine Rice', 'Eggs', 'Garlic', 'Soy Sauce', 'Sesame Oil', 'Green Onions'],
    instructions: [
      'Cook rice and let cool',
      'Scramble eggs and set aside',
      'Heat oil and sauté garlic',
      'Add rice and eggs',
      'Season with soy sauce',
      'Garnish with green onions'
    ],
    cuisine: 'Thai',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 280, protein: 9, carbs: 50, fat: 6, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },

  // SOUTH ASIA - Indian, Pakistani
  {
    id: '14',
    name: 'Chicken Curry',
    description: 'Spicy and flavorful chicken curry',
    ingredients: ['Frozen Chicken', 'Curry Masala for Chicken', 'Coconut Milk', 'Red Onions', 'Garlic', 'Canola Oil'],
    instructions: [
      'Thaw and cut chicken into pieces',
      'Heat oil and sauté onions and garlic',
      'Add curry masala and cook for 2 minutes',
      'Add chicken and cook until browned',
      'Add coconut milk and simmer for 20 minutes',
      'Serve with rice or roti'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '15 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 380, protein: 28, carbs: 12, fat: 24, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '15',
    name: 'Chana Masala',
    description: 'Spicy chickpea curry',
    ingredients: ['Chickpeas', 'TATA Chole Masala', 'Tomatoes', 'Garlic', 'Canola Oil', 'Cilantro'],
    instructions: [
      'Drain and rinse chickpeas',
      'Heat oil and sauté garlic',
      'Add chole masala and cook for 1 minute',
      'Add tomatoes and cook until soft',
      'Add chickpeas and simmer for 15 minutes',
      'Garnish with cilantro'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 245, protein: 11, carbs: 35, fat: 8, fiber: 10 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '16',
    name: 'Chicken Tikka Masala',
    description: 'Creamy tomato-based chicken curry',
    ingredients: ['Frozen Chicken', 'Curry Masala for Chicken', 'Coconut Milk', 'Tomatoes', 'Garlic', 'Canola Oil'],
    instructions: [
      'Thaw and cut chicken into pieces',
      'Heat oil and sauté garlic',
      'Add curry masala and cook',
      'Add tomatoes and cook until soft',
      'Add chicken and cook',
      'Add coconut milk and simmer',
      'Serve with rice'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '15 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 365, protein: 30, carbs: 15, fat: 22, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '17',
    name: 'Seekh Kabab',
    description: 'Spiced ground meat kebabs',
    ingredients: ['Frozen Chicken', 'Seekh Kabab Recipe Mix', 'Garlic', 'Canola Oil'],
    instructions: [
      'Thaw and mince chicken',
      'Mix with seekh kabab recipe mix',
      'Form into skewer shapes',
      'Pan-fry or grill until cooked',
      'Serve hot'
    ],
    cuisine: 'Pakistani',
    continent: 'South Asia',
    prepTime: '20 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 220, protein: 25, carbs: 5, fat: 10, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '18',
    name: 'Curry with Rice',
    description: 'Simple curry served over jasmine rice',
    ingredients: ['Thai Jasmine Rice', 'Curry Masala for Chicken', 'Coconut Milk', 'Red Onions', 'Garlic'],
    instructions: [
      'Cook rice according to package',
      'Heat oil and sauté onions and garlic',
      'Add curry masala',
      'Add coconut milk and simmer',
      'Serve over rice'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '10 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 340, protein: 8, carbs: 58, fat: 10, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '19',
    name: 'Roti with Curry',
    description: 'Traditional Indian flatbread with curry',
    ingredients: ['Santosh Roti', 'Chickpeas', 'TATA Chole Masala', 'Tomatoes', 'Garlic'],
    instructions: [
      'Heat roti according to package',
      'Prepare chana masala',
      'Serve curry with warm roti'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 320, protein: 12, carbs: 52, fat: 8, fiber: 8 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },

  // CENTRAL AMERICA - Mexican
  {
    id: '20',
    name: 'Tacos',
    description: 'Delicious tacos with your choice of fillings',
    ingredients: ['Taco Shells', 'Black Beans', 'Bell Peppers', 'Tomatoes', 'Cilantro', 'Tajín Clásico Chili Lime Seasoning'],
    instructions: [
      'Heat taco shells according to package',
      'Heat black beans in a pan',
      'Chop vegetables and mix with seasoning',
      'Fill taco shells with beans and vegetables',
      'Top with cilantro and enjoy'
    ],
    cuisine: 'Mexican',
    continent: 'Central America',
    prepTime: '10 min',
    cookTime: '10 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 285, protein: 12, carbs: 42, fat: 8, fiber: 10 },
    image: 'https://images.unsplash.com/photo-1565299585323-38174c3a0c71?w=800&h=600&fit=crop'
  },
  {
    id: '21',
    name: 'Bean Tacos',
    description: 'Simple vegetarian tacos',
    ingredients: ['Taco Shells', 'Black Beans', 'Tomatoes', 'Cilantro', 'Tajín Clásico Chili Lime Seasoning'],
    instructions: [
      'Heat taco shells',
      'Heat black beans',
      'Fill shells with beans',
      'Top with tomatoes, cilantro, and seasoning'
    ],
    cuisine: 'Mexican',
    continent: 'Central America',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 250, protein: 10, carbs: 40, fat: 6, fiber: 12 },
    image: 'https://images.unsplash.com/photo-1565299585323-38174c3a0c71?w=800&h=600&fit=crop'
  },
  {
    id: '22',
    name: 'Avocado Tacos',
    description: 'Fresh tacos with avocado',
    ingredients: ['Taco Shells', 'Avocados', 'Tomatoes', 'Cilantro', 'Tajín Clásico Chili Lime Seasoning'],
    instructions: [
      'Heat taco shells',
      'Slice avocado',
      'Fill shells with avocado',
      'Top with tomatoes, cilantro, and seasoning'
    ],
    cuisine: 'Mexican',
    continent: 'Central America',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 280, protein: 6, carbs: 32, fat: 16, fiber: 14 },
    image: 'https://images.unsplash.com/photo-1565299585323-38174c3a0c71?w=800&h=600&fit=crop'
  },

  // SOUTH AMERICA - Colombian
  {
    id: '23',
    name: 'Arepas',
    description: 'Colombian corn cakes',
    ingredients: ['Arepas de Queso'],
    instructions: [
      'Heat arepas in a pan or oven',
      'Cook until golden and crispy',
      'Serve warm'
    ],
    cuisine: 'Colombian',
    continent: 'South America',
    prepTime: '2 min',
    cookTime: '10 min',
    servings: 2,
    mealType: 'snack',
    nutrition: { calories: 220, protein: 6, carbs: 38, fat: 5, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop'
  },
  {
    id: '24',
    name: 'Almojábanas',
    description: 'Colombian cheese bread',
    ingredients: ['Almojábanas (Cheese Bread)'],
    instructions: [
      'Bake according to package directions',
      'Serve warm'
    ],
    cuisine: 'Colombian',
    continent: 'South America',
    prepTime: '2 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'snack',
    nutrition: { calories: 180, protein: 8, carbs: 22, fat: 6, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1551782450-17144efb9c50?w=800&h=600&fit=crop'
  },
  {
    id: '25',
    name: 'Quinoa Bowl',
    description: 'Nutritious quinoa bowl with vegetables',
    ingredients: ['Quinoa', 'Bell Peppers', 'Carrots', 'Avocados', 'Cilantro', 'Extra Virgin Olive Oil'],
    instructions: [
      'Cook quinoa according to package',
      'Roast or sauté vegetables',
      'Slice avocado',
      'Assemble bowl with quinoa, vegetables, and avocado',
      'Drizzle with olive oil and garnish with cilantro'
    ],
    cuisine: 'International',
    continent: 'South America',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 2,
    mealType: 'lunch',
    nutrition: { calories: 420, protein: 12, carbs: 52, fat: 18, fiber: 10 },
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop'
  },

  // NORTH AMERICA
  {
    id: '26',
    name: 'Pork Chops with Potatoes',
    description: 'Hearty meal with pork and roasted potatoes',
    ingredients: ['Pork Chops', 'White Potatoes', 'Garlic', 'Butter Sticks', 'Steak Spice Seasoning'],
    instructions: [
      'Season pork chops with steak spice',
      'Cut potatoes into wedges',
      'Heat butter in a pan and cook pork chops',
      'Roast potatoes in the oven with garlic',
      'Serve together'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 485, protein: 35, carbs: 32, fat: 24, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '27',
    name: 'Chicken Wings',
    description: 'Marinated chicken wings',
    ingredients: ['Marinated Chicken Wings', 'Soy Sauce', 'Sesame Oil'],
    instructions: [
      'Preheat oven to 400°F',
      'Place wings on baking sheet',
      'Bake for 25-30 minutes until crispy',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '5 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'snack',
    nutrition: { calories: 320, protein: 28, carbs: 2, fat: 22, fiber: 0 },
    image: 'https://images.unsplash.com/photo-1527477396000-e27137b2a0b7?w=800&h=600&fit=crop'
  },
  {
    id: '28',
    name: 'Pan-Fried Pork Chops',
    description: 'Simple pan-fried pork chops',
    ingredients: ['Pork Chops', 'Butter Sticks', 'Garlic', 'Steak Spice Seasoning'],
    instructions: [
      'Season pork chops',
      'Heat butter in a pan',
      'Cook pork chops until golden',
      'Add garlic in the last minute',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '5 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 420, protein: 32, carbs: 2, fat: 30, fiber: 0 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '29',
    name: 'Roasted Potatoes',
    description: 'Crispy roasted potatoes',
    ingredients: ['White Potatoes', 'Garlic', 'Butter Sticks', 'Steak Spice Seasoning'],
    instructions: [
      'Cut potatoes into wedges',
      'Toss with melted butter and spices',
      'Roast in oven at 400°F for 30 minutes',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 220, protein: 4, carbs: 38, fat: 6, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '30',
    name: 'Bacon and Eggs',
    description: 'Classic breakfast combination',
    ingredients: ['Bacon', 'Eggs', 'Butter Sticks'],
    instructions: [
      'Cook bacon until crispy',
      'Fry eggs in bacon fat',
      'Serve together'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    mealType: 'breakfast',
    nutrition: { calories: 380, protein: 20, carbs: 2, fat: 32, fiber: 0 },
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop'
  },
  {
    id: '31',
    name: 'Pork Belly Stir-Fry',
    description: 'Rich and flavorful pork belly stir-fry',
    ingredients: ['Pork Belly', 'Bell Peppers', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Cut pork belly into strips',
      'Heat oil in a pan',
      'Cook pork belly until crispy',
      'Add vegetables and stir-fry',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 485, protein: 22, carbs: 8, fat: 42, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },

  // INTERNATIONAL / BREAKFAST
  {
    id: '32',
    name: 'Scrambled Eggs with Vegetables',
    description: 'Protein-packed breakfast with fresh vegetables',
    ingredients: ['Eggs', 'Bell Peppers', 'Tomatoes', 'Green Onions', 'Butter Sticks'],
    instructions: [
      'Chop bell peppers, tomatoes, and green onions',
      'Beat eggs in a bowl',
      'Heat butter in a pan',
      'Add vegetables and cook for 2 minutes',
      'Pour in eggs and scramble',
      'Season with salt and pepper'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    mealType: 'breakfast',
    nutrition: { calories: 280, protein: 18, carbs: 12, fat: 18, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop'
  },
  {
    id: '33',
    name: 'Avocado Toast',
    description: 'Simple and healthy avocado toast',
    ingredients: ['Avocados', 'Whole Wheat Tortillas', 'Eggs', 'Tomatoes', 'Cilantro'],
    instructions: [
      'Toast tortillas or bread',
      'Mash avocado with salt and pepper',
      'Spread on toast',
      'Top with sliced tomatoes and cilantro',
      'Optional: Add a fried egg on top'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 2,
    mealType: 'breakfast',
    nutrition: { calories: 320, protein: 12, carbs: 28, fat: 20, fiber: 12 },
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&h=600&fit=crop'
  },
  {
    id: '34',
    name: 'Fried Egg Sandwich',
    description: 'Simple fried egg on toast',
    ingredients: ['Eggs', 'Whole Wheat Tortillas', 'Butter Sticks'],
    instructions: [
      'Toast tortillas',
      'Fry eggs in butter',
      'Place eggs on toast',
      'Season with salt and pepper'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '3 min',
    cookTime: '5 min',
    servings: 2,
    mealType: 'breakfast',
    nutrition: { calories: 240, protein: 12, carbs: 22, fat: 12, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop'
  },
  {
    id: '35',
    name: 'Omelette',
    description: 'Fluffy omelette with vegetables',
    ingredients: ['Eggs', 'Bell Peppers', 'Tomatoes', 'Green Onions', 'Butter Sticks'],
    instructions: [
      'Beat eggs in a bowl',
      'Chop vegetables',
      'Heat butter in a pan',
      'Pour in eggs',
      'Add vegetables on one side',
      'Fold and cook until set'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '8 min',
    servings: 2,
    mealType: 'breakfast',
    nutrition: { calories: 260, protein: 16, carbs: 10, fat: 18, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop'
  },

  // MORE VARIATIONS
  {
    id: '36',
    name: 'Chicken Fried Rice',
    description: 'Fried rice with chicken',
    ingredients: ['Thai Jasmine Rice', 'Frozen Chicken', 'Eggs', 'Soy Sauce', 'Sesame Oil', 'Green Onions'],
    instructions: [
      'Cook rice and let cool',
      'Cut and cook chicken',
      'Scramble eggs',
      'Heat oil and stir-fry everything together',
      'Season with soy sauce',
      'Garnish with green onions'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 320, protein: 22, carbs: 45, fat: 8, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '37',
    name: 'Shrimp Fried Rice',
    description: 'Fried rice with shrimp (using chicken as substitute)',
    ingredients: ['Thai Jasmine Rice', 'Frozen Chicken', 'Eggs', 'Soy Sauce', 'Sesame Oil', 'Carrots', 'Green Onions'],
    instructions: [
      'Cook rice and let cool',
      'Cut chicken into small pieces',
      'Scramble eggs',
      'Stir-fry chicken and vegetables',
      'Add rice and eggs',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '18 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 315, protein: 20, carbs: 48, fat: 7, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '38',
    name: 'Vegetable Curry',
    description: 'Mixed vegetable curry',
    ingredients: ['Bell Peppers', 'Carrots', 'Curry Masala for Chicken', 'Coconut Milk', 'Tomatoes', 'Garlic'],
    instructions: [
      'Cut vegetables',
      'Heat oil and sauté garlic',
      'Add curry masala',
      'Add vegetables and cook',
      'Add coconut milk and simmer',
      'Serve with rice'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 185, protein: 4, carbs: 22, fat: 9, fiber: 5 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '39',
    name: 'Chicken and Rice Soup',
    description: 'Comforting chicken soup with rice',
    ingredients: ['Frozen Chicken', 'Thai Jasmine Rice', 'Carrots', 'Garlic', 'Green Onions'],
    instructions: [
      'Cook chicken in water',
      'Add rice and cook until tender',
      'Add carrots and garlic',
      'Simmer until vegetables are soft',
      'Garnish with green onions'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '10 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 220, protein: 18, carbs: 28, fat: 4, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '40',
    name: 'Tomato Soup',
    description: 'Simple and comforting tomato soup',
    ingredients: ['Tomatoes', 'Garlic', 'Extra Virgin Olive Oil', 'Cilantro'],
    instructions: [
      'Chop tomatoes',
      'Heat oil and sauté garlic',
      'Add tomatoes and cook until soft',
      'Blend until smooth',
      'Garnish with cilantro'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 95, protein: 2, carbs: 12, fat: 5, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '41',
    name: 'Vegetable Soup',
    description: 'Hearty vegetable soup',
    ingredients: ['Carrots', 'Bell Peppers', 'Tomatoes', 'Garlic', 'Extra Virgin Olive Oil'],
    instructions: [
      'Chop all vegetables',
      'Heat oil and sauté garlic',
      'Add vegetables and cook',
      'Add water and simmer',
      'Season with salt and pepper'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '10 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 85, protein: 2, carbs: 12, fat: 4, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '42',
    name: 'Pan-Fried Chicken',
    description: 'Crispy pan-fried chicken',
    ingredients: ['Frozen Chicken', 'Butter Sticks', 'Garlic', 'Steak Spice Seasoning'],
    instructions: [
      'Thaw and season chicken',
      'Heat butter in a pan',
      'Pan-fry chicken until golden and cooked',
      'Add garlic in the last few minutes',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 285, protein: 28, carbs: 2, fat: 18, fiber: 0 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '43',
    name: 'Roasted Chicken with Vegetables',
    description: 'Oven-roasted chicken with vegetables',
    ingredients: ['Frozen Chicken', 'White Potatoes', 'Carrots', 'Bell Peppers', 'Garlic', 'Butter Sticks'],
    instructions: [
      'Thaw chicken',
      'Cut vegetables',
      'Toss everything with butter and spices',
      'Roast in oven at 400°F for 35 minutes',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '15 min',
    cookTime: '35 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 320, protein: 28, carbs: 22, fat: 14, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '44',
    name: 'Stir-Fried Rice Noodles',
    description: 'Stir-fried noodles with vegetables',
    ingredients: ['Penne Rigate Pasta', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Cook pasta until al dente',
      'Heat oil in a wok',
      'Stir-fry garlic and vegetables',
      'Add cooked pasta',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 305, protein: 9, carbs: 55, fat: 7, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '45',
    name: 'Chicken Noodle Soup',
    description: 'Classic chicken noodle soup',
    ingredients: ['Frozen Chicken', 'Penne Rigate Pasta', 'Carrots', 'Garlic', 'Green Onions'],
    instructions: [
      'Cook chicken in water',
      'Add pasta and cook',
      'Add carrots and garlic',
      'Simmer until tender',
      'Garnish with green onions'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '10 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 235, protein: 20, carbs: 32, fat: 4, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '46',
    name: 'Edamame Salad',
    description: 'Fresh edamame salad',
    ingredients: ['Edamame (Soybeans)', 'Tomatoes', 'Bell Peppers', 'Cilantro', 'Extra Virgin Olive Oil'],
    instructions: [
      'Cook edamame according to package',
      'Chop vegetables',
      'Mix everything together',
      'Dress with olive oil',
      'Garnish with cilantro'
    ],
    cuisine: 'Japanese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '5 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 195, protein: 12, carbs: 18, fat: 8, fiber: 6 },
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop'
  },
  {
    id: '47',
    name: 'Rice and Beans',
    description: 'Simple rice and beans',
    ingredients: ['Thai Jasmine Rice', 'Black Beans', 'Garlic', 'Cilantro'],
    instructions: [
      'Cook rice',
      'Heat black beans',
      'Sauté garlic',
      'Mix everything together',
      'Garnish with cilantro'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 285, protein: 11, carbs: 55, fat: 2, fiber: 8 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },
  {
    id: '48',
    name: 'Bean Salad',
    description: 'Refreshing bean salad',
    ingredients: ['Black Beans', 'Chickpeas', 'Tomatoes', 'Bell Peppers', 'Cilantro', 'Extra Virgin Olive Oil'],
    instructions: [
      'Drain and rinse beans',
      'Chop vegetables',
      'Mix everything',
      'Dress with olive oil',
      'Garnish with cilantro'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 245, protein: 11, carbs: 35, fat: 7, fiber: 12 },
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=600&fit=crop'
  },
  {
    id: '49',
    name: 'Stir-Fried Edamame',
    description: 'Quick stir-fried edamame',
    ingredients: ['Edamame (Soybeans)', 'Garlic', 'Soy Sauce', 'Sesame Oil'],
    instructions: [
      'Cook edamame',
      'Heat oil in a pan',
      'Add garlic and stir-fry',
      'Add edamame',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'Japanese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '8 min',
    servings: 4,
    mealType: 'snack',
    nutrition: { calories: 145, protein: 10, carbs: 12, fat: 6, fiber: 5 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  },
  {
    id: '50',
    name: 'Chicken Curry with Rice',
    description: 'Complete meal of curry and rice',
    ingredients: ['Thai Jasmine Rice', 'Frozen Chicken', 'Curry Masala for Chicken', 'Coconut Milk', 'Red Onions', 'Garlic'],
    instructions: [
      'Cook rice',
      'Prepare chicken curry',
      'Serve curry over rice'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '15 min',
    cookTime: '30 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 425, protein: 28, carbs: 55, fat: 12, fiber: 2 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '51',
    name: 'Pan-Fried Potatoes',
    description: 'Crispy pan-fried potatoes',
    ingredients: ['White Potatoes', 'Butter Sticks', 'Garlic', 'Steak Spice Seasoning'],
    instructions: [
      'Cut potatoes into cubes',
      'Heat butter in a pan',
      'Add potatoes and cook until crispy',
      'Add garlic and spices',
      'Serve hot'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 195, protein: 3, carbs: 32, fat: 7, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '52',
    name: 'Mashed Potatoes',
    description: 'Creamy mashed potatoes',
    ingredients: ['White Potatoes', 'Butter Sticks', 'Garlic'],
    instructions: [
      'Boil potatoes until tender',
      'Mash with butter',
      'Add minced garlic',
      'Season with salt and pepper'
    ],
    cuisine: 'North American',
    continent: 'North America',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 185, protein: 3, carbs: 28, fat: 7, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop'
  },
  {
    id: '53',
    name: 'Chicken and Vegetable Stir-Fry',
    description: 'Complete stir-fry with chicken and vegetables',
    ingredients: ['Frozen Chicken', 'Bell Peppers', 'Carrots', 'Chinese Greens (Gai Lan)', 'Soy Sauce', 'Sesame Oil'],
    instructions: [
      'Cut chicken and vegetables',
      'Heat oil in a wok',
      'Stir-fry chicken first',
      'Add vegetables',
      'Season with soy sauce and sesame oil'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 245, protein: 26, carbs: 18, fat: 8, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '54',
    name: 'Vegetable Fried Rice',
    description: 'Vegetarian fried rice',
    ingredients: ['Thai Jasmine Rice', 'Eggs', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Green Onions'],
    instructions: [
      'Cook rice and let cool',
      'Scramble eggs',
      'Stir-fry vegetables',
      'Add rice and eggs',
      'Season and garnish'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '10 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 275, protein: 9, carbs: 50, fat: 6, fiber: 4 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '55',
    name: 'Curry with Roti',
    description: 'Indian curry served with roti',
    ingredients: ['Santosh Roti', 'Chickpeas', 'TATA Chole Masala', 'Tomatoes', 'Garlic', 'Cilantro'],
    instructions: [
      'Heat roti',
      'Prepare chana masala',
      'Serve together'
    ],
    cuisine: 'Indian',
    continent: 'South Asia',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 315, protein: 12, carbs: 52, fat: 8, fiber: 9 },
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&h=600&fit=crop'
  },
  {
    id: '56',
    name: 'Simple Rice Bowl',
    description: 'Rice bowl with vegetables',
    ingredients: ['Thai Jasmine Rice', 'Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil'],
    instructions: [
      'Cook rice',
      'Sauté vegetables',
      'Serve over rice',
      'Drizzle with soy sauce and sesame oil'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '20 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 285, protein: 6, carbs: 58, fat: 4, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },
  {
    id: '57',
    name: 'Egg Fried Rice',
    description: 'Simple egg fried rice',
    ingredients: ['Thai Jasmine Rice', 'Eggs', 'Soy Sauce', 'Sesame Oil', 'Green Onions'],
    instructions: [
      'Cook rice and let cool',
      'Scramble eggs',
      'Stir-fry rice with eggs',
      'Season with soy sauce',
      'Garnish with green onions'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '15 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 265, protein: 10, carbs: 48, fat: 5, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop'
  },
  {
    id: '58',
    name: 'Chicken and Rice',
    description: 'Simple chicken and rice',
    ingredients: ['Thai Jasmine Rice', 'Frozen Chicken', 'Garlic', 'Soy Sauce'],
    instructions: [
      'Cook rice',
      'Cook chicken',
      'Sauté garlic',
      'Serve together with soy sauce'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 320, protein: 24, carbs: 45, fat: 5, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },
  {
    id: '59',
    name: 'Pork and Rice',
    description: 'Simple pork and rice',
    ingredients: ['Thai Jasmine Rice', 'Pork Chops', 'Garlic', 'Soy Sauce'],
    instructions: [
      'Cook rice',
      'Cook pork chops',
      'Serve together',
      'Drizzle with soy sauce'
    ],
    cuisine: 'International',
    continent: 'International',
    prepTime: '5 min',
    cookTime: '25 min',
    servings: 4,
    mealType: 'dinner',
    nutrition: { calories: 385, protein: 28, carbs: 45, fat: 10, fiber: 1 },
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=600&fit=crop'
  },
  {
    id: '60',
    name: 'Simple Stir-Fry',
    description: 'Basic vegetable stir-fry',
    ingredients: ['Bell Peppers', 'Carrots', 'Soy Sauce', 'Sesame Oil', 'Garlic'],
    instructions: [
      'Cut vegetables',
      'Heat oil',
      'Stir-fry garlic',
      'Add vegetables',
      'Season with soy sauce'
    ],
    cuisine: 'Chinese',
    continent: 'East Asia',
    prepTime: '5 min',
    cookTime: '8 min',
    servings: 4,
    mealType: 'lunch',
    nutrition: { calories: 75, protein: 2, carbs: 10, fat: 3, fiber: 3 },
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop'
  }
];

// Normalize ingredient names for matching
function normalizeIngredient(ingredient: string): string {
  return ingredient.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .trim();
}

export interface RecipeFilters {
  maxAdditionalIngredients?: number; // 0-5
  minServings?: number;
  maxServings?: number;
  mealTypes?: ('breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage')[];
  continents?: Recipe['continent'][];
}

// Match recipes based on available ingredients and filters
export function findMatchingRecipes(
  availableIngredients: string[],
  filters?: RecipeFilters
): Recipe[] {
  const normalizedAvailable = availableIngredients.map(normalizeIngredient);
  
  return recipes
    .map(recipe => {
      const normalizedRecipeIngredients = recipe.ingredients.map(normalizeIngredient);
      const matchedIngredients = normalizedRecipeIngredients.filter(ing =>
        normalizedAvailable.some(avail => 
          avail.includes(ing) || ing.includes(avail) ||
          // Also check for partial matches (e.g., "garlic" matches "minced garlic")
          avail.split(/\s+/).some(word => ing.includes(word)) ||
          ing.split(/\s+/).some(word => avail.includes(word))
        )
      );
      
      const missingIngredients = recipe.ingredients.length - matchedIngredients.length;
      const matchScore = matchedIngredients.length / recipe.ingredients.length;
      
      return {
        recipe,
        matchScore,
        matchedIngredients: matchedIngredients.length,
        totalIngredients: recipe.ingredients.length,
        missingIngredients
      };
    })
    .filter(result => {
      // Filter by additional ingredients
      if (filters?.maxAdditionalIngredients !== undefined) {
        if (result.missingIngredients > filters.maxAdditionalIngredients) {
          return false;
        }
      }
      
      // Filter by servings
      if (filters?.minServings && result.recipe.servings) {
        if (result.recipe.servings < filters.minServings) {
          return false;
        }
      }
      if (filters?.maxServings && result.recipe.servings) {
        if (result.recipe.servings > filters.maxServings) {
          return false;
        }
      }
      
      // Filter by meal type
      if (filters?.mealTypes && filters.mealTypes.length > 0) {
        if (!filters.mealTypes.includes(result.recipe.mealType)) {
          return false;
        }
      }
      
      // Filter by continent
      if (filters?.continents && filters.continents.length > 0) {
        if (!filters.continents.includes(result.recipe.continent)) {
          return false;
        }
      }
      
      // At least 50% of ingredients match (or all if maxAdditionalIngredients is 0)
      const minMatch = filters?.maxAdditionalIngredients === 0 ? 1.0 : 0.5;
      return result.matchScore >= minMatch;
    })
    .sort((a, b) => {
      // Sort by: 1) fewer missing ingredients, 2) higher match score
      if (a.missingIngredients !== b.missingIngredients) {
        return a.missingIngredients - b.missingIngredients;
      }
      return b.matchScore - a.matchScore;
    })
    .map(result => result.recipe);
}
