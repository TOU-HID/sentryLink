import { useState } from 'react';
import type { Evidence } from './types';
import { VaultScreen } from './screens/VaultScreen';
import { DetailScreen } from './screens/DetailScreen';
import { RequestsScreen } from './screens/RequestsScreen';

// Main App Component
export default function EvidenceVaultApp() {
  const [screen, setScreen] = useState<'vault' | 'detail' | 'requests'>(
    'vault'
  );
  const [selectedDoc, setSelectedDoc] = useState<Evidence | null>(null);

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white border-b border-red-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <h1 className='text-xl font-bold text-red-600'>SentryLink</h1>
            <div className='flex gap-4'>
              <button
                onClick={() => setScreen('vault')}
                className={`px-4 py-2 rounded-lg ${
                  screen === 'vault' || screen === 'detail'
                    ? 'bg-red-100 text-red-600 hover:bg-red-300 hover:text-white'
                    : 'text-red-400 border-2 border-red-300 hover:border-red-400'
                }`}
              >
                Evidence Vault
              </button>
              <button
                onClick={() => setScreen('requests')}
                className={`px-4 py-2 rounded-lg ${
                  screen === 'requests'
                    ? 'bg-red-100 text-red-600 hover:bg-red-300 hover:text-white'
                    : 'text-red-400 border-2 border-red-300 hover:border-red-400'
                }`}
              >
                Requests To-Do
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto px-6 py-8'>
        {screen === 'vault' && (
          <VaultScreen setSelectedDoc={setSelectedDoc} setScreen={setScreen} />
        )}
        {screen === 'detail' && selectedDoc && (
          <DetailScreen selectedDoc={selectedDoc} setScreen={setScreen} />
        )}
        {screen === 'requests' && <RequestsScreen />}
      </main>
    </div>
  );
}
