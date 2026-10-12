import service2 from "../../assets/service2.png";

const websiteDevelopment = {
  /* ==========================================================
     BASIC INFORMATION
  ========================================================== */

  id: 2,

  slug: "website-development",

  title: "Website Development",
  readMore: [
    "Custom-coded functionality tailored to your exact business workflow.",
    "Scalable architecture that grows with your business needs.",
    "Secure, well-tested code following modern development practices.",
    "Seamless integration with third-party tools, APIs, and payment gateways.",
    "Post-launch maintenance and bug-fix support included.",
  ],

  category: "Website Development",

  price: 34999,

  pageTitle: "Website Development Cost",

  description: "Dynamic & Custom Web Applications",

  pageDescription:
    "Our website development solutions are tailored to your business goals. Whether you need a custom business portal, corporate website, or enterprise solution, we build scalable, secure, and high-performing websites.",

  image: service2,

  /* ==========================================================
     QUOTATION ENGINE
  ========================================================== */

  quotationType: "website",

  quotationStructure: [
    {
      id: "website",
      label: "Website Development",
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
        "Web hosting for 1 year. Renewal charges apply after expiry.",
      type: "price",
    },
    {
      id: "businessEmail",
      label: "Business Email",
      description: "",
      type: "included",
    },
  ],

  /* ==========================================================
     PLANS
  ========================================================== */

  plans: [
    {
      id: 1,

      slug: "basic-development",

      name: "Basic Website",

      subtitle: "Basic",

      tag: "BASIC",

      image: service2,

      price: 34999,

      description:
        "Ideal for startups and small businesses requiring a professional dynamic website with CMS and essential business features.",

      deliverables: [
        "Admin Panel",
        "Dynamic Website",
        "10–15 Pages",
        "Responsive Design",
        "CMS Integration",
        "Inquiry Form",
        "WhatsApp Integration",
        "SEO Friendly",
        "Business Email",
      ],

      quotation: {
        values: {
          website: 24999,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 2,

      slug: "business-development",

      name: "Business Website",

      subtitle: "Business",

      tag: "POPULAR",

      image: service2,

      price: 49999,

      description:
        "Perfect for growing businesses that require advanced CMS, custom functionality, premium UI, and better scalability.",

      deliverables: [
        "Admin Panel",
        "20–25 Pages",
        "Dynamic Website",
        "Responsive Design",
        "Advanced CMS",
        "Blog Module",
        "WhatsApp Integration",
        "SEO Friendly",
        "Google Analytics",
        "Business Email",
      ],

      quotation: {
        values: {
          website: 39999,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },

    {
      id: 3,

      slug: "enterprise-development",

      name: "Enterprise Website",

      subtitle: "Enterprise",

      tag: "BEST SELLER",

      image: service2,

      price: 69999,

      description:
        "Designed for enterprises requiring custom modules, API integrations, dashboards, automation, premium performance, and maximum scalability.",

      deliverables: [
        "Unlimited Pages",
        "Enterprise CMS",
        "Admin Dashboard",
        "API Integration",
        "Payment Gateway",
        "Advanced Security",
        "Business Email",
        "Google Analytics",
        "Performance Optimization",
        "Premium Support",
      ],

      quotation: {
        values: {
          website: 59999,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },

        gst: 18,

        extraPagePrice: 2000,
      },

      adminLogin: true,

      wishlist: true,

      getQuote: true,
    },
  ],

  /* ==========================================================
     FAQ
  ========================================================== */

  faq: [
    {
      id: 1,
      question: "How much does website development cost?",
      answer:
        "The cost depends on the number of pages, required functionality, integrations, and custom development requirements.",
    },
    {
      id: 2,
      question: "What's included in website development?",
      answer:
        "Every development package includes responsive coding, admin panel, CMS setup, contact forms, business email configuration, and deployment assistance.",
    },
    {
      id: 3,
      question: "Can I manage the website myself?",
      answer:
        "Yes. Every development package includes an easy-to-use admin panel allowing you to update content without coding knowledge.",
    },
    {
      id: 4,
      question: "Do you develop custom features?",
      answer:
        "Yes. We build custom modules such as booking systems, dashboards, portals, APIs, payment gateways, and third-party integrations.",
    },
    {
      id: 5,
      question: "Can I upgrade my website later?",
      answer:
        "Absolutely. Your website can be upgraded anytime with additional modules, pages, or integrations.",
    },
  ],
};

export default websiteDevelopment;