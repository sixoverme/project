import React, { useState } from 'react';
import { Client } from '../../interfaces/client';

interface EditClientPageProps {
  client: Client;
  onSubmit: (updatedClient: Partial<Client>) => void;
  onCancel: () => void;
}

export const EditClientPage: React.FC<EditClientPageProps> = ({
  client,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: client.name,
    email: client.email,
    hasPets: client.hasPets,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Edit Client</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-green focus:ring-sage-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-green focus:ring-sage-green"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.hasPets}
              onChange={(e) => setFormData({ ...formData, hasPets: e.target.checked })}
              className="h-4 w-4 text-sage-green focus:ring-sage-green border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Has Pets</label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-sage-green hover:bg-sage-green-dark rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
