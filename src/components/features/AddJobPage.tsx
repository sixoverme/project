import React, { useState } from 'react';
import { JobFormData } from '../../interfaces';
import { JobForm } from './JobForm';
import { ChevronLeft } from 'lucide-react';

interface AddJobPageProps {
  onSubmit: (data: JobFormData) => Promise<void>;
  onCancel: () => void;
}

export const AddJobPage: React.FC<AddJobPageProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<JobFormData | null>(null);

  const handleFormChange = (data: JobFormData) => {
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
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Jobs</h2>
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
            Save Job
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">Schedule New Job</h1>
        <JobForm
          onSubmit={handleFormChange}
        />
      </div>
    </div>
  );
};
