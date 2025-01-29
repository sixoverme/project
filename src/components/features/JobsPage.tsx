import React, { useState, useCallback } from 'react';
import type { Job, Client } from '../../interfaces';
import { Button, SearchBar, FilterDropdown, SortButton, type SortOption } from '../base';
import { JobCard } from './JobCard';
import { jobService } from '../../services/jobService';

interface JobsPageProps {
  jobs: Job[];
  clients: Client[];
  onClientClick: (id: string) => void;
  onJobClick: (id: string) => void;
  onScheduleJob: () => void;
}

const filterOptions = [
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
  { id: 'archived', label: 'Archived' },
];

const sortOptions: SortOption[] = [
  { id: 'date', label: 'Date' },
  { id: 'client', label: 'Client Name' },
  { id: 'status', label: 'Status' },
];

export function JobsPage({ jobs, clients, onClientClick, onJobClick, onScheduleJob }: JobsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['scheduled', 'in_progress']);
  const [selectedSort, setSelectedSort] = useState<SortOption>({ ...sortOptions[0], direction: 'desc' });

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query) {
      // In a real implementation, this would search through jobs
      console.log('Searching jobs:', query);
    }
  }, []);

  const filteredJobs = jobs.filter(job => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const client = clients.find(c => c.id === job.clientId);
      return (
        job.type.toLowerCase().includes(searchLower) ||
        job.status.toLowerCase().includes(searchLower) ||
        client?.name.toLowerCase().includes(searchLower) ||
        job.notes?.toLowerCase().includes(searchLower)
      );
    }
    return true;
  }).filter(job => {
    // Status filter
    if (selectedFilters.length === 0) return true;
    return selectedFilters.includes(job.status.toLowerCase());
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const direction = selectedSort.direction === 'asc' ? 1 : -1;
    switch (selectedSort.id) {
      case 'date':
        return (new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()) * direction;
      case 'client': {
        const aClient = clients.find(c => c.id === a.clientId)?.name || '';
        const bClient = clients.find(c => c.id === b.clientId)?.name || '';
        return aClient.localeCompare(bClient) * direction;
      }
      case 'status':
        return a.status.localeCompare(b.status) * direction;
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col h-full bg-[var(--sage-mist)]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center">
          <div className="w-8 ml-2"></div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Jobs</h2>
        </div>
        <button
          onClick={onScheduleJob}
          className="px-4 py-2 bg-[var(--juniper-sage)] text-[var(--text-on-colored)] rounded-md hover:bg-[var(--juniper-dark)] flex items-center"
        >
          Schedule Job
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-4 mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search jobs..."
            showFilterButton
            className="flex-1"
          />
          <FilterDropdown
            label="Status"
            options={filterOptions}
            selectedIds={selectedFilters}
            onChange={setSelectedFilters}
            buttonClassName="bg-[var(--sage-mist)] hover:bg-[var(--juniper-light)] text-[var(--text-primary)]"
          />
          <SortButton
            options={sortOptions}
            selectedOption={selectedSort}
            onSelect={setSelectedSort}
            buttonClassName="bg-[var(--sage-mist)] hover:bg-[var(--juniper-light)] text-[var(--text-primary)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedJobs.map((job) => {
            const client = clients.find(c => c.id === job.clientId);
            if (!client) {
              console.warn('Client not found for job:', job.id, 'clientId:', job.clientId);
              return null;
            }
            return (
              <JobCard
                key={job.id}
                job={job}
                client={client}
                onClick={() => onJobClick(job.id)}
              />
            );
          })}
          {sortedJobs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No jobs found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
