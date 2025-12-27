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
    benefits?: string[];
}

const p1Images = buildProductImagePaths("socola-nhan-sua-chua-say-vi-chanh-day", 2);
const p2Images = buildProductImagePaths("silk-almond", 2);
const p3Images = buildProductImagePaths("matcha-zen", 2);
const p4Images = buildProductImagePaths("ruby-rose", 2);
const p5Images = buildProductImagePaths("midnight-orange", 2);
const p6Images = buildProductImagePaths("salted-caramel", 2);

export const PRODUCTS: Product[] = [
    {
        id: "p1",
        slug: "socola-nhan-sua-chua-say-vi-chanh-day",
        name: "Socola Nhân Sữa Chua Sấy Vị Chanh Dây One Royals",
        description: "Sự kết hợp hài hòa giữa cacao nguyên chất và sữa chua sấy thăng hoa giòn tan, nổi bật với vị Chanh Dây ngọt dịu – tươi mát, giữ trọn dưỡng chất tự nhiên.",
        price: 80000,
        tags: ["Chanh Dây", "Sữa Chua Sấy", "Tropical", "Vitamin C"],
        color: "from-yellow-500 to-amber-900",
        imageSrc: p1Images.cover,
        gallery: p1Images.gallery,
        details: [
            { label: "Thành phần", value: "Sữa chua, dịch cacao, đường, bơ cacao, chanh dây" },
            { label: "Xuất xứ", value: "Việt Nam" },
            { label: "Khối lượng tịnh", value: "100g" },
            { label: "Bảo quản", value: "18°C - 20°C" },
            { label: "Hạn sử dụng", value: "12 tháng" }
        ],
        story: "Lấy cảm hứng từ những buổi sáng nhiệt đới, dòng socola này là sự cân bằng tuyệt vời giữa vị đắng nhẹ của cacao nguyên chất và vị chua thanh đặc trưng của chanh dây tươi. Từng viên socola mang đến cảm giác bừng tỉnh và tràn đầy năng lượng.",
        flavorProfile: [
            { label: "Độ ngọt", value: 40 },
            { label: "Độ đắng", value: 60 },
            { label: "Vị chua trái cây", value: 90 }
        ],
        benefits: [
            "Bổ sung Vitamin C, D và Canxi tốt cho tim mạch",
            "Sữa chua sấy thăng hoa giữ nguyên lợi khuẩn và dưỡng chất",
            "Không phẩm màu, không chất bảo quản"
        ]
    },
    {
        id: "p2",
        slug: "socola-hanh-nhan-ngot-bui",
        name: "Socola Hạnh Nhân One Royals",
        description: "Sự kết hợp hoàn hảo giữa cacao nguyên chất và hạnh nhân giòn bùi. Vị ngọt dịu xen lẫn chút béo ngậy tự nhiên tạo nên trải nghiệm ăn vặt lôi cuốn.",
        price: 70000,
        tags: ["Hạnh Nhân", "Crunchy", "Energy Boost", "Protein"],
        color: "from-stone-600 to-black",
        imageSrc: p2Images.cover,
        gallery: p2Images.gallery,
        details: [
            { label: "Thành phần", value: "Hạnh nhân, bột cacao, bơ thực vật, bơ cacao, sữa bột" },
            { label: "Xuất xứ", value: "Việt Nam" },
            { label: "Khối lượng tịnh", value: "100g" },
            { label: "Bảo quản", value: "18°C - 20°C" },
            { label: "Hạn sử dụng", value: "12 tháng" }
        ],
        story: "Một biểu tượng của sự sang trọng và dinh dưỡng. Hạt hạnh nhân được tuyển chọn kỹ lưỡng để đảm bảo độ giòn tan nhất, bao phủ bởi lớp socola mịn màng, mang lại nguồn năng lượng tức thì cho ngày dài làm việc.",
        flavorProfile: [
            { label: "Độ ngọt", value: 50 },
            { label: "Độ đắng", value: 50 },
            { label: "Độ bùi béo", value: 95 }
        ],
        benefits: [
            "Giàu Vitamin E và chất chống oxy hóa từ cacao",
            "Cung cấp chất béo tốt và năng lượng nhanh chóng",
            "Món quà tinh tế cho sức khỏe mọi lứa tuổi"
        ]
    },
    {
        id: "p3",
        slug: "socola-nhan-sua-chua-say-vi-dau",
        name: "Socola Nhân Sữa Chua Sấy Vị Dâu One Royals",
        description: "Sự hòa quyện giữa vị cacao đậm đà và nhân sữa chua sấy vị dâu ngọt ngào, giòn tan. Mang lại cảm giác tươi mát như trái cây vừa hái.",
        price: 80000,
        tags: ["Vị Dâu", "Sweet", "Sữa Chua Sấy", "Gift Idea"],
        color: "from-rose-500 to-red-900",
        imageSrc: p3Images.cover,
        gallery: p3Images.gallery,
        details: [
            { label: "Thành phần", value: "Sữa chua, dịch cacao, đường, bơ cacao, dâu tây" },
            { label: "Xuất xứ", value: "Việt Nam" },
            { label: "Khối lượng tịnh", value: "100g" },
            { label: "Bảo quản", value: "18°C - 20°C" },
            { label: "Hạn sử dụng", value: "12 tháng" }
        ],
        story: "Socola vị dâu luôn là lựa chọn của những tâm hồn lãng mạn. Với công nghệ sấy thăng hoa, chúng tôi giữ trọn màu sắc và hương vị tinh khôi của dâu tây, ẩn mình trong lớp socola đẳng cấp của One Royals.",
        flavorProfile: [
            { label: "Độ ngọt", value: 70 },
            { label: "Độ đắng", value: 30 },
            { label: "Hương dâu", value: 85 }
        ],
        benefits: [
            "Giàu Vitamin C hỗ trợ hệ miễn dịch",
            "Vị ngọt thanh từ dâu tự nhiên, không dùng phẩm màu",
            "Kích thước đóng gói tiện lợi, phù hợp mang đi xa"
        ]
    },
    {
        id: "p4",
        slug: "socola-nhan-sua-chua-say-vi-truyen-thong",
        name: "Socola Nhân Sữa Chua Sấy Vị Truyền Thống One Royals",
        description: "Hương vị nguyên bản thanh khiết. Sự kết hợp tinh tế giữa vị chua nhẹ của sữa chua lên men tự nhiên và cacao nguyên chất thơm nồng.",
        price: 80000,
        tags: ["Original", "Healthy Snack", "Sữa Chua Sấy"],
        color: "from-blue-100 to-slate-900",
        imageSrc: p4Images.cover,
        gallery: p4Images.gallery,
        details: [
            { label: "Thành phần", value: "Sữa chua tự nhiên, dịch cacao, đường, bơ cacao" },
            { label: "Xuất xứ", value: "Việt Nam" },
            { label: "Khối lượng tịnh", value: "100g" },
            { label: "Bảo quản", value: "18°C - 20°C" },
            { label: "Hạn sử dụng", value: "12 tháng" }
        ],
        story: "Dòng sản phẩm dành cho những người yêu thích sự nguyên bản. Không cần quá nhiều gia vị, vị chua nhẹ tự nhiên của sữa chua sấy thăng hoa khi kết hợp với cacao tạo nên một hậu vị thanh khiết và khó quên.",
        flavorProfile: [
            { label: "Độ ngọt", value: 45 },
            { label: "Độ đắng", value: 55 },
            { label: "Độ chua thanh", value: 75 }
        ],
        benefits: [
            "Bổ sung Canxi và Vitamin D cần thiết",
            "Thích hợp làm món ăn vặt lành mạnh cho trẻ em",
            "Sản phẩm an toàn cho sức khỏe tinh thần và tim mạch"
        ]
    },
    {
        id: "p5",
        slug: "combo-thu-mot-chut-tron-vi-one-royals",
        name: "Combo Thử Một Chút (Trọn bộ 4 vị)",
        description: "Dành cho những người chơi hệ 'cái gì cũng muốn'. Bộ tứ quyền lực hội tụ đầy đủ: Chanh Dây tươi mát, Dâu ngọt ngào, Hạnh Nhân bùi béo và Truyền Thống thanh khiết.",
        price: 250000,
        tags: ["Combo Tiết Kiệm", "Full Vị", "Must Try"],
        color: "from-purple-600 to-pink-500",
        imageSrc: p5Images.cover,
        gallery: p5Images.gallery,
        details: [
            { label: "Bao gồm", value: "4 loại Socola One Royals" },
            { label: "Tổng khối lượng", value: "400g" },
            { label: "Ưu đãi", value: "Tiết kiệm hơn khi mua lẻ" },
            { label: "Quà tặng", value: "Kèm túi giấy cao cấp" }
        ],
        story: "Nếu bạn đang phân vân không biết đời mình thuộc về vị chua của Chanh Dây hay vị bùi của Hạnh Nhân, thì Combo này sinh ra là để giải cứu sự lưỡng lự đó. Một cuộc dạo chơi vị giác đầy đủ cung bậc cảm xúc.",
        flavorProfile: [
            { label: "Độ đa dạng", value: 100 },
            { label: "Độ gây nghiện", value: 99 },
            { label: "Độ kinh tế", value: 95 },
        ],
        benefits: [
            "Trải nghiệm toàn bộ bộ sưu tập One Royals",
            "Giá siêu hời so với mua lẻ từng món",
            "Phù hợp làm quà tặng vì quá hoành tráng"
        ]
    },
];

