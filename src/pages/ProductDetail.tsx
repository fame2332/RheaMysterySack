import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

// This will be replaced with actual API/database call later
const getProduct = (id: string) => {
  const mockProducts = [
    {
      id: '1',
      name: 'TBTIC for ios iPadmini Air pro case IP10,10.9',
      description: 'A curated collection of adventure-themed items that will spark your wanderlust. Each box contains a carefully selected mix of outdoor gear, travel accessories, and surprise items perfect for your next adventure. You might find compact camping tools, travel journals, portable gadgets, or unique items from around the world. Every box is different, making each unboxing a truly exciting experience!',
      price: 250,
      imageUrl: '/images/IPADMINIPRO.jpg',
      category: 'mystery',
      code: 'ADV001',
    },
    {
      id: '2',
      name: 'Safety Shoes',
      description: 'Get excited with a selection of cool tech gadgets and accessories. Each pack includes a mix of innovative tech items, from smart accessories to unique gadgets. You might discover wireless chargers, smart home devices, or the latest tech innovations. Perfect for tech enthusiasts who love surprises!',
      price: 2499,
      imageUrl: '/images/SAFETYSHOES.jpg',
      category: 'tech',
      code: 'TECH001',
    },
    {
      id: '3',
      name: 'Flare S7',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 1500,
      imageUrl: '/images/Flare S7.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
    {
      id: '4',
      name: 'Shoes',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 500,
      imageUrl: '/images/Shoes.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
    {
      id: '5',
      name: 'Suomy',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 250,
      imageUrl: '/images/suomy.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
    {
      id: '6',
      name: 'Flashchager VIVO 120 W',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 350,
      imageUrl: '/images/flashchager.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
    {
      id: '7',
      name: 'Professional Tailors',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 300,
      imageUrl: '/images/ProfessionalTailors.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
    {
      id: '8',
      name: 'Rotonoa Zoro',
      description: 'Self-care items carefully selected to help you relax and rejuvenate. This bundle includes premium wellness products, from aromatherapy items to natural skincare products. Each box is thoughtfully curated to provide a complete self-care experience.',
      price: 400,
      imageUrl: '/images/Rotonoa Zoro.jpg',
      category: 'wellness',
      code: 'WELL001',
    },
  ];
  return mockProducts.find(p => p.id === id);
};

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const product = getProduct(id || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg object-cover aspect-square"
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="text-sm font-medium text-gray-600">Code: {product.code}</span>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-purple-600">₱{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-500">Free shipping</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gray-100 text-gray-900 px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};