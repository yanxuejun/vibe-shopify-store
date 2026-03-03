import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify/types";

export const runtime = 'edge';

// Mock data for demonstration when Shopify credentials are not set
const MOCK_PRODUCTS: ShopifyProduct[] = [
  {
    id: "1",
    title: "Premium Essential Tee",
    handle: "essential-tee",
    description: "Our signature tee, redesigned for 2024.",
    images: {
      edges: [{ node: { url: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop", altText: "Tee" } }]
    },
    priceRange: { minVariantPrice: { amount: "45.00", currencyCode: "USD" } }
  },
  {
    id: "2",
    title: "Minimalist Watch",
    handle: "minimalist-watch",
    description: "Timeless design for the modern era.",
    images: {
      edges: [{ node: { url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop", altText: "Watch" } }]
    },
    priceRange: { minVariantPrice: { amount: "180.00", currencyCode: "USD" } }
  },
  {
    id: "3",
    title: "Classic Leather Totebag",
    handle: "leather-tote",
    description: "Spacious and elegant leather tote.",
    images: {
      edges: [{ node: { url: "https://images.unsplash.com/photo-1584917033904-491a84b2efbd?q=80&w=1000&auto=format&fit=crop", altText: "Tote" } }]
    },
    priceRange: { minVariantPrice: { amount: "120.00", currencyCode: "USD" } }
  },
  {
    id: "4",
    title: "Utility Backpack",
    handle: "utility-backpack",
    description: "Everything you need, everywhere you go.",
    images: {
      edges: [{ node: { url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop", altText: "Backpack" } }]
    },
    priceRange: { minVariantPrice: { amount: "85.00", currencyCode: "USD" } }
  }
];

export default async function Home() {
  console.log('[Home] Rendering page...');
  let products: ShopifyProduct[] = [];

  try {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    console.log(`[Home] Shopify Domain: ${domain || 'not set'}`);

    // Only attempt to fetch if domain is set and matched
    if (domain && domain !== 'your-store.myshopify.com') {
      console.log('[Home] Fetching real products from Shopify...');
      products = await getProducts();
      console.log(`[Home] Successfully fetched ${products.length} products.`);
    } else {
      console.log('[Home] Using mock products (Shopify not configured).');
      products = MOCK_PRODUCTS;
    }
  } catch (error: any) {
    console.error("[Home] Failed to fetch products:", error.message || error);
    products = MOCK_PRODUCTS;
  }

  return (
    <div className="flex flex-col gap-16 pb-24">
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-black">New Arrivals</h2>
            <p className="mt-2 text-gray-500">The latest pieces from our studio.</p>
          </div>
          <a href="/search" className="text-sm font-semibold text-black hover:underline underline-offset-4">
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-zinc-900 py-24 text-white overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">The Quality Manifesto</h2>
            <p className="mt-6 text-lg text-zinc-400 capitalize">
              Sustainability isn't just a buzzword for us. It's the core of every stitch, every curve, and every material we source.
            </p>
            <button className="mt-10 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors">
              Learn Our Process
            </button>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-zinc-800/50 -rotate-12 translate-x-12 blur-3xl" />
      </section>
    </div>
  );
}
