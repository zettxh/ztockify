import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl dark:bg-slate-800" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
            <div className="mt-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
            </div>
        </div>
        <div className="mt-5 text-center">
          <button 
            type="button" 
            onClick={onClose} 
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
