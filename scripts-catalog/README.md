# Scripts Catalog

A modern web application for organizing and managing scripts with features like search, filtering, comparison, and analytics.

## Features

- 📊 Script analytics and statistics
- 🔍 Advanced search and filtering
- 📋 Script comparison
- 🏷️ Category and subcategory organization
- 📱 Responsive design

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create required directories:
```bash
mkdir -p src/data/scripts
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

```
scripts-catalog/
├── src/
│   ├── components/     # React components
│   ├── data/          # Data files
│   │   ├── scripts/   # Script JSON files
│   │   └── categories.json
│   ├── pages/         # Next.js pages
│   ├── styles/        # CSS styles
│   └── types/         # TypeScript types
├── public/            # Static files
└── package.json       # Project configuration
```

## Adding Scripts

Add script metadata as JSON files in the `src/data/scripts` directory. Each script should follow the format defined in `src/types/script.ts`.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter 