import React from 'react';
import { MapPin, Phone, Mail, ChevronRight, ChevronLeft } from 'lucide-react';
import { Client, Job } from '../../interfaces';

interface ClientDetailPageProps {
  client: Client;
  scheduledJobs: Job[];
  completedJobs: Job[];
  onEditClient: () => void;
  onJobClick: (jobId: string) => void;
  onBackClick: () => void;
}

export const ClientDetailPage: React.FC<ClientDetailPageProps> = ({
  client,
  scheduledJobs,
  completedJobs,
  onEditClient,
  onJobClick,
  onBackClick,
}) => {
  return (
    <div className="flex flex-col h-full bg-[var(--sage-mist)]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center">
          <button
            onClick={onBackClick}
            className="w-8 p-2 ml-2 hover:bg-[var(--sage-mist)] rounded-full text-[var(--text-primary)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Clients</h2>
        </div>
        <button
          onClick={onEditClient}
          className="px-4 py-2 bg-[var(--juniper-sage)] text-[var(--text-on-colored)] rounded-md hover:bg-[var(--juniper-dark)]"
        >
          Edit Client
        </button>
      </div>

      {/* Client Name Section */}
      <div className="p-4">
        <h1 className="text-2xl font-semibold text-[var(--text-primary)] mb-4">{client.name}</h1>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 overflow-y-auto">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Contact Information */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4 text-[var(--text-primary)]">Contact Information</h2>
            
            {/* Addresses */}
            <div className="space-y-3">
              {client.addresses.map((address, index) => (
                <div key={index} className="flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-[var(--juniper-sage)] mt-1" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">{address.type === 'primary' ? 'Primary' : 'Secondary'}</p>
                    <p className="text-[var(--text-primary)]">{`${address.street}, ${address.city}, ${address.state}`}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Numbers */}
            <div className="mt-4 space-y-3">
              {client.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[var(--juniper-sage)]" />
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] capitalize">{phone.type}</p>
                    <p className="text-[var(--text-primary)]">{phone.number}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Email */}
            <div className="mt-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--juniper-sage)]" />
              <p className="text-[var(--text-primary)]">{client.email}</p>
            </div>
          </section>

          {/* Notes */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4 text-[var(--text-primary)]">Notes</h2>
            <div className="space-y-4">
              {client.notes.map((note, index) => (
                <div key={index} className="bg-[var(--sage-mist)] p-3 rounded">
                  <p className="text-sm text-[var(--text-secondary)] mb-1 capitalize">{note.type === 'general' ? 'General Notes' : 'Last Visit Notes'}</p>
                  <p className="text-[var(--text-primary)]">{note.content}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{new Date(note.timestamp).toLocaleDateString()}</p>
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
              <h2 className="font-semibold mb-4 text-[var(--text-primary)]">Pet Information</h2>
              <div className="bg-[var(--sage-mist)] p-3 rounded">
                {client.pets?.map((pet, index) => (
                  <div key={index}>
                    <p className="text-[var(--text-primary)]">{`${pet.count} ${pet.type}${pet.count > 1 ? 's' : ''}`}</p>
                    {pet.temperament && <p className="text-sm text-[var(--text-secondary)]">{pet.temperament}</p>}
                    {pet.careInstructions && <p className="text-sm text-[var(--text-secondary)] mt-1">{pet.careInstructions}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Jobs */}
          <section className="bg-white rounded-lg p-4">
            <h2 className="font-semibold mb-4 text-[var(--text-primary)]">Jobs</h2>
            
            {/* Scheduled Jobs */}
            {scheduledJobs.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm text-[var(--text-secondary)] mb-2">Scheduled Jobs</h3>
                <div className="space-y-2">
                  {scheduledJobs.map(job => (
                    <button
                      key={job.id}
                      onClick={() => onJobClick(job.id)}
                      className="w-full flex items-center justify-between p-3 bg-[var(--sage-mist)] rounded hover:bg-[var(--sage-mist-dark)]"
                    >
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{job.type}</p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {new Date(job.scheduledDate).toLocaleString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--juniper-sage)]" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Jobs */}
            {completedJobs.length > 0 && (
              <div>
                <h3 className="text-sm text-[var(--text-secondary)] mb-2">Completed Jobs</h3>
                <div className="space-y-2">
                  {completedJobs.map(job => (
                    <button
                      key={job.id}
                      onClick={() => onJobClick(job.id)}
                      className="w-full flex items-center justify-between p-3 bg-[var(--sage-mist)] rounded hover:bg-[var(--sage-mist-dark)]"
                    >
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">{job.type}</p>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {new Date(job.completedDate!).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[var(--juniper-sage)]" />
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
