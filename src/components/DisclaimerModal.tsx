import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerModal: React.FC = () => {
  const { showDisclaimer, setShowDisclaimer } = useAuth();

  if (!showDisclaimer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-8 w-8 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-900">Important Notice</h2>
        </div>
        
        <div className="prose prose-sm">
          <p className="text-gray-600 mb-4">
            All items listed on our platform are sourced from various mystery boxes. While we verify each item's condition before listing, we cannot guarantee their authenticity. Each item is carefully inspected and priced based on its condition and market value.
          </p>
          <p className="text-gray-600 mb-6">
            By continuing to use our service, you acknowledge and accept this disclaimer.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setShowDisclaimer(false)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};