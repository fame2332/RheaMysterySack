import React from 'react';
import { Facebook, Instagram, Package, Download } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600 text-sm">
              Rhea's Mystery Sack PH offers carefully curated items sourced from authentic mystery boxes.
              Each item is thoroughly inspected and priced based on its condition and value.
            </p>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <img src="/images/Gcash.png" alt="" className="h-8" />
                <span className="text-gray-600"></span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/maya.jpg" alt="" className="h-8" />
                <span className="text-gray-600"></span>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/unionbank.png" alt="" className="h-8" />
                <span className="text-gray-600"></span>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-purple-600">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Download */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Our App</h3>
            <a 
              href="https://play.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <Download className="h-5 w-5" />
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </a>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
          <p>© 2024 Rhea's Mystery Sack PH. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};