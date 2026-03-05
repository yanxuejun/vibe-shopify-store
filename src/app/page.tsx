import Image from "next/image";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/shopify";
import { ShopifyProduct } from "@/lib/shopify/types";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const MOCK_PRODUCTS: Partial<ShopifyProduct>[] = [
  {
    id: "1",
    title: "Minimalist Linen Shell",
    handle: "linen-shell",
    images: {
      edges: [
        { node: { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", altText: "Shell" } },
        { node: { url: "https://images.unsplash.com/photo-1594633312370-9689876793a0?q=80&w=1000&auto=format&fit=crop", altText: "Shell Detail" } }
      ]
    },
    priceRange: { minVariantPrice: { amount: "120.00", currencyCode: "USD" }, maxVariantPrice: { amount: "120.00", currencyCode: "USD" } }
  },
  {
    id: "2",
    title: "Textured Wool Trousers",
    handle: "wool-trousers",
    images: {
      edges: [
        { node: { url: "https://images.unsplash.com/photo-1594633313207-6bb30983637e?q=80&w=1000&auto=format&fit=crop", altText: "Trousers" } },
        { node: { url: "https://images.unsplash.com/photo-1594633313410-d39d914d86b9?q=80&w=1000&auto=format&fit=crop", altText: "Trousers Detail" } }
      ]
    },
    priceRange: { minVariantPrice: { amount: "210.00", currencyCode: "USD" }, maxVariantPrice: { amount: "210.00", currencyCode: "USD" } }
  },
  {
    id: "3",
    title: "Raw Silk Slip Dress",
    handle: "silk-dress",
    images: {
      edges: [
        { node: { url: "https://images.unsplash.com/photo-1594633313589-3286dc538466?q=80&w=1000&auto=format&fit=crop", altText: "Dress" } },
        { node: { url: "https://images.unsplash.com/photo-1594633313884-3f41ff91999b?q=80&w=1000&auto=format&fit=crop", altText: "Dress Detail" } }
      ]
    },
    priceRange: { minVariantPrice: { amount: "320.00", currencyCode: "USD" }, maxVariantPrice: { amount: "320.00", currencyCode: "USD" } }
  },
  {
    id: "4",
    title: "Oatmeal Knit Cardigan",
    handle: "knit-cardigan",
    images: {
      edges: [
        { node: { url: "https://images.unsplash.com/photo-1594633314115-3283286dc538?q=80&w=1000&auto=format&fit=crop", altText: "Knit" } },
        { node: { url: "https://images.unsplash.com/photo-1594633314488-3f41ff91999b?q=80&w=1000&auto=format&fit=crop", altText: "Knit Detail" } }
      ]
    },
    priceRange: { minVariantPrice: { amount: "185.00", currencyCode: "USD" }, maxVariantPrice: { amount: "185.00", currencyCode: "USD" } }
  }
];

export default async function Home() {
  let products: ShopifyProduct[] = [];

  try {
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    if (domain && domain !== 'your-store.myshopify.com' && !domain.includes('undefined')) {
      products = await getProducts();
    } else {
      products = MOCK_PRODUCTS as ShopifyProduct[];
    }
  } catch (error) {
    console.error("[Home] Error:", error);
    products = MOCK_PRODUCTS as ShopifyProduct[];
  }

  return (
    <div className="flex flex-col gap-24 pb-24">
      <Hero />

      {/* Product Grid */}
      <section className="container mx-auto px-6">
        <header className="mb-16 flex flex-col items-center">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 mb-4">Latest Release</h2>
          <p className="text-3xl font-extralight uppercase tracking-widest text-center max-w-2xl px-4">
            A Curated collection of minimalist textures for refined spaces and modern living.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <footer className="mt-16 flex justify-center">
          <a href="/search/all" className="text-[10px] font-bold uppercase tracking-[0.3em] border-b border-foreground pb-2 hover:opacity-60 transition-opacity">
            Discover Full Collection
          </a>
        </footer>
      </section>

      {/* Manifesto */}
      <section className="bg-[#F3F2F0] py-48 px-6 overflow-hidden">
        <div className="container mx-auto flex flex-col items-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/40 mb-12">THE MANIFESTO</span>
          <h2 className="text-4xl md:text-7xl font-extralight uppercase tracking-[0.1em] leading-tight max-w-5xl mb-12 italic">
            &quot;WE BELIEVE IN THE SILENT POWER OF REFINED TEXTURES AND MINIMALIST FORM.&quot;
          </h2>
          <div className="w-px h-24 bg-foreground/20 mb-12" />
          <p className="text-xs uppercase tracking-[0.2em] font-medium text-foreground/60 max-w-xl leading-loose">
            Every piece is thoughtfully designed to harmonize with your environment, emphasizing quality of material over complexity of design.
          </p>
          <button className="mt-12 text-[10px] font-bold uppercase tracking-[0.3em] bg-foreground text-background px-12 py-5 hover:bg-foreground/90 transition-colors">
            Our Philosophy
          </button>
        </div>
      </section>

      {/* Secondary Grid */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative aspect-[4/5] bg-[#F3F2F0]">
            <Image
              src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80"
              alt="Texture"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div className="space-y-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40">The Process</span>
            <h3 className="text-4xl font-extralight uppercase tracking-widest leading-snug">Sustainable by Nature, Refined by Hand.</h3>
            <p className="text-sm font-medium text-foreground/60 leading-relaxed uppercase tracking-tighter">
              Our materials are sourced from eco-conscious suppliers, ensuring that the touch of the fabric is as kind to the earth as it is to your skin.
            </p>
            <a href="/about" className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] border-b border-foreground pb-2">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
