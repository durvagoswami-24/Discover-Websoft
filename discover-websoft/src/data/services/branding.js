import service9 from "../../assets/service9.png";

const branding = {
  id: 10,
  slug: "branding",

  title: "Branding",
  readMore: [
    "Complete brand identity including logo, colors, and typography.",
    "Brand guidelines document for consistent future use.",
    "Positioning strategy that differentiates you from competitors.",
    "Assets designed to work across digital and print media.",
    "Collaborative process with revisions based on your feedback.",
  ],
  category: "Branding",

  price: 8000,

  pageTitle: "Branding Services Cost",

  description:
    "Build a strong, memorable brand identity that stands out.",

  pageDescription:
    "Get professional branding solutions that help your business stand out, build credibility, and create a lasting impression—all at affordable and transparent pricing.",

  image: service9,

  // No quotationType -- Branding is fixed-price packages,
  // no "Get Customised Quotation" table on the plan page (per Figma).

  plans: [
    {
      id: 1,
      slug: "1-week-branding-package",

      name: "1 Week Branding Package",

      price: 8000,

      tag: "1 WEEK PACKAGE",

      image: service9,

      description:
        "Creating a unique identity for your business through logo design, colors, visuals, and messaging to build recognition and trust.",

      deliverables: [
        "Research Analysis",
        "Logo Sketching",
        "Logo Creation",
        "Typography",
        "Colour Palette",
        "Mockup Presentation",
        "Maximum 3 samples for logo",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question: "What is included in the 1 Week Branding Package?",
          answer:
            "The 1 Week Branding Package includes research analysis, logo sketching, logo creation, typography selection, color palette development, mockup presentation, and up to 3 logo concepts.",
        },
        { id: 2, question: "Who should choose the 1 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "How long does it take to complete the 1 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 4, question: "Can I request revisions to my branding design?", answer: "Placeholder -- answer to be confirmed." },
        { id: 5, question: "What files will I receive after the branding project is completed?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },
    {
      id: 2,
      slug: "2.5-week-branding-package",

      name: "2.5 Week Branding Package",

      price: 14000,

      tag: "2.5 WEEK PACKAGE",

      image: service9,

      description:
        "Creating a unique identity for your business through logo design, colors, visuals, and messaging to build recognition and trust.",

      deliverables: [
        "Research Analysis",
        "Logo Sketching",
        "Logo Creation",
        "Typography",
        "Colour Palette",
        "Mockup Presentation",
        "Brand Name Suggestions",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question: "What is included in the 2.5 Week Branding Package?",
          answer:
            "The 2.5 Week Branding Package includes research analysis, logo sketching, logo creation, typography selection, color palette development, mockup presentation, and brand name suggestions to build a strong and professional brand identity.",
        },
        { id: 2, question: "Who should choose the 2.5 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "How long does it take to complete the 2.5 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 4, question: "Can I request revisions during the branding process?", answer: "Placeholder -- answer to be confirmed." },
        { id: 5, question: "Will I receive all branding files after the project is completed?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },
    {
      id: 3,
      slug: "4-week-branding-package",

      name: "4 Week Branding Package",

      // NOTE: listing page in Figma showed ₹40,000 for this plan, but the
      // plan detail page showed ₹20,000. Confirmed with client -- ₹20,000
      // is correct.
      price: 20000,

      tag: "4 WEEK PACKAGE",

      image: service9,

      description:
        "Creating a unique identity for your business through logo design, colors, visuals, and messaging to build recognition and trust.",

      // NOTE: deliverables list shown on the Figma detail page was identical
      // to the 2.5 Week package. The FAQ answer mentions "a complete brand
      // identity solution tailored to your business" as an extra item, added
      // below, but the full deliverables list may be understated -- flag if
      // the 4 Week package should have more distinct deliverables.
      deliverables: [
        "Research Analysis",
        "Logo Sketching",
        "Logo Creation",
        "Typography",
        "Colour Palette",
        "Mockup Presentation",
        "Brand Name Suggestions",
        "Complete Brand Identity Solution",
      ],

      adminLogin: true,
      getQuote: true,
      wishlist: true,

      faq: [
        {
          id: 1,
          question: "What is included in the 4 Week Branding Package?",
          answer:
            "The 4 Week Branding Package includes research analysis, logo sketching, logo creation, typography selection, color palette development, mockup presentation, brand name suggestions, and a complete brand identity solution tailored to your business.",
        },
        { id: 2, question: "Who should choose the 4 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "How long does it take to complete the 4 Week Branding Package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 4, question: "Can I request revisions during the branding project?", answer: "Placeholder -- answer to be confirmed." },
        { id: 5, question: "What deliverables will I receive when the 4 Week Branding Package is completed?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },
  ],

  faq: [
    {
      id: 1,
      question: "What is included in the Branding Services package?",
      answer:
        "The Branding Services package includes logo design, brand identity creation, color palette selection, typography, business stationery, brand guidelines, and other visual branding elements based on the selected package.",
    },
    { id: 2, question: "Which Branding package is best for my business?", answer: "Placeholder -- answer to be confirmed." },
    { id: 3, question: "How long does it take to complete a branding project?", answer: "Placeholder -- answer to be confirmed." },
    { id: 4, question: "Can I request revisions during the branding process?", answer: "Placeholder -- answer to be confirmed." },
    { id: 5, question: "Why is professional branding important for my business?", answer: "Placeholder -- answer to be confirmed." },
  ],
};

export default branding;
