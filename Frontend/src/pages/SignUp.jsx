import { Link } from 'react-router-dom';
import { User, Mail, Lock, Link } from 'lucide-react';

const Signup = () => {
  return (
    // Main Container
    <div className="min-h-screen w-screen bg-linear-to-br from-blue-50 to-blue-100 flex flex-col justify-center items-center relative overflow-hidden font-sans">
      
      {/* Background Decorative Circles (Bottom Right) */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-2xl pointer-events-none translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300/30 rounded-full blur-xl pointer-events-none"></div>

      {/* Brand Logo (Top Left) */}
      <div className="absolute top-6 left-6 flex cursor-pointer">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-white font-bold text-2xl relative overflow-hidden">
          H
          <div className="absolute top-0 right-0 w-4 h-4 bg-white opacity-20 rounded-bl-full"></div>
        </div>
        <span className="text-2xl font-bold text-gray-800 tracking-tight">
          Health<span className="text-blue-600">Buddy</span>
        </span>
      </div>

      {/* Card Container */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-blue-500">Sign Up</h1>
          </div>

          {/* Form */}
          <form className="space-y-5">
            
            {/* Full Name Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Terms Text */}
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              People who use our service may have uploaded your contact information to HealthBuddy. <a href="#" className="text-blue-600 hover:underline">Learn More</a>
              <br /><br />
              By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms</a>, <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-600 hover:underline">Cookies Policy</a>.
            </p>

            {/* Submit Button */}
            <button
              type="button"
              className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]"
            >
              Sign Up
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
