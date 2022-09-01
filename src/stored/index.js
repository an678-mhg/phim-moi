import create from "zustand";

export const useStore = create((set) => ({
  user: undefined,
  favoriteList: [],
  loading: false,
  setUser: (newUser) =>
    set({
      user: newUser,
    }),
  setFavoriteList: (newList) =>
    set({
      favoriteList: newList,
    }),
  setLoading: (newStatus) => set({ loading: newStatus }),
}));
