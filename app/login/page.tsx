'use client';
import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === 'user@example.com' && password === 'password123') {
      setIsSuccess(true);
      setErrorMessage('');
    } else {
      setIsSuccess(false);
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-17rem)] justify-center items-center">
      <div className="max-w-[400px] w-full bg-white p-6 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        {isSuccess && (
          <p className="bg-green-500 text-white p-3 rounded-md mb-4 text-center">
            Login successful!
          </p>
        )}
        {errorMessage && (
          <p className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <div className="flex items-center border rounded-md mt-1">
              <FaUser className="text-gray-400 mx-2" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full p-2 border-none focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <div className="flex items-center border rounded-md mt-1">
              <FaLock className="text-gray-400 mx-2" />
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full p-2 border-none focus:outline-none focus:ring"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#1563B2] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-[#1563B2] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
