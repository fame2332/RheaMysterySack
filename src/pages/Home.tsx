import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';

const HERO_IMAGES = [
  { url: "/images/Rhea1.png" },
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'collectibles', name: 'Collectibles' },
  { id: 'gadgets', name: 'Gadgets' },
  { id: 'beauty', name: 'Beauty' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'toys', name: 'Toys' },
  { id: 'stationery', name: 'Stationery' },
  { id: 'home', name: 'Home & Living' }
];

const priceRanges = [
  { id: 'all', name: 'All Prices' },
  { id: '0-500', name: 'Under ₱500' },
  { id: '500-1000', name: 'Under ₱1,000' },
  { id: '1000-2000', name: '₱1,000 - ₱2,000' },
  { id: '2000+', name: 'Over ₱2,000' }
];

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'TBTIC for ios iPadmini Air pro case IP10,10.9',
    description: 'Authentic collectible figure from a premium Japanese mystery box. Perfect condition with original packaging.',
    price: 250,
    imageUrl: '/images/IPADMINIPRO.jpg',
    category: 'collectibles',
    code: 'COL001',
    stock: 1,
    rating: 4.8,
    reviewCount: 12,
    tags: ['collectibles', 'anime', 'figure'],
    soldCount: 0,
    isOnSale: true,
    saleEnds: new Date(Date.now() + 3600000 * 2).toISOString(),
    originalPrice: 600
  },
  {
    id: '2',
    name: 'Safety Shoes',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 600,
    imageUrl: '/images/SAFETYSHOES.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '3',
    name: 'Flare S7',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 1500,
    imageUrl: '/images/Flare S7.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '4',
    name: ' Shoes',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 500,
    imageUrl: '/images/Shoes.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '5',
    name: 'Suomy',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 250,
    imageUrl: '/images/suomy.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '6',
    name: 'Flashchager VIVO 120 W',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 350,
    imageUrl: '/images/flashchager.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '7',
    name: 'Professional Tailors',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 300,
    imageUrl: '/images/ProfessionalTailors.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  },
  {
    id: '8',
    name: 'Rotonoa Zoro',
    description: 'Stylish crossbody bag from a luxury mystery box. Like-new condition with dust bag included.',
    price: 400,
    imageUrl: '/images/Rotonoa Zoro.jpg',
    category: 'accessories',
    code: 'ACC001',
    stock: 1,
    rating: 4.7,
    reviewCount: 8,
    tags: ['accessories', 'bags', 'fashion'],
    soldCount: 0
  }
];

export const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  };

  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      let matchesPrice = true;
      if (selectedPriceRange !== 'all') {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        if (max) {
          matchesPrice = product.price >= min && product.price < max;
        } else {
          matchesPrice = product.price >= min;
        }
      }
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, selectedPriceRange]);

  return (
    <div>
      <div className="relative w-[1200px] h-[360px] mx-auto overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {HERO_IMAGES.map((image, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 relative">
              <img
                src={image.url}
                alt={`Hero ${index + 1}`}
                className="w-[1200px] h-[360px] object-cover"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handlePrevImage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full hover:bg-white"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-purple-900" />
        </button>
        <button
          onClick={handleNextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1 sm:p-2 rounded-full hover:bg-white"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-purple-900" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search mystery boxes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 md:hidden"
          >
            <Filter className="h-5 w-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4 md:space-y-0 md:flex md:items-center md:gap-4`}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {priceRanges.map(range => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};