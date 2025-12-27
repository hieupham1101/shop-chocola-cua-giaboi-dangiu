import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PinkMeshBackground } from "@/components/PinkMeshBackground";
import PageTransitionProvider from "@/components/PageTransitionProvider";

export default function SiteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PinkMeshBackground />
            <Header />
            <PageTransitionProvider>
                <main className="min-h-screen">
                    {children}
                </main>
            </PageTransitionProvider>
            <Footer />
        </>
    );
}
