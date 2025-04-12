import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { DeliveryMethod, PaymentMethod } from '../types';
import { CreditCard, MapPin, Truck } from 'lucide-react';

const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: 'pickup',
    name: 'Store Pickup',
    description: 'Pick up your order at our store in Dasmariñas, Cavite',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    description: 'Available in select areas of Dasmariñas, Cavite',
    availableLocations: [
      'Paliparan',
      'Salitran',
      'San Agustin',
      'Sampaloc',
      'Zone 1-4'
    ]
  },
  {
    id: 'meetup',
    name: 'Meetup',
    description: 'Meet at designated locations in Dasmariñas, Cavite',
  }
];

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'gcash',
    name: '',
    icon: '/images/Gcash.png'
  },
  {
    id: 'paymaya',
    name: '',
    icon: '/images/maya.jpg'
  },
  {
    id: 'unionbank',
    name: '',
    icon: '/images/unionbank.png'
  }
];

type CheckoutStep = 'delivery' | 'payment' | 'review';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    deliveryMethod: DELIVERY_METHODS[0],
    paymentMethod: PAYMENT_METHODS[0]
  });

  const handleContinue = () => {
    if (currentStep === 'delivery') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    } else {
      navigate('/checkout-success');
    }
  };

  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('delivery');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'delivery' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
        }`}>
          <Truck className="h-4 w-4" />
        </div>
        <div className={`h-1 w-16 ${
          currentStep === 'delivery' ? 'bg-gray-200' : 'bg-purple-600'
        }`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'payment' ? 'bg-purple-600 text-white' : 
          currentStep === 'review' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
        }`}>
          <CreditCard className="h-4 w-4" />
        </div>
        <div className={`h-1 w-16 ${
          currentStep === 'review' ? 'bg-purple-600' : 'bg-gray-200'
        }`} />
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === 'review' ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-600'
        }`}>
          <MapPin className="h-4 w-4" />
        </div>
      </div>
    </div>
  );

  const renderDeliveryStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          required
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Method
        </label>
        <div className="space-y-4">
          {DELIVERY_METHODS.map((method) => (
            <div
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                formData.deliveryMethod.id === method.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              }`}
              onClick={() => setFormData({ ...formData, deliveryMethod: method })}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={formData.deliveryMethod.id === method.id}
                  onChange={() => {}}
                  className="h-4 w-4 text-purple-600"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                  {method.availableLocations && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-700">Available in:</p>
                      <ul className="list-disc list-inside text-sm text-gray-500">
                        {method.availableLocations.map((location) => (
                          <li key={location}>{location}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Payment Method</h3>
      <div className="grid gap-4">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer ${
              formData.paymentMethod.id === method.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200'
            }`}
            onClick={() => setFormData({ ...formData, paymentMethod: method })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={formData.paymentMethod.id === method.id}
                  onChange={() => {}}
                  className="h-4 w-4 text-purple-600"
                />
                <img
                  src={method.icon}
                  alt={method.name}
                  className="h-8 ml-3"
                />
              </div>
              <span className="text-sm font-medium text-gray-900">{method.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {state.items.map(item => (
            <div key={item.id} className="flex justify-between">
              <div>
                <p className="text-sm text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                ₱{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total</p>
              <p>₱{state.total.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Delivery Details</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-900">{formData.name}</p>
          <p className="text-sm text-gray-500">{formData.phoneNumber}</p>
          <p className="text-sm text-gray-500 mt-2">{formData.address}</p>
          <p className="text-sm text-purple-600 mt-2">{formData.deliveryMethod.name}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center">
            <img
              src={formData.paymentMethod.icon}
              alt={formData.paymentMethod.name}
              className="h-8"
            />
            <span className="ml-3 text-sm text-gray-900">{formData.paymentMethod.name}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        {renderStepIndicator()}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {currentStep === 'delivery' && renderDeliveryStep()}
          {currentStep === 'payment' && renderPaymentStep()}
          {currentStep === 'review' && renderReviewStep()}
        </div>

        <div className="flex justify-between">
          {currentStep !== 'delivery' && (
            <button
              onClick={handleBack}
              className="px-6 py-2 text-gray-600 hover:text-gray-900"
            >
              Back
            </button>
          )}
          <button
            onClick={handleContinue}
            className="ml-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            {currentStep === 'review' ? 'Place Order' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};
