import React, { useState } from 'react';
import { Client, ClientFormData } from '../../interfaces';
import { ClientForm } from './ClientForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ChevronLeft } from 'lucide-react';

interface EditClientPageProps {
  client: Client;
  onSubmit: (data: ClientFormData) => Promise<void>;
  onCancel: () => void;
  onArchive?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export const EditClientPage: React.FC<EditClientPageProps> = ({
  client,
  onSubmit,
  onCancel,
  onArchive,
  onDelete,
}) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState<ClientFormData | null>(null);

  const handleFormChange = (data: ClientFormData) => {
    setFormData(data);
  };

  const handleArchive = async () => {
    if (onArchive) {
      await onArchive(client.id);
      setShowArchiveDialog(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(client.id);
      setShowDeleteDialog(false);
    }
  };

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
          {onDelete && (
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="px-4 py-2 bg-[var(--status-error)] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
            >
              Delete
            </button>
          )}
          {onArchive && (
            <button
              onClick={() => setShowArchiveDialog(true)}
              className="px-4 py-2 bg-[#F59E0B] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
            >
              Archive
            </button>
          )}
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-[#EAB308] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
          >
            Cancel
          </button>
          <button
            onClick={() => formData && onSubmit(formData)}
            className="px-4 py-2 bg-[var(--juniper-sage)] text-[var(--text-on-colored)] rounded-md hover:bg-[var(--juniper-dark)]"
            disabled={!formData}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Edit Client</h1>
        <ClientForm
          initialData={initialData}
          onSubmit={handleFormChange}
          onCancel={() => {}} // We don't need this anymore as cancel is in header
        />
      </div>

      {/* Dialogs */}
      <ConfirmDialog
        isOpen={showArchiveDialog}
        onClose={() => setShowArchiveDialog(false)}
        onConfirm={handleArchive}
        title="Archive Client"
        message="Are you sure you want to archive this client? They will be hidden from the main list but can be restored later."
        confirmText="Archive"
        confirmVariant="warning"
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Client"
        message="Are you sure you want to delete this client? This action cannot be undone."
        confirmText="Delete"
        confirmVariant="danger"
      />
    </div>
  );
};