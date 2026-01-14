import { X } from 'lucide-react';
import type { ModalProps } from '../types';

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-amber-50/70 border-8 border-red-400 flex items-center justify-center z-50 p-4 shadow-sm'>
      <div className='bg-white border-2 border-red-300 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-red-200'>
          <h2 className='text-xl font-semibold text-red-600'>{title}</h2>
          <button onClick={onClose} className='text-red-400 hover:text-red-600'>
            <X className='w-5 h-5' />
          </button>
        </div>
        <div className='p-6'>{children}</div>
      </div>
    </div>
  );
};
