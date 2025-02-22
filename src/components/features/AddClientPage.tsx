import React, { useState } from 'react';
import { ClientForm } from './ClientForm';
import { ClientFormData } from '../../interfaces/client';
import { clientService } from '../../services/clientService';
import { ChevronLeft } from 'lucide-react';

interface AddClientPageProps {
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
}

export const AddClientPage: React.FC<AddClientPageProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<ClientFormData | null>(null);

  const handleFormChange = (data: ClientFormData) => {
    setFormData(data);
  };

  return (
    <div className="flex flex-col h-full bg-[var(--sage-mist)]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center">
          <button
            onClick={onCancel}
            className="w-8 p-2 ml-2 hover:bg-[var(--sage-mist)] rounded-full text-[var(--text-primary)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Clients</h2>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[var(--status-warning)] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
          >
            Cancel
          </button>
          <button
            onClick={() => formData && onSubmit(formData)}
            className="px-4 py-2 bg-[var(--juniper-sage)] text-[var(--text-on-colored)] rounded-md hover:bg-[var(--juniper-dark)]"
            disabled={!formData}
          >
            Save Client
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Add New Client</h1>
        <ClientForm
          onSubmit={handleFormChange}
          onCancel={() => {}} // We don't need this anymore as cancel is in header
        />
      </div>
    </div>
  );
};
