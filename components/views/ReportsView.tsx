
import React, { useMemo } from 'react';
import { InventoryItem } from '../../types';
import PageWrapper from '../PageWrapper';

interface ReportsViewProps {
  inventory: InventoryItem[];
  isPreview?: boolean;
}

const ReportsView: React.FC<ReportsViewProps> = ({ inventory, isPreview = false }) => {
  const reportData = useMemo(() => {
    const grouped: { [key: string]: { size: string; quantity: number }[] } = {};
    inventory.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push({ size: item.size, quantity: item.quantity });
    });
    // Sort items within each category by size
    Object.keys(grouped).forEach(category => {
        grouped[category].sort((a, b) => a.size.localeCompare(b.size, undefined, {numeric: true}));
    });
    return grouped;
  }, [inventory]);

  const content = (
    <div className="space-y-6">
      {Object.keys(reportData).length > 0 ? Object.entries(reportData).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-3">{category}</h3>
          <div className="border-t border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-2 gap-x-4 px-2 sm:px-4 py-2 bg-slate-50 dark:bg-slate-700/50">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">SIZE</span>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">QUANTITY</span>
            </div>
            {items.map(item => (
              <div key={item.size} className="grid grid-cols-2 gap-x-4 px-2 sm:px-4 py-3 border-t border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{item.size}</span>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )) : (
          <div className="text-center py-10 text-slate-500 dark:text-slate-400">Inventory is empty. Nothing to report.</div>
      )}
    </div>
  );

  if (isPreview) {
      return content;
  }

  return (
    <PageWrapper title="Inventory Summary Report">
      {content}
    </PageWrapper>
  );
};

export default ReportsView;
