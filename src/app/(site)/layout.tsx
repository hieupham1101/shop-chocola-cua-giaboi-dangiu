import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PinkMeshBackground } from "@/components/PinkMeshBackground";
import Snowfall from "@/components/Snowfall";
import PageTransitionProvider from "@/components/PageTransitionProvider";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={`${inter.variable} ${playfair.variable} antialiased`}>
            <PinkMeshBackground />
            <Snowfall />
            <Header />
            <PageTransitionProvider>
                <main className="min-h-screen">
                    {children}
                </main>
            </PageTransitionProvider>
            <Footer />
        </div>
    );
}
