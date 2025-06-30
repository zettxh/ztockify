
import React, { useState, useMemo, useCallback } from 'react';
import useLocalStorage from './hooks/useLocalStorage.ts';
import { InventoryItem, ItemCategory, HistoryLogEntry, HistoryType, View } from './types.ts';
import useTheme from './hooks/useTheme.ts';

import Navigation from './components/Navigation.tsx';
import SuccessModal from './components/SuccessModal.tsx';
import InventoryView from './components/views/InventoryView.tsx';
import LowStocksView from './components/views/LowStocksView.tsx';
import AddItemView from './components/views/AddItemView.tsx';
import OutboundView from './components/views/OutboundView.tsx';
import HistoryView from './components/views/HistoryView.tsx';
import ReportsView from './components/views/ReportsView.tsx';
import ExportImageView from './components/views/ExportImageView.tsx';
import DataManagementView from './components/views/DataManagementView.tsx';

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [inventory, setInventory] = useLocalStorage<InventoryItem[]>('ztockify_inventory', []);
  const [historyLog, setHistoryLog] = useLocalStorage<HistoryLogEntry[]>('ztockify_history', []);
  const [activeView, setActiveView] = useState<View>('Outbound');
  const [successModal, setSuccessModal] = useState({ isOpen: false, title: '', message: '' });

  const lowStockCount = useMemo(() => inventory.filter(item => item.quantity <= 10).length, [inventory]);

  const addHistoryEntry = useCallback((category: ItemCategory, size: string, type: HistoryType, quantityChange: string, newQuantity: number) => {
    const newEntry: HistoryLogEntry = {
      id: new Date().toISOString() + Math.random(),
      date: Date.now(),
      category,
      size,
      type,
      quantityChange,
      newQuantity,
    };
    setHistoryLog(prev => [newEntry, ...prev]);
  }, [setHistoryLog]);
  
  const handleShowSuccessModal = (title: string, message: string) => {
    setSuccessModal({ isOpen: true, title, message });
  };

  const handleAddItem = (newItem: { category: ItemCategory; quantity: number; size: string }) => {
    const { category, quantity, size } = newItem;
    if (!size.trim()) {
        alert("Size cannot be empty.");
        return;
    }
    
    setInventory(prev => {
        const existingItemIndex = prev.findIndex(item => item.category === category && item.size.toLowerCase() === size.toLowerCase());
        
        if (existingItemIndex !== -1) {
            const updatedInventory = [...prev];
            const existingItem = updatedInventory[existingItemIndex];
            const newQuantity = existingItem.quantity + quantity;
            updatedInventory[existingItemIndex] = { ...existingItem, quantity: newQuantity };
            
            addHistoryEntry(category, existingItem.size, 'IN (Add)', `+${quantity}`, newQuantity);
            handleShowSuccessModal('Success', `Added ${quantity} to existing item: ${category} (${existingItem.size}).`);
            return updatedInventory;
        } else {
            const newItemEntry: InventoryItem = {
                id: `${category}-${size}-${Date.now()}`,
                category,
                quantity,
                size,
            };
            addHistoryEntry(category, size, 'IN (New)', `+${quantity}`, quantity);
            handleShowSuccessModal('Success', 'New item added successfully!');
            return [...prev, newItemEntry];
        }
    });
  };
  
  const handleOutbound = (item: InventoryItem, quantity: number) => {
      if(quantity <= 0) {
          alert("Quantity must be positive.");
          return;
      }
      if(quantity > item.quantity) {
          alert("Outbound quantity cannot be greater than stock.");
          return;
      }
      
      const newQuantity = item.quantity - quantity;
      setInventory(prev => prev.map(i => i.id === item.id ? {...i, quantity: newQuantity} : i));
      addHistoryEntry(item.category, item.size, 'OUT', `-${quantity}`, newQuantity);
      handleShowSuccessModal('Success', 'Outbound transaction recorded successfully!');
  };

  const handleRemoveItem = (id: string) => {
    const itemToRemove = inventory.find(i => i.id === id);
    if (itemToRemove && window.confirm(`Are you sure you want to remove ${itemToRemove.category} (${itemToRemove.size})? This action cannot be undone.`)) {
      setInventory(prev => prev.filter(i => i.id !== id));
      addHistoryEntry(itemToRemove.category, itemToRemove.size, 'DELETE', `-${itemToRemove.quantity}`, 0);
      handleShowSuccessModal('Success', 'Item removed successfully.');
    }
  };

  const handleUpdateItem = (id: string, newQuantity: number) => {
      // This is a placeholder for a more complex update logic. For now, it's not used in the UI.
      console.log(`Updating item ${id} to quantity ${newQuantity}`);
  }
  
  const handleExportData = () => {
    const dataToExport = {
      inventory,
      historyLog,
    };
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `ztockify_backup_${new Date().toISOString().split('T')[0]}.json`);
    linkElement.click();
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const text = e.target?.result;
            if (typeof text !== 'string') throw new Error("File is not readable.");
            const data = JSON.parse(text);

            if (!data.inventory || !data.historyLog || !Array.isArray(data.inventory) || !Array.isArray(data.historyLog)) {
                 throw new Error("Invalid file format. JSON must have 'inventory' and 'historyLog' arrays.");
            }
            // Add more robust validation here if needed
            setInventory(data.inventory);
            setHistoryLog(data.historyLog);
            handleShowSuccessModal('Success', 'Data imported successfully!');
        } catch (error) {
            const message = error instanceof Error ? error.message : "An unknown error occurred.";
            alert(`Import failed: ${message}`);
        } finally {
             if (event.target) event.target.value = '';
        }
    };
    reader.readAsText(file);
  };


  const renderView = () => {
    const sharedReportProps = { inventory };
    switch (activeView) {
      case 'Inventory':
        return <InventoryView inventory={inventory} onRemove={handleRemoveItem} onUpdate={handleUpdateItem} />;
      case 'Low Stocks':
        return <LowStocksView inventory={inventory} />;
      case 'Add Item':
        return <AddItemView onAddItem={handleAddItem} />;
      case 'Outbound':
        return <OutboundView inventory={inventory} onOutbound={handleOutbound} />;
      case 'History':
        return <HistoryView history={historyLog} />;
      case 'Reports':
        return <ReportsView {...sharedReportProps} />;
      case 'Export Image':
        return <ExportImageView {...sharedReportProps} />;
      case 'Data Management':
        return <DataManagementView onExport={handleExportData} onImport={handleImportData} />;
      default:
        return <OutboundView inventory={inventory} onOutbound={handleOutbound} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200">
      <Navigation 
        activeView={activeView} 
        setActiveView={setActiveView} 
        lowStockCount={lowStockCount}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main className="container mx-auto p-2 sm:p-4 md:p-6">
        {renderView()}
      </main>
      <SuccessModal
        isOpen={successModal.isOpen}
        title={successModal.title}
        message={successModal.message}
        onClose={() => setSuccessModal({ isOpen: false, title: '', message: '' })}
      />
    </div>
  );
};

export default App;