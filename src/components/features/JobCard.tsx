import React from 'react';
import { MapPin, Clock, Edit, DollarSign, Briefcase } from 'lucide-react';
import { Job, Client } from '../../interfaces';

interface JobCardProps {
  job: Job;
  client: Client;
  onClick: () => void;
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'scheduled':
      return 'text-[var(--status-warning)]';
    case 'in_progress':
      return 'text-[var(--status-info)]';
    case 'completed':
      return 'text-[var(--status-success)]';
    case 'cancelled':
      return 'text-[var(--status-error)]';
    case 'archived':
      return 'text-[var(--text-secondary)]';
    default:
      return 'text-[var(--text-secondary)]';
  }
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }) + ' at ' + date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}

function formatAddress(address: Job['address']): string {
  return `${address.street}, ${address.city}, ${address.state}`;
}

export function JobCard({ job, client, onClick }: JobCardProps) {
  const statusColor = getStatusColor(job.status);
  
  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-[var(--text-primary)]">{client.name}</h3>
          <span className={`text-sm font-medium capitalize ${statusColor}`}>
            {job.status}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-[var(--juniper-sage)] mt-1 shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">
            {formatAddress(job.address)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[var(--juniper-sage)] shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">
            {formatDate(job.scheduledDate)}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-[var(--juniper-sage)] shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">
            {job.type}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[var(--juniper-sage)] shrink-0" />
          <p className="text-sm text-[var(--text-secondary)]">
            ${job.price.toFixed(2)} - {job.paymentStatus}
          </p>
        </div>
      </div>
    </div>
  );
}
