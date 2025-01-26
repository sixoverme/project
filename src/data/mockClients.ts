import { Client } from '../interfaces';

/**
 * Mock client data for initial development and testing.
 * This data represents a list of cleaning service clients.
 */
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    addresses: [
      {
        street: '123 Maple Street',
        city: 'Springfield',
        state: 'IL',
        type: 'primary'
      },
      {
        street: '456 Oak Avenue',
        city: 'Springfield',
        state: 'IL',
        type: 'secondary'
      }
    ],
    phoneNumbers: [
      {
        number: '(555) 123-4567',
        type: 'mobile'
      },
      {
        number: '(555) 987-6543',
        type: 'home'
      }
    ],
    email: 'emily.johnson@email.com',
    hasPets: true,
    pets: [
      {
        type: 'dog',
        count: 2,
        temperament: 'All friendly',
        careInstructions: 'Lab & Golden Retriever'
      }
    ],
    notes: [
      {
        content: 'Prefers eco-friendly cleaning products. Allergic to strong fragrances.',
        timestamp: '2025-01-20T10:00:00Z',
        type: 'general'
      },
      {
        content: 'Cleaned windows and detailed kitchen cabinets. Client very satisfied.',
        timestamp: '2025-01-24T15:30:00Z',
        type: 'lastVisit'
      }
    ],
    createdAt: '2024-12-01T08:00:00Z',
    updatedAt: '2025-01-24T15:30:00Z'
  },
  {
    id: '2',
    name: 'Michael Chen',
    addresses: [
      {
        street: '789 Pine Road',
        city: 'Springfield',
        state: 'IL',
        type: 'primary'
      }
    ],
    phoneNumbers: [
      {
        number: '(555) 234-5678',
        type: 'mobile'
      }
    ],
    email: 'mchen@email.com',
    hasPets: false,
    notes: [
      {
        content: 'Prefers Wednesday morning appointments. Has a keypad entry - code provided separately.',
        timestamp: '2024-12-15T09:00:00Z',
        type: 'general'
      }
    ],
    createdAt: '2024-12-15T09:00:00Z',
    updatedAt: '2025-01-22T14:00:00Z'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    addresses: [
      {
        street: '321 Elm Street',
        city: 'Springfield',
        state: 'IL',
        type: 'primary'
      }
    ],
    phoneNumbers: [
      {
        number: '(555) 345-6789',
        type: 'mobile'
      },
      {
        number: '(555) 456-7890',
        type: 'home'
      }
    ],
    email: 'sarah.w@email.com',
    hasPets: true,
    pets: [
      {
        type: 'cat',
        count: 1,
        temperament: 'Shy, stays in bedroom',
        careInstructions: 'No need to interact with cat'
      }
    ],
    notes: [
      {
        content: 'Prefers eco-friendly products only. Has air purifier running.',
        timestamp: '2025-01-02T11:00:00Z',
        type: 'general'
      },
      {
        content: 'Deep cleaned carpets and sanitized bathroom. Client happy with results.',
        timestamp: '2025-01-23T16:45:00Z',
        type: 'lastVisit'
      }
    ],
    createdAt: '2025-01-02T11:00:00Z',
    updatedAt: '2025-01-23T16:45:00Z'
  }
];

export default mockClients;
