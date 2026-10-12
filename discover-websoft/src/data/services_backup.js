// ═══════════════════════════════════════════════════════════════════════
// SINGLE SOURCE OF TRUTH — src/data/services.js
// Powers Shop.jsx, ServicePage.jsx (/shop/:serviceSlug), and
// PlanPage.jsx (/service/:serviceSlug/:planSlug).
//
// Building this in stages on purpose:
//   Stage 1 (this file, now): basic service info + plans only
//   Stage 2: ServicePage.jsx reads this and renders the plan cards
//   Stage 3: extend each plan with deliverables, pricing table, order
//            summary, related services, FAQ — once Stage 2 is confirmed
//            working end to end.
//
// NOTE: `category` and `price` were added at the top level of each
// service object. Shop.jsx's sidebar filter matches on `service.category`
// and the price slider matches on `service.price`, so both fields are
// required here regardless of the per-plan pricing inside `plans`.
// `price` is set to the lowest plan price for that service (i.e. the
// "starting from" price shown on the Shop card).
// ═══════════════════════════════════════════════════════════════════════

// Images — reusing the exact same asset files already imported in
// Shop.jsx (service1.png ... service10.png), so nothing needs to change
// in your assets folder.
import service1 from "../assets/service1.png"; // Website Designing
import service2 from "../assets/service2.png"; // Website Development
import service3 from "../assets/service3.png"; // E-commerce Website Development
import service4 from "../assets/service4.png"; // WordPress Website
import service5 from "../assets/service5.png"; // Social Media Marketing
import service6 from "../assets/service6.png"; // Video Editing
import service7 from "../assets/service7.png"; // App Development
import service8 from "../assets/service8.png"; // SEO
import service9 from "../assets/service9.png"; // Branding
import service10 from "../assets/service10.png"; // Graphic Designing

