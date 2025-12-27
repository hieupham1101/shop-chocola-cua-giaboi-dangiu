import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/lib/data';

export interface CartItem {
    id: string;
    slug: string;
    name: string;
    price: number;
    imageSrc: string;
    qty: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, qty?: number) => void;
    removeItem: (id: string) => void;
    updateQty: (id: string, qty: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (product, qty = 1) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, qty: item.qty + qty }
                                : item
                        ),
                        isOpen: true, // Open cart when adding
                    });
                } else {
                    set({
                        items: [
                            ...items,
                            {
                                id: product.id,
                                slug: product.slug,
                                name: product.name,
                                price: product.price,
                                imageSrc: product.imageSrc,
                                qty,
                            },
                        ],
                        isOpen: true,
                    });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((item) => item.id !== id) });
            },

            updateQty: (id, qty) => {
                if (qty < 1) {
                    // If qty becomes 0, usually we remove or keep at 1. keeping at 1 is safer, remove via separate button.
                    // actually user requested setQty, let's allow 0 to remove? No, standard is 1.
                    return;
                }
                set({
                    items: get().items.map((item) =>
                        item.id === id ? { ...item, qty } : item
                    ),
                });
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'cart-storage',
            // We don't persist 'isOpen' usually
            partialize: (state) => ({ items: state.items }),
        }
    )
);

export const useCartTotals = () => {
    const items = useCartStore(state => state.items);
    const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
    const itemCount = items.reduce((acc, item) => acc + item.qty, 0);
    return { subtotal, itemCount };
}
