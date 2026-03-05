'use client';

import React, { useState } from 'react';
import { ShopifyProduct, ProductVariant } from '@/lib/shopify/types';
import { useCartStore } from '@/lib/store/useCartStore';

export default function AddToCart({ product }: { product: ShopifyProduct }) {
    // If product has variants, the first option might be Size or Color
    // For simplicity, we just initialize state with the first available variant's options
    const defaultVariant = product.variants.edges[0]?.node;

    // Store selected options
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        if (defaultVariant) {
            defaultVariant.selectedOptions.forEach(opt => {
                initial[opt.name] = opt.value;
            });
        }
        return initial;
    });

    const { addItem, toggleCart } = useCartStore();
    const [isAdding, setIsAdding] = useState(false);

    // Find the current variant based on selected options
    const currentVariant = product.variants.edges.find((edge) => {
        return Object.entries(selectedOptions).every(([name, value]) => {
            return edge.node.selectedOptions.some(opt => opt.name === name && opt.value === value);
        });
    })?.node;

    const handleOptionSelect = (name: string, value: string) => {
        setSelectedOptions(prev => ({ ...prev, [name]: value }));
    };

    const handleAdd = () => {
        if (!currentVariant || !product.availableForSale || !currentVariant.availableForSale) return;

        setIsAdding(true);

        addItem({
            id: `local_id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            variantId: currentVariant.id,
            quantity: 1,
            title: product.title,
            handle: product.handle,
            price: currentVariant.price.amount,
            currencyCode: currentVariant.price.currencyCode,
            image: currentVariant.image?.url || product.featuredImage?.url || product.images.edges[0]?.node?.url || '',
            options: currentVariant.selectedOptions
        });

        // Open cart drawer immediately
        toggleCart(true);

        // Simulate a slight delay to give the button a click feel, then toggle completed
        setTimeout(() => {
            setIsAdding(false);
        }, 500);
    };

    const isAvailable = product.availableForSale && currentVariant?.availableForSale;

    return (
        <div className="space-y-8">
            {/* Options Selector */}
            {product.options.map((option) => (
                <div key={option.id}>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-foreground/40">
                        Select {option.name}
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {option.values.map((val) => {
                            const isSelected = selectedOptions[option.name] === val;
                            return (
                                <button
                                    key={val}
                                    onClick={() => handleOptionSelect(option.name, val)}
                                    className={`
                                        min-w-[40px] h-10 px-4 text-[10px] font-bold tracking-widest uppercase transition-all
                                        ${isSelected
                                            ? 'bg-foreground text-background border-foreground'
                                            : 'border border-border-subtle bg-transparent text-foreground hover:border-foreground'}
                                    `}
                                >
                                    {val}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            {/* Action Button */}
            <button
                disabled={!isAvailable || isAdding}
                onClick={handleAdd}
                className={`
                    w-full py-5 text-[10px] font-bold uppercase tracking-[0.3em] transition-all
                    ${!isAvailable
                        ? 'bg-[#F3F2F0] text-foreground/20 cursor-not-allowed'
                        : isAdding
                            ? 'bg-foreground/80 text-background'
                            : 'bg-foreground text-background hover:bg-foreground/90 transform active:scale-[0.98]'
                    }
                `}
            >
                {!isAvailable ? 'Sold Out' : isAdding ? 'Adding...' : 'Add To Box'}
            </button>
        </div>
    );
}
