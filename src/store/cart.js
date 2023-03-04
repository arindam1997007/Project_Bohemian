import create from "zustand"

export const useCartStore = create((set) => ({
  cartItems: [],
  homepageItems: [],
  addToCart: (item) =>
    set((state) => ({ cartItems: [...state.cartItems, item] })),
  removeFromCart: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }))
  },
  emptyCart: () => {
    set({ cartItems: [] })
  },
  addToHomepageItems: (items) => set({ homepageItems: items }),
}))
