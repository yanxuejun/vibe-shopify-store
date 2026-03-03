import Image from 'next/image';
import Link from 'next/link';
import { ShopifyProduct } from '@/lib/shopify/types';

export default function ProductCard({ product }: { product: ShopifyProduct }) {
    const { title, handle, images, priceRange } = product;
    const image = images.edges[0]?.node;
    const price = priceRange.minVariantPrice;

    return (
        <Link href={`/product/${handle}`} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100">
                {image ? (
                    <Image
                        src={image.url}
                        alt={image.altText || title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">No image</div>
                )}
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/40 p-4 backdrop-blur-md transition-transform duration-300 group-hover:translate-y-0">
                    <p className="text-sm font-semibold text-black">View Details</p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between px-1">
                <div>
                    <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-xs text-gray-500">Premium quality</p>
                </div>
                <p className="text-sm font-bold text-black">
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: price.currencyCode,
                    }).format(parseFloat(price.amount))}
                </p>
            </div>
        </Link>
    );
}
