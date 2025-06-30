
import React, { useMemo } from 'react';
import { InventoryItem } from '../../types.ts';
import PageWrapper from '../PageWrapper.tsx';

interface LowStocksViewProps {
  inventory: InventoryItem[];
}

const LowStocksView: React.FC<LowStocksViewProps> = ({ inventory }) => {
  const lowStockItems = useMemo(() => {
    return inventory.filter(item => item.quantity <= 10).sort((a,b) => a.quantity - b.quantity);
  }, [inventory]);

  return (
    <PageWrapper title="Low Stock Items (<= 10)">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              {['CATEGORY', 'SIZE', 'QUANTITY'].map(header => (
                <th key={header} scope="col" className="px-2 sm:px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
            {lowStockItems.length > 0 ? lowStockItems.map(item => (
              <tr key={item.id}>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800 dark:text-slate-200">{item.category}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">{item.size}</td>
                <td className="px-2 sm:px-6 py-4 whitespace-nowrap text-sm font-bold text-red-500">{item.quantity}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={3} className="text-center py-10 text-slate-500 dark:text-slate-400">No low stock items.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
};

export default LowStocksView;