export const PLAYLISTS = [
    {
        id: "m1",
        title: "50/50 or 100%",
        mood: "Bội Rapper",
        color: "bg-pink-300",
        length: "12",
        audioSrc: "/music/track-1.mp3",
    },
    {
        id: "m2",
        title: "Em gái nắng",
        mood: "Hương Bội",
        color: "bg-amber-900",
        length: "52",
        audioSrc: "/music/track-2.mp3",
    },
    {
        id: "m3",
        title: "Lost connection",
        mood: "Bội Dominic",
        color: "bg-yellow-200",
        length: "48",
        audioSrc: "/music/track-3.mp3",
    },
];

export const TESTIMONIALS = [
    {
        id: "t1",
        name: "Hoàng 'Hảo Ngọt'",
        role: "Người mua hệ tâm linh",
        rating: 5,
        text: "Socola gì mà cuốn hơn cả người yêu cũ. Ăn một miếng thấy thanh thản, ăn hai miếng thấy bay bổng, ăn hết hộp thấy... hết tiền. Đóng gói đẹp xỉu, không nỡ bóc luôn!",
    },
    {
        id: "t2",
        name: "Linh 'Lê La'",
        role: "Chiến thần ăn vặt",
        rating: 5,
        text: "Định mua về tặng mẹ mà trên đường về lỡ tay bốc lăm bốc lủm hết sạch. Cái nhân sữa chua sấy nó giòn tan như lời hứa của đàn ông vậy, nhưng mà nó ngon thật chứ không có điêu!",
    },
    {
        id: "t3",
        name: "Quốc 'Quắn Quéo'",
        role: "Food Blogger nửa mùa",
        rating: 5,
        text: "Thề là ăn cái vị chanh dây xong muốn đi lấy vợ luôn vì nó vừa chua vừa ngọt y hệt cuộc đời. Điểm 10 cho chất lượng cacao, ăn xong thấy mình sang hẳn lên như quý tộc!",
    },
];

export function getProductBySlug(slug: string): Product | undefined {
    return PRODUCTS.find((p) => p.slug === slug);
}
