import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-[#F3F2F0]">
            {/* Background Image / Texture */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=2000"
                    alt="Refined Texture"
                    className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
                <div className="space-y-8 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/40 block mb-4">
                        New Series: Minimalist Textures
                    </span>
                    <h1 className="text-5xl md:text-8xl font-extralight uppercase tracking-[0.1em] leading-tight">
                        ELEVATED <br />
                        <span className="italic">SIMPLICITY</span>
                    </h1>
                    <p className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-foreground/60 max-w-xl mx-auto leading-loose">
                        Exploration of form and material. Purposefully designed for those who appreciate the silent details.
                    </p>
                    <div className="pt-8">
                        <Link
                            href="/collections/all"
                            className="inline-block bg-foreground text-background text-[10px] font-bold uppercase tracking-[0.3em] px-12 py-5 hover:bg-foreground/90 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Explore Collection
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 animate-bounce opacity-40">
                <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Scroll</span>
                <div className="w-px h-12 bg-foreground" />
            </div>

            {/* Side Label */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-8 select-none">
                <span className="text-[8px] font-bold uppercase tracking-[0.5em] rotate-90 whitespace-nowrap opacity-20 origin-center">
                    VIBE FABRIC COLLECTION 2024
                </span>
            </div>
        </section>
    );
}
