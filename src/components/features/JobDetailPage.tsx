import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, User, Calendar, FileText, CheckCircle, DollarSign, Timer } from 'lucide-react';
import type { Job, Client, JobStatus } from '../../interfaces';
import { Button } from '../base';

interface JobDetailPageProps {
  job: Job;
  client: Client;
  onBack: () => void;
  onEdit?: () => void;
  onStatusChange?: (status: JobStatus) => void;
}

const statusColors = {
  scheduled: 'var(--status-info)',
  'in-progress': 'var(--juniper-sage)',
  completed: 'var(--status-success)',
  cancelled: 'var(--status-error)',
  archived: 'var(--status-warning)',
};

export function JobDetailPage({ 
  job, 
  client, 
  onBack,
  onEdit,
  onStatusChange,
}: JobDetailPageProps) {
  const primaryAddress = client.addresses.find(addr => addr.type === 'primary');
  const formattedAddress = primaryAddress 
    ? `${primaryAddress.street}, ${primaryAddress.city}, ${primaryAddress.state}`
    : 'No address provided';

  const handleStatusChange = (newStatus: JobStatus) => {
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

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
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">
            Job Details
          </h1>
        </div>
        <div className="flex gap-3">
          {onEdit && (
            <Button
              variant="secondary"
              onClick={onEdit}
            >
              Edit
            </Button>
          )}
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
                <div className="flex items-center text-[var(--text-primary)]">
                  <User className="w-4 h-4 mr-2" />
                  {client.name}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Phone</label>
                <div className="flex items-center text-[var(--text-primary)]">
                  <Clock className="w-4 h-4 mr-2" />
                  {client.phoneNumbers[0]?.number || 'No phone number'}
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-sm text-[var(--text-secondary)]">Address</label>
                <div className="flex items-center text-[var(--text-primary)]">
                  <MapPin className="w-4 h-4 mr-2" />
                  {formattedAddress}
                </div>
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
                <div className="flex items-center text-[var(--text-primary)]">
                  <FileText className="w-4 h-4 mr-2" />
                  {job.type}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Date</label>
                <div className="flex items-center text-[var(--text-primary)]">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(job.scheduledDate).toLocaleDateString()}
                </div>
              </div>
              {job.completedDate && (
                <div>
                  <label className="block text-sm text-[var(--text-secondary)]">Completed Date</label>
                  <div className="flex items-center text-[var(--text-primary)]">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {new Date(job.completedDate).toLocaleDateString()}
                  </div>
                </div>
              )}
              <div className="col-span-2">
                <label className="block text-sm text-[var(--text-secondary)]">Notes</label>
                <p className="text-[var(--text-primary)] whitespace-pre-wrap mt-1">
                  {job.notes || 'No notes provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Duration and Amount */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              Duration and Payment
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Duration</label>
                <div className="flex items-center text-[var(--text-primary)]">
                  <Timer className="w-4 h-4 mr-2" />
                  {job.duration || 'Not specified'}
                </div>
              </div>
              <div>
                <label className="block text-sm text-[var(--text-secondary)]">Amount Due</label>
                <div className="flex items-center text-[var(--text-primary)]">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {job.amount ? `$${job.amount.toFixed(2)}` : 'Not specified'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
