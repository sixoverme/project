import React from 'react';
import { Client, ClientFormData } from '../../interfaces/client';
import { ClientForm } from './ClientForm';

interface EditClientPageProps {
  client: Client;
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
}

export const EditClientPage: React.FC<EditClientPageProps> = ({
  client,
  onSubmit,
  onCancel,
}) => {
  // Convert Client to ClientFormData
  const initialData: ClientFormData = {
    name: client.name,
    addresses: client.addresses,
    phoneNumbers: client.phoneNumbers,
    email: client.email,
    hasPets: client.hasPets,
    pets: client.pets || [],
    notes: client.notes,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Client</h1>
      <ClientForm
        initialData={initialData}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </div>
  );
};