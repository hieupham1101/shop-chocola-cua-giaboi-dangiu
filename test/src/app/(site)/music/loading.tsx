export default function Loading() {
    return (
        <main className="min-h-screen pt-32 px-6">
            <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
                <div className="h-20 w-3/4 mx-auto bg-pink-100/50 rounded-3xl animate-pulse" />
                <div className="h-6 w-1/2 mx-auto bg-pink-100/30 rounded-full animate-pulse" />
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square rounded-[2.5rem] bg-pink-100/20 border border-white/20 animate-pulse" />
                ))}
            </div>
        </main>
    );
}
