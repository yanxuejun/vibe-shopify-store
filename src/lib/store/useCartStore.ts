import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type CartItem = {
    id: string;
    variantId: string;
    quantity: number;
    title: string;
    handle: string;
    price: string;
    currencyCode: string;
    image: string;
    options: { name: string; value: string }[];
};

interface CartState {
    cartId: string | null;
    items: CartItem[];
    isOpen: boolean;
    setCartId: (id: string) => void;
    setItems: (items: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    toggleCart: (open?: boolean) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cartId: null,
            items: [],
            isOpen: false,
            setCartId: (id) => set({ cartId: id }),
            setItems: (items) => set({ items }),
            addItem: (item) =>
                set((state) => {
                    const existingItem = state.items.find((i) => i.variantId === item.variantId);
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.variantId === item.variantId ? { ...i, quantity: i.quantity + item.quantity } : i
                            ),
                            isOpen: true
                        };
                    }
                    return { items: [...state.items, item], isOpen: true };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id)
                })),
            updateQuantity: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id ? { ...item, quantity } : item
                    )
                })),
            toggleCart: (open) =>
                set((state) => ({
                    isOpen: typeof open === 'boolean' ? open : !state.isOpen
                })),
            clearCart: () => set({ items: [], cartId: null })
        }),
        {
            name: 'vibe-cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cartId: state.cartId, items: state.items })
        }
    )
);
