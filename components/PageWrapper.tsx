
import React from 'react';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
