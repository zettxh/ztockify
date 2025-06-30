
import React, { useState, useMemo } from 'react';
import { HistoryLogEntry, ItemCategory } from '../../types.ts';
import PageWrapper from '../PageWrapper.tsx';

interface HistoryViewProps {
  history: HistoryLogEntry[];
}

const HistoryView: React.FC<HistoryViewProps> = ({ history }) => {
  const [filterCategory, setFilterCategory] = useState<ItemCategory | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<'Newest First' | 'Oldest First'>('Newest First');

  const categories = useMemo(() => [...new Set(history.map(h => h.category))], [history]);

  const filteredAndSortedHistory = useMemo(() => {
    let result = [...history];
    if (filterCategory !== 'All') {
      result = result.filter(h => h.category === filterCategory);
    }
    result.sort((a, b) => {
      if (sortOrder === 'Newest First') {
        return b.date - a.date;
      }
      return a.date - b.date;
    });
    return result;
  }, [history, filterCategory, sortOrder]);
  
  const formatDate = (timestamp: number) => {
      return new Intl.DateTimeFormat('en-GB', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
      }).format(new Date(timestamp)).replace(/,/g, '');
  }

  return (
    <PageWrapper title="Stock Movement History">
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
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'Newest First' | 'Oldest First')}
          className="block w-full sm:w-auto px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-900 dark:text-slate-100"
        >
          <option>Sort by Date: Newest First</option>
          <option>Sort by Date: Oldest First</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              {['DATE', 'CATEGORY', 'SIZE', 'TYPE', 'QUANTITY CHANGE', 'NEW QUANTITY'].map(header => (
                <th key={header} scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {filteredAndSortedHistory.length > 0 ? filteredAndSortedHistory.map(log => (
              <tr key={log.id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{formatDate(log.date)}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">{log.category}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">{log.size}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm">
                   <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${log.type.startsWith('IN') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                       {log.type}
                   </span>
                </td>
                <td className={`px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium ${log.quantityChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {log.quantityChange}
                </td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-200">{log.newQuantity}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-slate-500 dark:text-slate-400">No history records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default HistoryView;