
import React, { useState, useMemo } from 'react';
import { InventoryItem, ItemCategory } from '../../types.ts';
import PageWrapper from '../PageWrapper.tsx';

interface InventoryViewProps {
  inventory: InventoryItem[];
  onRemove: (id: string) => void;
  onUpdate: (id: string, newQuantity: number) => void;
}

type SortOption = 'None' | 'Quantity (Asc)' | 'Quantity (Desc)';

const InventoryView: React.FC<InventoryViewProps> = ({ inventory, onRemove, onUpdate }) => {
  const [filterCategory, setFilterCategory] = useState<ItemCategory | 'All'>('All');
  const [sort, setSort] = useState<SortOption>('None');

  const categories = useMemo(() => [...new Set(inventory.map(i => i.category))], [inventory]);
  
  const filteredAndSortedInventory = useMemo(() => {
    let result = [...inventory];
    if (filterCategory !== 'All') {
      result = result.filter(item => item.category === filterCategory);
    }
    if (sort === 'Quantity (Asc)') {
      result.sort((a, b) => a.quantity - b.quantity);
    } else if (sort === 'Quantity (Desc)') {
      result.sort((a, b) => b.quantity - a.quantity);
    }
    return result;
  }, [inventory, filterCategory, sort]);
  
  return (
    <PageWrapper title="Current Inventory">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value as ItemCategory | 'All')}
          className="block w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
        >
          <option value="All">Filter by Category: All</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value as SortOption)}
          className="block w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
        >
          <option>Sort by Quantity: None</option>
          <option>Quantity (Asc)</option>
          <option>Quantity (Desc)</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              {['CATEGORY', 'SIZE', 'QUANTITY', 'ACTIONS'].map(header => (
                <th key={header} scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {filteredAndSortedInventory.length > 0 ? filteredAndSortedInventory.map(item => (
              <tr key={item.id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-200">{item.category}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{item.size}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-200">{item.quantity}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 sm:space-x-4">
                  <button onClick={() => alert('Update feature coming soon!')} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">Update</button>
                  <button onClick={() => onRemove(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Remove</button>
                </td>
              </tr>
            )) : (
               <tr>
                <td colSpan={4} className="text-center py-10 text-slate-500 dark:text-slate-400">No inventory items.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default InventoryView;