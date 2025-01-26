import React from 'react';
import { ArrowLeft, Package, AlertTriangle, Plus, Minus, History } from 'lucide-react';
import type { InventoryItem } from '../../interfaces';

interface InventoryDetailPageProps {
  item: InventoryItem;
  onBack: () => void;
}

export function InventoryDetailPage({ item, onBack }: InventoryDetailPageProps) {
  const isLowStock = item.currentStock <= item.minStock;
  const stockPercentage = Math.min((item.currentStock / item.minStock) * 100, 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold text-gray-800">Inventory Item Details</h1>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-gray-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-600 mt-1">Item #{item.id}</p>
            </div>
          </div>
          {isLowStock && (
            <div className="flex items-center text-amber-600">
              <AlertTriangle className="h-6 w-6 mr-2" />
              <span>Low Stock Alert</span>
            </div>
          )}
        </div>

        {/* Stock Level */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Current Stock Level</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Stock:</span>
              <span className={`font-semibold ${isLowStock ? 'text-amber-600' : 'text-gray-800'}`}>
                {item.currentStock} {item.unit}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Minimum Stock:</span>
              <span className="text-gray-800">{item.minStock} {item.unit}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${
                  isLowStock ? 'bg-amber-500' : 'bg-green-500'
                }`}
                style={{ width: `${stockPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-4">
          <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            <Plus className="h-5 w-5" />
            <span>Add Stock</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
            <Minus className="h-5 w-5" />
            <span>Remove Stock</span>
          </button>
        </div>
      </div>

      {/* Stock History */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Stock History</h3>
          <History className="h-5 w-5 text-gray-500" />
        </div>
        <div className="space-y-4">
          {[
            { date: '2024-01-25', action: 'Added', amount: 10 },
            { date: '2024-01-23', action: 'Removed', amount: 5 },
            { date: '2024-01-20', action: 'Added', amount: 15 }
          ].map((record, index) => (
            <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0">
              <div className="flex items-center">
                <span className={`w-2 h-2 rounded-full mr-3 ${
                  record.action === 'Added' ? 'bg-green-500' : 'bg-red-500'
                }`} />
                <div>
                  <div className="font-semibold text-gray-800">
                    {record.action} {record.amount} {item.unit}
                  </div>
                  <div className="text-sm text-gray-600">{record.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
