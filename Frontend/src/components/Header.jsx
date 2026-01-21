import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileApi, LogoutApi } from "../Api/AllApi";

const Navbar = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // ✅ store user object

  // Check user login + get user data
  useEffect(() => {
    ProfileApi()
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user); // full user
        }
      })
      .catch(() => setUser(null));
  }, []);

  // Logout handler
  const handleLogout = async () => {
    const res = await LogoutApi();
    if (res?.status === 200) {
      setUser(null);
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
      navigate("/login");
    }
  };

  return (
    <nav className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* ---------- LOGO ---------- */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mr-2">
              H
            </div>
            <span className="text-2xl font-bold text-gray-800">
              Health<span className="text-blue-600">Buddy</span>
            </span>
          </Link>

          {/* ---------- DESKTOP MENU ---------- */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/profileform" className="nav-link">ProfileForm</Link>
            <Link to="/products" className="nav-link">Products</Link>

            {user ? (
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            ) : (
              <Link to="/login" className="nav-link">Login</Link>
            )}

            {/* ---------- PROFILE ICON ---------- */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* ---------- PROFILE DROPDOWN ---------- */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-blue-100 rounded-md shadow-lg overflow-hidden text-center">
  
                    {/* Username */}
                    <div className="px-3 py-4 border-b">
                      <p className="text-sm font-semibold text-gray-800">
                        Hi, {user.username}
                      </p>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full py-3 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ---------- MOBILE HAMBURGER ---------- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
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

      {/* ---------- MOBILE MENU ---------- */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="flex flex-col px-4 py-3 space-y-2">

            {user && (
              <div className="px-3 py-2 text-sm text-gray-600 border-b">
                Hi, <span className="font-semibold">{user.username}</span>
              </div>
            )}

            <Link
              to="/profileform"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
            >
              ProfileForm
            </Link>

            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
            >
              Products
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-red-500 hover:bg-red-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
