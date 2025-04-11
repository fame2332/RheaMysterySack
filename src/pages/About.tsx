import React from 'react';
import { Package, Heart, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About MysterySack PH</h1>
        <p className="text-xl text-gray-600">Bringing joy through mystery and surprise</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="text-center p-6">
          <Package className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Curated Mystery Boxes</h3>
          <p className="text-gray-600">Each box is carefully curated to provide a unique and exciting experience.</p>
        </div>
        <div className="text-center p-6">
          <Heart className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
          <p className="text-gray-600">We put our heart into selecting items that will bring joy and excitement.</p>
        </div>
        <div className="text-center p-6">
          <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
          <p className="text-gray-600">Only the finest items make it into our mystery sacks.</p>
        </div>
      </div>

      <div className="bg-purple-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          Founded in 2025, MysterySack PH started with a simple idea: to bring joy and excitement 
          through carefully curated mystery boxes. We believe that everyone deserves a little surprise 
          in their life, and what better way to do that than through thoughtfully selected items 
          that cater to different interests and passions?
        </p>
        <p className="text-gray-600">
          Today, we continue to spread happiness one mystery sack at a time, working with local and 
          international brands to bring you the best possible experience. Each box is packed with love 
          and attention to detail, ensuring that every unboxing moment is special.
        </p>
      </div>
    </div>
  );
};