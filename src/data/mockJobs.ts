import { Job } from '../interfaces';

/**
 * Helper function to get today's date string
 */
function getTodayString() {
  return new Date().toISOString();
}

/**
 * Mock job data for initial development and testing.
 * This data represents cleaning jobs scheduled or completed for clients.
 */
const createMockJobs = (): Job[] => [
  {
    id: 'job-1',
    clientId: '1',
    type: 'Regular Cleaning',
    status: 'scheduled',
    scheduledDate: getTodayString(), // Today
    notes: 'Bi-weekly cleaning',
    price: 120.00,
    paymentStatus: 'Unpaid',
    address: {
      street: '123 Maple Street',
      city: 'Springfield',
      state: 'IL',
      type: 'primary'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'job-2',
    clientId: '1',
    type: 'Deep Cleaning',
    status: 'scheduled',
    scheduledDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
    notes: 'Monthly deep clean',
    price: 250.00,
    paymentStatus: 'Unpaid',
    address: {
      street: '456 Oak Avenue',
      city: 'Springfield',
      state: 'IL',
      type: 'secondary'
    },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'job-3',
    clientId: '1',
    type: 'Regular Cleaning',
    status: 'completed',
    scheduledDate: getTodayString(), // Today
    completedDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    notes: 'Windows and kitchen cabinets detailed',
    price: 150.00,
    paymentStatus: 'Paid',
    address: {
      street: '123 Maple Street',
      city: 'Springfield',
      state: 'IL',
      type: 'primary'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'job-4',
    clientId: '2',
    type: 'Regular Cleaning',
    status: 'scheduled',
    scheduledDate: getTodayString(), // Today
    notes: 'Use keypad entry code',
    price: 100.00,
    paymentStatus: 'Unpaid',
    address: {
      street: '789 Pine Road',
      city: 'Springfield',
      state: 'IL',
      type: 'primary'
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'job-5',
    clientId: '3',
    type: 'Deep Cleaning',
    status: 'completed',
    scheduledDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    completedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    notes: 'Post-renovation cleaning',
    price: 300.00,
    paymentStatus: 'Paid',
    address: {
      street: '321 Elm Court',
      city: 'Springfield',
      state: 'IL',
      type: 'primary'
    },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockJobs = createMockJobs();
