import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import type { Job, Client } from '../../interfaces';

interface JobCardProps {
  job: Job;
  client: Client;
  onClick: () => void;
}

export function JobCard({ job, client, onClick }: JobCardProps) {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-800">
          {client.name}
        </h3>
        <span className="text-green-600">9:00 AM</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{client.address}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>2 hours - {job.type}</span>
        </div>
      </div>
    </div>
  );
}
