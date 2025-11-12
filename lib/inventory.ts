export interface InventoryItem {
  id: string;
  item: string;
  brand?: string;
  quantity?: string;
  type?: string;
  classification?: string;
  ethnicity?: string;
  notes?: string;
}

// Parse CSV data
export function parseInventoryCSV(csvText: string): InventoryItem[] {
  const lines = csvText.split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const items: InventoryItem[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Simple CSV parsing (handles quoted fields)
    const values: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length > 0 && values[0]) {
      items.push({
        id: `item-${i}`,
        item: values[0] || '',
        brand: values[1] || '',
        quantity: values[2] || '',
        type: values[3] || '',
        classification: values[4] || '',
        ethnicity: values[5] || '',
        notes: values[6] || ''
      });
    }
  }
  
  return items;
}

// Get ingredient names from inventory
export function getIngredientNames(items: InventoryItem[]): string[] {
  return items.map(item => item.item).filter(Boolean);
}