export const services = [
  {
  id: 1,
  slug: "website-designing",

  title: "Website Designing",
  category: "Website Designing",

  price: 24400,

  pageTitle: "Website Design Cost",               //shop page 

  description: "Informative & Static Websites",      //Shop card

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
   // FAQ content specific to this service — rendered at the bottom of
    // ServicePage.jsx via the shared <FAQ /> component.
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
  },


{
  id: 2,
  slug: "website-development",

  title: "Website Development",
  category: "Website Development",

  price: 34999,

  pageTitle: "Website Development Cost",

  description: "Dynamic & Custom Web Applications",

  pageDescription:
    "Our website development solutions are tailored to your business goals. Whether you need a custom business portal, corporate website, or enterprise solution, we build scalable, secure, and high-performing websites.",

  image: service2,

  plans: [
    {
      id: 1,
      slug: "basic-development",
      name: "Basic Website",
      subtitle: "Basic",
      price: 34999,
      tag: "",
    },
    {
      id: 2,
      slug: "business-development",
      name: "Business Website",
      subtitle: "Business",
      price: 49999,
      tag: "",
    },
    {
      id: 3,
      slug: "enterprise-development",
      name: "Enterprise Website",
      subtitle: "Enterprise",
      price: 69999,
      tag: "Best Seller",
    },
  ],
},
{
  id: 3,
  slug: "ecommerce-website-development",

  title: "E-commerce Website Development",
  category: "Ecommerce Development",

  price: 59999,

  pageTitle: "E-commerce Website Cost",

  description: "Online Store Solutions",

  pageDescription:
    "Launch your online store with a secure, scalable, and user-friendly e-commerce website. We build feature-rich shopping experiences with payment gateway integration, inventory management, and responsive design.",

  image: service3,

  plans: [
    {
      id: 1,
      slug: "starter-store",
      name: "Starter Store",
      subtitle: "Starter",
      price: 59999,
      tag: "",
    },
    {
      id: 2,
      slug: "business-store",
      name: "Business Store",
      subtitle: "Business",
      price: 79999,
      tag: "",
    },
    {
      id: 3,
      slug: "enterprise-store",
      name: "Enterprise Store",
      subtitle: "Enterprise",
      price: 99999,
      tag: "Popular",
    },
  ],
},

{
  id: 4,
  slug: "wordpress-website",

  title: "WordPress Website",
  category: "Website Development",

  price: 17999,

  pageTitle: "WordPress Website Cost",

  description: "Professional WordPress Websites",

  pageDescription:
    "Build a modern, responsive, and easy-to-manage WordPress website for your business. We create SEO-friendly websites with premium themes, custom layouts, and fast performance.",

  image: service4,

  plans: [
    {
      id: 1,
      slug: "basic-wordpress",
      name: "Basic WordPress Website",
      subtitle: "Basic",
      price: 17999,
      tag: "",
    },
    {
      id: 2,
      slug: "business-wordpress",
      name: "Business WordPress Website",
      subtitle: "Business",
      price: 24999,
      tag: "",
    },
    {
      id: 3,
      slug: "premium-wordpress",
      name: "Premium WordPress Website",
      subtitle: "Premium",
      price: 34999,
      tag: "Best Value",
    },
  ],
},

{
  id: 5,
  slug: "social-media-marketing",

  title: "Social Media Marketing",
  category: "Social Media Marketing",

  price: 11999,

  pageTitle: "Social Media Marketing Packages",

  description: "Content Creation & Management",

  pageDescription:
    "Grow your brand across social media platforms with strategic content creation, audience engagement, paid campaigns, and monthly performance reporting tailored to your business goals.",

  image: service5,

  plans: [
    {
      id: 1,
      slug: "silver",
      name: "Silver Package",
      subtitle: "Silver",
      price: 11999,
      tag: "",
    },
    {
      id: 2,
      slug: "gold",
      name: "Gold Package",
      subtitle: "Gold",
      price: 17999,
      tag: "Most Popular",
    },
    {
      id: 3,
      slug: "diamond",
      name: "Diamond Package",
      subtitle: "Diamond",
      price: 24999,
      tag: "",
    },
    {
      id: 4,
      slug: "festival-campaign",
      name: "Festival Campaign Package",
      subtitle: "Festival",
      price: 29999,
      tag: "Seasonal",
    },
  ],
},
{
  id: 6,
  slug: "video-editing",

  title: "Video Editing",
  category: "Video Editing",

  price: 9999,

  pageTitle: "Video Editing Packages",

  description: "Professional Video Editing",

  pageDescription:
    "Create engaging and high-quality videos for your business, brand, or social media. From YouTube videos to Instagram Reels and promotional ads, our editing services are tailored to your needs.",

  image: service6,

  quotationType: "quantity",

  plans: [
    {
      id: 1,
      slug: "basic-video-editing",

      name: "Basic Video Editing",
      subtitle: "Basic",

      price: 9999,

      tag: "",

      image: service6,
    },

    {
      id: 2,
      slug: "professional-video-editing",

      name: "Professional Video Editing",
      subtitle: "Professional",

      price: 14999,

      tag: "Most Popular",

      image: service6,
    },

    {
      id: 3,
      slug: "premium-video-editing",

      name: "Premium Video Editing",
      subtitle: "Premium",

      price: 19999,

      tag: "",

      image: service6,
    },
  ],

  faq: [
    {
      id: 1,
      question: "What types of videos do you edit?",
      answer:
        "We edit YouTube videos, Instagram Reels, Shorts, promotional videos, advertisements, corporate videos, wedding videos, podcasts, and more.",
    },
    {
      id: 2,
      question: "Can you add subtitles and motion graphics?",
      answer:
        "Yes. We can add subtitles, motion graphics, transitions, animations, background music, and branding elements depending on your package.",
    },
    {
      id: 3,
      question: "How many revisions are included?",
      answer:
        "The number of revisions depends on your selected package. Additional revisions can also be requested if needed.",
    },
    {
      id: 4,
      question: "What video formats do you deliver?",
      answer:
        "We deliver videos in MP4, MOV, and other formats suitable for YouTube, Instagram, Facebook, LinkedIn, and other platforms.",
    },
    {
      id: 5,
      question: "How long does video editing take?",
      answer:
        "Delivery time depends on the complexity of the project, but most videos are completed within 2–7 business days.",
    },
  ],
},
{
  id: 7,
  slug: "app-development",

  title: "App Development",
  category: "App Development",

  price: 49999,

  pageTitle: "App Development Packages",

  description: "Android & iOS Mobile Applications",

  pageDescription:
    "Build powerful Android and iOS applications with modern UI, high performance, and scalable architecture. We develop custom mobile applications tailored to your business requirements.",

  image: service7,

  quotationType: "website",

  plans: [
    {
      id: 1,
      slug: "basic-app",

      name: "Basic App",
      subtitle: "Basic",

      price: 49999,

      tag: "",

      image: service7,
    },

    {
      id: 2,
      slug: "business-app",

      name: "Business App",
      subtitle: "Business",

      price: 79999,

      tag: "Most Popular",

      image: service7,
    },

    {
      id: 3,
      slug: "enterprise-app",

      name: "Enterprise App",
      subtitle: "Enterprise",

      price: 119999,

      tag: "",

      image: service7,
    },
  ],

  faq: [
    {
      id: 1,
      question: "Do you develop Android and iOS apps?",
      answer:
        "Yes. We develop Android, iOS, and cross-platform mobile applications depending on your project requirements.",
    },
    {
      id: 2,
      question: "Will I get the source code?",
      answer:
        "Yes, once the project is completed and all payments are cleared, you'll receive the complete source code.",
    },
    {
      id: 3,
      question: "Can you publish my app on Play Store and App Store?",
      answer:
        "Yes. We can assist with publishing your application on both Google Play Store and Apple App Store.",
    },
    {
      id: 4,
      question: "Can I add more features later?",
      answer:
        "Absolutely. The application can be upgraded with additional features whenever required.",
    },
    {
      id: 5,
      question: "How long does app development take?",
      answer:
        "Development time depends on complexity but generally ranges between 4–12 weeks.",
    },
  ],
},
{
  id: 8,
  slug: "seo",

  title: "SEO",
  category: "SEO",

  price: 14999,

  pageTitle: "SEO Packages",

  description: "Search Engine Optimization",

  pageDescription:
    "Increase your website visibility on Google with our professional SEO services. We optimize your website for better rankings, traffic, and lead generation using ethical SEO strategies.",

  image: service8,

  quotationType: "quantity",

  plans: [
    {
      id: 1,
      slug: "starter-seo",

      name: "Starter SEO",
      subtitle: "Starter",

      price: 14999,

      tag: "",

      image: service8,
    },

    {
      id: 2,
      slug: "growth-seo",

      name: "Growth SEO",
      subtitle: "Growth",

      price: 24999,

      tag: "Most Popular",

      image: service8,
    },

    {
      id: 3,
      slug: "premium-seo",

      name: "Premium SEO",
      subtitle: "Premium",

      price: 39999,

      tag: "",

      image: service8,
    },
  ],

  faq: [
    {
      id: 1,
      question: "How long does SEO take to show results?",
      answer:
        "SEO is a long-term strategy. Most websites start seeing noticeable improvements within 3 to 6 months depending on competition and website condition.",
    },
    {
      id: 2,
      question: "Do you guarantee first-page rankings?",
      answer:
        "No ethical SEO agency can guarantee first-page rankings. We follow Google's best practices to achieve sustainable long-term growth.",
    },
    {
      id: 3,
      question: "Do you provide monthly SEO reports?",
      answer:
        "Yes. Every package includes detailed monthly reports showing keyword rankings, traffic, and completed optimization work.",
    },
    {
      id: 4,
      question: "Is local SEO included?",
      answer:
        "Yes. We can optimize your Google Business Profile and improve your visibility in local search results.",
    },
    {
      id: 5,
      question: "Can you optimize an existing website?",
      answer:
        "Yes. We can optimize both new and existing websites regardless of the platform they're built on.",
    },
  ],
},
{
  id: 9,
  slug: "branding",

  title: "Branding",
  category: "Branding",

  price: 19999,

  pageTitle: "Branding Packages",

  description: "Complete Business Branding Solutions",

  pageDescription:
    "Build a strong and memorable brand identity with our professional branding services. From logo design to brand guidelines and marketing materials, we help your business create a lasting impression.",

  image: service9,

  quotationType: "quantity",

  plans: [
    {
      id: 1,
      slug: "starter-branding",

      name: "Starter Branding",
      subtitle: "Starter",

      price: 19999,

      tag: "",

      image: service9,
    },

    {
      id: 2,
      slug: "business-branding",

      name: "Business Branding",
      subtitle: "Business",

      price: 29999,

      tag: "Most Popular",

      image: service9,
    },

    {
      id: 3,
      slug: "complete-branding",

      name: "Complete Branding",
      subtitle: "Complete",

      price: 44999,

      tag: "",

      image: service9,
    },
  ],

  faq: [
    {
      id: 1,
      question: "What is included in branding?",
      answer:
        "Branding may include logo design, brand colors, typography, stationery, social media branding, and brand guidelines depending on the selected package.",
    },
    {
      id: 2,
      question: "Will I receive editable source files?",
      answer:
        "Yes. All final branding packages include editable source files along with high-resolution export files.",
    },
    {
      id: 3,
      question: "Can I request revisions?",
      answer:
        "Yes. Each package includes a specific number of revisions, and additional revisions can be requested if required.",
    },
    {
      id: 4,
      question: "Can you redesign my existing brand?",
      answer:
        "Absolutely. We can modernize or completely redesign your existing brand identity while maintaining brand consistency.",
    },
    {
      id: 5,
      question: "How long does branding take?",
      answer:
        "Most branding projects are completed within 7–15 business days depending on the package and project scope.",
    },
  ],
},
{
  id: 10,
  slug: "graphic-designing",

  title: "Graphic Designing",
  category: "Graphic Designing",

  price: 4999,

  pageTitle: "Graphic Designing Packages",

  description: "Creative Graphic Design Solutions",

  pageDescription:
    "Enhance your brand with professional graphic design services. From logos and social media creatives to brochures and packaging, we create visually appealing designs that leave a lasting impression.",

  image: service10,

  quotationType: "subcategory",

  plans: [
    {
      id: 1,
      slug: "graphic-design-pack",

      name: "Graphic Design Pack",
      subtitle: "Starter",

      price: 4999,

      tag: "",

      image: service10,
    },

    {
      id: 2,
      slug: "business-design-pack",

      name: "Business Design Pack",
      subtitle: "Business",

      price: 9999,

      tag: "Most Popular",

      image: service10,
    },

    {
      id: 3,
      slug: "premium-design-pack",

      name: "Premium Design Pack",
      subtitle: "Premium",

      price: 14999,

      tag: "",

      image: service10,
    },
  ],

  subCategories: [
    {
      id: 1,
      title: "Logo Design",
      slug: "logo-design",
      hasQuotation: true,
    },
    {
      id: 2,
      title: "Business Card",
      slug: "business-card",
      hasQuotation: true,
    },
    {
      id: 3,
      title: "Letterhead",
      slug: "letterhead",
      hasQuotation: true,
    },
    {
      id: 4,
      title: "Brochure Design",
      slug: "brochure-design",
      hasQuotation: true,
    },
    {
      id: 5,
      title: "Flyer Design",
      slug: "flyer-design",
      hasQuotation: true,
    },
    {
      id: 6,
      title: "Poster Design",
      slug: "poster-design",
      hasQuotation: true,
    },
    {
      id: 7,
      title: "Banner Design",
      slug: "banner-design",
      hasQuotation: true,
    },
    {
      id: 8,
      title: "Social Media Post",
      slug: "social-media-post",
      hasQuotation: true,
    },
    {
      id: 9,
      title: "Packaging Design",
      slug: "packaging-design",
      hasQuotation: true,
    },
    {
      id: 10,
      title: "Menu Design",
      slug: "menu-design",
      hasQuotation: true,
    },
    {
      id: 11,
      title: "Certificate Design",
      slug: "certificate-design",
      hasQuotation: true,
    },
    {
      id: 12,
      title: "Invitation Card",
      slug: "invitation-card",
      hasQuotation: true,
    },
    {
      id: 13,
      title: "Custom Design",
      slug: "custom-design",
      hasQuotation: false,
    },
  ],

  faq: [
    {
      id: 1,
      question: "What graphic design services do you offer?",
      answer:
        "We offer logo design, brochures, banners, flyers, social media creatives, business cards, packaging, posters, and many other custom graphic design services.",
    },
    {
      id: 2,
      question: "Will I receive editable files?",
      answer:
        "Yes. Final designs are delivered with editable source files (AI, PSD, or other formats depending on the project).",
    },
    {
      id: 3,
      question: "How many revisions are included?",
      answer:
        "Every package includes revisions. The exact number depends on the selected package.",
    },
    {
      id: 4,
      question: "Can I request custom designs?",
      answer:
        "Absolutely. If your required design category isn't listed, we can create a completely custom quotation for you.",
    },
    {
      id: 5,
      question: "How long does it take to complete a design?",
      answer:
        "Most graphic design projects are completed within 2–5 business days depending on the complexity of the design.",
    },
  ],
},
  // Website Development, E-commerce, WordPress, Social Media Marketing,
  // SEO, Branding, Graphic Designing, Video Editing, App Development
  // go here next, once Website Designing is confirmed working through
  // ServicePage.jsx.
  //
  // IMPORTANT: each new entry added here must also include a top-level
  // `category` (matching one of the sidebar filter labels in Shop.jsx)
  // and a top-level `price` (the lowest price among that service's
  // plans), or the Shop page's category filter and price slider will
  // silently exclude that service.
];