import Invoice from '../interfaces/Invoice';
import mockInvoices from '../data/mockInvoices';

/**
 * Service class for handling invoice-related operations.
 * Currently uses mock data, but can be easily modified to use real API calls.
 */
class InvoiceService {
  private invoices: Invoice[] = mockInvoices;

  /**
   * Get all invoices
   */
  async getAllInvoices(): Promise<Invoice[]> {
    return Promise.resolve(this.invoices.filter(i => !i.archived));
  }

  /**
   * Get all invoices including archived
   */
  async getAllInvoicesWithArchived(): Promise<Invoice[]> {
    return Promise.resolve([...this.invoices]);
  }

  /**
   * Get an invoice by ID
   */
  async getInvoiceById(id: string): Promise<Invoice | null> {
    const invoice = this.invoices.find(i => i.id === id);
    return Promise.resolve(invoice || null);
  }

  /**
   * Get invoices for a specific client
   */
  async getInvoicesByClientId(clientId: string): Promise<Invoice[]> {
    const clientInvoices = this.invoices.filter(i => i.clientId === clientId);
    return Promise.resolve(clientInvoices);
  }

  /**
   * Create a new invoice
   */
  async createInvoice(invoice: Omit<Invoice, 'id'>): Promise<Invoice> {
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv-${Date.now()}`, // In real app, this would be handled by the backend
    };
    this.invoices.push(newInvoice);
    return Promise.resolve(newInvoice);
  }

  /**
   * Update an existing invoice
   */
  async updateInvoice(id: string, updates: Partial<Invoice>): Promise<Invoice | null> {
    const index = this.invoices.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedInvoice = {
      ...this.invoices[index],
      ...updates,
      id, // Ensure ID doesn't change
    };
    this.invoices[index] = updatedInvoice;
    return Promise.resolve(updatedInvoice);
  }

  /**
   * Delete an invoice
   */
  async deleteInvoice(id: string): Promise<boolean> {
    const index = this.invoices.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(false);

    this.invoices.splice(index, 1);
    return Promise.resolve(true);
  }

  /**
   * Get invoices by date range
   */
  async getInvoicesByDateRange(startDate: string, endDate: string): Promise<Invoice[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const invoicesInRange = this.invoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate >= start && invoiceDate <= end;
    });
    
    return Promise.resolve(invoicesInRange);
  }

  /**
   * Get invoices by status
   */
  async getInvoicesByStatus(status: string): Promise<Invoice[]> {
    const filteredInvoices = this.invoices.filter(invoice => invoice.status === status);
    return Promise.resolve(filteredInvoices);
  }

  /**
   * Archive an invoice
   */
  async archiveInvoice(id: string): Promise<Invoice | null> {
    const index = this.invoices.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedInvoice: Invoice = {
      ...this.invoices[index],
      archived: true,
      status: 'Archived',
    };

    this.invoices[index] = updatedInvoice;
    return Promise.resolve(updatedInvoice);
  }

  /**
   * Unarchive an invoice
   */
  async unarchiveInvoice(id: string): Promise<Invoice | null> {
    const index = this.invoices.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedInvoice: Invoice = {
      ...this.invoices[index],
      archived: false,
      status: this.invoices[index].status === 'Archived' ? 'Pending' : this.invoices[index].status,
    };

    this.invoices[index] = updatedInvoice;
    return Promise.resolve(updatedInvoice);
  }

  /**
   * Calculate total revenue for a date range
   */
  async calculateRevenue(startDate: string, endDate: string): Promise<number> {
    const invoices = await this.getInvoicesByDateRange(startDate, endDate);
    const total = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    return Promise.resolve(total);
  }
}

// Export a singleton instance
export const invoiceService = new InvoiceService();
