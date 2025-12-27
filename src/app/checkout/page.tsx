import CheckoutClient from "@/components/cart/CheckoutClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-amber-950 mb-4">Checkout</h1>
                        <p className="text-amber-900/60">Almost yours! Complete your sweet journey.</p>
                    </div>
                    <CheckoutClient />
                </div>
            </main>
            <Footer />
        </>
    );
}
