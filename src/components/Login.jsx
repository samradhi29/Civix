import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import MinimalBG from './MinimalBG'; // Assuming this component exists
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // THIS FUNCTIONALITY IS UNCHANGED
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, message } = response.data; // Note: 'message' was undefined in original code

      const decoded = jwtDecode(token);
      console.log("Logged in as:", decoded.role);
      localStorage.setItem("token", token);
      toast.success(message || "Login successful");
      if (decoded.role === "admin") {
        window.location.href = "/admin/dashboard";
      } else {
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  // THIS LOGIC IS UNCHANGED
  const handlePasswordBlur = () => {
    setTimeout(() => {
      if (!isHovered) setIsIconVisible(false);
    }, 100);
  };
  
  // buttonStyle object is now replaced with Tailwind classes

  return (
    // Replaced style={{ position: 'relative', overflow: 'hidden' }}
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-50">
      <MinimalBG />

      {/* Replaced style={{ zIndex: 1 }} */}
      <div className="absolute z-10 auth-image login-image"></div>
      
      {/* Replaced style={{ zIndex: 1 }} and added card styling */}
      <div className="relative z-10 w-full max-w-sm p-8 space-y-4 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mb-4 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          
          {/* Replaced style={{ position: 'relative' }} */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
              setIsHovered(false);
              if (!document.activeElement.classList.contains('password-input')) {
                setIsIconVisible(false);
              }
            }}
          >
            <input
              type={showPassword ? 'text' : 'password'}
              className="w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-md password-input focus:outline-none focus:ring-1 focus:ring-green-500"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value !== '') setIsIconVisible(true);
              }}
              onFocus={() => {
                if (password !== '') setIsIconVisible(true);
              }}
              onBlur={handlePasswordBlur} // Using the named function here
              required
              // Replaced style={{ paddingRight: '40px' }}
              style={{ paddingRight: '40px' }} // Kept inline style here as it is dependent on icon size
            />

            {isIconVisible && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                // Replaced inline style object with Tailwind classes
                className="absolute text-gray-500 transform -translate-y-1/2 cursor-pointer select-none top-1/2 right-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>

          {/* Replaced style={{ display: 'flex', ... }} */}
          <div className="flex flex-col gap-3 mt-5">
            <button
              type="submit"
              // Translated `buttonStyle` to Tailwind classes
              className="w-full px-5 py-3 text-base font-bold text-white bg-green-600 border border-transparent rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-green-700"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              // Translated `buttonStyle` and override styles to Tailwind classes
              className="w-full px-5 py-3 text-base font-bold text-gray-800 bg-gray-200 border border-transparent rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-300"
            >
              Return to Home
            </button>
          </div>
        </form>
        
        {/* Replaced style={{ color: 'red' }} */}
        {error && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}

        <p className="text-sm text-center text-gray-600">
          Don't have an account? <Link to="/signup" className="font-medium text-green-600 hover:underline">Sign up</Link>
        </p>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="toast-body custom-toast-shadow"
        bodyClassName="text-sm font-medium"
      />
    </div>
  );
};

export default Login;
