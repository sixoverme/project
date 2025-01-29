import React from 'react';
import { Job, Client } from '../../interfaces';
import { Button } from '../base';

interface JobDetailsPageProps {
  job: Job;
  client: Client;
  onEdit: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onBack: () => void;
}

const statusColors = {
  scheduled: 'var(--status-info)',
  in_progress: 'var(--juniper-sage)',
  completed: 'var(--status-success)',
  cancelled: 'var(--status-error)',
  archived: 'var(--status-warning)',
};

export function JobDetailsPage({ 
  job, 
  client, 
  onEdit, 
  onArchive, 
  onDelete, 
  onBack 
}: JobDetailsPageProps) {
  const statusColor = statusColors[job.status.toLowerCase() as keyof typeof statusColors];

  return (
    <div className="flex flex-col h-full bg-[var(--sage-mist)]">
      {/* Fixed Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[var(--background-muted)] rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Job Details
          </h1>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="warning"
            onClick={onArchive}
          >
            Archive
          </Button>
          <Button
            variant="danger"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-3xl mx-auto">
          {/* Status Badge */}
          <div className="mb-6">
            <span
              className="inline-block px-3 py-1 rounded-full text-[var(--text-on-colored)]"
              style={{ backgroundColor: statusColor }}
            >
              {job.status}
            </span>
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Client Information
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Name</label>
                <p className="text-[var(--text-primary)]">{client.name}</p>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Phone</label>
                <p className="text-[var(--text-primary)]">{client.phone}</p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-[var(--text-secondary)]">Address</label>
                <p className="text-[var(--text-primary)]">{client.address}</p>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Job Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Type</label>
                <p className="text-[var(--text-primary)]">{job.type}</p>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Date</label>
                <p className="text-[var(--text-primary)]">
                  {new Date(job.date).toLocaleDateString()}
                </p>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-[var(--text-secondary)]">Notes</label>
                <p className="text-[var(--text-primary)] whitespace-pre-wrap">
                  {job.notes || 'No notes provided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
