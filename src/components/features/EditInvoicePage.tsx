import React, { useState } from 'react';
import { Invoice } from '../../interfaces';
import { InvoiceForm } from './InvoiceForm';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface EditInvoicePageProps {
  invoice: Invoice;
  onSubmit: (data: Partial<Invoice>) => Promise<void>;
  onCancel: () => void;
  onArchive?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
}

export const EditInvoicePage: React.FC<EditInvoicePageProps> = ({
  invoice,
  onSubmit,
  onCancel,
  onArchive,
  onDelete,
}) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleArchive = async () => {
    if (onArchive) {
      await onArchive(invoice.id);
      setShowArchiveDialog(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete) {
      await onDelete(invoice.id);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Invoice</h1>
        <div className="flex gap-4">
          {onArchive && !invoice.archived && invoice.status !== 'Archived' && (
            <button
              onClick={() => setShowArchiveDialog(true)}
              className="px-4 py-2 text-yellow-700 bg-yellow-100 rounded-lg hover:bg-yellow-200"
            >
              Archive
            </button>
          )}
          {onDelete && invoice.status !== 'Paid' && (
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <InvoiceForm
        initialData={invoice}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />

      <ConfirmDialog
        isOpen={showArchiveDialog}
        title="Archive Invoice"
        message="Are you sure you want to archive this invoice? This will hide it from the main list but the data will be preserved."
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setShowArchiveDialog(false)}
        isDanger={false}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Invoice"
        message="Are you sure you want to delete this invoice? This action cannot be undone and all associated data will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        isDanger={true}
      />
    </div>
  );
};
