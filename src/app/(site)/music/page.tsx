import MusicClient from "@/components/music/MusicClient";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Healing Music | Giaboinee",
    description: "Curated playlists to accompany your tasting experience.",
    openGraph: {
        title: "Healing Music | Giaboinee",
        description: "Curated playlists to accompany your tasting experience.",
        images: ["/og/og-music.jpg"],
    },
};

export default function MusicPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-950 mb-6 tracking-tight">
                    Nhạc chữa lành
                </h1>
                <p className="text-xl text-amber-900/60 max-w-2xl mx-auto">
                    CÒN GÌ TUYỆT VỜI HƠN KHI VỪA NHÂM NHI THANH KẸO SOCOLA VỪA NGHE NHẠC CHILL CHILL
                </p>
            </div>

            <div className="max-w-6xl mx-auto">
                <MusicClient teaserMode={false} />
            </div>
        </main>
    );
}
