export const COLOURS = {
  white: "#ffffff",
  black: "#000000",
  green: "#00AC76",
  red: "#C04345",
  blue: "#0043F9",
  backgroundLight: "#F0F0F3",
  backgroundMedium: "#B9B9B9",
  backgroundDark: "#777777",
};

export const Items = [
  {
    id: 1,
    category: "laptop",
    productName: "Apple 2023 MacBook Pro Laptop M2 Pro chip ",
    productPrice: 269900,
    description:
      "Screen Size	16 Inches | Hard Disk Size	512 GB | CPU Model	M2Pro | RAM 16 GB",
    isOff: true,
    offPercentage: 12,
    productImage: require("../../assets/laptops/mac/1.png"),
    isAvailable: true,
    productImageList: [
      require("../../assets/laptops/mac/1.png"),
      require("../../assets/laptops/mac/2.png"),
      require("../../assets/laptops/mac/3.png"),
      require("../../assets/laptops/mac/4.png"),
    ],
  },
  {
    id: 2,
    category: "laptop",
    productName: "Lenovo IdeaPad Slim 3 Intel Core i5 12th Gen",
    productPrice: 58990,
    description:
      "Screen Size	15.6 Inches | Colour	Arctic Grey | CPU Model	Core i5 | RAM 16 GB",
    isOff: false,
    productImage: require("../../assets/laptops/lenovo/1.png"),
    isAvailable: true,
    productImageList: [
      require("../../assets/laptops/lenovo/1.png"),
      require("../../assets/laptops/lenovo/2.png"),
      require("../../assets/laptops/lenovo/3.png"),
      require("../../assets/laptops/lenovo/4.png"),
    ],
  },
  {
    id: 3,
    category: "mobile",
    productName: "Apple iPhone 14 (128 GB)",
    productPrice: 67999,
    description:
      'Operating System	iOS |	5G | 6.1" display | 48MP Main Camera | Cinematic mode',
    isOff: true,
    offPercentage: 25,
    productImage: require("../../assets/mobiles/iphone/1.png"),
    isAvailable: true,
    productImageList: [
      require("../../assets/mobiles/iphone/1.png"),
      require("../../assets/mobiles/iphone/2.png"),
      require("../../assets/mobiles/iphone/3.png"),
    ],
  },
  {
    id: 4,
    category: "mobile",
    productName: "OnePlus Nord CE 3 Lite 5G",
    productPrice: 19999,
    description:
      "Operating System	OxygenOS | 8GB RAM | 128GB storage | Camera: 108 MP Main Camera with EIS",
    isOff: false,
    productImage: require("../../assets/mobiles/oneplus/1.png"),
    isAvailable: true,
    productImageList: [
      require("../../assets/mobiles/oneplus/1.png"),
      require("../../assets/mobiles/oneplus/2.png"),
      require("../../assets/mobiles/oneplus/3.png"),
    ],
  },
  {
    id: 5,
    category: "mobile",
    productName: "Xiaomi 13 Pro (Ceramic Black)",
    productPrice: 79999,
    description:
      '6.1" Super Retina display | 12GB RAM | 256GB Storage | 50MP Camera',
    isOff: false,
    productImage: require("../../assets/mobiles/mi/1.png"),
    isAvailable: true,
    productImageList: [
      require("../../assets/mobiles/mi/1.png"),
      require("../../assets/mobiles/mi/2.png"),
      require("../../assets/mobiles/mi/3.png"),
    ],
  },
  {
    id: 6,
    category: "mobile",
    productName: "Samsung Galaxy S23 Ultra 5G",
    productPrice: 124999,
    description:
      '6.8" inch display | 12GB RAM | 256GB Storage | S-Pen | 200MP Camera ',
    isOff: false,
    productImage: require("../../assets/mobiles/samsung/1.png"),
    isAvailable: false,
    productImageList: [
      require("../../assets/mobiles/samsung/1.png"),
      require("../../assets/mobiles/samsung/2.png"),
      require("../../assets/mobiles/samsung/3.png"),
    ],
  },
];
