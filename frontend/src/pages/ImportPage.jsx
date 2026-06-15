import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { importService } from '../services/api';

export default function ImportPage() {
  const navigate = useNavigate();
  const [importType, setImportType] = useState('instagram');
  const [igUsername, setIgUsername] = useState('');
  const [igPassword, setIgPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const instagramMutation = useMutation(
    () => importService.fromInstagram(igUsername, igPassword),
    {
      onSuccess: (data) => {
        setSuccess(`Successfully imported ${data.data.recipes.length} recipes!`);
        setTimeout(() => navigate('/'), 2000);
      },
      onError: (err) => {
        setError(err.response?.data?.error || 'Import failed');
      }
    }
  );

  const handleInstagramImport = (e) => {
    e.preventDefault();
    setError('');
    instagramMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Import Recipes</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          {/* Import Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Import Source</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setImportType('instagram')}
                className={`flex-1 py-3 px-4 rounded font-semibold transition ${
                  importType === 'instagram'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📸 Instagram
              </button>
              <button
                onClick={() => setImportType('notes')}
                className={`flex-1 py-3 px-4 rounded font-semibold transition ${
                  importType === 'notes'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📝 Notes
              </button>
            </div>
          </div>

          {/* Instagram Import */}
          {importType === 'instagram' && (
            <form onSubmit={handleInstagramImport}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Username
                  </label>
                  <input
                    type="text"
                    value={igUsername}
                    onChange={(e) => setIgUsername(e.target.value)}
                    placeholder="your.username"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram Password
                  </label>
                  <input
                    type="password"
                    value={igPassword}
                    onChange={(e) => setIgPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    ⚠️ Your credentials are sent securely. We do not store them.
                  </p>
                </div>
                {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">{error}</div>}
                {success && <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded">{success}</div>}
                <button
                  type="submit"
                  disabled={instagramMutation.isLoading || !igUsername || !igPassword}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded transition"
                >
                  {instagramMutation.isLoading ? 'Importing...' : 'Import from Instagram'}
                </button>
              </div>
            </form>
          )}

          {/* Notes Import - Placeholder */}
          {importType === 'notes' && (
            <div className="text-center py-8 text-gray-600">
              <p>Notes import requires macOS Notes app integration.</p>
              <p className="text-sm mt-2">Coming soon: Desktop app for Notes syncing</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
