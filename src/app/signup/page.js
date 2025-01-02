"use client"
import { useState, useEffect } from 'react';
import useUserStore from '../store/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const { signUp, isLoggedIn } = useUserStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/home');
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

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      // Simulate the sign-up process
      signUp(formData);
      console.log('User signed up:', formData);
      router.push('/login'); // Redirect to login page after successful sign-up
    } catch (err) {
      setError('Sign-up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-black p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-white-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

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
              className="w-full p-3 mt-1 border border-white-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`px-6 py-2 ${loading ? 'bg-white-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500'} text-white rounded-lg w-full`}
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
          <div>
            <p className="text-center mt-4">Already have an account? <Link href="/" className="text-blue-500">Login</Link></p> 
          </div>
        </form>
      </div>
    </div>
  );
}
