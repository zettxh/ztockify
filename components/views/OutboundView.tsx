
import React, { useState, useMemo } from 'react';
import { InventoryItem, ItemCategory } from '../../types.ts';
import PageWrapper from '../PageWrapper.tsx';

interface OutboundViewProps {
  inventory: InventoryItem[];
  onOutbound: (item: InventoryItem, quantity: number) => void;
}

const OutboundView: React.FC<OutboundViewProps> = ({ inventory, onOutbound }) => {
  const [quantities, setQuantities] = useState<{[key: string]: string}>({});
  const [filterCategory, setFilterCategory] = useState<ItemCategory | 'All'>('All');
  const [searchSize, setSearchSize] = useState('');

  const handleQuantityChange = (id: string, value: string) => {
    setQuantities(prev => ({...prev, [id]: value}));
  };

  const handleOutboundClick = (item: InventoryItem) => {
    const quantity = parseInt(quantities[item.id] || '0', 10);
    onOutbound(item, quantity);
    setQuantities(prev => ({...prev, [item.id]: ''}));
  }

  const filteredInventory = useMemo(() => {
    return inventory
        .filter(item => item.quantity > 0)
        .filter(item => filterCategory === 'All' || item.category === filterCategory)
        .filter(item => item.size.toLowerCase().includes(searchSize.toLowerCase()));
  }, [inventory, filterCategory, searchSize]);

  return (
    <PageWrapper title="Record Outbound Item">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4">
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value as ItemCategory | 'All')}
          className="block w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
        >
          <option value="All">Filter by Category: All</option>
          {[...new Set(inventory.map(i => i.category))].map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
            type="text"
            placeholder="Search by size..."
            value={searchSize}
            onChange={e => setSearchSize(e.target.value)}
            className="block w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
        />
      </div>

      <div className="space-y-3">
        {filteredInventory.length > 0 ? filteredInventory.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">{item.category} ({item.size})</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Stock: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-center">
              <input 
                type="number"
                placeholder="Qty"
                value={quantities[item.id] || ''}
                onChange={e => handleQuantityChange(item.id, e.target.value)}
                className="w-20 px-2 py-1.5 bg-white dark:bg-slate-600 border border-slate-300 dark:border-slate-500 rounded-md text-center"
                min="1"
                max={item.quantity}
              />
              <button 
                onClick={() => handleOutboundClick(item)}
                className="px-3 sm:px-4 py-1.5 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-slate-400"
                disabled={!quantities[item.id] || parseInt(quantities[item.id] || '0') <= 0 || parseInt(quantities[item.id] || '0') > item.quantity}
              >
                Out
              </button>
            </div>
          </div>
        )) : (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400">No items available for outbound transaction.</div>
        )}
      </div>
    </PageWrapper>
  );
};

export default OutboundView;