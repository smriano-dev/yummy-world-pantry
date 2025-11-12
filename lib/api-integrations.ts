import { Recipe, Nutrition } from './recipes';

// Map area/cuisine to continent
function mapToContinent(area: string): Recipe['continent'] {
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
    'Vietnamese': 'East Asia',
  };
  return areaMap[area] || 'International';
}

function estimateNutrition(ingredients: string[], servings: number = 4): Nutrition {
  const baseCalories = 300;
  const baseProtein = 15;
  const baseCarbs = 40;
  const baseFat = 10;
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

// ========== TheMealDB API ==========
const MEALDB_API = 'https://www.themealdb.com/api/json/v1/1';

export async function searchMealDB(ingredient: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${MEALDB_API}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.meals || data.meals.length === 0) return [];

    const mealPromises = data.meals.slice(0, 5).map((meal: any) =>
      fetch(`${MEALDB_API}/lookup.php?i=${meal.idMeal}`)
        .then(res => res.json())
        .then(data => data.meals?.[0])
    );

    const meals = await Promise.all(mealPromises);
    return meals.filter(Boolean).map((meal: any) => {
      const ingredients: string[] = [];
      for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push(measure ? `${measure} ${ing}`.trim() : ing);
        }
      }
      const instructions = meal.strInstructions?.split(/\r\n|\n/).filter((s: string) => s.trim()) || [];
      
      return {
        id: `mealdb-${meal.idMeal}`,
        name: meal.strMeal || 'Unknown',
        description: meal.strInstructions?.substring(0, 150) + '...' || 'Delicious recipe',
        ingredients,
        instructions,
        cuisine: meal.strArea || undefined,
        continent: mapToContinent(meal.strArea || ''),
        prepTime: '15 min',
        cookTime: '30 min',
        servings: 4,
        mealType: meal.strCategory === 'Breakfast' ? 'breakfast' : 'dinner',
        nutrition: estimateNutrition(ingredients),
        image: meal.strMealThumb || ''
      };
    });
  } catch (error) {
    console.error('MealDB error:', error);
    return [];
  }
}

// ========== Forkify API ==========
const FORKIFY_API = 'https://forkify-api.herokuapp.com/api/v2/recipes';

export async function searchForkify(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${FORKIFY_API}?search=${encodeURIComponent(query)}`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.data?.recipes || data.data.recipes.length === 0) return [];

    return data.data.recipes.slice(0, 5).map((recipe: any) => {
      const ingredients = recipe.ingredients?.map((ing: any) => 
        `${ing.quantity || ''} ${ing.unit || ''} ${ing.description || ''}`.trim()
      ) || [];
      
      return {
        id: `forkify-${recipe.id}`,
        name: recipe.title || 'Unknown',
        description: recipe.publisher || 'Delicious recipe',
        ingredients,
        instructions: recipe.instructions ? [recipe.instructions] : [],
        cuisine: undefined,
        continent: 'International',
        prepTime: '15 min',
        cookTime: recipe.cooking_time ? `${recipe.cooking_time} min` : '30 min',
        servings: recipe.servings || 4,
        mealType: 'dinner',
        nutrition: estimateNutrition(ingredients, recipe.servings),
        image: recipe.image_url || ''
      };
    });
  } catch (error) {
    console.error('Forkify error:', error);
    return [];
  }
}

// ========== API Ninjas ==========
export async function searchApiNinjas(query: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(query)}`, {
      headers: {
        'X-Api-Key': 'YOUR_API_KEY' // Note: User needs to add their API key
      }
    });
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data || data.length === 0) return [];

    return data.slice(0, 5).map((recipe: any) => ({
      id: `ninjas-${Date.now()}-${Math.random()}`,
      name: recipe.title || 'Unknown',
      description: recipe.instructions?.substring(0, 150) || 'Delicious recipe',
      ingredients: recipe.ingredients?.split(',').map((s: string) => s.trim()) || [],
      instructions: recipe.instructions?.split('\n').filter((s: string) => s.trim()) || [],
      cuisine: undefined,
      continent: 'International',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: 4,
      mealType: 'dinner',
      nutrition: estimateNutrition(recipe.ingredients?.split(',') || []),
      image: ''
    }));
  } catch (error) {
    console.error('API Ninjas error:', error);
    return [];
  }
}

// ========== TheCocktailDB (for beverages) ==========
const COCKTAILDB_API = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function searchCocktailDB(ingredient: string): Promise<Recipe[]> {
  try {
    const response = await fetch(`${COCKTAILDB_API}/filter.php?i=${encodeURIComponent(ingredient)}`);
    if (!response.ok) return [];
    
    const data = await response.json();
    if (!data.drinks || data.drinks.length === 0) return [];

    const drinkPromises = data.drinks.slice(0, 5).map((drink: any) =>
      fetch(`${COCKTAILDB_API}/lookup.php?i=${drink.idDrink}`)
        .then(res => res.json())
        .then(data => data.drinks?.[0])
    );

    const drinks = await Promise.all(drinkPromises);
    return drinks.filter(Boolean).map((drink: any) => {
      const ingredients: string[] = [];
      for (let i = 1; i <= 15; i++) {
        const ing = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ing && ing.trim()) {
          ingredients.push(measure ? `${measure} ${ing}`.trim() : ing);
        }
      }
      
      return {
        id: `cocktaildb-${drink.idDrink}`,
        name: drink.strDrink || 'Unknown',
        description: drink.strInstructions?.substring(0, 150) || 'Refreshing beverage',
        ingredients,
        instructions: drink.strInstructions?.split('.').filter((s: string) => s.trim()) || [],
        cuisine: drink.strCategory || undefined,
        continent: 'International',
        prepTime: '5 min',
        cookTime: '0 min',
        servings: 1,
        mealType: 'beverage',
        nutrition: { calories: 150, protein: 0, carbs: 15, fat: 0, fiber: 0 },
        image: drink.strDrinkThumb || ''
      };
    });
  } catch (error) {
    console.error('CocktailDB error:', error);
    return [];
  }
}

// ========== Combined search function ==========
export async function searchAllAPIs(ingredients: string[]): Promise<Recipe[]> {
  const allRecipes: Recipe[] = [];
  const normalizedIngredients = ingredients.slice(0, 3); // Limit to avoid too many requests

  // Search TheMealDB
  for (const ing of normalizedIngredients) {
    const recipes = await searchMealDB(ing);
    allRecipes.push(...recipes);
  }

  // Search Forkify
  for (const ing of normalizedIngredients) {
    const recipes = await searchForkify(ing);
    allRecipes.push(...recipes);
  }

  // Search CocktailDB for beverages
  for (const ing of normalizedIngredients) {
    const recipes = await searchCocktailDB(ing);
    allRecipes.push(...recipes);
  }

  // Deduplicate by name
  const uniqueRecipes = new Map<string, Recipe>();
  allRecipes.forEach(recipe => {
    const key = recipe.name.toLowerCase();
    if (!uniqueRecipes.has(key)) {
      uniqueRecipes.set(key, recipe);
    }
  });

  return Array.from(uniqueRecipes.values());
}

