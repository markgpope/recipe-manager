import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import AuthPage from './pages/AuthPage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetail from './pages/RecipeDetail';
import ImportPage from './pages/ImportPage';
import useAuthStore from './store/authStore';

const queryClient = new QueryClient();

function App() {
  const { user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        {!user ? (
          <Routes>
            <Route path="*" element={<AuthPage />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<RecipesPage />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/import" element={<ImportPage />} />
          </Routes>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;
