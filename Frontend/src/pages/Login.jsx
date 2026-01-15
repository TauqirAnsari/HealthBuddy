import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { LoginApi } from '../Api/AllApi';

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnLogin = async (e) => {
    e.preventDefault();
    try{
        if(!email || !password) {
          alert("Please fill all the fields");
          return; 
        }
        const res = await LoginApi({ email, password });
        if(res.status === 200) {
          alert(res.data.message);
          navigate('/');
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      } finally {
        setLoading(false);
      } 

  };


  return (
    <div className="relative min-h-screen w-screen bg-linear-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4 overflow-hidden font-sans">

      {/* Background Decorative Circles (Bottom Right) */}
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 rounded-full blur-2xl pointer-events-none translate-x-1/4 translate-y-1/4"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300/30 rounded-full blur-xl pointer-events-none"></div>

      {/* Logo */}

      <Link to="/" >
        <div className="absolute top-6 left-6 flex cursor-pointer">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-2 text-white font-bold text-2xl relative overflow-hidden">
            H
            <div className="absolute top-0 right-0 w-4 h-4 bg-white opacity-20 rounded-bl-full"></div>
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            Health<span className="text-blue-600">Buddy</span>
          </span>
        </div>
      </Link>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm min-h-130 bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 md:p-10">

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-blue-500">Welcome Back</h2>
        </div>

        <form className="space-y-5" onSubmit={handleOnLogin}>

          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white focus:shadow-md outline-none transition-all placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full pl-10 pr-12 py-3 bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-400 focus:bg-white focus:shadow-md outline-none transition-all placeholder-gray-400"
            />

            {/* Toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center bg-gray-200 text-gray-400 hover:text-blue-500"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            onClick={handleOnLogin}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 py-3 mt-10 rounded-xl font-medium text-white transition-all
              ${loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]"
              }`}
          >
            {loading && <Loader2 className="animate-spin" size={18} />}
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Forgot */}
          <div className="text-center">
            <a href="#" className="text-sm text-blue-500 hover:text-blue-600 font-medium">
              Forgot password?
            </a>
          </div>
        </form>

        {/* Signup */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
