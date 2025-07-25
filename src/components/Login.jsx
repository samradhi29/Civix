import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import MinimalBG from './MinimalBG'; // Assuming this component provides the background
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Keeping for potential direct error display if needed
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token, message } = response.data; // Destructure message from response

            const decoded = jwtDecode(token);
            console.log("Logged in as:", decoded.role);
            localStorage.setItem("token", token);
            toast.success(message || "Login successful!"); // Use message from backend or default
            if (decoded.role === "admin") {
                // Using window.location.href for full page reload for admin dashboard
                // This ensures the entire app state is reset, which might be desired for admin
                window.location.href = "/admin/dashboard";
            } else {
                navigate("/home"); // Use navigate for client-side routing for regular users
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error); // Display specific error from backend
                setError(error.response.data.error); // Also set local error state
            } else {
                toast.error("Login failed. Please try again."); // Generic error message
                setError("Login failed. Please try again."); // Also set local error state
            }
        }
    };

    // Logic to hide eye icon on blur only if not hovered
    const handlePasswordBlur = () => {
        setTimeout(() => {
            if (!isHovered) setIsIconVisible(false);
        }, 100); // Delay so icon doesn't vanish before hover is triggered
    };

    return (
        // Main container: full screen, flexbox for centering, relative for background
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-100 font-inter">
            {/* MinimalBG component for background - ensure it covers the full area */}
            <MinimalBG />

            {/* Login Form Container: styled as a card */}
            <div className="relative z-10 w-full max-w-md rounded-xl bg-white p-8 shadow-2xl md:p-10">
                <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input Field */}
                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email" // Changed to type="email" for better validation
                            id="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                        />
                    </div>

                    {/* Password Input Field with Toggle */}
                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div
                            className="relative"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => {
                                setIsHovered(false);
                                // Only hide if input is not focused AND not hovered
                                if (document.activeElement.id !== 'password') {
                                    setIsIconVisible(false);
                                }
                            }}
                        >
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    // Show icon if password field is not empty
                                    setIsIconVisible(e.target.value !== '');
                                }}
                                onFocus={() => {
                                    // Show icon on focus if password field is not empty
                                    if (password !== '') setIsIconVisible(true);
                                }}
                                onBlur={handlePasswordBlur} // Use the dedicated blur handler
                                required
                                className="w-full rounded-lg border border-gray-300 p-3 pr-10 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                            />
                            {isIconVisible && (
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-green-600 px-5 py-3 text-lg font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full rounded-lg bg-gray-200 px-5 py-3 text-lg font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        >
                            Return to Home
                        </button>
                    </div>
                </form>

                {/* Error Message Display */}
                {error && (
                    <p className="mt-4 text-center text-sm font-medium text-red-600">{error}</p>
                )}

                {/* Sign Up Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-semibold text-green-600 hover:text-green-700 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
                position="bottom-right" // Changed position for better visibility
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" // Changed theme for more modern look
                toastClassName="rounded-lg shadow-lg" // Apply Tailwind classes to toast itself
                bodyClassName="text-sm font-medium" // Apply Tailwind classes to toast body
            />
        </div>
    );
};

export default Login;
