import React, { useState, useEffect } from 'react';
import { Client, ClientFormData, ValidationErrors, Address, PhoneNumber } from '../../interfaces/client';
import { validateClient, formatPhoneNumber } from '../../utils/clientValidation';

interface ClientFormProps {
  initialData?: ClientFormData;
  onSubmit: (data: ClientFormData) => void;
  onCancel: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const emptyFormData: ClientFormData = {
    name: '',
    addresses: [{ street: '', city: '', state: '', type: 'primary' }],
    phoneNumbers: [{ number: '', type: 'mobile' }],
    email: '',
    hasPets: false,
    pets: [],
    notes: [],
  };

  const [formData, setFormData] = useState<ClientFormData>(emptyFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Initialize form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        addresses: initialData.addresses,
        phoneNumbers: initialData.phoneNumbers,
        email: initialData.email,
        hasPets: initialData.hasPets,
        pets: initialData.pets || [],
        notes: initialData.notes,
      });
      // Reset errors and touched state
      setErrors({});
      setTouched({});
    }
  }, [initialData]);

  const handleInputChange = (field: keyof ClientFormData, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate on change
    const newErrors = validateClient(newFormData);
    setErrors(newErrors);
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string) => {
    const newAddresses = [...formData.addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    handleInputChange('addresses', newAddresses);
  };

  const handlePhoneChange = (index: number, value: string) => {
    const formattedNumber = formatPhoneNumber(value);
    const newPhones = [...formData.phoneNumbers];
    newPhones[index] = { ...newPhones[index], number: formattedNumber };
    handleInputChange('phoneNumbers', newPhones);
  };

  const handleAddSecondaryAddress = () => {
    if (!formData.addresses.find(a => a.type === 'secondary')) {
      handleInputChange('addresses', [
        ...formData.addresses,
        { street: '', city: '', state: '', type: 'secondary' }
      ]);
    }
  };

  const handleAddHomePhone = () => {
    if (!formData.phoneNumbers.find(p => p.type === 'home')) {
      handleInputChange('phoneNumbers', [
        ...formData.phoneNumbers,
        { number: '', type: 'home' }
      ]);
    }
  };

  const handlePetToggle = (value: boolean) => {
    handleInputChange('hasPets', value);
    if (!value) {
      handleInputChange('pets', []);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateClient(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
      // Mark all fields as touched to show errors
      const allTouched: Record<string, boolean> = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
      console.error('Validation errors:', validationErrors);
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-[var(--background-card)] rounded-lg shadow-sm">
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Contact Information */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => handleInputChange('name', e.target.value)}
              className={`mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)] ${
                touched.name && errors.name ? 'border-[var(--status-error)]' : ''
              }`}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-[var(--status-error)]">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Email *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={e => handleInputChange('email', e.target.value)}
              className={`mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)] ${
                touched.email && errors.email ? 'border-[var(--status-error)]' : ''
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-[var(--status-error)]">{errors.email}</p>
            )}
          </div>

          {/* Primary Address */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Primary Address *
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Street"
                value={formData.addresses[0]?.street || ''}
                onChange={e => handleAddressChange(0, 'street', e.target.value)}
                className="mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.addresses[0]?.city || ''}
                  onChange={e => handleAddressChange(0, 'city', e.target.value)}
                  className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.addresses[0]?.state || ''}
                  onChange={e => handleAddressChange(0, 'state', e.target.value)}
                  className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                />
              </div>
            </div>
            {touched.addresses && errors.addresses && (
              <p className="mt-1 text-sm text-[var(--status-error)]">{errors.addresses}</p>
            )}
          </div>

          {/* Secondary Address Button/Section */}
          {formData.addresses.find(a => a.type === 'secondary') ? (
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Secondary Address
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Street"
                  value={formData.addresses[1]?.street || ''}
                  onChange={e => handleAddressChange(1, 'street', e.target.value)}
                  className="mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.addresses[1]?.city || ''}
                    onChange={e => handleAddressChange(1, 'city', e.target.value)}
                    className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.addresses[1]?.state || ''}
                    onChange={e => handleAddressChange(1, 'state', e.target.value)}
                    className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                  />
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddSecondaryAddress}
              className="text-[var(--juniper-sage)] hover:text-[var(--juniper-dark)] text-sm"
            >
              + Add Secondary Address
            </button>
          )}
        </div>

        {/* Right Column - Additional Information */}
        <div className="space-y-6">
          {/* Mobile Phone */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Mobile Phone *
            </label>
            <input
              type="tel"
              value={formData.phoneNumbers[0]?.number || ''}
              onChange={e => handlePhoneChange(0, e.target.value)}
              placeholder="(XXX) XXX-XXXX"
              className={`mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)] ${
                touched.phoneNumbers && errors.phoneNumbers ? 'border-[var(--status-error)]' : ''
              }`}
            />
            {touched.phoneNumbers && errors.phoneNumbers && (
              <p className="mt-1 text-sm text-[var(--status-error)]">{errors.phoneNumbers}</p>
            )}
          </div>

          {/* Home Phone Button/Section */}
          {formData.phoneNumbers.find(p => p.type === 'home') ? (
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)]">
                Home Phone
              </label>
              <input
                type="tel"
                value={formData.phoneNumbers[1]?.number || ''}
                onChange={e => handlePhoneChange(1, e.target.value)}
                placeholder="(XXX) XXX-XXXX"
                className="mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddHomePhone}
              className="text-[var(--juniper-sage)] hover:text-[var(--juniper-dark)] text-sm"
            >
              + Add Home Phone
            </button>
          )}

          {/* Pet Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-[var(--text-primary)]">Has Pets</label>
              <input
                type="checkbox"
                checked={formData.hasPets}
                onChange={e => handlePetToggle(e.target.checked)}
                className="rounded text-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
              />
            </div>

            {formData.hasPets && (
              <div className="space-y-4 p-4 bg-[var(--sage-mist)] rounded-md">
                {formData.pets?.map((pet, index) => (
                  <div key={index} className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Pet Type"
                        value={pet.type}
                        onChange={e => {
                          const newPets = [...(formData.pets || [])];
                          newPets[index] = { ...pet, type: e.target.value };
                          handleInputChange('pets', newPets);
                        }}
                        className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                      />
                      <input
                        type="number"
                        placeholder="Count"
                        value={pet.count}
                        onChange={e => {
                          const newPets = [...(formData.pets || [])];
                          newPets[index] = { ...pet, count: parseInt(e.target.value) };
                          handleInputChange('pets', newPets);
                        }}
                        className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Care Instructions"
                      value={pet.careInstructions || ''}
                      onChange={e => {
                        const newPets = [...(formData.pets || [])];
                        newPets[index] = { ...pet, careInstructions: e.target.value };
                        handleInputChange('pets', newPets);
                      }}
                      className="block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newPets = [...(formData.pets || []), { type: '', count: 1 }];
                    handleInputChange('pets', newPets);
                  }}
                  className="text-[var(--juniper-sage)] hover:text-[var(--juniper-dark)] text-sm"
                >
                  + Add Pet
                </button>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              General Notes
            </label>
            <textarea
              value={formData.notes.find(n => n.type === 'general')?.content || ''}
              onChange={e => {
                const newNotes = formData.notes.filter(n => n.type !== 'general');
                newNotes.push({
                  content: e.target.value,
                  type: 'general',
                  timestamp: new Date().toISOString(),
                });
                handleInputChange('notes', newNotes);
              }}
              rows={4}
              className="mt-1 block w-full rounded-md border-[var(--background-muted)] shadow-sm focus:border-[var(--juniper-sage)] focus:ring-[var(--focus-ring-primary)]"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
