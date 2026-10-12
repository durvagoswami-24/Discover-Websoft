/* ==========================================================
   IMPORTS
========================================================== */
import graphicHero from "../../assets/service10.png";

import billboardImg from "../../assets/billboard.png";
import mascotImg from "../../assets/mascot.png";
import logoImg from "../../assets/logo.png";
import brochureImg from "../../assets/brochure.png";
import bannerImg from "../../assets/banner.png";
import posterImg from "../../assets/poster.png";
import letterheadImg from "../../assets/letterhead.png";
import invitationImg from "../../assets/invitation card.png";
import packagingImg from "../../assets/packaging.png";
import labelImg from "../../assets/label.png";
import visitingCardImg from "../../assets/bg.png"; // <-- temporary
import adsImg from "../../assets/ads.png";
import standeeImg from "../../assets/bg.png"; // <-- temporary
import menuCardImg from "../../assets/menu.png";


/* ==========================================================
   GRAPHIC DESIGNING
========================================================== */

const graphicDesigning = {
  id: 6,

  slug: "graphic-designing",

  category: "Graphic Designing",

  title: "Graphic Designing",
  readMore: [
    "Original, brand-aligned visuals for every requirement.",
    "Print-ready and digital-ready file formats provided.",
    "Multiple concepts within the scope of your selected plan.",
    "Consistent design language across all your materials.",
    "Fast delivery without compromising on quality.",
  ],

 // ✅ Add these two lines
  description: "Creative designs for logos, banners, brochures, and more.",

  price: 3500,


  pageTitle: "Graphic Design Services",

  pageDescription:
    "Transform your brand with creative graphic design solutions. From logos and branding to marketing materials, packaging, banners, and social creatives, we deliver visually compelling designs that leave a lasting impression.",

  image: graphicHero,

  quotationType: null,

  subServices: [

    /* ==========================================================
       BILLBOARD DESIGN
    ========================================================== */

    {
      id: 1,

      slug: "billboard-design",

      title: "Billboard Designing",

      image: billboardImg,

      pageTitle: "Billboard Design Cost",

      pageDescription:
        "Get eye-catching billboard designs that maximize visibility, strengthen brand presence, and effectively communicate your message at competitive pricing.",

      quotationType: "quantity",

      plans: [

  /* ==========================================================
     BASIC BILLBOARD
  ========================================================== */
  {
    id: 1,

    slug: "basic-billboard",

    tag: "Basic Design",

    name: "Basic Billboard Design",

    subtitle: "Basic Design",

    price: 3500,

    image: billboardImg,

    quotationType: "quantity",

    description:
      "Creating eye-catching and impactful billboard designs that effectively promote a brand, product, service, or event with clear visuals and concise messaging to attract maximum attention.",

    deliverables: [
      "Custom Billboard Design",
      "Perfect for Small Campaigns or New Launch",
      "JPG/PNG Preview Files",
      "Ideal for Testing Content Ideas",
    ],

    quotation: {
      title: "Basic Billboard Quantity",
      description:
        "Specify the exact number of Design required.",
      note: "Printing charges are not included.",
    },
  },

  /* ==========================================================
     STANDARD BILLBOARD
  ========================================================== */
  {
    id: 2,

    slug: "standard-billboard",

    tag: "Standard Design",

    name: "Standard Billboard Design",

    subtitle: "Standard Design",

    price: 6500,

    image: billboardImg,

    quotationType: "quantity",

    description:
      "Creating eye-catching and impactful billboard designs that effectively promote a brand, product, service, or event with clear visuals and concise messaging to attract maximum attention.",

    deliverables: [
      "High Resolution Final Artwork",
      "Print Ready File (PDF/JPG)",
      "Size and Dimension Setup as per Billboard Specification",
      "Mockup Preview",
    ],

    quotation: {
      title: "Standard Billboard Quantity",
      description:
        "Specify the exact number of Design required.",
      note: "Printing charges are not included.",
    },
  },

  /* ==========================================================
     PREMIUM BILLBOARD
  ========================================================== */
  {
    id: 3,

    slug: "premium-billboard",

    tag: "Premium Design",

    name: "Premium Billboard Design",

    subtitle: "Premium Design",

    price: 8500,

    image: billboardImg,

    quotationType: "quantity",

    description:
      "Creating eye-catching and impactful billboard designs that effectively promote a brand, product, service, or event with clear visuals and concise messaging to attract maximum attention.",

    deliverables: [
      "Custom Billboard Design Concept",
      "High-Resolution Print-Ready Files",
      "Multiple Size Adaptations",
      "Premium Typography & Layout Design",
    ],

    quotation: {
      title: "Premium Billboard Quantity",
      description:
        "Specify the exact number of Design required.",
      note: "Printing charges are not included.",
    },
  },
],
    },
/* ==========================================================
   MASCOT DESIGN
========================================================== */

{
  id: 2,

  slug: "mascot-design",

  title: "Mascot Design",

  image: mascotImg,

  pageTitle: "Mascot Design Cost",

  pageDescription:
    "Create memorable mascot designs that strengthen your brand identity and build a lasting connection with your audience through unique and creative character illustrations.",

  quotationType: "quantity",

  plans: [

    /* ==========================================================
       BASIC MASCOT
    ========================================================== */

    {
      id: 1,

      slug: "basic-mascot",

      tag: "Basic Design",

      name: "Basic Mascot Design",

      subtitle: "Basic Design",

      price: 5000,

      image: mascotImg,

      quotationType: "quantity",

      description:
        "A creative mascot design suitable for startups, local businesses, and promotional campaigns.",

      deliverables: [
        "1 Custom Mascot Concept",
        "High Quality PNG/JPG Files",
        "Simple Character Illustration",
        "Basic Color Variations",
      ],

      quotation: {
        title: "Basic Mascot Quantity",
        description:
          "Specify the exact number of Mascot Designs required.",
        note: "Source file is not included.",
      },
    },

    /* ==========================================================
       STANDARD MASCOT
    ========================================================== */

    {
      id: 2,

      slug: "standard-mascot",

      tag: "Standard Design",

      name: "Standard Mascot Design",

      subtitle: "Standard Design",

      price: 9000,

      image: mascotImg,

      quotationType: "quantity",

      description:
        "Professionally illustrated mascot with enhanced detailing for business branding and marketing.",

      deliverables: [
        "2 Custom Mascot Concepts",
        "Print Ready Files",
        "High Resolution PNG/PDF",
        "Commercial Usage",
      ],

      quotation: {
        title: "Standard Mascot Quantity",
        description:
          "Specify the exact number of Mascot Designs required.",
        note: "Source file is included.",
      },
    },

    /* ==========================================================
       PREMIUM MASCOT
    ========================================================== */

    {
      id: 3,

      slug: "premium-mascot",

      tag: "Premium Design",

      name: "Premium Mascot Design",

      subtitle: "Premium Design",

      price: 15000,

      image: mascotImg,

      quotationType: "quantity",

      description:
        "Premium mascot illustration crafted with advanced detailing for professional branding campaigns.",

      deliverables: [
        "3 Custom Concepts",
        "Editable Source Files",
        "Print Ready Files",
        "Commercial Usage License",
      ],

      quotation: {
        title: "Premium Mascot Quantity",
        description:
          "Specify the exact number of Mascot Designs required.",
        note: "Editable source file included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   LOGO DESIGN
========================================================== */

{
  id: 3,

  slug: "logo-design",

  title: "Logo Design",

  image: logoImg,

  pageTitle: "Logo Design Cost",

  pageDescription:
    "Create a unique and memorable logo that reflects your brand identity and leaves a lasting impression. Our logo design services combine creativity, strategy, and professionalism to build a strong visual identity for your business.",

  quotationType: null,

  plans: [

    /* ==========================================================
       BASIC LOGO
    ========================================================== */

    {
      id: 1,

      slug: "basic-logo",

      tag: "Basic Design",

      name: "Basic Logo Design",

      subtitle: "Basic Design",

      price: 2000,

      image: logoImg,

      description:
        "Simple and professional logo concepts suitable for startups, local businesses, and personal brands.",

      deliverables: [
        "1 Logo Concept",
        "High Resolution PNG",
        "JPG Format",
        "Transparent Background",
      ],
    },

    /* ==========================================================
       STANDARD LOGO
    ========================================================== */

    {
      id: 2,

      slug: "standard-logo",

      tag: "Standard Design",

      name: "Standard Logo Design",

      subtitle: "Standard Design",

      price: 5000,

      image: logoImg,

      description:
        "Professional logo design with multiple concepts, refined typography, and versatile branding usage.",

      deliverables: [
        "3 Logo Concepts",
        "Unlimited Minor Revisions",
        "PNG, JPG & PDF Files",
        "Transparent Background",
        "Black & White Version",
      ],
    },

    /* ==========================================================
       PREMIUM LOGO
    ========================================================== */

    {
      id: 3,

      slug: "premium-logo",

      tag: "Premium Design",

      name: "Premium Logo Design",

      subtitle: "Premium Design",

      price: 8000,

      image: logoImg,

      description:
        "Premium brand identity logo crafted with detailed research, multiple concepts, and complete professional branding support.",

      deliverables: [
        "5 Unique Logo Concepts",
        "Unlimited Revisions",
        "AI / EPS / SVG Source Files",
        "PNG / JPG / PDF",
        "Brand Color Palette",
        "Typography Guide",
        "Social Media Logo Kit",
      ],
    },
  ],

  faq: [],
},

/* ==========================================================
   BROCHURE DESIGN
========================================================== */

{
  id: 4,

  slug: "brochure-design",

  title: "Brochure Design",

  image: brochureImg,

  pageTitle: "Brochure Design Cost",

  pageDescription:
    "Professionally designed brochures that effectively communicate your brand message, products, and services with visually appealing layouts and high-quality graphics.",

  quotationType: "quantity",

  plans: [

    /* ==========================================================
       STANDARD BROCHURE
    ========================================================== */

    {
      id: 1,

      slug: "standard-brochure",

      tag: "Professional Design",

      name: "Brochure Design",

      subtitle: "Professional Design",

      price: 4500,

      image: brochureImg,

      quotationType: "quantity",

      description:
        "Creative brochure designs crafted to showcase your business, products, and services in a professional and visually appealing format.",

      deliverables: [
        "Custom Brochure Design",
        "Print Ready Files",
        "High Resolution PDF",
        "High Resolution JPG",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Brochure Quantity",

        description:
          "Specify the exact number of Brochure Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   BANNER DESIGN
========================================================== */

{
  id: 5,

  slug: "banner-design",

  title: "Banner Design",

  image: bannerImg,

  pageTitle: "Banner Design Cost",

  pageDescription:
    "Professionally designed banners that grab attention, promote your business effectively, and create a strong visual impact across print and digital platforms.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-banner",

      tag: "Professional Design",

      name: "Banner Design",

      subtitle: "Professional Design",

      price: 3500,

      image: bannerImg,

      quotationType: "quantity",

      description:
        "Creative banner designs for promotional campaigns, advertisements, events, and branding.",

      deliverables: [
        "Custom Banner Design",
        "High Resolution Artwork",
        "Print Ready PDF",
        "PNG & JPG Files",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Banner Quantity",

        description:
          "Specify the exact number of Banner Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   POSTER DESIGN
========================================================== */

{
  id: 6,

  slug: "poster-design",

  title: "Poster Design",

  image: posterImg,

  pageTitle: "Poster Design Cost",

  pageDescription:
    "Visually attractive poster designs crafted to promote products, services, events, and campaigns with maximum audience engagement.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-poster",

      tag: "Professional Design",

      name: "Poster Design",

      subtitle: "Professional Design",

      price: 3000,

      image: posterImg,

      quotationType: "quantity",

      description:
        "Creative poster designs that effectively communicate your message while maintaining a strong visual appeal.",

      deliverables: [
        "Custom Poster Design",
        "Print Ready Files",
        "High Resolution PDF",
        "PNG & JPG Files",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Poster Quantity",

        description:
          "Specify the exact number of Poster Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   STANDARD LETTERHEAD DESIGN
========================================================== */

{
  id: 7,

  slug: "standard-letterhead",

  title: "Standard Letterhead",

  image: letterheadImg,

  pageTitle: "Letterhead Design Cost",

  pageDescription:
    "Professional letterhead designs that strengthen your business identity and enhance your official communication.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-letterhead-plan",

      tag: "Professional Design",

      name: "Letterhead Design",

      subtitle: "Professional Design",

      price: 2500,

      image: letterheadImg,

      quotationType: "quantity",

      description:
        "Elegant and professional letterhead designs suitable for corporate communication.",

      deliverables: [
        "Custom Letterhead Design",
        "Editable Source File",
        "Print Ready PDF",
        "High Resolution JPG",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Letterhead Quantity",

        description:
          "Specify the exact number of Letterhead Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   INVITATION CARD DESIGN
========================================================== */

{
  id: 8,

  slug: "invitation-card-design",

  title: "Invitation Card Design",

  image: invitationImg,

  pageTitle: "Invitation Card Design Cost",

  pageDescription:
    "Elegant invitation card designs crafted for weddings, birthdays, corporate events, and special occasions with creative layouts and premium aesthetics.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-invitation",

      tag: "Professional Design",

      name: "Invitation Card Design",

      subtitle: "Professional Design",

      price: 2800,

      image: invitationImg,

      quotationType: "quantity",

      description:
        "Beautiful invitation card designs customized for your event and brand theme.",

      deliverables: [
        "Custom Invitation Design",
        "Print Ready PDF",
        "High Resolution JPG",
        "Editable Source File",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Invitation Card Quantity",

        description:
          "Specify the exact number of Invitation Card Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   PACKAGING DESIGN
========================================================== */

{
  id: 9,

  slug: "packaging-design",

  title: "Packaging Design",

  image: packagingImg,

  pageTitle: "Packaging Design Cost",

  pageDescription:
    "Professional packaging designs that improve shelf appeal, strengthen branding, and create memorable customer experiences.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-packaging",

      tag: "Professional Design",

      name: "Packaging Design",

      subtitle: "Professional Design",

      price: 6000,

      image: packagingImg,

      quotationType: "quantity",

      description:
        "Creative packaging designs suitable for retail products, food items, cosmetics, and consumer brands.",

      deliverables: [
        "Custom Packaging Design",
        "Mockup Preview",
        "Editable Source File",
        "Print Ready PDF",
        "High Resolution Files",
      ],

      quotation: {
        title: "Packaging Quantity",

        description:
          "Specify the exact number of Packaging Designs required.",

        note:
          "Die-line/template is to be provided by the client if required.",
      },
    },
  ],

  faq: [],
},

/* ==========================================================
   LABEL DESIGN
========================================================== */

{
  id: 10,

  slug: "label-design",

  title: "Label Design",

  image: labelImg,

  pageTitle: "Label Design Cost",

  pageDescription:
    "Eye-catching label designs created to showcase your products professionally while maintaining brand consistency and compliance.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-label",

      tag: "Professional Design",

      name: "Label Design",

      subtitle: "Professional Design",

      price: 3200,

      image: labelImg,

      quotationType: "quantity",

      description:
        "Professionally designed product labels suitable for bottles, jars, boxes, pouches, and retail packaging.",

      deliverables: [
        "Custom Label Design",
        "Print Ready PDF",
        "High Resolution PNG/JPG",
        "Editable Source File",
        "CMYK Color Format",
      ],

      quotation: {
        title: "Label Quantity",

        description:
          "Specify the exact number of Label Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},
/* ==========================================================
   VISITING CARD DESIGN
========================================================== */

{
  id: 11,

  slug: "visiting-card-design",

  title: "Visiting Card Design",

  image: visitingCardImg,

  pageTitle: "Visiting Card Design Cost",

  pageDescription:
    "Professional visiting card designs that reflect your brand identity and leave a memorable first impression.",

  quotationType: null,

  plans: [

    {
      id: 1,

      slug: "standard-visiting-card",

      tag: "Professional Design",

      name: "Visiting Card Design",

      subtitle: "Professional Design",

      price: 1800,

      image: visitingCardImg,

      description:
        "Creative double-sided visiting card designed according to your brand identity.",

      deliverables: [
        "Double Side Design",
        "Print Ready PDF",
        "Editable Source File",
        "High Resolution JPG",
        "CMYK Format",
      ],
    },

  ],

  faq: [],
},

/* ==========================================================
   ADVERTISEMENT DESIGN
========================================================== */

{
  id: 12,

  slug: "advertisement-design",

  title: "Advertisement Design",

  image: adsImg,

  pageTitle: "Advertisement Design Cost",

  pageDescription:
    "Creative advertisement designs for newspapers, magazines, social media, and promotional campaigns.",

  quotationType: "quantity",

  plans: [

    {

      id: 1,

      slug: "standard-advertisement",

      tag: "Professional Design",

      name: "Advertisement Design",

      subtitle: "Professional Design",

      price: 4200,

      image: adsImg,

      quotationType: "quantity",

      description:
        "Professionally crafted advertisement creatives that maximize customer engagement.",

      deliverables: [
        "Custom Advertisement",
        "Print Ready Artwork",
        "Editable Source File",
        "High Resolution Files",
        "CMYK Format",
      ],

      quotation: {

        title: "Advertisement Quantity",

        description:
          "Specify the exact number of Advertisement Designs required.",

        note:
          "Printing and publishing charges are not included.",

      },

    },

  ],

  faq: [],
},

/* ==========================================================
   STANDEE DESIGN
========================================================== */

{
  id: 13,

  slug: "standee-design",

  title: "Standee Design",

  image: standeeImg,

  pageTitle: "Standee Design Cost",

  pageDescription:
    "Premium standee designs suitable for exhibitions, events, retail stores, and promotional branding.",

  quotationType: "quantity",

  plans: [

    {

      id: 1,

      slug: "standard-standee",

      tag: "Professional Design",

      name: "Standee Design",

      subtitle: "Professional Design",

      price: 3500,

      image: standeeImg,

      quotationType: "quantity",

      description:
        "Creative standee designs that effectively promote your products and services.",

      deliverables: [
        "Custom Standee Design",
        "Print Ready PDF",
        "Editable Source File",
        "High Resolution Artwork",
        "CMYK Format",
      ],

      quotation: {

        title: "Standee Quantity",

        description:
          "Specify the exact number of Standee Designs required.",

        note:
          "Printing charges are not included.",

      },

    },

  ],

  faq: [],
},

/* ==========================================================
   MENU CARD DESIGN
========================================================== */

{
  id: 14,

  slug: "menu-card-design",

  title: "Menu Card Design",

  image: menuCardImg,

  pageTitle: "Menu Card Design Cost",

  pageDescription:
    "Modern menu card designs created for restaurants, cafés, hotels, cloud kitchens, and food businesses.",

  quotationType: "quantity",

  plans: [
    {
      id: 1,

      slug: "standard-menu-card",

      tag: "Professional Design",

      name: "Menu Card Design",

      subtitle: "Professional Design",

      price: 3800,

      image: menuCardImg,

      quotationType: "quantity",

      description:
        "Beautifully designed menu cards that improve customer experience and highlight your offerings.",

      deliverables: [
        "Custom Menu Card Design",
        "Print Ready PDF",
        "Editable Source File",
        "High Resolution Files",
        "CMYK Format",
      ],

      quotation: {
        title: "Menu Card Quantity",

        description:
          "Specify the exact number of Menu Card Designs required.",

        note:
          "Printing charges are not included.",
      },
    },
  ],

  faq: [],
},

  ],

  faq: [
    {
      id: 1,
      question: "What graphic design services do you offer?",
      answer:
        "We design billboards, logos, mascots, brochures, banners, posters, letterheads, invitation cards, packaging, labels, visiting cards, ads, standees, and menu cards.",
    },
    {
      id: 2,
      question: "How long does a typical design take?",
      answer:
        "Turnaround depends on the type and complexity of the design, but most projects are delivered within a few business days after your requirements are finalized.",
    },
    {
      id: 3,
      question: "Will I get editable source files?",
      answer:
        "Yes, most packages include editable source files along with print-ready and high-resolution export formats.",
    },
    {
      id: 4,
      question: "Can I request revisions?",
      answer:
        "Yes, each plan includes a set number of revisions so the final design matches your vision before delivery.",
    },
    {
      id: 5,
      question: "Are printing charges included?",
      answer:
        "No, printing charges are not included in the design price. We deliver print-ready files, and printing can be arranged separately.",
    },
  ],
};

export default graphicDesigning;