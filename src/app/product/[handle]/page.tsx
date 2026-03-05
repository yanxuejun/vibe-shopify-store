import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProduct, getProducts } from '@/lib/shopify';
import AddToCart from './AddToCart';
import { ShopifyProduct } from '@/lib/shopify/types';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const product = await getProduct(handle).catch(() => null);
    if (!product) return {};
    return {
        title: `${product.title} | VIBE FABRIC`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    let product: ShopifyProduct | null = null;

    // Check if we are using the real store or the mock
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    if (domain && domain !== 'your-store.myshopify.com' && !domain.includes('undefined')) {
        try {
            product = await getProduct(handle);
        } catch (error) {
            console.error('[ProductPage] Error:', error);
        }
    } else {
        // Find in mock products if API is not available
        product = {
            id: `mock-${handle}`,
            title: handle.replace('-', ' ').toUpperCase(),
            handle: handle,
            description: "A beautiful minimalist texture. " + handle.replace('-', ' ') + ".",
            descriptionHtml: "<p>A beautiful minimalist texture.</p>",
            availableForSale: true,
            featuredImage: { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80", altText: "Fabric" },
            images: {
                edges: [
                    { node: { url: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop", altText: "Primary" } },
                    { node: { url: "https://images.unsplash.com/photo-1594633312370-9689876793a0?q=80&w=1000&auto=format&fit=crop", altText: "Detail" } }
                ]
            },
            priceRange: { minVariantPrice: { amount: "120.00", currencyCode: "USD" }, maxVariantPrice: { amount: "120.00", currencyCode: "USD" } },
            options: [
                { id: "opt-1", name: "Size", values: ["S", "M", "L"] }
            ],
            variants: {
                edges: [
                    { node: { id: `mock-${handle}-S`, title: "S", price: { amount: "120.00", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Size", value: "S" }] } },
                    { node: { id: `mock-${handle}-M`, title: "M", price: { amount: "120.00", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Size", value: "M" }] } },
                    { node: { id: `mock-${handle}-L`, title: "L", price: { amount: "120.00", currencyCode: "USD" }, availableForSale: true, selectedOptions: [{ name: "Size", value: "L" }] } },
                ]
            }
        } as ShopifyProduct;

        // Let's actually check if it was in the Home mocks to make it realistic
        if (handle === 'linen-shell') product.title = 'Minimalist Linen Shell';
        else if (handle === 'wool-trousers') product.title = 'Textured Wool Trousers';
        else if (handle === 'silk-dress') product.title = 'Raw Silk Slip Dress';
        else if (handle === 'knit-cardigan') product.title = 'Oatmeal Knit Cardigan';
        else {
            // Not found in mock
            if (!domain) notFound();
        }
    }

    if (!product) {
        notFound();
    }

    const price = product.priceRange.minVariantPrice;

    return (
        <div className="container mx-auto px-6 py-24 pb-48">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                <div className="space-y-4 md:space-y-12">
                    {product.images.edges.map((imageEdge, index) => (
                        <div key={index} className="relative aspect-[4/5] bg-[#F3F2F0]">
                            <Image
                                src={imageEdge.node.url}
                                alt={imageEdge.node.altText || `${product.title} image ${index + 1}`}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        </div>
                    ))}
                </div>

                {/* Product Info - Sticky */}
                <div className="md:sticky md:top-24 self-start space-y-12">
                    <div>
                        <h1 className="text-3xl font-extralight uppercase tracking-widest leading-tight mb-4">
                            {product.title}
                        </h1>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-foreground/60 mb-8">
                            {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: price.currencyCode,
                            }).format(parseFloat(price.amount))}
                        </p>

                        <div
                            className="text-xs uppercase tracking-[0.1em] font-medium text-foreground/60 leading-relaxed mb-8 prose"
                            dangerouslySetInnerHTML={{ __html: product.descriptionHtml || product.description }}
                        />
                    </div>

                    <AddToCart product={product} />

                    <div className="border-t border-border-subtle pt-8 space-y-6">
                        <details className="group">
                            <summary className="cursor-pointer flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] list-none">
                                <span>Details & Materials</span>
                                <span className="group-open:rotate-180 transition-transform">+</span>
                            </summary>
                            <div className="pt-4 text-xs font-medium text-foreground/60 uppercase tracking-widest leading-relaxed">
                                <p>100% sustainably sourced fabric. Hand finished for precise construction. Dry clean only.</p>
                            </div>
                        </details>

                        <details className="group">
                            <summary className="cursor-pointer flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] list-none">
                                <span>Shipping & Returns</span>
                                <span className="group-open:rotate-180 transition-transform">+</span>
                            </summary>
                            <div className="pt-4 text-xs font-medium text-foreground/60 uppercase tracking-widest leading-relaxed">
                                <p>Free standard shipping on all orders over $200. Returns accepted within 14 days of delivery.</p>
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
