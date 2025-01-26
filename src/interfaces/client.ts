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

// Validation types
export type ValidationErrors = {
  [K in keyof Client]?: string;
}

export interface ClientFormData extends Omit<Client, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}
