import service6 from "../../assets/service6.png";

const socialMediaMarketing = {
  id: 5,

  slug: "social-media-marketing",

  title: "Social Media Marketing",
  readMore: [
    "Custom content calendar aligned with your brand voice.",
    "Platform-specific strategies for Instagram, Facebook, and more.",
    "Engaging creatives designed to boost reach and interaction.",
    "Performance tracking with monthly growth reports.",
    "Community management to keep your audience engaged.",
  ],

  category: "Social Media Marketing",

  price: 9999,

  pageTitle: "Social Media Marketing Packages",

  description: "Grow Your Brand Across Social Platforms",

  pageDescription:
    "Choose from our Social Media Marketing services including Social Media Management, Post Bundles, Reel Bundles, and Festival Campaigns.",

  image: service6,

  subServices: [

    {
    id:1,

    slug:"social-media-management",

    title:"Social Media",

    image:service6,

    plans: [
  {
    id: 1,

    slug: "basic-social-media",

    name: "Basic Social Media",

    subtitle: "Basic",

    tag: "STARTER",

    image: service6,

    price: 9999,

    description:
      "Ideal for startups looking to establish a professional social media presence across major platforms.",

    deliverables: [
      "Platform Management",
      "Content Planning",
      "Monthly Reporting",
      "Basic Hashtag Strategy",
      "Community Engagement",
      "Profile Optimization",
    ],

    quotationType: "social",

    quotation: {
      monthlyPrice: 9999,

      platformPrice: {
        instagram: 0,
        facebook: 0,
        youtube: 3000,
        linkedin: 2500,
        pinterest: 2000,
      },

      gst: 18,
    },

    adminLogin: true,

    wishlist: true,

    getQuote: true,
  },

  {
    id: 2,

    slug: "premium-social-media",

    name: "Premium Social Media",

    subtitle: "Premium",

    tag: "POPULAR",

    image: service6,

    price: 14999,

    description:
      "Designed for growing businesses requiring consistent content, engagement, and branding.",

    deliverables: [
      "Everything in Basic",
      "Advanced Content Strategy",
      "Competitor Analysis",
      "Monthly Campaign Planning",
      "Performance Insights",
      "Community Management",
    ],

    quotationType: "social",

    quotation: {
      monthlyPrice: 14999,

      platformPrice: {
        instagram: 0,
        facebook: 0,
        youtube: 2500,
        linkedin: 2000,
        pinterest: 1500,
      },

      gst: 18,
    },

    adminLogin: true,

    wishlist: true,

    getQuote: true,
  },

  {
    id: 3,

    slug: "advanced-social-media",

    name: "Advanced Social Media",

    subtitle: "Advanced",

    tag: "BEST SELLER",

    image: service6,

    price: 19999,

    description:
      "Complete social media management with premium strategy, content planning, analytics, and performance optimization.",

    deliverables: [
      "Everything in Premium",
      "Dedicated Account Manager",
      "Campaign Optimization",
      "Advanced Analytics",
      "Priority Support",
      "Monthly Growth Strategy",
    ],

    quotationType: "social",

    quotation: {
      monthlyPrice: 19999,

      platformPrice: {
        instagram: 0,
        facebook: 0,
        youtube: 2000,
        linkedin: 1500,
        pinterest: 1000,
      },

      gst: 18,
    },

    adminLogin: true,

    wishlist: true,

    getQuote: true,
  },
],

},

{
  id: 2,

  slug: "post-bundle",

  title: "Post Bundle",

  image: service6,

  quotationType: "bundle",

  plans: [
    {
      id: 1,

      slug: "basic-post-bundle",

      name: "Basic Post Bundle",

      subtitle: "Basic",

      tag: "STARTER",

      image: service6,

      price: 4999,

      description:
        "Perfect for startups and small businesses looking for professionally designed social media posts.",

      deliverables: [
        "10 Custom Social Media Posts",
        "Creative Post Designs",
        "Caption Writing",
        "Basic Hashtag Suggestions",
        "JPG & PNG Files",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 4999,
        quantityLabel: "Posts",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 2,

      slug: "premium-post-bundle",

      name: "Premium Post Bundle",

      subtitle: "Premium",

      tag: "POPULAR",

      image: service6,

      price: 7999,

      description:
        "Ideal for businesses requiring consistent and premium-quality social media content.",

      deliverables: [
        "20 Custom Social Media Posts",
        "Premium Creative Designs",
        "Professional Caption Writing",
        "Hashtag Research",
        "Brand Color Consistency",
        "JPG, PNG & Source Files",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 7999,
        quantityLabel: "Posts",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 3,

      slug: "advanced-post-bundle",

      name: "Advanced Post Bundle",

      subtitle: "Advanced",

      tag: "BEST SELLER",

      image: service6,

      price: 11999,

      description:
        "Complete post bundle for brands requiring high-quality content with strategic planning and premium creatives.",

      deliverables: [
        "30 Premium Social Media Posts",
        "Creative Design Strategy",
        "Professional Caption Writing",
        "Advanced Hashtag Research",
        "Brand Consistency",
        "Editable Source Files",
        "Priority Support",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 11999,
        quantityLabel: "Posts",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },
  ],
},

{
  id: 3,

  slug: "reel-bundle",

  title: "Reel Bundle",

  image: service6,

  quotationType: "bundle",

  plans: [
    {
      id: 1,

      slug: "basic-reel-bundle",

      name: "Basic Reel Bundle",

      subtitle: "Basic",

      tag: "STARTER",

      image: service6,

      price: 7999,

      description:
        "Perfect for businesses looking to build engagement with professionally edited short-form reels.",

      deliverables: [
        "10 Professional Reels",
        "HD Video Editing",
        "Royalty-Free Music",
        "Basic Motion Graphics",
        "1080P Export",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 7999,
        quantityLabel: "Reels",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 2,

      slug: "premium-reel-bundle",

      name: "Premium Reel Bundle",

      subtitle: "Premium",

      tag: "POPULAR",

      image: service6,

      price: 12999,

      description:
        "Ideal for growing brands that need high-quality reels with creative editing and motion graphics.",

      deliverables: [
        "20 Professional Reels",
        "Advanced Video Editing",
        "Motion Graphics",
        "Trending Audio Suggestions",
        "Thumbnail Design",
        "1080P Export",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 12999,
        quantityLabel: "Reels",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 3,

      slug: "advanced-reel-bundle",

      name: "Advanced Reel Bundle",

      subtitle: "Advanced",

      tag: "BEST SELLER",

      image: service6,

      price: 17999,

      description:
        "Complete reel package for brands that require premium editing, motion graphics, and priority delivery.",

      deliverables: [
        "30 Premium Reels",
        "Cinematic Editing",
        "Advanced Motion Graphics",
        "Creative Storytelling",
        "Custom Thumbnails",
        "Priority Delivery",
        "Source Files",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 17999,
        quantityLabel: "Reels",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },
  ],
},

{
  id: 4,

  slug: "festival-bundle",

  title: "Festival Bundle",

  image: service6,

  quotationType: "bundle",

  plans: [
    {
      id: 1,

      slug: "basic-festival-bundle",

      name: "Basic Festival Bundle",

      subtitle: "Basic",

      tag: "STARTER",

      image: service6,

      price: 5999,

      description:
        "Perfect for businesses looking to celebrate major festivals with professionally designed social media creatives.",

      deliverables: [
        "15 Festival Post Designs",
        "Major Indian Festival Creatives",
        "Brand Logo Integration",
        "High Quality JPG & PNG Files",
        "Social Media Ready Designs",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 5999,
        quantityLabel: "Designs",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 2,

      slug: "premium-festival-bundle",

      name: "Premium Festival Bundle",

      subtitle: "Premium",

      tag: "POPULAR",

      image: service6,

      price: 9999,

      description:
        "Ideal for businesses that require premium festival creatives with branding consistency and story designs.",

      deliverables: [
        "30 Festival Post Designs",
        "Premium Creative Designs",
        "Instagram Story Designs",
        "Brand Color Consistency",
        "Editable Source Files",
        "High Resolution Files",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 9999,
        quantityLabel: "Designs",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 3,

      slug: "advanced-festival-bundle",

      name: "Advanced Festival Bundle",

      subtitle: "Advanced",

      tag: "BEST SELLER",

      image: service6,

      price: 14999,

      description:
        "Complete festival marketing package with premium creatives, animated designs, and priority support.",

      deliverables: [
        "50 Premium Festival Designs",
        "Animated Festival Creatives",
        "Instagram Story Designs",
        "WhatsApp Status Designs",
        "Editable Source Files",
        "Priority Support",
        "High Resolution Export",
      ],

      quotationType: "bundle",

      quotation: {
        bundlePrice: 14999,
        quantityLabel: "Designs",
        gst: 18,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },
  ],
},
  ],

  faq:[

  ]

}



export default socialMediaMarketing;