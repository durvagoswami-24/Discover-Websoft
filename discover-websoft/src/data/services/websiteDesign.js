import service1 from "../../assets/service1.png";

const websiteDesign = {
  id: 1,
  slug: "website-designing",

  title: "Website Designing",
  readMore: [
    "Every design is crafted uniquely for your brand -- no generic templates.",
    "Fully responsive layouts that look great on mobile, tablet, and desktop.",
    "SEO-friendly structure built in from day one to help you rank better.",
    "Fast-loading, optimized pages for a smoother user experience.",
    "Dedicated support during and after your website goes live.",
  ],
  category: "Website Designing",

  price: 24400,

  pageTitle: "Website Design Cost",

  description: "Informative & Static Websites",

  pageDescription:
    "The cost depends on your website requirements, features, and level of customization. Get a tailored quote designed to fit your business needs and budget.",

  image: service1,

  quotationType: "website",

  quotationStructure: [
    {
      id: "website",
      label: "Website Design",
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

  plans: [
     {
      id: 1,
      slug: "standard-landing-page",
    
      name: "Standard Landing Page",
      subtitle: "Standard Plan",
    
      price: 24400,
    
      tag: "STANDARD",
    
      image: service1,
    
      description:
        "Use our Website Cost Calculator to estimate the budget for a professional business website. Pricing depends on features, functionality and customization.",
    
      deliverables: [
        "Admin Panel",
        "10–15 Pages Website",
        "Fully Responsive Design",
        "Product / Service Pages",
        "Inquiry Form",
        "WhatsApp Integration",
        "SEO Friendly",
        "Google Map",
      ],
    features: {
      pages: "10 Pages",
      responsive: true,
      adminPanel: true,
      whatsapp: true,
      contactForm: true,
      blog: false,
      seo: false,
      googleAnalytics: false,
      revisions: "2",
      support: "30 Days",
    },
    quotation: {
      values: {
        website: 18400,
        domain: 1500,
        hosting: 4500,
        businessEmail: "Included",
      },
    
      gst: 18,
    
      extraPagePrice: 2000,
    },
      adminLogin: true,
      getQuote: true,
      wishlist: true,
    },
       {
      id: 2,
      slug: "premium-landing-page",
    
      name: "Premium Landing Page",
      subtitle: "Premium",
    
      price: 34400,
    
      tag: "",
    
      image: service1,
    
      description:
        "A professional business website with more pages, premium layouts, enhanced UI, and additional customization options.",
    
      deliverables: [
        "Admin Panel",
        "15–20 Pages Website",
        "Fully Responsive Design",
        "Product / Service Pages",
        "Inquiry Form",
        "WhatsApp Integration",
        "SEO Friendly",
        "Google Map",
        "Blog Module",
        "Social Media Integration",
      ],
    
      features: {
        pages: "20 Pages",
        responsive: true,
        adminPanel: true,
        whatsapp: true,
        contactForm: true,
        blog: true,
        seo: true,
        googleAnalytics: true,
        revisions: "4",
        support: "60 Days",
      },
    
      quotation: {
        values: {
          website: 24400,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },
    
        gst: 18,
    
        extraPagePrice: 2000,
      },
    
      adminLogin: true,
      getQuote: true,
      wishlist: true,
    },
       {
      id: 3,
      slug: "advanced-landing-page",
    
      name: "Advanced Landing Page",
      subtitle: "Advanced",
    
      price: 44400,
    
      tag: "Popular",
    
      image: service1,
    
      description:
        "Enterprise-level website with maximum flexibility, advanced functionality, premium support and complete customization.",
    
      deliverables: [
        "Admin Panel",
        "25+ Pages Website",
        "Fully Responsive Design",
        "Product / Service Pages",
        "Inquiry Form",
        "WhatsApp Integration",
        "SEO Friendly",
        "Google Map",
        "Blog Module",
        "Speed Optimization",
        "Google Analytics",
        "Premium Support",
      ],
    
      features: {
        pages: "Unlimited",
        responsive: true,
        adminPanel: true,
        whatsapp: true,
        contactForm: true,
        blog: true,
        seo: true,
        googleAnalytics: true,
        revisions: "Unlimited",
        support: "90 Days",
      },
    
      quotation: {
        values: {
          website: 34400,
          domain: 1500,
          hosting: 8500,
          businessEmail: "Included",
        },
    
        gst: 18,
    
        extraPagePrice: 2000,
      },
    
      adminLogin: true,
      getQuote: true,
      wishlist: true,
    },
      ],
  

  faq: [
     {
        id: 1,
        question: "How long does website designing usually take?",
        answer:
          "Most website designing projects take anywhere from 5 to 15 business days depending on the number of pages, revisions, and how quickly content and assets are provided.",
      },
      {
        id: 2,
        question: "What's the difference between the Standard, Premium, and Advanced plans?",
        answer:
          "Standard covers a clean single landing page, Premium adds more pages and revisions, and Advanced includes additional customization, extra pages, and faster turnaround.",
      },
      {
        id: 3,
        question: "Do I get to see a design draft before final delivery?",
        answer:
          "Yes. You'll receive an initial design draft for review, and revisions are included based on the plan you choose before the final files are delivered.",
      },
      {
        id: 4,
        question: "Is the website mobile responsive?",
        answer:
          "Yes, every website designing plan includes a fully responsive layout that adapts cleanly across desktop, tablet, and mobile screens.",
      },
      {
        id: 5,
        question: "Can I upgrade my plan later if I need more pages?",
        answer:
          "Absolutely. You can upgrade to a higher plan at any time, and we'll only charge the price difference for the additional pages or features.",
      },
  ],
};

export default websiteDesign;