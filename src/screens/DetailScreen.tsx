import { useState, type ChangeEvent } from 'react';
import { Modal } from '../components/Modal';
import type { Evidence, UploadFormState } from '../types';
import { StatusChip } from '../components/StatusChip';
import { FileText, Upload } from 'lucide-react';
import { VERSION_HISTORY } from '../mockData';

interface DetailScreenProps {
  selectedDoc: Evidence | null;
  setScreen: (screen: 'vault' | 'detail' | 'requests') => void;
}

// Screen B: Evidence Detail
export const DetailScreen = ({ selectedDoc, setScreen }: DetailScreenProps) => {
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState<UploadFormState>({
    notes: '',
    expiry: '',
    file: null,
  });

  if (!selectedDoc) return null;

  const handleUploadVersion = () => {
    if (!uploadForm.notes) {
      alert('Notes are required');
      return;
    }
    if (selectedDoc) {
      alert(`New version uploaded for ${selectedDoc.name}`);
    }
    setUploadModal(false);
    setUploadForm({ notes: '', expiry: '', file: null });
  };

  return (
    <div className='space-y-6'>
      <button
        onClick={() => setScreen('vault')}
        className='text-red-600 hover:text-red-800 mb-4'
      >
        ← Back to Vault
      </button>

      <div className='bg-white p-6 rounded-lg border border-red-300'>
        <div className='flex items-start justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold text-red-700 mb-2'>
              {selectedDoc.name}
            </h1>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <span>Type: {selectedDoc.type}</span>
              <span>•</span>
              <span>Expiry: {selectedDoc.expiry}</span>
              <span>•</span>
              <span>Total Versions: {selectedDoc.versions}</span>
              <span>•</span>
              <span>Last Updated: {selectedDoc.lastUpdated}</span>
            </div>
          </div>
          <StatusChip status={selectedDoc.status} />
        </div>

        {/* <div className='grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-red-200'>
          <div>
            <p className='text-sm text-red-600'>Total Versions</p>
            <p className='text-lg font-semibold text-red-700'>
              {selectedDoc.versions}
            </p>
          </div>
          <div>
            <p className='text-sm text-red-600'>Last Updated</p>
            <p className='text-lg font-semibold text-red-700'>
              {selectedDoc.lastUpdated}
            </p>
          </div>
        </div> */}

        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold text-red-500'>
            Version History
          </h2>
          <button
            onClick={() => setUploadModal(true)}
            className='flex items-center gap-2 px-4 py-2 bg-red-100 text-red-500 rounded-lg hover:bg-red-300 hover:text-white'
          >
            <Upload className='w-4 h-4' />
            Upload New Version
          </button>
        </div>

        <div className='space-y-3'>
          {(VERSION_HISTORY[selectedDoc.id] || []).map((version) => (
            <div
              key={version.version}
              className='flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-gray-50'
            >
              <div className='flex items-center gap-4'>
                <div className='w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center'>
                  <FileText className='w-5 h-5 text-red-600' />
                </div>
                <div>
                  <p className='font-medium text-red-500'>
                    Version {version.version}
                  </p>
                  <p className='text-sm text-gray-600'>{version.notes}</p>
                  <p className='text-xs text-gray-500 mt-1'>
                    Uploaded by {version.uploader} on {version.date} •{' '}
                    {version.fileSize}
                  </p>
                </div>
              </div>
              <button className='text-red-600 hover:text-red-800 text-sm font-medium'>
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={uploadModal}
        onClose={() => setUploadModal(false)}
        title='Upload New Version'
      >
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-red-700 mb-1'>
              Notes <span className='text-red-500'>*</span>
            </label>
            <textarea
              className='w-full border border-red-300 rounded-lg px-3 py-2'
              rows={3}
              placeholder='Describe what changed in this version...'
              value={uploadForm.notes}
              onChange={(e) =>
                setUploadForm({ ...uploadForm, notes: e.target.value })
              }
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-red-700 mb-1'>
              Expiry Date (Optional)
            </label>
            <input
              type='date'
              className='w-full border border-red-300 rounded-lg px-3 py-2'
              value={uploadForm.expiry}
              onChange={(e) =>
                setUploadForm({ ...uploadForm, expiry: e.target.value })
              }
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-red-700 mb-1'>
              File
            </label>
            <input
              type='file'
              className='w-full border border-red-300 rounded-lg px-3 py-2'
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUploadForm({
                  ...uploadForm,
                  file: e.target.files ? e.target.files[0] : null,
                })
              }
            />
          </div>
          <div className='flex gap-3 pt-4'>
            <button
              onClick={handleUploadVersion}
              className='flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700'
            >
              Upload Version
            </button>
            <button
              onClick={() => setUploadModal(false)}
              className='px-4 py-2 border border-red-300 text-red-400 rounded-lg hover:bg-red-50'
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
