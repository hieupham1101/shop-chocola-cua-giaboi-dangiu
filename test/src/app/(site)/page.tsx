import Hero from "@/components/BannerHero";
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

      {/* Featured Products Teaser */}
      {/* ProductsClient has its own section tag and padding, so we just wrap in a div if needed for width, or pass class */}
      <div className="pt-6 md:pt-0">
        <ProductsClient featuredOnly={true} />
      </div>

      {/* Music Teaser */}
      <div className="pt-0 pb-12 md:pb-24">
        <MusicClient teaserMode={true} />
      </div>

      <Testimonials />
    </>
  );
}
