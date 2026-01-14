import { Check, Clock, AlertCircle } from 'lucide-react';
import type { StatusChipProps, StatusConfig } from '../types';

export const StatusChip = ({ status }: StatusChipProps) => {
  const configs: Record<string, StatusConfig> = {
    valid: { bg: 'bg-green-100', text: 'text-green-800', icon: Check, label: 'Valid' },
    expiring: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Expiring Soon' },
    expired: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle, label: 'Expired' },
    pending: { bg: 'bg-gray-100', text: 'text-gray-800', icon: Clock, label: 'Pending' },
    fulfilled: { bg: 'bg-green-100', text: 'text-green-800', icon: Check, label: 'Fulfilled' },
  };
  
  const config = configs[status] || configs.pending;
  const Icon = config.icon;
  
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};