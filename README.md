# Dinner App 🍳

A modern, intuitive web application that helps you find recipes based on the ingredients you have in your kitchen.

## Features

- 📦 **Kitchen Inventory Management**: Add, remove, and search through your inventory items
- 📄 **CSV Import**: Import your existing inventory from a CSV file
- 🔍 **Smart Recipe Matching**: Automatically finds recipes that match your available ingredients
- 🎨 **Beautiful UI**: Modern, responsive design with an intuitive interface
- 💾 **Local Storage**: Your inventory is automatically saved in your browser

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Adding Items to Inventory

1. Click the "+ Add Item" button
2. Enter the item name (required)
3. Optionally add quantity and type
4. Click "Add"

### Importing from CSV

1. Click the "Import CSV" button
2. Select your CSV file
3. The app will automatically parse and load your inventory

The CSV should have columns: `Item`, `Brand / Label`, `Approx. Quantity`, `Type (Processed / Fresh)`, `Classification`, `Ethnicity / Origin`, `Notes / Health Callouts`

### Finding Recipes

- Recipes are automatically matched based on your inventory
- Recipes need at least 50% of their ingredients to match
- Ingredients you have are highlighted in green
- Click "View Instructions" to see cooking steps

## Technologies Used

- **Next.js 14**: React framework for production
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **PapaParse**: CSV parsing library

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main page component
│   └── globals.css     # Global styles
├── lib/
│   ├── recipes.ts      # Recipe database and matching logic
│   └── inventory.ts    # Inventory parsing utilities
└── package.json        # Dependencies
```

## Building for Production

```bash
npm run build
npm start
```

## License

MIT

