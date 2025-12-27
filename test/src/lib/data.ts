import { BANNER_PATHS, buildProductImagePaths } from "@/lib/image-utils";

export const BANNERS = [
    {
        id: "b1",
        imageSrc: BANNER_PATHS.banner1,
        eyebrow: "Chocolate Therapy",
        title: "Melting Moments of Pure Joy",
        subtitle: "Experience the profound connection between taste and emotion with our handcrafted selection.",
        align: "left",
    },
    {
        id: "b2",
        imageSrc: BANNER_PATHS.banner2,
        eyebrow: "Sensory Awakening",
        title: "Origins of the Sacred Earth",
        subtitle: "Sourced from the heart of the Amazon, where cacao is more than a fruit—it's a ritual.",
        align: "center",
    },
    {
        id: "b3",
        imageSrc: BANNER_PATHS.banner3,
        eyebrow: "Healing Rituals",
        title: "Harmony in Every Bite",
        subtitle: "Infused with calming botanicals to restore your inner balance and serenity.",
        align: "right",
    },
];

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    tags: string[];
    color: string;
    imageSrc: string;
    gallery: string[];
    details: { label: string; value: string }[];
    story: string;
    flavorProfile: { label: string; value: number }[]; // 0-100
}

const p1Images = buildProductImagePaths("socola-nhan-sua-chua-say-vi-chanh-day");
const p2Images = buildProductImagePaths("silk-almond");
const p3Images = buildProductImagePaths("matcha-zen");
const p4Images = buildProductImagePaths("ruby-rose");
const p5Images = buildProductImagePaths("midnight-orange");
const p6Images = buildProductImagePaths("salted-caramel");

