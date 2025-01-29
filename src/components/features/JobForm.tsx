import React, { useState, useEffect } from 'react';
import { Job, Client } from '../../interfaces';
import { clientService } from '../../services/clientService';

interface JobFormProps {
  initialData?: Partial<Job>;
  onSubmit: (data: Omit<Job, 'id'>) => void;
  onCancel?: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Job, 'id'>>({
    type: initialData?.type || 'Regular Cleaning',
    status: initialData?.status || 'scheduled',
    scheduledDate: initialData?.scheduledDate 
      ? new Date(initialData.scheduledDate).toISOString()
      : new Date().toISOString(),
    clientId: initialData?.clientId || '',
    price: initialData?.price || 0,
    duration: initialData?.duration || '2 hours',
    notes: initialData?.notes || '',
    address: initialData?.address || {
      street: '',
      city: '',
      state: '',
      type: ''
    },
    paymentStatus: initialData?.paymentStatus || 'Unpaid'
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Load clients when component mounts
  useEffect(() => {
    const loadClients = async () => {
      try {
        const allClients = await clientService.getAllClients();
        setClients(allClients);
        
        // If we have an initial clientId, set the selected client
        if (initialData?.clientId) {
          const client = allClients.find(c => c.id === initialData.clientId);
          setSelectedClient(client || null);
        }
      } catch (error) {
        console.error('Failed to load clients:', error);
      }
    };
    loadClients();
  }, [initialData?.clientId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Special handling for dates to ensure timezone consistency
    if (name === 'scheduledDate' && value) {
      const date = new Date(value);
      date.setHours(12, 0, 0, 0);
      processedValue = date.toISOString();
    }

    // Special handling for client selection
    if (name === 'clientId') {
      const client = clients.find(c => c.id === value);
      setSelectedClient(client || null);
      
      // If client only has one address, auto-populate it
      if (client && client.addresses.length === 1) {
        const address = client.addresses[0];
        setFormData(prev => ({
          ...prev,
          clientId: value,
          address: {
            street: address.street,
            city: address.city,
            state: address.state,
            type: address.type
          }
        }));
        return;
      }
    }
    
    const newData = {
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || 0 : processedValue,
    };
    setFormData(newData);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedClient) return;
    
    const selectedAddress = selectedClient.addresses.find(addr => 
      `${addr.street}, ${addr.city}, ${addr.state}` === e.target.value
    );

    if (selectedAddress) {
      setFormData(prev => ({
        ...prev,
        address: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          type: selectedAddress.type
        }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const baseInputClass = "mt-1 block w-full rounded-md border border-[var(--background-muted)] py-2 px-3 shadow-sm focus:border-[var(--juniper-sage)] focus:outline-none focus:ring-1 focus:ring-[var(--juniper-sage)]";
  const labelClass = "block text-sm font-medium text-[var(--text-secondary)]";

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white rounded-lg p-6 shadow-sm space-y-6">
      {/* Client Selection */}
      <div>
        <label htmlFor="clientId" className={labelClass}>
          Client
        </label>
        <select
          id="clientId"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
          className={baseInputClass}
        >
          <option value="">Select a client</option>
          {clients.map(client => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Address Selection - Only shown when a client is selected */}
      {selectedClient && (
        <div>
          <label htmlFor="address" className={labelClass}>
            Service Address
          </label>
          <select
            id="address"
            name="address"
            value={`${formData.address.street}, ${formData.address.city}, ${formData.address.state}`}
            onChange={handleAddressChange}
            required
            className={baseInputClass}
          >
            <option value="">Select an address</option>
            {selectedClient.addresses.map((addr, index) => (
              <option 
                key={index} 
                value={`${addr.street}, ${addr.city}, ${addr.state}`}
              >
                {addr.street}, {addr.city}, {addr.state} ({addr.type})
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Job Type */}
      <div>
        <label htmlFor="type" className={labelClass}>
          Job Type
        </label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
          className={baseInputClass}
        >
          <option value="Regular Cleaning">Regular Cleaning</option>
          <option value="Deep Cleaning">Deep Cleaning</option>
        </select>
      </div>

      {/* Scheduled Date */}
      <div>
        <label htmlFor="scheduledDate" className={labelClass}>
          Scheduled Date
        </label>
        <input
          type="date"
          id="scheduledDate"
          name="scheduledDate"
          value={formData.scheduledDate ? new Date(formData.scheduledDate).toISOString().split('T')[0] : ''}
          onChange={handleChange}
          required
          className={baseInputClass}
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className={labelClass}>
          Duration
        </label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g., 2 hours"
          className={baseInputClass}
        />
      </div>

      {/* Price */}
      <div>
        <label htmlFor="price" className={labelClass}>
          Price ($)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
          className={baseInputClass}
        />
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className={baseInputClass}
        />
      </div>

      {/* Status - Only shown in edit mode */}
      {initialData?.status && (
        <div>
          <label htmlFor="status" className={labelClass}>
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={baseInputClass}
          >
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      )}
    </form>
  );
};
