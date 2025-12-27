export default function Loading() {
    return (
        <main className="min-h-screen pt-32 px-6">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header Skeleton */}
                <div className="space-y-4 text-center">
                    <div className="h-16 w-3/4 md:w-1/2 mx-auto bg-pink-100/50 rounded-2xl animate-pulse" />
                    <div className="h-6 w-full md:w-2/3 mx-auto bg-pink-100/30 rounded-full animate-pulse" />
                </div>

                {/* Filter Skeleton */}
                <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-10 w-24 bg-pink-100/40 rounded-full animate-pulse" />
                    ))}
                </div>

                {/* Grid Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-[3/4] rounded-[2rem] bg-pink-100/20 border border-white/20 animate-pulse relative overflow-hidden">
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-pink-100/20 to-transparent" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
