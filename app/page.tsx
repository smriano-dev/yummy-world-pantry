'use client';

import { useState, useEffect } from 'react';
import { InventoryItem, getIngredientNames } from '@/lib/inventory';
import { Recipe, RecipeFilters, findMatchingRecipes } from '@/lib/recipes';
import { searchAllAPIs } from '@/lib/api-integrations';
import { translations, Language } from '@/lib/translations';
import Papa from 'papaparse';

// Available continents
const availableContinents: Array<Recipe['continent']> = [
  'North America',
  'Central America',
  'South America',
  'Europe',
  'East Asia',
  'South Asia',
  'Africa',
  'Oceania',
  'International',
];

// helpers for flavor/diet checks
function textFromRecipe(recipe: Recipe) {
  return (
    (recipe.name || '') +
    ' ' +
    (recipe.description || '') +
    ' ' +
    (recipe.ingredients || []).join(' ')
  ).toLowerCase();
}

function matchesFlavor(recipe: Recipe, flavor: 'any' | 'bland' | 'balanced' | 'bold') {
  if (flavor === 'any') return true;
  const txt = textFromRecipe(recipe);

  const boldWords = [
    'chili',
    'chilli',
    'spicy',
    'curry',
    'harissa',
    'jerk',
    'peri peri',
    'sichuan',
    'gochujang',
    'kimchi',
    'garlic',
    'ginger',
  ];
  const isBold = boldWords.some((w) => txt.includes(w));

  if (flavor === 'bold') return isBold;
  if (flavor === 'bland') {
    // bland-ish = no bold words + common base foods
    const blandBases = ['potato', 'rice', 'pasta', 'chicken', 'milk'];
    const hasBlandBase = blandBases.some((w) => txt.includes(w));
    return hasBlandBase && !isBold;
  }
  // balanced = everything else
  return true;
}

function matchesDiet(recipe: Recipe, diets: string[]) {
  if (diets.length === 0) return true;
  const txt = textFromRecipe(recipe);

  const has = (...words: string[]) => words.some((w) => txt.includes(w));

  // quick detectors
  const hasMeat = has('chicken', 'beef', 'pork', 'lamb', 'shrimp', 'fish', 'bacon', 'sausage');
  const hasDairy = has('milk', 'cheese', 'butter', 'cream', 'yogurt');
  const hasEgg = has('egg');
  const hasGluten = has('flour', 'pasta', 'noodle', 'bread', 'tortilla', 'wheat', 'barley');
  const isSweet = has('sugar', 'honey', 'syrup', 'cake', 'dessert');

  for (const diet of diets) {
    if (diet === 'diabetic' && isSweet) return false;
    if (diet === 'gluten-free' && hasGluten) return false;
    if (diet === 'dairy-free' && hasDairy) return false;
    if (diet === 'vegetarian' && hasMeat) return false;
    if (diet === 'vegan' && (hasMeat || hasDairy || hasEgg || isSweet)) return false;
  }

  return true;
}