export const PRODUCTS: Product[] = [
    {
        id: "p1",
        slug: "socola-nhan-sua-chua-say-vi-chanh-day",
        name: "Socola nhân sữa chua sấy vị chanh dây",
        description: "Sự hòa quyện của cacao nguyên chất và sữa chua sấy thăng hoa giòn tan, kết hợp vị Chanh Dây ngọt thanh – tươi mát. Bổ sung vitamin tự nhiên.",
        price: 12.99,
        tags: ["Dark 72%", "Vegan", "Gift box"],
        color: "from-amber-900 to-black",
        imageSrc: p1Images.cover,
        gallery: p1Images.gallery,
        details: [
            { label: "Cacao", value: "72% Single Origin" },
            { label: "Origin", value: "Dak Lak, Vietnam" },
            { label: "Weight", value: "50g" },
            { label: "Dietary", value: "Vegan, Gluten-Free" }
        ],
        story: "Inspired by the tropical mornings of Vietnam, this bar balances the deep, earthy tones of pure cacao with the bright, awakening zest of passion fruit yogurt. It's a breakfast ritual reimagined.",
        flavorProfile: [
            { label: "Sweetness", value: 40 },
            { label: "Bitterness", value: 70 },
            { label: "Fruitiness", value: 90 },
        ]
    },
    {
        id: "p2",
        slug: "silk-almond",
        name: "Silk Almond",
        description: "Creamy milk chocolate studded with roasted California almonds. A classic reimagined with velvet texture.",
        price: 10.99,
        tags: ["Milk", "Almond"],
        color: "from-amber-600 to-amber-800",
        imageSrc: p2Images.cover,
        gallery: p2Images.gallery,
        details: [
            { label: "Cacao", value: "45% Milk" },
            { label: "Origin", value: "Ghana" },
            { label: "Weight", value: "100g" },
            { label: "Nuts", value: "Roasted Almonds" }
        ],
        story: "Smooth as silk, crunchy as a gentle promise. We slow-roast our almonds to bring out a nutty warmth that perfectly complements the creamy embrace of our signature milk chocolate.",
        flavorProfile: [
            { label: "Sweetness", value: 80 },
            { label: "Bitterness", value: 20 },
            { label: "Creaminess", value: 95 },
        ]
    },
    {
        id: "p3",
        slug: "matcha-zen",
        name: "Matcha Zen",
        description: "Premium white chocolate infused with ceremonial grade matcha from Uji, Kyoto.",
        price: 14.50,
        tags: ["White", "Matcha", "Gift box"],
        color: "from-emerald-600 to-emerald-800",
        imageSrc: p3Images.cover,
        gallery: p3Images.gallery,
        details: [
            { label: "Matcha", value: "Ceremonial Grade" },
            { label: "Origin", value: "Uji, Japan" },
            { label: "Weight", value: "80g" },
            { label: "Sweetness", value: "Monk Fruit" }
        ],
        story: "A meditation in every bite. We use only the finest ceremonial matcha, shade-grown to preserve its vibrant green color and umami depth, folded into a hush of white chocolate.",
        flavorProfile: [
            { label: "Sweetness", value: 60 },
            { label: "Bitterness", value: 30 },
            { label: "Umami", value: 85 },
        ]
    },
    {
        id: "p4",
        slug: "ruby-rose",
        name: "Ruby Rose",
        description: "Rare ruby chocolate paired with dried rose petals and pistachio. Visually stunning and naturally pink.",
        price: 15.99,
        tags: ["Fruit", "Ruby", "Limited"],
        color: "from-rose-400 to-pink-600",
        imageSrc: p4Images.cover,
        gallery: p4Images.gallery,
        details: [
            { label: "Cacao", value: "47% Ruby" },
            { label: "Origin", value: "Brazil" },
            { label: "Weight", value: "90g" },
            { label: "Floral", value: "Rose Petals" }
        ],
        story: "A romance written in chocolate. The naturally pink ruby bean offers a berry-like tartness that dances with the floral whisper of rose and the earthy crunch of pistachio.",
        flavorProfile: [
            { label: "Sweetness", value: 70 },
            { label: "Bitterness", value: 10 },
            { label: "Tartness", value: 80 },
        ]
    },
    {
        id: "p5",
        slug: "midnight-orange",
        name: "Midnight Orange",
        description: "Intense dark chocolate with zesty candied orange peel. A sophisticated pairing for the night.",
        price: 11.50,
        tags: ["Dark", "Fruit"],
        color: "from-orange-600 to-amber-900",
        imageSrc: p5Images.cover,
        gallery: p5Images.gallery,
        details: [
            { label: "Cacao", value: "85% Dark" },
            { label: "Origin", value: "Ecuador" },
            { label: "Weight", value: "100g" },
            { label: "Zest", value: "Candied Orange" }
        ],
        story: "For the quiet moments after dark. The deep, brooding intensity of 85% cacao is awakened by bright sparks of candied orange, like city lights in the night sky.",
        flavorProfile: [
            { label: "Sweetness", value: 20 },
            { label: "Bitterness", value: 90 },
            { label: "Citrus", value: 75 },
        ]
    },
    {
        id: "p6",
        slug: "salted-caramel",
        name: "Salted Caramel",
        description: "Buttery caramel shards in smooth milk chocolate with sea salt. The perfect sweet and salty balance.",
        price: 11.99,
        tags: ["Milk", "Caramel"],
        color: "from-yellow-600 to-amber-700",
        imageSrc: p6Images.cover,
        gallery: p6Images.gallery,
        details: [
            { label: "Cacao", value: "40% Milk" },
            { label: "Origin", value: "Belgium" },
            { label: "Weight", value: "110g" },
            { label: "Salt", value: "Fleur de Sel" }
        ],
        story: "Comfort in a bar. We make our huge caramel shards by hand, letting them shatter into the milk chocolate pool, finished with a pinch of hand-harvested sea salt.",
        flavorProfile: [
            { label: "Sweetness", value: 90 },
            { label: "Bitterness", value: 10 },
            { label: "Salty", value: 40 },
        ]
    },
];

export const PLAYLISTS = [
    {
        id: "m1",
        title: "Pink Rain",
        mood: "Healing & Calm",
        color: "bg-pink-300",
        length: "45:20",
    },
    {
        id: "m2",
        title: "Cacao Night",
        mood: "Deep Focus",
        color: "bg-amber-900",
        length: "1:12:05",
    },
    {
        id: "m3",
        title: "Soft Morning",
        mood: "Gentle Awakening",
        color: "bg-yellow-200",
        length: "38:45",
    },
];

export const TESTIMONIALS = [
    {
        id: "t1",
        name: "Sarah L.",
        role: "Verified Buyer",
        rating: 5,
        text: "The smoothest chocolate I've ever tasted. The packaging is just stunning, perfect for gifts.",
    },
    {
        id: "t2",
        name: "Michael Chen",
        role: "Chocolatier",
        rating: 5,
        text: "You can really taste the quality of the cacao. The Matcha Zen is an absolute masterpiece.",
    },
    {
        id: "t3",
        name: "Emma W.",
        role: "Food Blogger",
        rating: 5,
        text: "Not just chocolate, it's an experience. The healing music playlist was such a nice touch!",
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
}
