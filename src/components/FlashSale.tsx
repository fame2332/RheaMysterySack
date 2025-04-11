import React from 'react';
import { Zap, Timer } from 'lucide-react';
import { FlashSale as FlashSaleType, Product } from '../types';
import { ProductCard } from './ProductCard';

interface FlashSaleProps {
  sale: FlashSaleType;
  products: Product[];
}

export const FlashSale: React.FC<FlashSaleProps> = ({ sale, products }) => {
  const [timeLeft, setTimeLeft] = React.useState('');

  React.useEffect(() => {
    const updateTimer = () => {
      const end = new Date(sale.endTime).getTime();
      const now = new Date().getTime();
      const diff = end - now;

      if (diff <= 0) {
        setTimeLeft('Ended');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [sale.endTime]);

  const saleProducts = products.filter(product => 
    sale.products.some(sp => sp.productId === product.id)
  );

  return (
    <div className="bg-red-50 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900">{sale.name}</h2>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg">
          <Timer className="h-5 w-5 text-red-500" />
          <span className="text-red-500 font-semibold">{timeLeft}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {saleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};