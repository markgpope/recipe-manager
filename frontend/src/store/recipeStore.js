import create from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  collections: [],
  filters: {
    tags: [],
    difficulty: null,
    isFavorite: false
  },
  setRecipes: (recipes) => set({ recipes }),
  setCollections: (collections) => set({ collections }),
  setFilters: (filters) => set({ filters }),
  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  removeRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((r) => r._id !== id)
  }))
}));

export default useRecipeStore;
