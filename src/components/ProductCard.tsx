import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Heart, Star, Timer } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { user, updateProfile } = useAuth();

  const isInWishlist = user?.wishlist?.includes(product.id) ?? false;

  const handleWishlist = async () => {
    if (!user) return;

    const newWishlist = isInWishlist
      ? user.wishlist.filter(id => id !== product.id)
      : [...(user.wishlist || []), product.id];
    
    await updateProfile({ wishlist: newWishlist });
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const formatTimeLeft = (endTime: string) => {
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 relative">
      {product.isOnSale && (
        <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold z-10">
          SALE
        </div>
      )}
      
      {product.originalPrice && (
        <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 text-xs font-bold z-10">
          -{calculateDiscount()}%
        </div>
      )}

      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
          {product.stock < 10 && product.stock > 0 && (
            <div className="absolute bottom-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Only {product.stock} left!
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 sm:p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
            <span className="ml-1 text-xs sm:text-sm">{product.rating?.toFixed(1) || 'N/A'}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-xs text-gray-500">{product.soldCount} sold</span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-base sm:text-lg font-bold text-red-600">₱{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs sm:text-sm text-gray-400 line-through">
              ₱{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {product.isOnSale && product.saleEnds && (
          <div className="flex items-center text-xs text-red-500 mb-2">
            <Timer className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            Ends in {formatTimeLeft(product.saleEnds)}
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={handleWishlist}
            className={`p-1 sm:p-2 rounded-lg transition-colors ${
              isInWishlist 
                ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
            disabled={product.stock === 0}
            className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
            }`}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};