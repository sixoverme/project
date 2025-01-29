import { Client, ClientFormData } from '../interfaces/client';
import mockClients from '../data/mockClients';

/**
 * Service class for handling client-related operations.
 * Currently uses mock data, but can be easily modified to use real API calls.
 */
class ClientService {
  private clients: Client[] = mockClients;

  /**
   * Get all clients
   */
  async getAllClients(): Promise<Client[]> {
    console.log('Getting all clients:', this.clients);
    return Promise.resolve(this.clients.filter(c => !c.archived));
  }

  /**
   * Get all clients including archived
   */
  async getAllClientsWithArchived(): Promise<Client[]> {
    return Promise.resolve([...this.clients]);
  }

  /**
   * Get a client by ID
   */
  async getClientById(id: string): Promise<Client | null> {
    console.log('Getting client by id:', id);
    const client = this.clients.find(c => c.id === id);
    console.log('Found client:', client);
    return Promise.resolve(client || null);
  }

  /**
   * Create a new client
   */
  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    console.log('Creating new client with data:', client);
    const newClient: Client = {
      ...client,
      id: `client-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false
    };
    this.clients.push(newClient);
    console.log('Created client:', newClient);
    return Promise.resolve(newClient);
  }

  /**
   * Update an existing client
   */
  async updateClient(id: string, updates: Partial<Client>): Promise<Client | null> {
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) return null;

    // Create updated client with new data
    const updatedClient: Client = {
      ...this.clients[index],  // Start with existing client data
      ...updates,              // Apply updates
      id,                      // Ensure ID doesn't change
      updatedAt: new Date().toISOString()
    };

    // Update in our local array
    this.clients[index] = updatedClient;
    
    return Promise.resolve(updatedClient);
  }

  /**
   * Delete a client
   */
  async deleteClient(id: string): Promise<boolean> {
    console.log('Deleting client:', id);
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) {
      console.error('Client not found for deletion:', id);
      return Promise.resolve(false);
    }

    this.clients.splice(index, 1);
    console.log('Client deleted successfully');
    return Promise.resolve(true);
  }

  /**
   * Archive a client
   */
  async archiveClient(id: string): Promise<Client | null> {
    console.log('Archiving client:', id);
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) {
      console.error('Client not found for archiving:', id);
      return Promise.resolve(null);
    }

    const updatedClient: Client = {
      ...this.clients[index],
      archived: true,
      updatedAt: new Date().toISOString()
    };

    this.clients[index] = updatedClient;
    console.log('Client archived successfully');
    return Promise.resolve(updatedClient);
  }

  /**
   * Unarchive a client
   */
  async unarchiveClient(id: string): Promise<Client | null> {
    console.log('Unarchiving client:', id);
    const index = this.clients.findIndex(c => c.id === id);
    if (index === -1) {
      console.error('Client not found for unarchiving:', id);
      return Promise.resolve(null);
    }

    const updatedClient: Client = {
      ...this.clients[index],
      archived: false,
      updatedAt: new Date().toISOString()
    };

    this.clients[index] = updatedClient;
    console.log('Client unarchived successfully');
    return Promise.resolve(updatedClient);
  }

  /**
   * Search clients by name or address
   */
  async searchClients(query: string): Promise<Client[]> {
    console.log('Searching clients with query:', query);
    const lowercaseQuery = query.toLowerCase();
    const results = this.clients.filter(client => 
      client.name.toLowerCase().includes(lowercaseQuery) ||
      client.addresses.some(addr => 
        `${addr.street}, ${addr.city}, ${addr.state}`.toLowerCase().includes(lowercaseQuery)
      )
    );
    console.log('Search results:', results);
    return Promise.resolve(results);
  }
}

// Export a singleton instance
export const clientService = new ClientService();
