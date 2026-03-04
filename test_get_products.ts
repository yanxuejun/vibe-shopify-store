
import { getProducts } from './src/lib/shopify/index.js'; // I'll use the .js because searching might be needed.
// Wait, I am running from the root, but the file is .ts.

import { getProducts } from './src/lib/shopify/index.ts';

async function run() {
    process.env.SHOPIFY_STORE_DOMAIN = "olaitems.myshopify.com";
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = "bba2dc11cd2e0c51032055f27b09d953";

    try {
        const products = await getProducts();
        products.slice(0, 3).forEach((p, i) => {
            console.log(`Product ${i + 1}: ${p.title} - ${p.priceRange.minVariantPrice.amount} ${p.priceRange.minVariantPrice.currencyCode}`);
        });
    } catch (e) {
        console.error(e);
    }
}
run();
