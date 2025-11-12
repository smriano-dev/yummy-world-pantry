import { Recipe, Nutrition } from './recipes';

// TheMealDB API integration
const MEALDB_API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// Map TheMealDB area to our continent system
function mapAreaToContinent(area: string): Recipe['continent'] {
  const areaMap: Record<string, Recipe['continent']> = {
    'American': 'North America',
    'British': 'Europe',
    'Canadian': 'North America',
    'Chinese': 'East Asia',
    'Croatian': 'Europe',
    'Dutch': 'Europe',
    'Egyptian': 'Africa',
    'Filipino': 'East Asia',
    'French': 'Europe',
    'Greek': 'Europe',
    'Indian': 'South Asia',
    'Irish': 'Europe',
    'Italian': 'Europe',
    'Jamaican': 'Central America',
    'Japanese': 'East Asia',
    'Kenyan': 'Africa',
    'Malaysian': 'East Asia',
    'Mexican': 'Central America',
    'Moroccan': 'Africa',
    'Polish': 'Europe',
    'Portuguese': 'Europe',
    'Russian': 'Europe',
    'Spanish': 'Europe',
    'Thai': 'East Asia',
    'Tunisian': 'Africa',
    'Turkish': 'Europe',
    'Unknown': 'International',
    'Vietnamese': 'East Asia',
  };
  return areaMap[area] || 'International';
}

// Map TheMealDB category to meal type
function mapCategoryToMealType(category: string): Recipe['mealType'] {
  const categoryMap: Record<string, Recipe['mealType']> = {
    'Breakfast': 'breakfast',
    'Dessert': 'snack',
    'Side': 'snack',
    'Starter': 'snack',
  };
  return categoryMap[category] || 'dinner';
}

// Estimate nutrition from TheMealDB data (since they don't provide it)
function estimateNutrition(ingredients: string[], servings: number = 4): Nutrition {
  // Rough estimates based on typical meal composition
  const baseCalories = 300;
  const baseProtein = 15;
  const baseCarbs = 40;
  const baseFat = 10;
  
  // Adjust based on ingredient count and type
  const ingredientCount = ingredients.length;
  const hasMeat = ingredients.some(ing => 
    ing.toLowerCase().includes('chicken') || 
    ing.toLowerCase().includes('beef') || 
    ing.toLowerCase().includes('pork')
  );
  
  return {
    calories: Math.round(baseCalories + (ingredientCount * 20) + (hasMeat ? 100 : 0)),
    protein: Math.round(baseProtein + (hasMeat ? 15 : 5)),
    carbs: Math.round(baseCarbs + (ingredientCount * 5)),
    fat: Math.round(baseFat + (hasMeat ? 8 : 2)),
    fiber: Math.round(3 + (ingredientCount * 0.5))
  };
}

// Convert TheMealDB meal to our Recipe format
export function convertMealDBToRecipe(meal: any): Recipe {
  // Extract ingredients (TheMealDB has ingredients as strIngredient1, strIngredient2, etc.)
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(measure ? `${measure} ${ingredient}`.trim() : ingredient);
    }
  }

  // Parse instructions
  const instructions = meal.strInstructions
    ? meal.strInstructions.split(/\r\n|\n/).filter((step: string) => step.trim())
    : [];

  const servings = 4; // TheMealDB doesn't provide servings, default to 4

  return {
    id: `mealdb-${meal.idMeal}`,
    name: meal.strMeal || 'Unknown Recipe',
    description: meal.strInstructions?.substring(0, 150) + '...' || 'Delicious recipe from TheMealDB',
    ingredients,
    instructions,
    cuisine: meal.strArea || undefined,
    continent: mapAreaToContinent(meal.strArea || 'Unknown'),
    prepTime: '15 min', // Estimate
    cookTime: '30 min', // Estimate
    servings,
    mealType: mapCategoryToMealType(meal.strCategory || ''),
    nutrition: estimateNutrition(ingredients, servings),
    image: meal.strMealThumb || 'https://via.placeholder.com/800x600?text=Recipe+Image'
  };
}

// Search recipes by ingredient
export async function searchRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${MEALDB_API_BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) return [];

    // Fetch full details for each meal
    const mealPromises = data.meals.slice(0, 10).map((meal: any) =>
      fetch(`${MEALDB_API_BASE}/lookup.php?i=${meal.idMeal}`)
        .then(res => res.json())
        .then(data => data.meals?.[0])
    );

    const meals = await Promise.all(mealPromises);
    return meals.filter(Boolean).map(convertMealDBToRecipe);
  } catch (error) {
    console.error('Error fetching recipes from TheMealDB:', error);
    return [];
  }
}

// Search recipes by name
export async function searchRecipesByName(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${MEALDB_API_BASE}/search.php?s=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) return [];

    return data.meals.slice(0, 10).map(convertMealDBToRecipe);
  } catch (error) {
    console.error('Error fetching recipes from TheMealDB:', error);
    return [];
  }
}

// Get recipes by area (cuisine)
export async function getRecipesByArea(area: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${MEALDB_API_BASE}/filter.php?a=${encodeURIComponent(area)}`);
    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) return [];

    // Fetch full details for each meal
    const mealPromises = data.meals.slice(0, 10).map((meal: any) =>
      fetch(`${MEALDB_API_BASE}/lookup.php?i=${meal.idMeal}`)
        .then(res => res.json())
        .then(data => data.meals?.[0])
    );

    const meals = await Promise.all(mealPromises);
    return meals.filter(Boolean).map(convertMealDBToRecipe);
  } catch (error) {
    console.error('Error fetching recipes from TheMealDB:', error);
    return [];
  }
}

// Get random recipes
export async function getRandomRecipes(count: number = 5): Promise<Recipe[]> {
  try {
    const promises = Array(count).fill(null).map(() =>
      fetch(`${MEALDB_API_BASE}/random.php`)
        .then(res => res.json())
        .then(data => data.meals?.[0])
    );

    const meals = await Promise.all(promises);
    return meals.filter(Boolean).map(convertMealDBToRecipe);
  } catch (error) {
    console.error('Error fetching random recipes from TheMealDB:', error);
    return [];
  }
}

// Search recipes by multiple ingredients (finds recipes that use any of the ingredients)
export async function searchRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
  try {
    // Search for each ingredient and combine results
    const allRecipes = new Map<string, Recipe>();
    
    for (const ingredient of ingredients.slice(0, 5)) { // Limit to 5 ingredients to avoid too many requests
      const recipes = await searchRecipesByIngredient(ingredient);
      recipes.forEach(recipe => {
        if (!allRecipes.has(recipe.id)) {
          allRecipes.set(recipe.id, recipe);
        }
      });
    }

    return Array.from(allRecipes.values());
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    return [];
  }
}

