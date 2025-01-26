import InventoryItem from '../interfaces/InventoryItem';
import mockInventoryItems from '../data/mockInventoryItems';

/**
 * Service class for handling inventory-related operations.
 * Currently uses mock data, but can be easily modified to use real API calls.
 */
class InventoryService {
  private inventory: InventoryItem[] = mockInventoryItems;

  /**
   * Get all inventory items
   */
  async getAllItems(): Promise<InventoryItem[]> {
    return Promise.resolve([...this.inventory]);
  }

  /**
   * Get an inventory item by ID
   */
  async getItemById(id: string): Promise<InventoryItem | null> {
    const item = this.inventory.find(i => i.id === id);
    return Promise.resolve(item || null);
  }

  /**
   * Create a new inventory item
   */
  async createItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const newItem: InventoryItem = {
      ...item,
      id: `item-${Date.now()}`, // In real app, this would be handled by the backend
    };
    this.inventory.push(newItem);
    return Promise.resolve(newItem);
  }

  /**
   * Update an existing inventory item
   */
  async updateItem(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem | null> {
    const index = this.inventory.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(null);

    const updatedItem = {
      ...this.inventory[index],
      ...updates,
      id, // Ensure ID doesn't change
    };
    this.inventory[index] = updatedItem;
    return Promise.resolve(updatedItem);
  }

  /**
   * Delete an inventory item
   */
  async deleteItem(id: string): Promise<boolean> {
    const index = this.inventory.findIndex(i => i.id === id);
    if (index === -1) return Promise.resolve(false);

    this.inventory.splice(index, 1);
    return Promise.resolve(true);
  }

  /**
   * Get items by category
   */
  async getItemsByCategory(category: string): Promise<InventoryItem[]> {
    const items = this.inventory.filter(item => item.category === category);
    return Promise.resolve(items);
  }

  /**
   * Get low stock items (items where quantity is at or below minQuantity)
   */
  async getLowStockItems(): Promise<InventoryItem[]> {
    const lowStock = this.inventory.filter(item => item.quantity <= item.minQuantity);
    return Promise.resolve(lowStock);
  }

  /**
   * Update item quantity
   */
  async updateQuantity(id: string, change: number): Promise<InventoryItem | null> {
    const item = await this.getItemById(id);
    if (!item) return null;

    const newQuantity = item.quantity + change;
    if (newQuantity < 0) return null; // Prevent negative quantities

    return this.updateItem(id, { quantity: newQuantity });
  }

  /**
   * Get items by supplier
   */
  async getItemsBySupplier(supplier: string): Promise<InventoryItem[]> {
    const items = this.inventory.filter(item => item.supplier === supplier);
    return Promise.resolve(items);
  }

  /**
   * Calculate total inventory value
   */
  async calculateTotalValue(): Promise<number> {
    const total = this.inventory.reduce((sum, item) => {
      const itemValue = (item.costPerUnit || 0) * item.quantity;
      return sum + itemValue;
    }, 0);
    return Promise.resolve(total);
  }
}

// Export a singleton instance
export const inventoryService = new InventoryService();