export default function Home() {
  // inventory + quick add
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const commonPantryItems = [
    { item: 'Onion', quantity: '1', type: 'produce' },
    { item: 'Garlic', quantity: '2 cloves', type: 'produce' },
    { item: 'Tomato', quantity: '2', type: 'produce' },
    { item: 'Potatoes', quantity: '2', type: 'produce' },
    { item: 'Rice', quantity: '1 cup', type: 'grain' },
    { item: 'Pasta', quantity: '1 lb', type: 'grain' },
    { item: 'Chicken breast', quantity: '1 lb', type: 'protein' },
    { item: 'Eggs', quantity: '6', type: 'protein' },
    { item: 'Milk', quantity: '1 qt', type: 'dairy' },
    { item: 'Butter', quantity: '2 tbsp', type: 'dairy' },
    { item: 'Black beans', quantity: '1 can', type: 'pantry' },
    { item: 'Lentils', quantity: '1 cup', type: 'pantry' },
    { item: 'Coconut milk', quantity: '1 can', type: 'pantry' },
  ];

  // recipes
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [apiRecipes, setApiRecipes] = useState<Recipe[]>([]);
  const [loadingApi, setLoadingApi] = useState(false);

  // UI
  const [showInventory, setShowInventory] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', quantity: '', type: '' });

  // language
  const [language, setLanguage] = useState<Language>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const t = translations[language] || translations.en;

  // filters
  const [maxAdditionalIngredients, setMaxAdditionalIngredients] = useState<number | undefined>(undefined);
  const [minServings, setMinServings] = useState<number | undefined>(undefined);
  const [maxServings, setMaxServings] = useState<number | undefined>(undefined);
  const [selectedMealTypes, setSelectedMealTypes] = useState<
    ('breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage')[]
  >([]);
  const [selectedContinents, setSelectedContinents] = useState<Array<Recipe['continent']>>([]);
  const [flavorProfile, setFlavorProfile] = useState<'any' | 'bland' | 'balanced' | 'bold'>('any');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);

  const useApiRecipes = true;

  // Load inventory
  useEffect(() => {
    const saved = localStorage.getItem('kitchen-inventory');
    if (saved) {
      try {
        setInventory(JSON.parse(saved));
      } catch (err) {
        console.error('Error loading inventory:', err);
      }
    }
  }, []);

  // close language menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLangMenu && !(event.target as Element).closest('.language-menu-container')) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu]);

  // fetch API recipes
  useEffect(() => {
    if (useApiRecipes && inventory.length > 0) {
      setLoadingApi(true);
      const ingredients = getIngredientNames(inventory);

      const normalizedIngredients = ingredients
        .map((ing) => {
          const lower = ing.toLowerCase();
          if (lower.includes('chicken')) return 'chicken';
          if (lower.includes('pasta') || lower.includes('noodle')) return 'pasta';
          if (lower.includes('rice')) return 'rice';
          if (lower.includes('pork')) return 'pork';
          if (lower.includes('beef')) return 'beef';
          if (lower.includes('tomato')) return 'tomato';
          if (lower.includes('potato')) return 'potato';
          if (lower.includes('egg')) return 'egg';
          if (lower.includes('garlic')) return 'garlic';
          if (lower.includes('onion')) return 'onion';
          if (lower.includes('pepper')) return 'pepper';
          if (lower.includes('carrot')) return 'carrot';
          if (lower.includes('bean')) return 'bean';
          if (lower.includes('chickpea')) return 'chickpea';
          if (lower.includes('avocado')) return 'avocado';
          return ing.split(/\s+/)[0].toLowerCase();
        })
        .filter((v, i, a) => a.indexOf(v) === i);

      searchAllAPIs(normalizedIngredients)
        .then((apiResults) => {
          const recipesWithImages = apiResults.map((recipe) => ({
            ...recipe,
            image:
              recipe.image && recipe.image.startsWith('http')
                ? recipe.image
                : `https://source.unsplash.com/800x600/?${encodeURIComponent(recipe.name)}`,
          }));
          setApiRecipes(recipesWithImages);
          setLoadingApi(false);
        })
        .catch((err) => {
          console.error('Error fetching API recipes:', err);
          setApiRecipes([]);
          setLoadingApi(false);
        });
    } else {
      setApiRecipes([]);
    }
  }, [inventory, useApiRecipes]);

  // recompute recipes
  useEffect(() => {
    try {
      const filters: RecipeFilters = {
        maxAdditionalIngredients,
        minServings,
        maxServings,
        mealTypes: selectedMealTypes.length > 0 ? selectedMealTypes : undefined,
        continents: selectedContinents.length > 0 ? selectedContinents : undefined,
      };

      const ingredients = getIngredientNames(inventory);

      // local
      const localMatches = findMatchingRecipes(ingredients, filters);

      // start map by name
      const byName = new Map<string, Recipe>();
      localMatches.forEach((r) => {
        byName.set(r.name.toLowerCase(), r);
      });

      // apply same filters to API stuff
      let filteredApi = apiRecipes;
      if (filters.mealTypes && filters.mealTypes.length > 0) {
        filteredApi = filteredApi.filter((r) => filters.mealTypes!.includes(r.mealType));
      }
      if (filters.continents && filters.continents.length > 0) {
        filteredApi = filteredApi.filter((r) => filters.continents!.includes(r.continent));
      }
      if (filters.minServings) {
        filteredApi = filteredApi.filter((r) => !r.servings || r.servings >= filters.minServings!);
      }
      if (filters.maxServings) {
        filteredApi = filteredApi.filter((r) => !r.servings || r.servings <= filters.maxServings!);
      }

      // overlay API (prefer image)
      filteredApi.forEach((api) => {
        const key = api.name.toLowerCase();
        const existing = byName.get(key);
        if (!existing) {
          byName.set(key, api);
        } else {
          if ((!existing.image || existing.image === '') && api.image) {
            byName.set(key, api);
          }
        }
      });

      // Now apply flavor + dietary
      let finalRecipes = Array.from(byName.values()).filter((r) => matchesFlavor(r, flavorProfile));
      finalRecipes = finalRecipes.filter((r) => matchesDiet(r, dietaryFilters));

      setRecipes(finalRecipes);
    } catch (err) {
      console.error('Error updating recipes:', err);
      setRecipes([]);
    }
  }, [
    maxAdditionalIngredients,
    minServings,
    maxServings,
    selectedMealTypes,
    selectedContinents,
    inventory,
    apiRecipes,
    flavorProfile,
    dietaryFilters,
  ]);

  // save inventory
  const saveInventory = (items: InventoryItem[]) => {
    localStorage.setItem('kitchen-inventory', JSON.stringify(items));
    setInventory(items);
  };

  // csv
  const handleCSVImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const items: InventoryItem[] = (results.data as any[])
          .filter((row: any) => row.Item)
          .map((row: any, index: number) => ({
            id: `item-${Date.now()}-${index}`,
            item: row.Item || '',
            brand: row['Brand / Label'] || '',
            quantity: row['Approx. Quantity'] || '',
            type: row['Type (Processed / Fresh)'] || '',
            classification: row.Classification || '',
            ethnicity: row['Ethnicity / Origin'] || '',
            notes: row['Notes / Health Callouts'] || '',
          }));
        saveInventory(items);
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert('Error parsing CSV file. Please check the format.');
      },
    });
  };

  // manual add
  const handleAddItem = () => {
    if (!newItem.item.trim()) return;
    const item: InventoryItem = {
      id: `item-${Date.now()}`,
      item: newItem.item,
      quantity: newItem.quantity,
      type: newItem.type,
    };
    const updated = [...inventory, item];
    saveInventory(updated);
    setNewItem({ item: '', quantity: '', type: '' });
    setShowAddForm(false);
  };

  // remove
  const handleRemoveItem = (id: string) => {
    const updated = inventory.filter((item) => item.id !== id);
    saveInventory(updated);
  };

  // filters
  const toggleMealType = (type: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'beverage') => {
    setSelectedMealTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const toggleContinent = (continent: Recipe['continent']) => {
    setSelectedContinents((prev) =>
      prev.includes(continent) ? prev.filter((c) => c !== continent) : [...prev, continent],
    );
  };

  const toggleDiet = (diet: string) => {
    setDietaryFilters((prev) => (prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]));
  };

  // missing
  const getMissingIngredients = (recipe: Recipe): number => {
    const ingredients = getIngredientNames(inventory);
    const normalizedAvailable = ingredients.map((i) => i.toLowerCase().replace(/[^\w\s]/g, '').trim());
    const normalizedRecipeIngredients = recipe.ingredients.map((i) =>
      i.toLowerCase().replace(/[^\w\s]/g, '').trim(),
    );

    const matched = normalizedRecipeIngredients.filter((ing) =>
      normalizedAvailable.some(
        (avail) =>
          avail.includes(ing) ||
          ing.includes(avail) ||
          avail.split(/\s+/).some((word) => ing.includes(word)) ||
          ing.split(/\s+/).some((word) => avail.includes(word)),
      ),
    );

    return recipe.ingredients.length - matched.length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* HEADER */}
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-1 tracking-tight">
                🍳 {t.appName}
              </h1>
              <p className="text-slate-600">{t.subtitle}</p>
            </div>

            {/* language */}
            <div className="relative language-menu-container">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 hover:border-slate-300 transition-all"
              >
                <span className="text-2xl">🌐</span>
                <span className="font-semibold text-slate-700 uppercase">{language}</span>
                <span className="text-slate-400">▼</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-md z-50 min-w-[140px] border border-slate-100">
                  {(['en', 'es', 'fr'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                        language === lang ? 'bg-red-50 text-red-600 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      {lang === 'en' ? 'English' : lang === 'es' ? 'Español' : 'Français'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* inventory controls */}
          <div className="flex flex-wrap gap-3">
            <label className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-xl cursor-pointer transition-all text-sm font-semibold shadow-sm">
              {t.importCSV}
              <input type="file" accept=".csv" onChange={handleCSVImport} className="hidden" />
            </label>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl transition-all text-sm font-semibold shadow-sm border border-slate-200"
            >
              + {t.addItem}
            </button>
            <button
              onClick={() => setShowQuickAdd(true)}
              className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl transition-all text-sm font-semibold shadow-sm border border-slate-200"
            >
              Quick add
            </button>
            <button
              onClick={() => setShowInventory(!showInventory)}
              className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl transition-all text-sm font-semibold shadow-sm border border-slate-200"
            >
              {showInventory ? '▼' : '▶'} {t.inventory} ({inventory.length})
            </button>
          </div>

          {/* manual add form */}
          {showAddForm && (
            <div className="mt-3 bg-white rounded-xl shadow-md p-4 max-w-md border border-slate-100">
              <input
                type="text"
                placeholder={t.itemName}
                value={newItem.item}
                onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                className="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder={t.quantity}
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <input
                  type="text"
                  placeholder={t.type}
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddItem}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {t.add}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewItem({ item: '', quantity: '', type: '' });
                  }}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </div>
          )}

          {/* inventory list */}
          {showInventory && (
            <div className="mt-4 bg-white rounded-xl shadow-md p-6 border border-slate-100">
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {inventory.length === 0 ? (
                  <p className="text-slate-500 text-center py-4">{t.noItems}</p>
                ) : (
                  inventory.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{item.item}</div>
                        {(item.quantity || item.type) && (
                          <div className="text-sm text-slate-500">
                            {item.quantity && <span>{item.quantity}</span>}
                            {item.quantity && item.type && <span> • </span>}
                            {item.type && <span>{item.type}</span>}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </header>

        {/* FILTERS */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Filter recipes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Additional Ingredients */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-2">
                How many ingredients can we add?
              </label>
              <p className="text-xs text-slate-400 mb-3">
                0 = use only what I have. Higher = allow us to add a few items.
              </p>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() =>
                      setMaxAdditionalIngredients(maxAdditionalIngredients === num ? undefined : num)
                    }
                    className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                      maxAdditionalIngredients === num
                        ? 'bg-red-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Servings */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Servings needed
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  min="1"
                  value={minServings || ''}
                  onChange={(e) => setMinServings(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
                <span className="text-slate-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  min="1"
                  value={maxServings || ''}
                  onChange={(e) => setMaxServings(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
            </div>

            {/* Meal Types */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Meal type
              </label>
              <div className="flex flex-wrap gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack', 'beverage'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleMealType(type)}
                    className={`px-4 py-2 rounded-xl transition-all capitalize text-sm font-medium ${
                      selectedMealTypes.includes(type)
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {t[type as keyof typeof t] || type}
                  </button>
                ))}
              </div>
            </div>

            {/* Ethnicity/Continent */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Region / cuisine
              </label>
              <div className="flex flex-wrap gap-2">
                {availableContinents.map((continent) => (
                  <button
                    key={continent}
                    onClick={() => toggleContinent(continent)}
                    className={`px-3 py-1.5 rounded-lg transition-colors text-sm ${
                      selectedContinents.includes(continent)
                        ? 'bg-orange-400 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {continent}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Flavor + Dietary */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Flavor */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Flavor intensity
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'any', label: 'Anything' },
                  { id: 'bland', label: 'Mild / simple' },
                  { id: 'balanced', label: 'Balanced' },
                  { id: 'bold', label: 'Bold / spicy' },
                ].map((fl) => (
                  <button
                    key={fl.id}
                    onClick={() => setFlavorProfile(fl.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      flavorProfile === fl.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {fl.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary */}
            <div>
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Dietary needs
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'diabetic', label: 'Diabetic-friendly' },
                  { id: 'gluten-free', label: 'Gluten-free' },
                  { id: 'dairy-free', label: 'Dairy-free' },
                  { id: 'vegetarian', label: 'Vegetarian' },
                  { id: 'vegan', label: 'Vegan' },
                ].map((diet) => (
                  <button
                    key={diet.id}
                    onClick={() => toggleDiet(diet.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      dietaryFilters.includes(diet.id)
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {diet.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                These are best-effort filters based on ingredient names.
              </p>
            </div>
          </div>
        </div>

        {/* RECIPES */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {t.matchingRecipes} ({recipes.length})
          </h2>

          {loadingApi && (
            <p className="text-slate-400 text-sm mb-4">Pulling recipes from external databases…</p>
          )}

          {recipes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
              <p className="text-slate-600 mb-4 text-lg">{t.noRecipes}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => {
                const missingCount = getMissingIngredients(recipe);
                const imageUrl =
                  recipe.image && recipe.image.startsWith('http')
                    ? recipe.image
                    : `https://source.unsplash.com/800x600/?${encodeURIComponent(
                        recipe.continent || recipe.mealType || 'food',
                      )}`;

                return (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://source.unsplash.com/800x600/?food';
                        }}
                      />
                      {missingCount > 0 && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                            +{missingCount} ingredients
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 flex gap-2">
                        <span className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                          {recipe.continent}
                        </span>
                        {(recipe.id.startsWith('mealdb-') ||
                          recipe.id.startsWith('forkify-') ||
                          recipe.id.startsWith('cocktaildb-') ||
                          recipe.id.startsWith('ninjas-')) && (
                          <span className="bg-slate-900 text-white px-2 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                            API
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="bg-purple-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm capitalize">
                          {t[recipe.mealType as keyof typeof t] || recipe.mealType}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-slate-800 mb-1">{recipe.name}</h3>
                      <p className="text-slate-500 text-sm mb-4">{recipe.description}</p>

                      {recipe.nutrition && (
                        <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                          <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                            {t.nutritionPerServing}
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-slate-500">{t.calories}:</span>
                              <span className="font-semibold ml-1">
                                {recipe.nutrition.calories}
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">{t.protein}:</span>
                              <span className="font-semibold ml-1">
                                {recipe.nutrition.protein}g
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">{t.carbs}:</span>
                              <span className="font-semibold ml-1">
                                {recipe.nutrition.carbs}g
                              </span>
                            </div>
                            <div>
                              <span className="text-slate-500">{t.fat}:</span>
                              <span className="font-semibold ml-1">
                                {recipe.nutrition.fat}g
                              </span>
                            </div>
                            {recipe.nutrition.fiber !== undefined && (
                              <div>
                                <span className="text-slate-500">{t.fiber}:</span>
                                <span className="font-semibold ml-1">
                                  {recipe.nutrition.fiber}g
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-4 text-sm text-slate-500 mb-4">
                        {recipe.prepTime && (
                          <span>
                            ⏱ {t.prep}: {recipe.prepTime}
                          </span>
                        )}
                        {recipe.cookTime && (
                          <span>
                            🔥 {t.cook}: {recipe.cookTime}
                          </span>
                        )}
                        {recipe.servings && (
                          <span>
                            👥 {recipe.servings} {t.serves}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-slate-800 mb-3 text-sm">
                          {t.ingredients}:
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.slice(0, 4).map((ingredient, idx) => {
                            const invIngredients = getIngredientNames(inventory);
                            const hasIngredient = invIngredients.some(
                              (inv) =>
                                inv.toLowerCase().includes(ingredient.toLowerCase()) ||
                                ingredient.toLowerCase().includes(inv.toLowerCase()),
                            );
                            return (
                              <span
                                key={idx}
                                className={`px-2 py-1 rounded text-xs ${
                                  hasIngredient
                                    ? 'bg-emerald-100 text-emerald-700'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {ingredient}
                              </span>
                            );
                          })}
                          {recipe.ingredients.length > 4 && (
                            <span className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-600">
                              +{recipe.ingredients.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>

                      <details className="mt-4">
                        <summary className="cursor-pointer text-red-500 hover:text-red-600 font-semibold text-sm">
                          {t.viewFullRecipe}
                        </summary>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm">
                              {t.allIngredients}:
                            </h4>
                            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                              {recipe.ingredients.map((ing, idx) => (
                                <li key={idx}>{ing}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 mb-2 text-sm">
                              {t.instructions}:
                            </h4>
                            <ol className="list-decimal list-inside text-sm text-slate-600 space-y-2">
                              {recipe.instructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* QUICK ADD MODAL */}
        {showQuickAdd && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-slate-900">Quick add pantry items</h2>
                <button
                  onClick={() => setShowQuickAdd(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Tap an item to add it to your inventory.
              </p>
              <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto">
                {commonPantryItems.map((item) => (
                  <button
                    key={item.item}
                    onClick={() => {
                      setInventory((prev) => [
                        ...prev,
                        {
                          id: `item-${Date.now()}-${item.item}`,
                          item: item.item,
                          quantity: item.quantity,
                          type: item.type,
                        },
                      ]);
                    }}
                    className="px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700 hover:bg-red-500 hover:text-white transition"
                  >
                    {item.item}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowQuickAdd(false)}
                className="w-full mt-2 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
