import service4 from "../../assets/service4.png";

const websiteMaintenance = {

  /* =======================================================
      BASIC INFORMATION
  ======================================================= */

  id: 4,

  slug: "website-maintenance",

  title: "Website Maintenance",
  readMore: [
    "Regular updates to plugins, themes, and core WordPress files.",
    "Security monitoring and malware scanning to keep your site safe.",
    "Performance optimization for faster load times.",
    "Automated backups so your data is never at risk.",
    "Priority support for quick fixes and troubleshooting.",
  ],

  category: "Website Maintenance",

  price: 9999,

  pageTitle: "Website Maintenance Cost",

  description:
    "Keep Your Website Secure & Updated",

  pageDescription:
    "Regular maintenance keeps your website secure, fast, updated, and running smoothly with backups, monitoring, bug fixes, and performance optimization.",

  image: service4,

  quotationType: null,

  plans: [

    {
      id:1,

      slug:"basic-maintenance",

      name:"Basic Maintenance",

      subtitle:"Basic",

      tag:"",

      image:service4,

      price:9999,

      description:
      "Essential maintenance plan for small business websites.",

      deliverables:[
        "Monthly Updates",
        "Security Monitoring",
        "Website Backup",
        "Bug Fixes",
        "Performance Check",
      ],

      adminLogin:true,

      wishlist:true,

      getQuote:true,

    },

    {
      id:2,

      slug:"business-maintenance",

      name:"Business Maintenance",

      subtitle:"Business",

      tag:"POPULAR",

      image:service4,

      price:14999,

      description:
      "Advanced maintenance for growing business websites.",

      deliverables:[
        "Weekly Updates",
        "Priority Support",
        "Malware Scan",
        "Performance Optimization",
        "Website Backup",
        "Security Monitoring",
      ],

      adminLogin:true,

      wishlist:true,

      getQuote:true,

    },

    {
      id:3,

      slug:"enterprise-maintenance",

      name:"Enterprise Maintenance",

      subtitle:"Enterprise",

      tag:"BEST SELLER",

      image:service4,

      price:24999,

      description:
      "Enterprise maintenance with dedicated monitoring and premium support.",

      deliverables:[
        "Daily Monitoring",
        "Premium Support",
        "Server Monitoring",
        "Performance Optimization",
        "Security Monitoring",
        "Unlimited Bug Fixes",
      ],

      adminLogin:true,

      wishlist:true,

      getQuote:true,

    }

  ],

  faq:[

    {
      id:1,
      question:"Why is website maintenance important?",
      answer:"Regular maintenance keeps your website secure, updated, and performing efficiently while preventing downtime and security issues."
    },

    {
      id:2,
      question:"Do you update plugins and themes?",
      answer:"Yes. Every maintenance package includes plugin and theme updates according to the selected plan."
    },

    {
      id:3,
      question:"Will you take website backups?",
      answer:"Yes. Regular backups are included to protect your website from unexpected issues."
    },

    {
      id:4,
      question:"Can I upgrade my maintenance plan later?",
      answer:"Absolutely. You can upgrade your maintenance plan anytime based on your business needs."
    },

    {
      id:5,
      question:"Do you provide emergency support?",
      answer:"Yes. Emergency support is available in Business and Enterprise maintenance plans."
    }

  ]

};

export default websiteMaintenance;