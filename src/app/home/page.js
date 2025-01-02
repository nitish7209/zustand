"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useUserStore from '../store/store'; // Assuming the store is where user data is stored

export default function Home() {
  const router = useRouter();
  const { user, logout } = useUserStore(); // Assuming Zustand store is being used for user data management
  const [storedUser, setStoredUser] = useState(null);

  // Load user data from localStorage or Zustand when the component mounts
  useEffect(() => {
    // If you're using Zustand to store the user data
    if (user) {
      setStoredUser(user);
    } else {
      // Alternatively, if you want to read from localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        setStoredUser(JSON.parse(userData));
      } else {
        // If no user data, redirect to login
        router.push('/');
      }
    }
  }, [user, router]);

  const handleLogout = () => {
    logout(); // Clear Zustand store
    localStorage.removeItem('user'); // Optionally, clear localStorage
    router.push('/'); // Redirect to login page
  };

  if (!storedUser) return <div>Loading...</div>; // Display a loading message while waiting for user data

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-black p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome to Your Dashboard</h2>

        <div className="space-y-4 text-center">
          <p className="text-lg">Name: {storedUser.name}</p>
          <p className="text-lg">Email: {storedUser.email}</p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-black rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
