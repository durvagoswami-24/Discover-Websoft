import service5 from "../../assets/service5.png";

const videoEditing = {
  id: 7,
  slug: "video-editing",

  title: "Video Editing",
  readMore: [
    "Professional editing with smooth transitions and pacing.",
    "Color grading and correction for a polished final look.",
    "Custom motion graphics and on-screen text where needed.",
    "Optimized formats for social media, YouTube, or ads.",
    "Quick turnaround with revision rounds included.",
  ],
  category: "Video Editing",

  price: 4000,

  pageTitle: "Video Editing Cost",

  description:
    "Professional Video Editing Services",

  pageDescription:
    "Professional video editing services tailored to your needs, delivering high-quality, engaging content at competitive and transparent pricing.",

  image: service5,

  quotationType: "quantity",

  plans: [
    {
      id: 1,
      slug: "standard-teaser-package",

      name: "Standard Teaser Package",
      subtitle: "(Professional & engaging)",

      price: 4000,

      tag: "STANDARD PACKAGE",

      image: service5,

      description:
        "Creating short, engaging videos that build excitement and grab attention before a product, service, event, or brand launch. Designed to attract viewers and generate interest quickly.",

      deliverables: [
        "Duration: 30-45 sec",
        "Smooth transitions",
        "Motion text & effects",
        "Color correction",
      ],

      quotation: {
        title: "Standard Teaser Package Quantity",
        description: "Specify the exact number of Teaser required.",
        note: "",
        quantityLabel: "Teaser",
        gst: 18,
      },

      adminLogin: true,
      getQuote: true,
      wishlist: true,
    },
    {
      id: 2,
      slug: "premium-creative-teaser-package",

      name: "Premium / Creative Teaser Package",
      subtitle: "(High-impact marketing teaser)",

      price: 7000,

      tag: "PREMIUM PACKAGE",

      image: service5,

      // TODO: placeholder -- real description/deliverables pending from client
      description:
        "A high-impact creative teaser package designed for maximum engagement and marketing reach. Full details to be confirmed.",

      deliverables: [
        "Duration: TBD",
        "Advanced transitions",
        "Custom motion graphics",
        "Color grading",
      ],

      quotation: {
        title: "Premium / Creative Teaser Package Quantity",
        description: "Specify the exact number of Teaser required.",
        note: "",
        quantityLabel: "Teaser",
        gst: 18,
      },

      adminLogin: true,
      getQuote: true,
      wishlist: true,
    },
  ],

  // TODO: only Q1 has confirmed answer text from Figma -- Q2-Q5 answers are
  // placeholders and need real content from the client.
  faq: [
    {
      id: 1,
      question:
        "What is included in the Standard Teaser Video Editing package?",
      answer:
        "The Standard Teaser Video Editing package includes a 30-45 second professionally edited teaser video with smooth transitions, color correction, motion text and effects, and engaging visuals designed to capture your audience's attention.",
    },
    {
      id: 2,
      question:
        "Who should choose the Standard Teaser Video Editing package?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 3,
      question:
        "How long does it take to deliver the Standard Teaser Video?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 4,
      question: "Can I request changes after receiving the first draft?",
      answer: "Placeholder -- answer to be confirmed.",
    },
    {
      id: 5,
      question: "Can I provide my own footage, logo, and branding elements?",
      answer: "Placeholder -- answer to be confirmed.",
    },
  ],
};

export default videoEditing;
