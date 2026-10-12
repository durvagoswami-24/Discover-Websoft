import service8 from "../../assets/service8.png";

const commonLocalDeliverables = [
  "For the best results, SEO services should be continued consistently for a minimum of 6 months.",
  "Achieve a 100% On-Page SEO Optimisation Score",
  "100% Technical Issues Resolved",
  "Google Business Profile (GMB) Management",
  "Keep your blog fresh with regular content updates",
];

const countryDeliverables = [
  ...commonLocalDeliverables,
  "Get Your Website Ranked on Google's First Page",
];

const seo = {
  id: 9,
  slug: "seo",

  title: "SEO",
  readMore: [
    "In-depth keyword research tailored to your industry and audience.",
    "On-page optimization for higher search engine rankings.",
    "Technical SEO audits to fix crawl and indexing issues.",
    "Regular performance reports so you can track real growth.",
    "White-hat strategies built for long-term, sustainable results.",
  ],
  category: "SEO",

  price: 5000,

  pageTitle: "SEO Services Cost",

  description:
    "Improve your website ranking on search engines",

  pageDescription:
    "Get professional SEO services that improve your website's search rankings, increase organic traffic, and help your business reach more customers with transparent and affordable pricing.",

  image: service8,

  // No quotationType -- SEO plans are fixed monthly packages,
  // no "Get Customised Quotation" table on the plan page (per Figma).

  subServices: [
    // ==================================================
    // LOCAL SEO (AREA WISE)
    // ==================================================
    {
      id: 1,
      slug: "local-seo",

      title: "Local SEO (Area wise)",
      pageTitle: "Local SEO (Area wise)",

      description:
        "Boost your visibility in local search results and attract nearby customers with targeted area-wise SEO strategies, helping your business grow with affordable and transparent pricing.",
      pageDescription:
        "Boost your visibility in local search results and attract nearby customers with targeted area-wise SEO strategies, helping your business grow with affordable and transparent pricing.",

      image: service8,
      priceUnit: "/Month",

      plans: [
        {
          id: 1,
          slug: "basic-seo",
          name: "Basic SEO",
          subtitle: "5 Keywords, 1 Area/Locality target",
          price: 5000,
          priceUnit: "/Month",
          tag: "LOCAL BASIC SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            {
              id: 1,
              question: "What is included in the Basic SEO package?",
              answer:
                "The Basic SEO package includes on-page SEO optimization, technical SEO improvements, Google Business Profile (GMB) management, keyword optimization, and performance enhancements to help improve your website's search engine rankings.",
            },
            { id: 2, question: "Who is the Basic SEO package suitable for?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How long does it take to see results from the Basic SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "Does the Basic SEO package include Google Business Profile optimization?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 2,
          slug: "standard-seo",
          name: "Standard SEO",
          subtitle: "10 Keywords, 1-2 Nearby areas",
          price: 8000,
          priceUnit: "/Month",
          tag: "LOCAL STANDARD SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            {
              id: 1,
              question: "What is included in the Standard SEO package?",
              answer:
                "The Standard SEO package includes advanced keyword optimization, on-page SEO, technical SEO improvements, Google Business Profile management, content optimization, and regular performance tracking to help improve your website's search engine rankings.",
            },
            { id: 2, question: "Who should choose the Standard SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How many keywords are covered in the Standard SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long should I continue the Standard SEO service?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 3,
          slug: "premium-seo",
          name: "Premium SEO",
          subtitle: "15 Keywords, Multiple nearby localities",
          price: 12000,
          priceUnit: "/Month",
          tag: "LOCAL PREMIUM SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            {
              id: 1,
              question: "What is included in the Premium SEO package?",
              answer:
                "The Premium SEO package includes comprehensive on-page SEO, technical SEO optimization, advanced keyword targeting, Google Business Profile management, content optimization, regular performance monitoring, and strategies designed to maximize your website's visibility and organic traffic.",
            },
            { id: 2, question: "Who should choose the Premium SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "Why is the Premium SEO package priced higher than other plans?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long does it take to see results with the Premium SEO package?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
      ],

      faq: [
        {
          id: 1,
          question: "What is included in the Basic Local SEO package?",
          answer:
            "The Basic Local SEO package is ideal for businesses targeting a single area or locality. It includes optimization for up to 5 keywords, Google Business Profile optimization, local keyword targeting, on-page SEO improvements, and monthly performance reporting.",
        },
        { id: 2, question: "Who should choose the Standard Local SEO package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "What are the benefits of the Premium Local SEO package?", answer: "Placeholder -- answer to be confirmed." },
        { id: 4, question: "How do I choose the right Local SEO package for my business?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },

    // ==================================================
    // CITY WISE SEO
    // ==================================================
    {
      id: 2,
      slug: "city-wise-seo",

      title: "City Wise SEO",
      pageTitle: "City Wise SEO Cost",

      description:
        "Improve your online presence across specific cities with targeted SEO strategies that help your business rank higher, reach local customers, and generate more leads at affordable pricing.",
      pageDescription:
        "Improve your online presence across specific cities with targeted SEO strategies that help your business rank higher, reach local customers, and generate more leads at affordable pricing.",

      image: service8,
      priceUnit: "/Month",

      plans: [
        {
          id: 1,
          slug: "basic-seo",
          name: "Basic SEO",
          subtitle: "10 Keywords, 1 City target",
          price: 10000,
          priceUnit: "/Month",
          tag: "CITY BASIC SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            {
              id: 1,
              question: "What is included in the Basic City SEO package?",
              answer:
                "The Basic City SEO package includes optimization for up to 10 targeted keywords, on-page SEO, technical SEO improvements, Google Business Profile optimization, and city-specific strategies to help your business rank higher in local search results.",
            },
            { id: 2, question: "Who is the Basic City SEO package suitable for?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How long does it take to see results from the Basic City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "Does the Basic City SEO package include Google Business Profile optimization?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 2,
          slug: "standard-seo",
          name: "Standard SEO",
          subtitle: "20 Keywords, Multiple service in same city",
          price: 15000,
          priceUnit: "/Month",
          tag: "CITY STANDARD SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Standard City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the Standard City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How many keywords are covered in the Standard City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long should I continue the Standard City SEO service?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 3,
          slug: "premium-seo",
          name: "Premium SEO",
          subtitle: "35 Keywords, High-Competition city keywords",
          price: 25000,
          priceUnit: "/Month",
          tag: "CITY PREMIUM SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Premium City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the Premium City SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "Why is the Premium City SEO package priced higher than other plans?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long does it take to see results with the Premium City SEO package?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
      ],

      faq: [
        {
          id: 1,
          question: "What is included in the City Wise SEO packages?",
          answer:
            "City Wise SEO packages include keyword research, on-page SEO optimization, technical SEO improvements, Google Business Profile optimization, local content optimization, and city-specific SEO strategies to improve your rankings in targeted locations.",
        },
        { id: 2, question: "Which City Wise SEO package is right for my business?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },

    // ==================================================
    // STATE WISE SEO
    // ==================================================
    {
      id: 3,
      slug: "state-wise-seo",

      title: "State Wise SEO",
      pageTitle: "State Wise SEO",

      description:
        "Expand your business reach across an entire state with targeted SEO strategies that improve search rankings, attract regional customers, and drive sustainable growth at competitive pricing.",
      pageDescription:
        "Expand your business reach across an entire state with targeted SEO strategies that improve search rankings, attract regional customers, and drive sustainable growth at competitive pricing.",

      image: service8,
      priceUnit: "/Month",

      plans: [
        {
          id: 1,
          slug: "basic-seo",
          name: "Basic SEO",
          subtitle: "40 Keywords, 3-5 cities in one state",
          price: 25000,
          priceUnit: "/Month",
          tag: "STATE BASIC SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Basic State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who is the Basic State SEO package suitable for?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How long does it take to see results from the Basic State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How many cities are covered in the Basic State SEO package?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 2,
          slug: "standard-seo",
          name: "Standard SEO",
          subtitle: "70 Keywords, 6-10 cities",
          price: 40000,
          priceUnit: "/Month",
          tag: "STATE STANDARD SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Standard State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the Standard State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How many keywords are covered in the Standard State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long should I continue the Standard State SEO service?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 3,
          slug: "premium-seo",
          name: "Premium SEO",
          subtitle: "100+ Keywords, Full state coverage",
          price: 60000,
          priceUnit: "/Month",
          tag: "STATE PREMIUM SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: commonLocalDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Premium State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the Premium State SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "Why is the Premium State SEO package priced higher than other plans?", answer: "Placeholder -- answer to be confirmed." },
            { id: 4, question: "How long does it take to see results with the Premium State SEO package?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
      ],

      faq: [
        {
          id: 1,
          question: "What is included in the State Wise SEO packages?",
          answer:
            "State Wise SEO packages include comprehensive keyword research, on-page SEO, technical SEO optimization, Google Business Profile management, content optimization, and state-specific SEO strategies to improve your visibility across multiple cities within a state.",
        },
        { id: 2, question: "Which State Wise SEO package is best for my business?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "How many keywords are included in the State Wise SEO plans?", answer: "Placeholder -- answer to be confirmed." },
        { id: 4, question: "How long does it take to see results from State Wise SEO?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },

    // ==================================================
    // COUNTRY WISE SEO
    // ==================================================
    {
      id: 4,
      slug: "country-wise-seo",

      title: "Country Wise SEO",
      pageTitle: "Country Wise SEO Cost",

      description:
        "Reach customers across an entire country with strategic SEO solutions that improve nationwide search visibility, increase organic traffic, and support long-term business growth at transparent pricing.",
      pageDescription:
        "Reach customers across an entire country with strategic SEO solutions that improve nationwide search visibility, increase organic traffic, and support long-term business growth at transparent pricing.",

      image: service8,
      priceUnit: "/Month",

      plans: [
        {
          id: 1,
          slug: "national-seo-india",
          name: "National SEO (India)",
          subtitle: "100 Keywords",
          price: 50000,
          priceUnit: "/Month",
          tag: "COUNTRY SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: countryDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the National SEO (India) package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the National SEO (India) package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How long does it take to see results from National SEO?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 2,
          slug: "international-seo-1-country",
          name: "International SEO (1 Country)",
          subtitle: "120 Keywords",
          price: 75000,
          priceUnit: "/Month",
          // NOTE: tag not confirmed in Figma for this plan -- using the
          // same "COUNTRY SEO" pattern seen on National SEO. Flag if a
          // distinct tag was intended.
          tag: "COUNTRY SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: countryDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the International SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the International SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "Which countries are supported for International SEO?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
        {
          id: 3,
          slug: "multi-country-seo",
          name: "Multi-Country SEO",
          subtitle: "120+ Keywords",
          price: 120000,
          priceUnit: "/Month",
          // NOTE: tag not confirmed in Figma for this plan -- see note above.
          tag: "COUNTRY SEO",
          image: service8,
          description:
            "Improve your website's visibility on search engines, increase organic traffic, and attract potential customers through keyword optimization, content improvements, technical SEO, and performance enhancements.",
          deliverables: countryDeliverables,
          adminLogin: true,
          getQuote: true,
          wishlist: true,
          faq: [
            { id: 1, question: "What is included in the Multi-Country SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 2, question: "Who should choose the Multi-Country SEO package?", answer: "Placeholder -- answer to be confirmed." },
            { id: 3, question: "How many countries are covered under Multi-Country SEO?", answer: "Placeholder -- answer to be confirmed." },
          ],
        },
      ],

      faq: [
        {
          id: 1,
          question: "What is included in the Country Wise SEO packages?",
          answer:
            "Country Wise SEO packages include comprehensive keyword research, on-page SEO, technical SEO optimization, content marketing, Google Business Profile optimization (where applicable), and country-specific SEO strategies to improve your visibility in national and international search results.",
        },
        { id: 2, question: "Which Country Wise SEO package is right for my business?", answer: "Placeholder -- answer to be confirmed." },
        { id: 3, question: "How many keywords are included in the Country Wise SEO plans?", answer: "Placeholder -- answer to be confirmed." },
      ],
    },
  ],

  faq: [
    {
      id: 1,
      question: "What is the average SEO Services Cost in India?",
      answer:
        "The average SEO Services Cost in India typically ranges from ₹5,000 to ₹50,000+ per month, depending on your website size, industry competition, target keywords, and business goals. Small businesses often choose basic SEO packages, while larger companies invest in advanced SEO strategies for better rankings and lead generation.",
    },
    { id: 2, question: "What factors affect SEO Pricing?", answer: "Placeholder -- answer to be confirmed." },
  ],
};

export default seo;
