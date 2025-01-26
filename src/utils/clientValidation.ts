import { Client, ValidationErrors, ClientFormData } from '../interfaces/client';

export const validateClient = (client: ClientFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Required field validations
  if (!client.name?.trim()) {
    errors.name = 'Client name is required';
  }

  // Address validation
  if (!client.addresses?.length) {
    errors.addresses = 'At least one address is required';
  } else {
    const primaryAddress = client.addresses.find(a => a.type === 'primary');
    if (!primaryAddress) {
      errors.addresses = 'Primary address is required';
    } else if (!primaryAddress.street.trim() || !primaryAddress.city.trim() || !primaryAddress.state.trim()) {
      errors.addresses = 'Primary address must be complete';
    }
  }

  // Phone validation
  if (!client.phoneNumbers?.length) {
    errors.phoneNumbers = 'At least one phone number is required';
  } else {
    const mobilePhone = client.phoneNumbers.find(p => p.type === 'mobile');
    if (!mobilePhone) {
      errors.phoneNumbers = 'Mobile phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(mobilePhone.number)) {
      errors.phoneNumbers = 'Mobile phone must be in format (XXX) XXX-XXXX';
    }
  }

  // Email validation
  if (!client.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(client.email)) {
    errors.email = 'Invalid email format';
  }

  // Pet validation (if has pets is true)
  if (client.hasPets && (!client.pets || client.pets.length === 0)) {
    errors.pets = 'Pet information is required when has pets is checked';
  }

  return errors;
};

export const formatPhoneNumber = (input: string): string => {
  // Strip all non-numeric characters
  const numbers = input.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (numbers.length === 10) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6)}`;
  }
  
  // If not 10 digits, just return the cleaned numbers
  return numbers;
};
