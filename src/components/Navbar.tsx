import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
                        VIBE<span className="text-gray-400">STORE</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/search" className="text-gray-600 hover:text-black transition-colors">
                            All Products
                        </Link>
                        <Link href="/search/clothing" className="text-gray-600 hover:text-black transition-colors">
                            Clothing
                        </Link>
                        <Link href="/search/accessories" className="text-gray-600 hover:text-black transition-colors">
                            Accessories
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-gray-600 hover:text-black">
                        <Search className="h-5 w-5" />
                    </button>
                    <button className="relative p-2 text-gray-600 hover:text-black">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                            0
                        </span>
                    </button>
                    <button className="md:hidden p-2 text-gray-600 hover:text-black">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
