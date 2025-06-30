export enum ItemCategory {
  Baju = 'Baju',
  Celana = 'Celana',
  Rok = 'Rok',
}

export interface InventoryItem {
  id: string;
  category: ItemCategory;
  size: string;
  quantity: number;
}

export type HistoryType = 'IN (New)' | 'IN (Add)' | 'OUT' | 'DELETE';

export interface HistoryLogEntry {
  id: string;
  date: number; // Storing as timestamp for easy sorting
  category: ItemCategory;
  size: string;
  type: HistoryType;
  quantityChange: string;
  newQuantity: number;
}

export type View = 'Inventory' | 'Low Stocks' | 'Add Item' | 'Outbound' | 'History' | 'Reports' | 'Export Image' | 'Data Management';