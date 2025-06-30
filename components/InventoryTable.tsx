
import React, { useState } from 'react';
import { InventoryItem } from '../types';

interface InventoryTableProps {
  items: InventoryItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRecordSale: (id:string) => void;
  onRemoveItem: (id: string) => void;
}

const QuantityControl: React.FC<{item: InventoryItem, onUpdateQuantity: (id: string, quantity: number) => void}> = ({ item, onUpdateQuantity }) => {
    const [currentQuantity, setCurrentQuantity] = useState(item.quantity);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        setCurrentQuantity(isNaN(newQuantity) ? 0 : newQuantity);
    };

    const handleBlur = () => {
        if (currentQuantity !== item.quantity && currentQuantity >= 0) {
            onUpdateQuantity(item.id, currentQuantity);
        } else {
             // reset to original if invalid or unchanged
            setCurrentQuantity(item.quantity);
        }
    };

    const handleIncrement = () => {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
        onUpdateQuantity(item.id, newQuantity);
    }
    
    const handleDecrement = () => {
        const newQuantity = Math.max(0, currentQuantity - 1);
        setCurrentQuantity(newQuantity);
        onUpdateQuantity(item.id, newQuantity);
    }

    return (
        <div className="flex items-center">
            <button onClick={handleDecrement} className="px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded-l-md hover:bg-slate-300 dark:hover:bg-slate-500">-</button>
            <input 
                type="number" 
                value={currentQuantity}
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="w-16 text-center bg-white dark:bg-slate-700 border-t border-b border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100"
            />
            <button onClick={handleIncrement} className="px-2 py-1 bg-slate-200 dark:bg-slate-600 rounded-r-md hover:bg-slate-300 dark:hover:bg-slate-500">+</button>
        </div>
    );
};

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onUpdateQuantity, onRecordSale, onRemoveItem }) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4 bg-white dark:bg-slate-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">No Items in Inventory</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Click "Add New Item" to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Size</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Quantity</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{item.size}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                <QuantityControl item={item} onUpdateQuantity={onUpdateQuantity} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button onClick={() => onRecordSale(item.id)} className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 disabled:opacity-50 disabled:cursor-not-allowed" disabled={item.quantity <= 0}>Sell</button>
                <button onClick={() => onRemoveItem(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
