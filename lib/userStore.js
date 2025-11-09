import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      
      user: null,

      
      setUser: (userData) => set({ user: userData }),

      
      updateProfile: (updatedData) =>
        set((state) => ({
          user: { ...state.user, ...updatedData },
        })),

      
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key name in localStorage
    }
  )
);
