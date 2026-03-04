'use client';

import React from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/store/useCartStore';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartDrawer() {
    const { isOpen, toggleCart, items, removeItem, updateQuantity } = useCartStore();

    const subtotal = items.reduce(
        (acc, item) => acc + parseFloat(item.price) * item.quantity,
        0
    );

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => toggleCart(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-background h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-500">
                <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="text-sm font-bold uppercase tracking-[0.2em]">Your Bag</span>
                        <span className="text-[10px] text-foreground/40 font-bold bg-[#F3F2F0] px-2 py-0.5 rounded-full">
                            {items.length}
                        </span>
                    </div>
                    <button onClick={() => toggleCart(false)} className="p-2 hover:bg-[#F3F2F0] rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                            <ShoppingBag className="w-12 h-12 text-foreground/10 mb-4" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2">Your box is empty</p>
                            <p className="text-xs text-foreground/40 uppercase tracking-widest leading-relaxed">
                                Start adding pieces to your collection to see them here.
                            </p>
                            <button
                                onClick={() => toggleCart(false)}
                                className="mt-8 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-foreground pb-1"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <ul className="divide-y divide-border-subtle">
                            {items.map((item) => (
                                <li key={item.id} className="p-6 flex space-x-4">
                                    <div className="relative w-24 aspect-[4/5] bg-[#F3F2F0] flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.title}</h3>
                                                <button onClick={() => removeItem(item.id)} className="text-[10px] text-foreground/40 uppercase tracking-widest hover:text-foreground transition-colors">
                                                    Remove
                                                </button>
                                            </div>
                                            <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-1">
                                                {item.options.map(opt => `${opt.name}: ${opt.value}`).join(' / ')}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-end">
                                            <div className="flex items-center border border-border-subtle">
                                                <button
                                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                    className="p-1 px-2 hover:bg-[#F3F2F0] transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-[10px] font-bold px-3 tabular-nums">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 px-2 hover:bg-[#F3F2F0] transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest tabular-nums">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: item.currencyCode,
                                                }).format(parseFloat(item.price) * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-6 border-t border-border-subtle bg-[#F3F2F0]/30 space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-medium text-foreground/40 uppercase tracking-[0.2em] mb-1">Subtotal</p>
                                <p className="text-xs uppercase tracking-widest text-foreground/60 italic">Taxes and shipping calculated at checkout</p>
                            </div>
                            <p className="text-sm font-bold tracking-[0.1em] tabular-nums">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: items[0].currencyCode,
                                }).format(subtotal)}
                            </p>
                        </div>
                        <button className="w-full bg-foreground text-background py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-foreground/90 transition-colors">
                            Checkout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
