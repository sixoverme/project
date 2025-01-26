import React from 'react';
import { ClientForm } from './ClientForm';
import { ClientFormData } from '../../interfaces/client';
import { clientService } from '../../services/clientService';

interface AddClientPageProps {
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
}

export const AddClientPage: React.FC<AddClientPageProps> = ({ onSubmit, onCancel }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Client</h1>
      <ClientForm
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};
