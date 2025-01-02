import { create } from 'zustand'

// Utility to load from localStorage
const loadFromLocalStorage = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
}

const useUserStore = create((set) => ({
  user: loadFromLocalStorage(), // Load user from localStorage if available
  isLoggedIn: loadFromLocalStorage() !== null, // Check if the user is logged in

  // Sign up (Create user)
  signUp: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
    set({ user: userData, isLoggedIn: true });
  },

  // Login (Read user)
  login: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
    set({ user: userData, isLoggedIn: true });
  },

  // Update user data
  updateUser: (newUserData) => {
    const updatedUser = { ...useUserStore.getState().user, ...newUserData };
    localStorage.setItem('user', JSON.stringify(updatedUser)); // Update user in localStorage
    set({ user: updatedUser });
  },

  // Logout (Delete user data from store and localStorage)
  logout: () => {
    localStorage.removeItem('user'); // Remove user from localStorage
    set({ user: null, isLoggedIn: false });
  },
}));

export default useUserStore;
