import { Job } from '../interfaces';

/**
 * Mock job data for initial development and testing.
 * This data represents cleaning jobs scheduled or completed for clients.
 */
const mockJobs: Job[] = [
  {
    id: 'job-1',
    clientId: '1',
    type: 'Regular Cleaning',
    status: 'scheduled',
    scheduledDate: '2025-01-17T10:00:00Z',
    notes: 'Bi-weekly cleaning',
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-01-10T09:00:00Z'
  },
  {
    id: 'job-2',
    clientId: '1',
    type: 'Deep Cleaning',
    status: 'scheduled',
    scheduledDate: '2025-02-01T14:00:00Z',
    notes: 'Monthly deep clean',
    createdAt: '2025-01-15T11:30:00Z',
    updatedAt: '2025-01-15T11:30:00Z'
  },
  {
    id: 'job-3',
    clientId: '1',
    type: 'Regular Cleaning',
    status: 'completed',
    scheduledDate: '2025-01-24T15:30:00Z',
    completedDate: '2025-01-24T17:00:00Z',
    notes: 'Windows and kitchen cabinets detailed',
    createdAt: '2025-01-17T09:00:00Z',
    updatedAt: '2025-01-24T17:00:00Z'
  },
  {
    id: 'job-4',
    clientId: '2',
    type: 'Regular Cleaning',
    status: 'scheduled',
    scheduledDate: '2025-01-31T09:00:00Z',
    notes: 'Use keypad entry code',
    createdAt: '2025-01-24T10:00:00Z',
    updatedAt: '2025-01-24T10:00:00Z'
  },
  {
    id: 'job-5',
    clientId: '3',
    type: 'Deep Cleaning',
    status: 'completed',
    scheduledDate: '2025-01-23T14:00:00Z',
    completedDate: '2025-01-23T16:45:00Z',
    notes: 'Deep cleaned carpets and sanitized bathroom',
    createdAt: '2025-01-16T13:00:00Z',
    updatedAt: '2025-01-23T16:45:00Z'
  }
];

export default mockJobs;
