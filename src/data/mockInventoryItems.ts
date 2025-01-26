import { InventoryItem } from '../interfaces';

/**
 * Mock inventory data for initial development and testing.
 * This data is an array of InventoryItem objects, conforming to the InventoryItem interface.
 * In a real application, this data would be fetched from a database.
 */
const mockInventoryItems: InventoryItem[] = [
  {
    id: 'inv-1',
    name: 'All-Purpose Cleaner',
    category: 'Cleaning Supplies',
    currentStock: 8,
    minStock: 10,
    unit: 'bottles',
    lastUpdated: '2024-01-20',
    notes: 'Eco-friendly formula'
  },
  {
    id: 'inv-2',
    name: 'Microfiber Cloths',
    category: 'Cleaning Supplies',
    currentStock: 45,
    minStock: 30,
    unit: 'pieces',
    lastUpdated: '2024-01-22'
  },
  {
    id: 'inv-3',
    name: 'Vacuum Cleaner',
    category: 'Equipment',
    currentStock: 2,
    minStock: 3,
    unit: 'units',
    lastUpdated: '2024-01-15',
    notes: 'Professional grade'
  },
  {
    id: 'inv-4',
    name: 'Glass Cleaner',
    category: 'Cleaning Supplies',
    currentStock: 12,
    minStock: 8,
    unit: 'bottles',
    lastUpdated: '2024-01-23'
  }
];

export default mockInventoryItems;
