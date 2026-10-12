import service7 from "../../assets/service7.png";

const appDevelopment = {
  id: 8,
  slug: "app-development",

  title: "App Development",
  readMore: [
    "Native or cross-platform apps built for iOS and Android.",
    "Intuitive UI/UX designed around real user behavior.",
    "Secure backend architecture with reliable API integrations.",
    "Performance-optimized for a smooth experience across devices.",
    "App store submission support and post-launch updates.",
  ],
  category: "App Development",

  price: 205000,

  pageTitle: "Mobile App Development Cost",

  description:
    "Android & iOS App Development",

  pageDescription:
    "Explore affordable mobile app development solutions with transparent pricing, tailored features, and scalable designs to bring your app idea to life.",

  image: service7,

  // No quotationType -- App Development is fixed-price packages,
  // no "Get Customised Quotation" table on the plan page (per Figma).

  ctaBanner: {
    heading: "Have an app idea?",
    highlight: "Let's turn it into reality.",
    subtext:
      "Partner with Discover Websoft to transform your vision into a scalable, high performance digital reality. Our engineering elite is ready to architect your success.",
    buttonText: "Inquiry Now",
    buttonLink: "/contact",
  },

  plans: [
    {
      id: 1,
      slug: "starter-pack",

      name: "Starter",
      subtitle: "4-5 Weeks",

      price: 205000,

      tag: "STARTER PACK",

      image: service7,

      description:
        "Designing and developing mobile applications for Android and iOS with user-friendly interfaces, smooth performance, and custom features tailored to business needs.",

      deliverables: [
        "Website (Responsive React/Next.js)",
        "Customer App (Android)",
        "Email/Phone Registration & Login",
        "Source Code Access (Build Only)",
        "Server Architecture (Shared/Basic VPS)",
        "Basic Search & Sort",
        "Category Hierarchy (Main → Sub)",
        "Profile & Address Management",
        "High-Res Images & Variations",
        "Return/Refund Requests (Manual Form)",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question: "Who should choose the Starter App Development package?",
          answer:
            "The Starter package is ideal for startups, small businesses, and entrepreneurs who want to launch a basic mobile application with essential features at an affordable cost.",
        },
        {
          id: 2,
          question: "What is included in the Starter App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 3,
          question:
            "How long does it take to complete the Starter App Development project?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 4,
          question:
            "Can I customize the features in the Starter App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 5,
          question:
            "Does the Starter App Development package include post-launch support?",
          answer: "Placeholder -- answer to be confirmed.",
        },
      ],
    },
    {
      id: 2,
      slug: "growth-pack",

      name: "Growth",
      subtitle: "6-8 Weeks",

      price: 445000,

      tag: "GROWTH PACK",

      image: service7,

      description:
        "Designing and developing mobile applications for Android and iOS with user-friendly interfaces, smooth performance, and custom features tailored to business needs.",

      deliverables: [
        "Website (Responsive React/Next.js)",
        "Customer App (Android)",
        "Customer App (iOS)",
        "Source Code Access (Build Only)",
        "Server Architecture (Dedicated VPS)",
        "Social Login (Google/FB)",
        "Email/Phone Registration & Login",
        "Profile & Address Management",
        "Apple Login (Required for iOS)",
        "Category Hierarchy (Main → Sub)",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question: "Who should choose the Growth App Development package?",
          answer:
            "The Growth package is ideal for growing businesses, startups, and companies that need a feature-rich mobile application with advanced functionality, improved performance, and greater scalability.",
        },
        {
          id: 2,
          question: "What is included in the Growth App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 3,
          question:
            "How long does it take to complete the Growth App Development project?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 4,
          question: "Can I add custom features to the Growth App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 5,
          question:
            "Does the Growth App Development package include post-launch support?",
          answer: "Placeholder -- answer to be confirmed.",
        },
      ],
    },
    {
      id: 3,
      slug: "entrepreneur-pack",

      // NOTE: listing card in Figma labels this plan "Enterprise" while the
      // detail page tag/heading says "Entrepreneur Pack" -- standardized on
      // "Entrepreneur" everywhere for consistency. Flag if "Enterprise" was
      // actually intended as the real name.
      name: "Entrepreneur",
      subtitle: "10-12 Weeks",

      price: 670000,

      tag: "ENTREPRENEUR PACK",

      image: service7,

      description:
        "Designing and developing mobile applications for Android and iOS with user-friendly interfaces, smooth performance, and custom features tailored to business needs.",

      deliverables: [
        "Website (Responsive React/Next.js)",
        "Customer App (Android)",
        "Customer App (iOS)",
        "Source Code Access (Full Code Handover)",
        "Server Architecture (Cloud Scalable AWS)",
        "Social Login (Google/FB)",
        "Email/Phone Registration & Login",
        "Profile & Address Management",
        "Apple Login (Required for iOS)",
        "Category Hierarchy (Main → Sub)",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question:
            "How long does it take to complete the Entrepreneur App Development project?",
          answer:
            "The Entrepreneur App Development package is typically completed within 10 to 12 weeks, depending on the project scope, custom feature requirements, integrations, and client feedback.",
        },
        {
          id: 2,
          question: "What is included in the Entrepreneur App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 3,
          question: "Who should choose the Entrepreneur App Development package?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 4,
          question:
            "Can I customize the Entrepreneur App Development package with additional features?",
          answer: "Placeholder -- answer to be confirmed.",
        },
        {
          id: 5,
          question:
            "Does the Entrepreneur App Development package include source code ownership and post-launch support?",
          answer: "Placeholder -- answer to be confirmed.",
        },
      ],
    },
  ],

  // Service-level FAQ, shown on ServicePage listing (Image 1)
  faq: [
    {
      id: 1,
      question: "What is included in the Mobile App Development packages?",
      answer:
        "The Mobile App Development packages include UI/UX design, app development, testing, deployment support, and essential features based on the selected package. Additional custom features can also be added according to your business requirements.",
    },
    {
      id: 2,
      question: "Which Mobile App Development package is best for my business?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 3,
      question: "How long does it take to develop a mobile app?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 4,
      question: "Can I customize my mobile app according to my business needs?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 5,
      question: "Do you provide support and maintenance after the mobile app is launched?",
      answer: "Placeholder -- answer to be confirmed.",
    },
  ],
};

export default appDevelopment;
