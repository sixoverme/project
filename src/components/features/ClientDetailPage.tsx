import React from 'react';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { Client, Job } from '../../interfaces';

interface ClientDetailPageProps {
  client: Client;
  scheduledJobs: Job[];
  completedJobs: Job[];
  onEditClient: () => void;
  onJobClick: (jobId: string) => void;
}

export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({
  client,
  scheduledJobs,
  completedJobs,
  onEditClient,
  onJobClick,
}) => {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-semibold">{client.name}</h1>
        <button
          onClick={onEditClient}
          className="px-4 py-2 bg-sage-green text-white rounded-md hover:bg-sage-green-dark"
        >
          Edit Client
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Contact Information */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4">Contact Information</h2>
            
            {/* Addresses */}
            <div className="space-y-3">
              {client.addresses.map((address, index) => (
                <div key={index} className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">{address.type === 'primary' ? 'Primary' : 'Secondary'}</p>
                    <p>{`${address.street}, ${address.city}, ${address.state}`}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Numbers */}
            <div className="mt-4 space-y-3">
              {client.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 capitalize">{phone.type}</p>
                    <p>{phone.number}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="mt-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-500" />
              <p>{client.email}</p>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4">Notes</h2>
            <div className="space-y-4">
              {client.notes.map((note, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-600 mb-1 capitalize">{note.type === 'general' ? 'General Notes' : 'Last Visit Notes'}</p>
                  <p>{note.content}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(note.timestamp).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Pet Information */}
          {client.hasPets && (
            <section className="bg-white rounded-lg p-4">
              <h2 className="font-semibold mb-4">Pet Information</h2>
              <div className="bg-sage-green/10 p-3 rounded">
                {client.pets?.map((pet, index) => (
                  <div key={index}>
                    <p>{`${pet.count} ${pet.type}${pet.count > 1 ? 's' : ''}`}</p>
                    {pet.temperament && <p className="text-sm text-gray-600">{pet.temperament}</p>}
                    {pet.careInstructions && <p className="text-sm text-gray-600 mt-1">{pet.careInstructions}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Jobs */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4">Jobs</h2>
            
            {/* Scheduled Jobs */}
            {scheduledJobs.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm text-gray-600 mb-2">Scheduled Jobs</h3>
                <div className="space-y-2">
                  {scheduledJobs.map(job => (
                    <button
                      key={job.id}
                      onClick={() => onJobClick(job.id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">{job.type}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(job.scheduledDate).toLocaleString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Jobs */}
            {completedJobs.length > 0 && (
              <div>
                <h3 className="text-sm text-gray-600 mb-2">Completed Jobs</h3>
                <div className="space-y-2">
                  {completedJobs.map(job => (
                    <button
                      key={job.id}
                      onClick={() => onJobClick(job.id)}
                      className="w-full flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100"
                    >
                      <div>
                        <p className="font-medium">{job.type}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(job.completedDate!).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
