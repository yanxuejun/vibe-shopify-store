'use server';

import { createCart, addToCart } from './index';
import { CartItem } from '../store/useCartStore';

export async function createCartAction() {
    return await createCart();
}

export async function getCheckoutUrl(cartId: string | null, items: CartItem[]) {
    if (!items.length) return null;

    try {
        let currentCartId = cartId;

        // If no cart ID, create one
        if (!currentCartId) {
            const cart = await createCart();
            currentCartId = cart.id;
        }

        // Prepare lines for Shopify
        const lines = items.map((item) => ({
            merchandiseId: item.variantId,
            quantity: item.quantity
        }));

        // In a real flow, we'd sync the local cart to the Shopify cart ID
        // Since we are doing a "Complete Flow", let's just create a fresh cart with these items
        // and return the checkout URL. This is the simplest way to ensure reliability.
        const cart = await addToCart(currentCartId, lines);

        return cart.checkoutUrl;
    } catch (error) {
        console.error('[Shopify Actions] Checkout Error:', error);

        // Fallback: If cartId was invalid/expired, try creating a fresh one
        try {
            const cart = await createCart();
            const freshCart = await addToCart(cart.id, items.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity })));
            return freshCart.checkoutUrl;
        } catch (innerError) {
            console.error('[Shopify Actions] Critical Checkout Error:', innerError);
            return null;
        }
    }
}
