import React from 'react';

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, children }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">{title}</h2>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
