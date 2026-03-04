'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store/useCartStore';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { getMenu } from '@/lib/shopify';
import { MenuItem } from '@/lib/shopify/types';

export default function Navbar() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const { toggleCart, items } = useCartStore();

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        getMenu().then(setMenuItems);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border-subtle">
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <div className="flex items-center lg:hidden">
                    <button
                        className="p-2 -ml-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </div>

                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-[0.2em] uppercase absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
                    Vibe Fabric
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex items-center space-x-8 h-full">
                    {menuItems.map((item) => (
                        <li
                            key={item.title}
                            className="h-full flex items-center group relative"
                            onMouseEnter={() => item.items?.length ? setActiveMegaMenu(item.title) : null}
                            onMouseLeave={() => setActiveMegaMenu(null)}
                        >
                            <Link
                                href={item.url}
                                className="text-xs font-medium uppercase tracking-widest hover:text-foreground/60 transition-colors py-2 flex items-center"
                            >
                                {item.title}
                                {item.items && item.items.length > 0 && (
                                    <ChevronDown className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" />
                                )}
                            </Link>

                            {/* Mega Menu Overlay */}
                            {item.items && item.items.length > 0 && activeMegaMenu === item.title && (
                                <div className="absolute top-full left-0 w-[600px] bg-background border border-border-subtle p-8 grid grid-cols-2 gap-8 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div>
                                        <h3 className="text-[10px] font-semibold text-foreground/40 mb-4 uppercase tracking-[0.15em]">Categories</h3>
                                        <ul className="space-y-3">
                                            {item.items.map((subItem) => (
                                                <li key={subItem.title}>
                                                    <Link
                                                        href={subItem.url}
                                                        className="text-xs uppercase tracking-widest hover:translate-x-1 inline-block transition-transform"
                                                    >
                                                        {subItem.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-[#F3F2F0] p-6 flex flex-col justify-end min-h-[200px]">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">New Season</p>
                                        <p className="text-xs text-foreground/60 leading-relaxed uppercase tracking-tighter">Minimalist textures for refined spaces.</p>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => toggleCart(true)}
                        className="p-2 relative flex items-center group"
                    >
                        <ShoppingBag className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                        {cartCount > 0 && (
                            <span className="absolute top-1.5 right-1.5 bg-foreground text-background text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                        <span className="ml-2 text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Cart</span>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-background lg:hidden animate-in fade-in slide-in-from-left duration-300">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6 border-b border-border-subtle">
                            <span className="text-lg font-bold tracking-[0.2em] uppercase">Vibe Fabric</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6">
                            <ul className="space-y-8">
                                {menuItems.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.url}
                                            className="text-2xl font-light uppercase tracking-[0.1em]"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.title}
                                        </Link>
                                        {item.items && item.items.length > 0 && (
                                            <ul className="mt-4 space-y-3">
                                                {item.items.map(sub => (
                                                    <li key={sub.title}>
                                                        <Link
                                                            href={sub.url}
                                                            className="text-sm uppercase tracking-widest text-foreground/60"
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {sub.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
