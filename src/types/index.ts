import type { LucideIcon } from 'lucide-react';

// Types
export type EvidenceStatus = 'valid' | 'expiring' | 'expired' | 'pending' | 'fulfilled' | 'all';
export type DocType = 'Certification' | 'Compliance' | 'HR' | 'Testing' | 'all';

export interface Evidence {
  id: number;
  name: string;
  type: DocType;
  status: EvidenceStatus;
  expiry: string;
  versions: number;
  lastUpdated: string;
  currentVersion: number;
}

export interface Request {
  id: number;
  docType: string;
  dueDate: string;
  status: EvidenceStatus;
  requestedBy: string;
}

export interface Version {
  version: number;
  date: string;
  uploader: string;
  notes: string;
  fileSize: string;
}

export interface FilterState {
  type: string;
  status: string;
  expiry: string;
  search: string;
}

export interface UploadFormState {
  notes: string;
  expiry: string;
  file: File | null;
}

export interface StatusChipProps {
  status: string;
}

export interface StatusConfig {
  bg: string;
  text: string;
  icon: LucideIcon;
  label: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface Column<T> {
  key: keyof T | 'actions';
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  selected?: number[];
  onSelect?: (ids: number[]) => void;
}