import React from 'react';
import { Status } from '../../types';

export const StatusBadge: React.FC<{ status: Status }> = ({ status }) => {
  const getStyles = () => {
    switch (status) {
      case Status.CERTIFIED:
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case Status.COLLECTED:
        // Changed to Gold/Amber to signify value capture
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'; 
      case Status.SCHEDULED:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case Status.PENDING:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-800 text-gray-400';
    }
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStyles()}`}>
      {status}
    </span>
  );
};