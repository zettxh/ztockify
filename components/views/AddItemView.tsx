
import React, { useState } from 'react';
import { ItemCategory } from '../../types';
import PageWrapper from '../PageWrapper';

interface AddItemViewProps {
  onAddItem: (item: { category: ItemCategory; quantity: number; size: string }) => void;
}

const AddItemView: React.FC<AddItemViewProps> = ({ onAddItem }) => {
  const [category, setCategory] = useState<ItemCategory>(ItemCategory.Baju);
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numQuantity = parseInt(quantity, 10);
    if (!size.trim()) {
      alert('Please enter a size.');
      return;
    }
    if (isNaN(numQuantity) || numQuantity <= 0) {
      alert('Please enter a valid, positive quantity.');
      return;
    }
    onAddItem({ category, quantity: numQuantity, size });
    setQuantity('');
    setSize('');
  };

  return (
    <PageWrapper title="Add New Item">
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
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
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
              placeholder="e.g., 10"
              min="1"
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Size</label>
            <input
              type="text"
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
              placeholder="e.g., M, L, 32, etc."
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
};

export default AddItemView;
