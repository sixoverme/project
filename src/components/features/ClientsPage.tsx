import React, { useState, useCallback } from 'react';
import { MapPin, Phone, Mail, Edit, Trash2 } from 'lucide-react';
import type { Client } from '../../interfaces';
import { Button, SearchBar, FilterDropdown, SortButton, type SortOption } from '../base';
import { clientService } from '../../services/clientService';

interface ClientsPageProps {
  clients: Client[];
  onClientClick: (id: string) => void;
  onAddClient: () => void;
  onEditClient: (id: string) => void;
}

const filterOptions = [
  { id: 'active', label: 'Active' },
  { id: 'archived', label: 'Archived' },
  { id: 'has_pets', label: 'Has Pets' },
];

const sortOptions: SortOption[] = [
  { id: 'name', label: 'Name' },
  { id: 'recent', label: 'Recently Added' },
  { id: 'city', label: 'City' },
];

export function ClientsPage({ clients, onClientClick, onAddClient, onEditClient }: ClientsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['active']);
  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query) {
      const results = await clientService.searchClients(query);
      // Update results
      console.log('Search results:', results);
    }
  }, []);

  const filteredClients = clients.filter(client => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.addresses.some(addr => 
          `${addr.street} ${addr.city} ${addr.state}`.toLowerCase().includes(searchLower)
        )
      );
    }
    return true;
  }).filter(client => {
    if (selectedFilters.includes('archived')) {
      return client.archived;
    }
    if (selectedFilters.includes('active')) {
      return !client.archived;
    }
    return true;
  }).filter(client => {
    if (selectedFilters.includes('has_pets')) {
      return client.hasPets;
    }
    return true;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    switch (selectedSort.id) {
      case 'name':
        return selectedSort.direction === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'city':
        const aCity = a.addresses.find(addr => addr.type === 'primary')?.city || '';
        const bCity = b.addresses.find(addr => addr.type === 'primary')?.city || '';
        return selectedSort.direction === 'asc'
          ? aCity.localeCompare(bCity)
          : bCity.localeCompare(aCity);
      default:
        return 0;
    }
  });

  return (
    <div className="flex flex-col h-full bg-[var(--sage-mist)]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <div className="flex items-center">
          {/* Match the width of back button (32px) + its padding (8px) */}
          <div className="w-8 ml-2"></div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] pl-3">Clients</h2>
        </div>
        <button
          onClick={onAddClient}
          className="px-4 py-2 bg-[var(--juniper-sage)] text-[var(--text-on-colored)] rounded-md hover:bg-[var(--juniper-dark)] flex items-center"
        >
          Add Client
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-4 mb-6">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search clients..."
            showFilterButton
            className="flex-1"
          />
          <FilterDropdown
            options={filterOptions}
            selectedValues={selectedFilters}
            onChange={setSelectedFilters}
            buttonClassName="bg-[var(--sage-mist)] hover:bg-[var(--juniper-light)] text-[var(--text-primary)]"
          />
          <SortButton
            options={sortOptions}
            selected={selectedSort}
            onChange={setSelectedSort}
            buttonClassName="bg-[var(--sage-mist)] hover:bg-[var(--juniper-light)] text-[var(--text-primary)]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedClients.map(client => (
            <div
              key={client.id}
              className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onClientClick(client.id)}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-[var(--text-primary)]">{client.name}</h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditClient(client.id);
                  }}
                  className="p-2 rounded-full hover:bg-[var(--sage-mist)] text-[var(--juniper-sage)]"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {client.addresses.map((address, index) => (
                <div key={index} className="flex items-start gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[var(--juniper-sage)] mt-1" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    {`${address.street}, ${address.city}, ${address.state}`}
                  </p>
                </div>
              ))}

              {client.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-[var(--juniper-sage)]" />
                  <p className="text-sm text-[var(--text-secondary)]">{phone.number}</p>
                </div>
              ))}

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--juniper-sage)]" />
                <p className="text-sm text-[var(--text-secondary)]">{client.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
