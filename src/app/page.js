"use client"
import { useState, useEffect } from 'react';
import useUserStore from '../app/store/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const { login, isLoggedIn } = useUserStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home'); // Redirect to home if already logged in
    }
  }, [isLoggedIn, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      setLoading(false);
      return;
    }

    try {
      // Simulate the login process with the stored user data
      const user = { email: formData.email, password: formData.password };
      login(user); // You should ideally be interacting with an API for authentication
      console.log('User logged in:', user);
      
      // Redirect to home page after successful login
      router.push('/home');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-black p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-white-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-2 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500'} text-white rounded-lg w-full`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div>
            <p className="text-center mt-4">Don't have an account? <Link href="/signup" className="text-blue-500">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}
