import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "VIBE FABRIC | Premium Headless Store",
  description: "Modern headless Shopify storefront built with Next.js and Cloudflare Pages. Minimalist textures for refined spaces.",
  openGraph: {
    title: "VIBE FABRIC",
    description: "Premium Minimalist Textiles",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-inter antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <CartDrawer />

        <footer className="bg-[#F3F2F0] py-24 px-6 border-t border-border-subtle">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase">Vibe Fabric</h2>
              <p className="text-xs uppercase tracking-widest leading-relaxed text-foreground/60 max-w-[240px]">
                Creating minimalist textures for refined spaces since 2024. Quality and simplicity at our core.
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Collections</h3>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                <li><a href="/search/all" className="hover:text-foreground transition-colors">All Pieces</a></li>
                <li><a href="/search/new" className="hover:text-foreground transition-colors">Latest Release</a></li>
                <li><a href="/search/essentials" className="hover:text-foreground transition-colors">The Essentials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Support</h3>
              <ul className="space-y-4 text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                <li><a href="/shipping" className="hover:text-foreground transition-colors">Shipping</a></li>
                <li><a href="/returns" className="hover:text-foreground transition-colors">Returns</a></li>
                <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6">Newsletter</h3>
              <div className="border-b border-foreground flex items-center py-2">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="bg-transparent border-none text-[10px] tracking-widest focus:ring-0 w-full placeholder:text-foreground/20"
                />
                <button className="text-[10px] font-bold tracking-widest">JOIN</button>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-24 flex justify-between items-center text-[8px] font-bold uppercase tracking-[0.2em] text-foreground/20">
            <span>&copy; {new Date().getFullYear()} VIBE FABRIC</span>
            <span>POWERED BY HEADLESS VIBE</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
