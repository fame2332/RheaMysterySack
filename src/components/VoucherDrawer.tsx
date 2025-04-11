import React from 'react';
import { Ticket, X } from 'lucide-react';
import { Voucher } from '../types';

interface VoucherDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  vouchers: Voucher[];
  onSelect: (voucher: Voucher) => void;
}

export const VoucherDrawer: React.FC<VoucherDrawerProps> = ({
  isOpen,
  onClose,
  vouchers,
  onSelect,
}) => {
  if (!isOpen) return null;

  const formatValue = (voucher: Voucher) => {
    switch (voucher.type) {
      case 'percentage':
        return `${voucher.value}% OFF`;
      case 'fixed':
        return `₱${voucher.value} OFF`;
      case 'shipping':
        return `₱${voucher.value} OFF SHIPPING`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Available Vouchers</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {vouchers.map(voucher => (
            <div
              key={voucher.id}
              className="border rounded-lg p-4 hover:border-purple-500 cursor-pointer"
              onClick={() => {
                onSelect(voucher);
                onClose();
              }}
            >
              <div className="flex items-start gap-4">
                <Ticket className="h-8 w-8 text-purple-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-lg font-bold text-purple-600">
                    {formatValue(voucher)}
                  </div>
                  <div className="text-sm text-gray-600">
                    Min. spend: ₱{voucher.minSpend?.toLocaleString() ?? 0}
                  </div>
                  {voucher.maxDiscount && (
                    <div className="text-sm text-gray-600">
                      Max. discount: ₱{voucher.maxDiscount.toLocaleString()}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    Valid until: {new Date(voucher.validUntil).toLocaleDateString()}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {voucher.usageLimit - voucher.usedCount} uses remaining
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <button className="text-purple-600 border border-purple-600 px-3 py-1 rounded hover:bg-purple-50">
                    Use
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};