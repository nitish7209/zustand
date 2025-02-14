import { create } from 'zustand';

// Utility to safely load from localStorage only on the client-side
const loadFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const useUserStore = create((set) => ({
  user: null, // Initial state is null to avoid SSR issues
  isLoggedIn: false, // Default to not logged in

  // Initialize the state from localStorage on the client side
  initializeUser: () => {
    const user = loadFromLocalStorage();
    set({ user, isLoggedIn: !!user });
  },

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
