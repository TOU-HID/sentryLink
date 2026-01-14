import { useState } from 'react';
import { Modal } from '../components/Modal';
import { StatusChip } from '../components/StatusChip';
import { MOCK_EVIDENCE, MOCK_REQUESTS } from '../mockData';
import type { Request } from '../types';

// Screen C: Buyer Requests To-Do
export const RequestsScreen = () => {
  const [fulfillModal, setFulfillModal] = useState<Request | null>(null);

  const handleFulfillRequest = (evidenceId: number | null) => {
    alert(`Request fulfilled with evidence ID: ${evidenceId || 'new'}`);
    setFulfillModal(null);
  };

  return (
    <div className='space-y-6'>
      <h1 className='text-2xl font-bold text-red-700'>Buyer Requests To-Do</h1>

      <div className='space-y-3'>
        {MOCK_REQUESTS.map((request) => (
          <div
            key={request.id}
            className='bg-white p-6 rounded-lg border border-red-300 hover:shadow-md transition-shadow'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <div className='flex items-center gap-3 mb-2'>
                  <h3 className='font-semibold text-lg text-red-700'>
                    {request.docType}
                  </h3>
                  <StatusChip status={request.status} />
                </div>
                <div className='text-sm text-gray-600 space-y-1'>
                  <p>Requested by: {request.requestedBy}</p>
                  <p>Due date: {request.dueDate}</p>
                </div>
              </div>
              {request.status === 'pending' && (
                <button
                  onClick={() => setFulfillModal(() => request)}
                  className='px-4 py-2 bg-red-50 text-red-700 rounded-lg border hover:bg-red-100 border-red-300 hover:border-red-400'
                >
                  Fulfill
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={!!fulfillModal}
        onClose={() => setFulfillModal(null)}
        title={`Fulfill Request: ${fulfillModal?.docType}`}
      >
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-red-700 mb-3'>
              Choose Evidence
            </label>
            <div className='space-y-2 max-h-64 overflow-y-auto'>
              {MOCK_EVIDENCE.filter(
                (e) => e.type === 'Certification' || e.type === 'Compliance'
              ).map((doc) => (
                <div
                  key={doc.id}
                  className='p-3 border border-red-300 rounded-lg hover:bg-red-50 cursor-pointer flex items-center justify-between'
                  onClick={() => handleFulfillRequest(doc.id)}
                >
                  <div>
                    <p className='font-medium text-red-600'>{doc.name}</p>
                    <p className='text-sm text-gray-600'>
                      Version {doc.currentVersion} • Expires {doc.expiry}
                    </p>
                  </div>
                  <StatusChip status={doc.status} />
                </div>
              ))}
            </div>
          </div>
          <div className='pt-4'>
            <button
              onClick={() => handleFulfillRequest(null)}
              className='w-full px-4 py-2 bg-red-500 border-2 border-red-600 text-white rounded-lg hover:bg-red-700'
            >
              + Create New Evidence
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
