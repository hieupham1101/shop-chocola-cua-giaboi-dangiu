import { notFound } from "next/navigation";
import { getProductBySlug, PRODUCTS } from "@/lib/data";
import ProductDetailClient from "@/components/ProductDetailClient";
import type { Metadata } from "next";
import { BANNER_PATHS } from "@/lib/image-utils";

// Force static params generation for all products
export async function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        slug: product.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    return {
        title: `${product.name} | Giaboinee`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.imageSrc],
        },
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    // Simple recommendations logic: same category or just next 3
    const related = PRODUCTS.filter(p => p.id !== product.id && p.tags.some(t => product.tags.includes(t))).slice(0, 3);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.imageSrc,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Giaboinee"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://giaboinee.com/products/${product.slug}`,
            "priceCurrency": "USD",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient product={product} relatedProducts={related} />
        </>
    );
}
