import service3 from "../../assets/service3.png";

const ecommerceWebsite = {
  id: 3,

  slug: "ecommerce-website",

  title: "E-Commerce Website",
  readMore: [
    "Secure payment gateway integration for a smooth checkout experience.",
    "Product catalog management with easy inventory updates.",
    "Mobile-optimized shopping experience to capture more sales.",
    "Built-in SEO to help customers discover your products organically.",
    "Order tracking, coupons, and customer account features included.",
  ],

  category: "E-Commerce Website",

  price: 31400,

  pageTitle: "E-Commerce Website Cost",

  description: "Scalable Online Store Solutions",

  pageDescription:
    "A robust, multi-faceted e-commerce platform designed for startups, growing businesses, and enterprises. Includes responsive design, secure payment integration, product management, and scalable architecture.",

  image: service3,

  quotationType: "ecommerce",

  quotationStructure: [
    {
      id: "website",
      label: "E-Commerce Website",
      description: "",
      type: "price",
    },
    {
      id: "domain",
      label: "Domain",
      description:
        "Domain registration for 1 year. Renewal charges apply after expiry.",
      type: "price",
    },
    {
      id: "hosting",
      label: "Hosting",
      description:
        "Hosting for 1 year. Renewal charges apply after expiry.",
      type: "price",
    },
    {
      id: "businessEmail",
      label: "Business Email",
      description: "",
      type: "included",
    },
  ],

  plans: [
    // ======================================================
    // SMALL STARTUP
    // ======================================================

    {
      id: 1,

      slug: "small-startup",

      name: "Small Startup",

      subtitle: "Standard",

      tag: "SMALL STARTUPS",

      image: service3,

      price: 31400,

      description:
        "A complete online store for startups with responsive design, secure checkout, product management, and WhatsApp order integration.",

      deliverables: [
        "10–15 Pages Website",
        "Responsive Design",
        "Product Management",
        "Add To Cart",
        "WhatsApp Orders",
        "Business Email",
        "Payment Gateway Ready",
        "Basic SEO",
      ],

      quotation: {
        values: {
          website: 21400,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,

        perProductPrice: 15,

        mockupPrice: 250,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    // ======================================================
    // BUSINESS STORE
    // ======================================================

    {
      id: 2,

      slug: "business-store",

      name: "Business Store",

      subtitle: "Premium",

      tag: "BUSINESS",

      image: service3,

      price: 41400,

      description:
        "Designed for growing businesses requiring larger catalogs, enhanced UI, customer accounts, and advanced store functionality.",

      deliverables: [
        "20–30 Pages Website",
        "Responsive Design",
        "Unlimited Categories",
        "Shopping Cart",
        "Wishlist",
        "Payment Gateway",
        "Business Email",
        "Advanced SEO",
        "Coupon System",
      ],

      quotation: {
        values: {
          website: 31400,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,

        perProductPrice: 15,

        mockupPrice: 200,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    // ======================================================
    // ENTERPRISE STORE
    // ======================================================

    {
      id: 3,

      slug: "enterprise-store",

      name: "Enterprise Store",

      subtitle: "Advanced",

      tag: "ENTERPRISE",

      image: service3,

      price: 51400,

      description:
        "Enterprise-grade e-commerce solution with advanced automation, integrations, premium UI, and high-performance architecture.",

      deliverables: [
        "Unlimited Pages",
        "Enterprise Dashboard",
        "Advanced Product Filters",
        "Multi Payment Gateway",
        "Wishlist",
        "Order Tracking",
        "Business Email",
        "Premium SEO",
        "Speed Optimization",
        "Inventory Management",
      ],

      quotation: {
        values: {
          website: 41400,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,

        perProductPrice: 15,

        mockupPrice: 150,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },
  ],

  faq: [
    {
      id: 1,
      question: "How much does an e-commerce website cost?",
      answer:
        "The cost depends on the number of products, pages, custom features, integrations, and design requirements. Our plans are designed for startups through enterprise businesses.",
    },
    {
      id: 2,
      question: "Can I add more products later?",
      answer:
        "Yes. You can add products anytime through the admin panel or request us to upload products for you.",
    },
    {
      id: 3,
      question: "Will my store support online payments?",
      answer:
        "Yes. Every plan is payment gateway ready and supports popular payment providers.",
    },
    {
      id: 4,
      question: "Do you provide product upload services?",
      answer:
        "Yes. Product uploads are charged separately according to the selected package and quantity.",
    },
    {
      id: 5,
      question: "Can I request additional pages later?",
      answer:
        "Absolutely. Additional pages can be added anytime and are charged according to the extra page pricing.",
    },
  ],
};

export default ecommerceWebsite;