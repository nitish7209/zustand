"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "../store/store"; // Assuming the store is where user data is stored

export default function Home() {
  const router = useRouter();
  const { user, isLoggedIn, logout, initializeUser } = useUserStore(); // Zustand store hooks
  const [storedUser, setStoredUser] = useState(null);

  // Initialize Zustand state when the component mounts
  useEffect(() => {
    initializeUser(); // Load user from localStorage into Zustand state
  }, [initializeUser]);

  // Watch for Zustand store updates
  useEffect(() => {
    if (user) {
      setStoredUser(user);
    } else if (!isLoggedIn) {
      // If not logged in, redirect to login page
      router.push("/");
    }
  }, [user, isLoggedIn, router]);

  const handleLogout = () => {
    logout(); // Clear Zustand store
    router.push("/"); // Redirect to login page
  };

  if (!storedUser) return <div>Loading...</div>; // Display a loading message while waiting for user data

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-black p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Welcome to Your Dashboard
        </h2>

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
