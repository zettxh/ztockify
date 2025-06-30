import React, { useRef } from 'react';
import PageWrapper from '../PageWrapper';

interface DataManagementViewProps {
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataManagementView: React.FC<DataManagementViewProps> = ({ onExport, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <PageWrapper title="Data Management">
      <div className="space-y-8">
        {/* Export Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Export Data</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Click the button below to download your current inventory, sales, and history data as a JSON file.
          </p>
          <div className="mt-4">
            <button
              onClick={onExport}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Export Data
            </button>
          </div>
        </section>

        {/* Import Section */}
        <section>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Import Data</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Select a previously exported JSON file to restore your data.
          </p>
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            <strong>Warning:</strong> This will overwrite all current data.
          </p>
           <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <strong>Format:</strong> The JSON file must be an object with three keys: 'inventory', 'salesLog', and 'historyLog'.
          </p>
          <div className="mt-4">
            <button
              onClick={handleImportClick}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
            >
              Choose File
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImport}
              accept=".json"
              className="hidden"
            />
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default DataManagementView;
