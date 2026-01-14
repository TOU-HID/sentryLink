import type { Evidence, Request, Version } from '../types';

// Mock Data
export const MOCK_EVIDENCE: Evidence[] = [
  { id: 1, name: 'ISO 9001 Certificate', type: 'Certification', status: 'valid', expiry: '2025-12-31', versions: 3, lastUpdated: '2024-12-15', currentVersion: 3 },
  { id: 2, name: 'Fire Safety Inspection', type: 'Compliance', status: 'expiring', expiry: '2025-02-28', versions: 2, lastUpdated: '2024-11-20', currentVersion: 2 },
  { id: 3, name: 'Worker Training Records', type: 'HR', status: 'expired', expiry: '2024-12-31', versions: 5, lastUpdated: '2024-10-10', currentVersion: 5 },
  { id: 4, name: 'Environmental Permit', type: 'Compliance', status: 'valid', expiry: '2026-06-30', versions: 1, lastUpdated: '2025-01-05', currentVersion: 1 },
  { id: 5, name: 'Product Safety Test Report', type: 'Testing', status: 'valid', expiry: '2025-09-15', versions: 4, lastUpdated: '2024-12-01', currentVersion: 4 },
];

export const MOCK_REQUESTS: Request[] = [
  { id: 1, docType: 'ISO 9001 Certificate', dueDate: '2025-02-15', status: 'pending', requestedBy: 'Acme Corp' },
  { id: 2, docType: 'Fire Safety Inspection', dueDate: '2025-01-25', status: 'pending', requestedBy: 'GlobalTrade Inc' },
  { id: 3, docType: 'Environmental Permit', dueDate: '2025-01-20', status: 'fulfilled', requestedBy: 'EcoRetail Ltd' },
  { id: 4, docType: 'Worker Safety Training', dueDate: '2025-02-01', status: 'pending', requestedBy: 'Acme Corp' },
];

export const VERSION_HISTORY: Record<number, Version[]> = {
  1: [
    { version: 3, date: '2024-12-15', uploader: 'John Smith', notes: 'Annual renewal submitted', fileSize: '2.4 MB' },
    { version: 2, date: '2024-06-10', uploader: 'Sarah Lee', notes: 'Updated contact information', fileSize: '2.3 MB' },
    { version: 1, date: '2023-12-20', uploader: 'Mike Johnson', notes: 'Initial certification', fileSize: '2.1 MB' },
  ],
  2: [
    { version: 2, date: '2024-11-20', uploader: 'Sarah Lee', notes: 'Q4 inspection results', fileSize: '1.8 MB' },
    { version: 1, date: '2024-05-15', uploader: 'John Smith', notes: 'Initial inspection report', fileSize: '1.6 MB' },
  ],
};