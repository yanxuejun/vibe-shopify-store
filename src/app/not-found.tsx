export const runtime = 'edge';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
            <h2 className="text-4xl font-bold text-black mb-4">404 - Page Not Found</h2>
            <p className="text-gray-500 mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <a
                href="/"
                className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-all"
            >
                Return Home
            </a>
        </div>
    );
}
