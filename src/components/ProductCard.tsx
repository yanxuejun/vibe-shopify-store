import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/lib/shopify/types';

export default function ProductCard({ product }: { product: ShopifyProduct }) {
    const { title, handle, images, priceRange } = product;
    const primaryImage = images.edges[0]?.node;
    const hoverImage = images.edges[1]?.node || primaryImage;
    const price = priceRange.minVariantPrice;

    return (
        <Link href={`/product/${handle}`} className="group block mb-12">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#F3F2F0] border border-transparent hover:border-border-subtle transition-colors duration-300">
                {primaryImage && (
                    <Image
                        src={primaryImage.url}
                        alt={primaryImage.altText || title}
                        fill
                        className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
                {hoverImage && (
                    <Image
                        src={hoverImage.url}
                        alt={hoverImage.altText || title}
                        fill
                        className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transition-transform duration-1000 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}
            </div>
            <div className="mt-4 flex flex-col items-center text-center">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{title}</h3>
                <p className="text-[10px] font-medium text-foreground/40 uppercase tracking-widest">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: price.currencyCode,
                    }).format(parseFloat(price.amount))}
                </p>
            </div>
        </Link>
    );
}
