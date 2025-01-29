import React, { useState } from 'react';
import { Job } from '../../interfaces';
import { JobForm } from './JobForm';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ChevronLeft } from 'lucide-react';

interface EditJobPageProps {
  job?: Job;
  onSubmit: (data: Partial<Job>) => Promise<void>;
  onCancel: () => void;
  onArchive?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
  onRecordPayment?: (id: string) => Promise<void>;
  onGenerateInvoice?: (id: string) => Promise<void>;
}

export const EditJobPage: React.FC<EditJobPageProps> = ({
  job,
  onSubmit,
  onCancel,
  onArchive,
  onDelete,
  onRecordPayment,
  onGenerateInvoice,
}) => {
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [formData, setFormData] = useState<Partial<Job> | null>(null);

  const handleFormChange = (data: Partial<Job>) => {
    setFormData(data);
  };

  const handleArchive = async () => {
    if (onArchive && job) {
      await onArchive(job.id);
      setShowArchiveDialog(false);
    }
  };

  const handleDelete = async () => {
    if (onDelete && job) {
      await onDelete(job.id);
      setShowDeleteDialog(false);
    }
  };

  const handleRecordPayment = async () => {
    if (onRecordPayment && job) {
      await onRecordPayment(job.id);
    }
  };

  const handleGenerateInvoice = async () => {
    if (onGenerateInvoice && job) {
      await onGenerateInvoice(job.id);
    }
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
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Jobs</h2>
        </div>
        <div className="flex items-center">
          <div className="flex gap-2 mr-2">
            {job && onDelete && (
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="px-4 py-2 bg-[var(--status-error)] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
              >
                Delete
              </button>
            )}
            {job && onArchive && !job.archived && (
              <button
                onClick={() => setShowArchiveDialog(true)}
                className="px-4 py-2 bg-[#F59E0B] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
              >
                Archive
              </button>
            )}
          </div>
          <div className="flex gap-2">
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
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold text-[var(--text-primary)]">
            {job ? 'Edit Job' : 'Schedule New Job'}
          </h1>
          {job && onRecordPayment && (
            <button
              onClick={handleRecordPayment}
              className="px-4 py-2 bg-[var(--juniper-light)] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
            >
              Record Payment
            </button>
          )}
          {job && onGenerateInvoice && (
            <button
              onClick={handleGenerateInvoice}
              className="px-4 py-2 bg-[var(--juniper-light)] text-[var(--text-on-colored)] rounded-md hover:opacity-90"
            >
              Generate Invoice
            </button>
          )}
        </div>
        <JobForm
          initialData={job}
          onSubmit={handleFormChange}
        />
      </div>

      <ConfirmDialog
        isOpen={showArchiveDialog}
        title="Archive Job"
        message="Are you sure you want to archive this job? This will hide it from the main list but the data will be preserved."
        confirmLabel="Archive"
        onConfirm={handleArchive}
        onCancel={() => setShowArchiveDialog(false)}
        isDanger={false}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Job"
        message="Are you sure you want to delete this job? This action cannot be undone and all associated data will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
        isDanger={true}
      />
    </div>
  );
};
