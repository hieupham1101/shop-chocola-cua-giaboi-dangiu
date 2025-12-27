import Hero from "@/components/BannerHero";
import DecorativeDivider from "@/components/DecorativeDivider";
import Testimonials from "@/components/sections/Testimonials";
import ProductsClient from "@/components/products/ProductsClient";
import MusicClient from "@/components/music/MusicClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giaboinee | Premium Chocolate & Healing Music",
  description: "Experience the healing power of premium chocolate through our curated collection.",
  openGraph: {
    title: "Giaboinee | Premium Chocolate & Healing Music",
    description: "Experience the healing power of premium chocolate through our curated collection.",
    images: ["/og/og-default.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <DecorativeDivider variant="wave" className="-mt-8 relative z-10 mb-8" />

      {/* Featured Products Teaser */}
      {/* ProductsClient has its own section tag and padding, so we just wrap in a div if needed for width, or pass class */}
      <div className="pt-0 md:pt-0">
        <ProductsClient featuredOnly={true} />
      </div>

      {/* Music Teaser */}
      <div className="pt-0 pb-12 md:pb-24">
        <MusicClient teaserMode={true} />
      </div>

      <DecorativeDivider variant="hearts" className="my-8" />

      <Testimonials />

      {/* Testimonials or Footer Divider Area */}
      {/* Note: The user asked for "Before Footer". The page layout ends with Testimonials, usually Footer is in layout.tsx. 
           We will put the 'leaves' divider at the very end of this page content, which effectively sits before the footer. 
       */}
      <DecorativeDivider variant="leaves" className="mt-12" />
    </>
  );
}
