export function buildProductImagePaths(slug: string, galleryCount = 4) {
    const basePath = `/assets/products/${slug}`;

    // Generate gallery paths: g-01.jpg, g-02.jpg, ...
    const gallery = Array.from({ length: galleryCount }, (_, i) => {
        const num = (i + 1).toString().padStart(2, '0');
        return `${basePath}/g-${num}.jpg`;
    });

    return {
        cover: `${basePath}/cover.jpg`,
        gallery
    };
}

export const BANNER_PATHS = {
    banner1: "/assets/banners/banner-01.jpg",
    banner2: "/assets/banners/banner-02.jpg",
    banner3: "/assets/banners/banner-03.jpg",
};
