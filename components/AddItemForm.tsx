
import React, { useState } from 'react';
import { InventoryItem, ItemCategory } from '../types';

interface AddItemFormProps {
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
  onClose: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAddItem, onClose }) => {
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.Baju);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!size.trim()) {
      setError('Item size cannot be empty.');
      return;
    }
    if (quantity <= 0) {
      setError('Quantity must be a positive number.');
      return;
    }
    setError('');
    onAddItem({ category, quantity, size });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md dark:bg-red-900/30 dark:text-red-300">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ItemCategory)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
          >
            {Object.values(ItemCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
            min="1"
          />
        </div>
      </div>
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Size</label>
        <input
            id="size"
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
            placeholder="e.g., M, L, 32, etc."
        />
      </div>
      <div className="flex justify-end pt-4 space-x-2">
        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-300 rounded-md shadow-sm hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-slate-600 dark:text-slate-100 dark:border-slate-500 dark:hover:bg-slate-500">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Add Item
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
