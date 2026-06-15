import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { recipeService } from '../services/api';
import useRecipeStore from '../store/recipeStore';
import useAuthStore from '../store/authStore';

export default function RecipesPage() {
  const { setRecipes } = useRecipeStore();
  const { logout } = useAuthStore();
  const { data, isLoading, error } = useQuery('recipes', recipeService.getAll);

  useEffect(() => {
    if (data?.data) {
      setRecipes(data.data);
    }
  }, [data, setRecipes]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">🍳 My Recipes</h1>
          <div className="space-x-4">
            <Link to="/import" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Import Recipes
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && <div className="text-center py-8">Loading recipes...</div>}
        {error && <div className="text-center text-red-600 py-8">Error loading recipes</div>}
        
        {data?.data && data.data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 mb-4">No recipes yet. Start by importing from Notes or Instagram!</p>
            <Link to="/import" className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Import Your First Recipe
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((recipe) => (
            <Link
              key={recipe._id}
              to={`/recipe/${recipe._id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {recipe.images?.[0] && (
                <img
                  src={recipe.images[0].url}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{recipe.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{recipe.ingredients?.length || 0} ingredients</span>
                  <span>{recipe.source}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
