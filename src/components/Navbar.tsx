import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, User, LogOut, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { state } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-purple-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Rhea's Mystery Sack PH</span>
              <span className="text-xl font-bold text-gray-900 sm:hidden">RMS PH</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="text-gray-700 hover:text-purple-600">
                  <User className="h-6 w-6" />
                </Link>
                {user.role !== 'admin' && (
                  <Link to="/cart" className="relative">
                    <ShoppingBag className="h-6 w-6 text-gray-700 hover:text-purple-600" />
                    {state.items.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {state.items.length}
                      </span>
                    )}
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-purple-600"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {user && user.role !== 'admin' && (
              <Link to="/cart" className="relative mr-4">
                <ShoppingBag className="h-6 w-6 text-gray-700" />
                {state.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {state.items.length}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg z-50">
          <div className="px-4 py-2 space-y-2">
            {user ? (
              <>
                <Link
                  to={user.role === 'admin' ? '/admin' : '/profile'}
                  className="block py-2 text-gray-700 hover:text-purple-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-purple-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 text-gray-700 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};