import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
            <div className="relative">
                <div className="absolute inset-0 bg-pink-200 blur-2xl opacity-50 rounded-full animate-pulse" />
                <Cookie size={80} className="text-amber-900/40 relative z-10 rotate-12" />
            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-serif font-bold text-amber-950">Oh crumbs!</h2>
                <p className="text-amber-900/60 max-w-md mx-auto">
                    We couldn't find that product. It might have been eaten by our chocolatiers.
                </p>
            </div>

            <Link
                href="/"
                className="px-8 py-3 bg-amber-900 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
                <ArrowLeft size={18} />
                Back to Products
            </Link>
        </div>
    );
}
