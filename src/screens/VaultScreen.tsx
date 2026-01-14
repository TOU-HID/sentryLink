import { useMemo, useState } from 'react';
import { Search, Package } from 'lucide-react';
import type { Evidence, FilterState } from '../types';
import { StatusChip } from '../components/StatusChip';
import { Table } from '../components/Table';
import { MOCK_EVIDENCE } from '../mockData';

interface VaultScreenProps {
  setSelectedDoc: (selectedDoc: Evidence | null) => void;
  setScreen: (screen: 'vault' | 'detail' | 'requests') => void;
}

// Screen A: Evidence Vault
export const VaultScreen = ({
  setSelectedDoc,
  setScreen,
}: VaultScreenProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    status: 'all',
    expiry: 'all',
    search: '',
  });

  // Filter logic
  const filteredEvidence = useMemo(() => {
    return MOCK_EVIDENCE.filter((doc) => {
      if (filters.type !== 'all' && doc.type !== filters.type) return false;
      if (filters.status !== 'all' && doc.status !== filters.status)
        return false;
      if (filters.expiry === 'expired' && doc.status !== 'expired')
        return false;
      if (filters.expiry === 'expiring' && doc.status !== 'expiring')
        return false;
      if (
        filters.search &&
        !doc.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [filters]);

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-red-600'>Evidence Vault</h1>
        {selectedItems.length > 0 && (
          <button className='flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700'>
            <Package className='w-4 h-4' />
            Add {selectedItems.length} to Pack
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-lg border border-red-400'>
        <div>
          <label className='block text-sm font-medium text-red-700 mb-1'>
            Doc Type
          </label>
          <select
            className='w-full border border-red-400 rounded-lg px-3 py-2'
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value='all'>All Types</option>
            <option value='Certification'>Certification</option>
            <option value='Compliance'>Compliance</option>
            <option value='HR'>HR</option>
            <option value='Testing'>Testing</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-red-700 mb-1'>
            Status
          </label>
          <select
            className='w-full border border-red-400 rounded-lg px-3 py-2'
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value='all'>All Status</option>
            <option value='valid'>Valid</option>
            <option value='expiring'>Expiring Soon</option>
            <option value='expired'>Expired</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-red-700 mb-1'>
            Expiry
          </label>
          <select
            className='w-full border border-red-400 rounded-lg px-3 py-2'
            value={filters.expiry}
            onChange={(e) => setFilters({ ...filters, expiry: e.target.value })}
          >
            <option value='all'>All</option>
            <option value='expired'>Expired</option>
            <option value='expiring'>Expiring Soon</option>
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium text-red-700 mb-1'>
            Search
          </label>
          <div className='relative'>
            <Search className='absolute left-3 top-2.5 w-4 h-4 text-red-400' />
            <input
              type='text'
              placeholder='Search documents...'
              className='w-full border border-red-400 rounded-lg pl-10 pr-3 py-1.5'
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      <Table
        columns={[
          { key: 'name', label: 'Doc Name' },
          { key: 'type', label: 'Doc Type' },
          {
            key: 'status',
            label: 'Status',
            render: (val) => <StatusChip status={val} />,
          },
          { key: 'expiry', label: 'Expiry' },
          { key: 'versions', label: 'Versions' },
          { key: 'lastUpdated', label: 'Last Updated' },
          {
            key: 'actions',
            label: 'Actions',
            render: (_, row) => (
              <button
                className='text-red-700 hover:text-red-900 font-medium'
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDoc(row);
                  setScreen('detail');
                }}
              >
                View
              </button>
            ),
          },
        ]}
        data={filteredEvidence}
        selected={selectedItems}
        onSelect={setSelectedItems}
        onRowClick={(row) => {
          setSelectedDoc(row);
          setScreen('detail');
        }}
      />
    </div>
  );
};
