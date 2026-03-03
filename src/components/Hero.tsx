import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 lg:w-full lg:max-w-2xl">
                    <div className="text-left">
                        <span className="inline-flex items-center rounded-full bg-black px-3 py-1 text-xs font-semibold text-white mb-6">
                            New Season 2024
                        </span>
                        <h1 className="text-5xl font-extrabold tracking-tight text-black sm:text-7xl">
                            Elevate Your <br />
                            <span className="text-gray-400 italic">Daily Vibe.</span>
                        </h1>
                        <p className="mt-8 text-lg leading-8 text-gray-600">
                            Discover our curated collection of premium products designed for modern living.
                            Minimalist aesthetics meets functional excellence.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Link
                                href="/search"
                                className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-all"
                            >
                                Shop Collection
                            </Link>
                            <Link href="/about" className="text-sm font-semibold leading-6 text-black">
                                Our Story <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:h-full lg:w-1/2">
                <div className="h-full w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {/* Using a placeholder-like aesthetic for now, can be replaced by real Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-50 opacity-50" />
                    <div className="relative z-10 text-center">
                        <div className="w-64 h-80 bg-white rounded-3xl shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500 flex items-center justify-center p-8">
                            <div className="w-full h-full bg-gray-50 rounded-xl border-dashed border-2 border-gray-200" />
                        </div>
                        <div className="absolute -left-12 top-20 w-48 h-64 bg-white rounded-3xl shadow-2xl -rotate-6 transform hover:rotate-0 transition-transform duration-500 flex items-center justify-center p-6 border border-gray-100">
                            <div className="w-full h-full bg-gray-50 rounded-xl border-dashed border-2 border-gray-200" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
