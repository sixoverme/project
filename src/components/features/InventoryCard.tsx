import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import type { InventoryItem } from '../../interfaces';

interface InventoryCardProps {
  item: InventoryItem;
  onClick: () => void;
}

export function InventoryCard({ item, onClick }: InventoryCardProps) {
  const isLowStock = item.currentStock <= item.minStock;
  const stockPercentage = Math.min((item.currentStock / item.minStock) * 100, 100);
  
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-semibold text-gray-800">{item.name}</h3>
        </div>
        {isLowStock && (
          <span className="flex items-center text-amber-600">
            <AlertTriangle className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Current Stock:</span>
          <span className={isLowStock ? 'text-amber-600 font-semibold' : ''}>
            {item.currentStock} {item.unit}
          </span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Minimum Stock:</span>
          <span>{item.minStock} {item.unit}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
              isLowStock ? 'bg-amber-500' : 'bg-green-500'
            }`}
            style={{ width: `${stockPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
