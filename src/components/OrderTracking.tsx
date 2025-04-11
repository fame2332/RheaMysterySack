import React from 'react';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingProps {
  order: Order;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order }) => {
  const steps = [
    { id: 'pending', label: 'Order Placed', icon: Package },
    { id: 'processing', label: 'Processing', icon: Package },
    { id: 'shipped', label: 'Shipped', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === order.status);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Order Status</h2>
        {order.trackingNumber && (
          <div className="text-sm text-gray-600">
            Tracking #: {order.trackingNumber}
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-0 top-[24px] w-full h-1 bg-gray-200">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{
              width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= currentStepIndex;
            const isCancelled = order.status === 'cancelled';

            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  isCancelled ? 'text-red-500' : isActive ? 'text-green-500' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isCancelled
                      ? 'bg-red-100'
                      : isActive
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  {isCancelled ? (
                    <XCircle className="h-6 w-6" />
                  ) : (
                    <Icon className="h-6 w-6" />
                  )}
                </div>
                <div className="mt-2 text-sm font-medium text-center">
                  {step.label}
                </div>
                {index === currentStepIndex && !isCancelled && (
                  <div className="mt-1 text-xs">
                    {order.estimatedDelivery
                      ? `Est. ${new Date(order.estimatedDelivery).toLocaleDateString()}`
                      : 'Processing'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};