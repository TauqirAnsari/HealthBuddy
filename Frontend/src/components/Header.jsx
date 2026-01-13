import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    // Fixed navbar at the top, full width, with white background and shadow
    <nav className="w-screen bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LEFT SIDE: LOGO --- */}
          <div className="shrink-0 flex items-center cursor-pointer">
            {/* Custom SVG Icon to match the 'H' in the image */}
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-white font-bold text-2xl relative overflow-hidden">
               H
               {/* Decorative faint swoosh */}
               <div className="absolute top-0 right-0 w-4 h-4 bg-white opacity-20 rounded-bl-full"></div>
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">
              Health<span className="text-blue-600">Buddy</span>
            </span>
          </div>

          {/* --- RIGHT SIDE: DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/profileform" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Profile
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Products
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Dashboard
            </Link>
            {/* New Login Option */}
            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Login
            </Link>

            {/* User Icon (🚹 style) with Dropdown */}
            <div className="relative ml-4">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="text-blue-600 hover:text-blue-700 transition-colors focus:outline-none flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-8 w-8" 
                  viewBox="0 0 20 20" 
                  fill="currentcolor"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 origin-top-right z-50">
                  <a 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileOpen(false)} // Close on click
                  >
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* --- MOBILE HAMBURGER BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-100 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              Profile
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              Products
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50">
              Login
            </a>
            
            {/* Mobile Account Section */}
            <div className="border-t border-gray-200 mt-2 pt-2">
                <div className="flex items-center px-3 py-2 text-blue-600 font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    My Account
                </div>
                <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 ml-7">
                  Logout
                </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;