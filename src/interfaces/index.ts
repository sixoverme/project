// Client interfaces
export interface Address {
  street: string;
  city: string;
  state: string;
  type: 'primary' | 'secondary';
}

export interface PhoneNumber {
  number: string;
  type: 'mobile' | 'home';
}

export interface Pet {
  type: string;
  count: number;
  temperament?: string;
  careInstructions?: string;
}

export interface Note {
  content: string;
  timestamp: string;
  type: 'general' | 'lastVisit';
}

export interface Client {
  id: string;
  name: string;
  addresses: Address[];
  phoneNumbers: PhoneNumber[];
  email: string;
  hasPets: boolean;
  pets?: Pet[];
  notes: Note[];
  createdAt: string;
  updatedAt: string;
}

// Job interfaces
export type JobType = 'Regular Cleaning' | 'Deep Cleaning';
export type JobStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled';

export interface Job {
  id: string;
  clientId: string;
  type: JobType;
  status: JobStatus;
  scheduledDate: string;
  completedDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  jobIds: string[];
  date: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  items: {
    description: string;
    amount: number;
    jobId: string;
  }[];
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  unit: string;
  lastUpdated?: string;
  notes?: string;
}
