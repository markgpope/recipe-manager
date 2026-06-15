import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { recipeService } from '../services/api';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: recipe, isLoading, error } = useQuery(['recipe', id], () => recipeService.getById(id));

  if (isLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-8">Error loading recipe</div>;

  const r = recipe?.data;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 mb-4"
          >
            ← Back to Recipes
          </button>
          <h1 className="text-3xl font-bold">{r?.title}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image */}
          {r?.images?.[0] && (
            <img
              src={r.images[0].url}
              alt={r.title}
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-8">
            {/* Description */}
            {r?.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                <p className="text-gray-700">{r.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {r?.difficulty && (
                <div className="bg-blue-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Difficulty</div>
                  <div className="text-lg font-semibold capitalize">{r.difficulty}</div>
                </div>
              )}
              {r?.prepTime && (
                <div className="bg-green-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Prep Time</div>
                  <div className="text-lg font-semibold">{r.prepTime} min</div>
                </div>
              )}
              {r?.cookTime && (
                <div className="bg-orange-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Cook Time</div>
                  <div className="text-lg font-semibold">{r.cookTime} min</div>
                </div>
              )}
              {r?.servings && (
                <div className="bg-purple-50 p-4 rounded">
                  <div className="text-sm text-gray-600">Servings</div>
                  <div className="text-lg font-semibold">{r.servings}</div>
                </div>
              )}
            </div>

            {/* Ingredients */}
            {r?.ingredients && r.ingredients.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="space-y-2">
                  {r.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-gray-400 mr-3">•</span>
                      <span>
                        {ingredient.quantity} {ingredient.unit} {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Instructions */}
            {r?.instructions && r.instructions.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <ol className="space-y-4">
                  {r.instructions.map((instruction, idx) => (
                    <li key={idx} className="flex">
                      <span className="font-semibold text-gray-400 mr-4 min-w-8">{instruction.step}.</span>
                      <span>{instruction.description}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Tags */}
            {r?.tags && r.tags.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((tag, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
