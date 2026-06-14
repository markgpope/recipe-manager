# Recipe Manager 🍳

A browser-based recipe management app with cloud sync. Import recipes from macOS Notes, Instagram, and manage them all in one place.

## Features

- 📝 **Recipe Management**: Create, edit, and organize recipes
- 🖼️ **Image Support**: Store images (local upload or online URLs)
- 📱 **Notes Import**: Read recipes from macOS Notes app
- 📸 **Instagram Integration**: Import saved recipes from Instagram
- 🏷️ **Organization**: Filter by tags, ingredients, difficulty, cook time
- 🛒 **Shopping List**: Generate shopping lists from recipes
- ⭐ **Favorites**: Mark and organize favorite recipes
- ☁️ **Cloud Sync**: Automatic synchronization across devices
- 📊 **Meal Planning**: Plan meals for the week

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- React Query for data fetching
- Zustand for state management

**Backend:**
- Node.js/Express
- MongoDB with Mongoose
- Firebase Authentication
- Firebase Storage for images

**Integration:**
- Puppeteer for Instagram scraping (with headless browser)
- Apple Notes parsing

## Project Structure

```
recipe-manager/
├── frontend/              # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── backend/               # Express server
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── services/
│   └── package.json
├── scraper/              # Instagram scraper service
│   └── instagram.js
└── docker-compose.yml
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Firebase project setup

### Installation

1. Clone the repo
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Set up environment variables (see `.env.example` files)

4. Start development:
   ```bash
   # Terminal 1: Backend
   cd backend && npm run dev
   
   # Terminal 2: Frontend
   cd frontend && npm start
   ```

## Configuration

See `.env.example` files in frontend/ and backend/ directories.

### Instagram Scraping

The Instagram integration uses a headless browser approach:
- Requires manual login credentials (stored securely)
- Captures saved recipe posts from your saved folder
- Extracts image URLs and captions
- **Note**: This is a workaround; respect Instagram's Terms of Service

## API Endpoints

### Recipes
- `GET /api/recipes` - List all recipes
- `GET /api/recipes/:id` - Get recipe details
- `POST /api/recipes` - Create recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe

### Import
- `POST /api/import/notes` - Import from Notes
- `POST /api/import/instagram` - Trigger Instagram scrape

### Collections
- `GET /api/collections` - List recipe collections
- `POST /api/collections` - Create collection

## License

MIT
