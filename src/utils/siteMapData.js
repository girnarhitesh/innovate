/**
 * Canonical list of site pages for Sitemap + site search.
 * Keep in sync with App.jsx routes.
 */
export const SITE_MAP_SECTIONS = [
  {
    id: "main",
    title: "Main Pages",
    links: [
      { title: "Home", path: "/", description: "Homepage" },
      { title: "Our Story", path: "/our-story", description: "Company story" },
      { title: "About Us", path: "/about-us", description: "About Innovate Securities" },
      { title: "Services", path: "/services", description: "All investment services" },
      { title: "Online Desk", path: "/online-desk", description: "Online trading desk" },
      { title: "Directors", path: "/directors", description: "Board of directors" },
      { title: "Sitemap", path: "/sitemap", description: "Complete list of website pages" },
    ],
  },
  {
    id: "compliances",
    title: "Documents & Forms",
    links: [
      {
        title: "Compliances & Forms",
        path: "/compliances",
        description: "Documents and compliance hub",
      },
      { title: "Forms", path: "/compliances/forms", description: "Downloadable forms" },
      {
        title: "Policies",
        path: "/compliances/policies",
        description: "Company and regulatory policies",
      },
      {
        title: "Investor Charters",
        path: "/compliances/investor-charters",
        description: "Investor charter documents",
      },
      {
        title: "Compliance Data",
        path: "/compliances/compliance-data",
        description: "Compliance disclosures and data",
      },
      {
        title: "MF Compliance",
        path: "/compliances/mf-compliance",
        description: "Mutual fund compliance documents",
      },
      {
        title: "Registered Details",
        path: "/compliances/mf-compliance/registered-details",
        description: "Entity, AMFI ARN, SEBI/CDSL registrations & grievance officer",
      },
      {
        title: "Regulatory Registrations",
        path: "/compliances/mf-compliance/regulatory-registrations",
        description: "AMFI, SEBI & CDSL registration numbers and validity",
      },
      {
        title: "MF Disclaimer",
        path: "/compliances/mf-compliance/disclaimer",
        description: "Risk factors and important disclaimers for investors",
      },
      {
        title: "Commission Disclosure",
        path: "/compliances/mf-compliance/commission-disclosure",
        description: "Trail commission ranges across fund categories and AMCs",
      },
      {
        title: "Investor Grievance Redressal",
        path: "/compliances/mf-compliance/investor-grievance-redressal",
        description: "How to raise and escalate a complaint",
      },
      {
        title: "Investor Charter",
        path: "/compliances/mf-compliance/investor-charter",
        description: "Rights and responsibilities of investors",
      },
      {
        title: "Rights & Obligations",
        path: "/compliances/mf-compliance/rights-obligations",
        description: "Rights and obligations of investors and distributor",
      },
      {
        title: "Privacy Policy (MF)",
        path: "/compliances/mf-compliance/privacy-policy",
        description: "How your personal data is collected and used",
      },
      {
        title: "Terms & Conditions (MF)",
        path: "/compliances/mf-compliance/terms-conditions",
        description: "Terms governing the use of this website",
      },
      {
        title: "Fund Selection Policy",
        path: "/compliances/mf-compliance/fund-selection-policy",
        description: "Our process for recommending mutual fund schemes",
      },
      {
        title: "AMFI Code of Conduct",
        path: "/compliances/mf-compliance/amfi-code-of-conduct",
        description: "Code of conduct for mutual fund distributors",
      },
      {
        title: "Our Empanelments",
        path: "/compliances/mf-compliance/our-empanelments",
        description: "AMCs and partners we are empanelled with",
      },
      {
        title: "Important Links",
        path: "/compliances/mf-compliance/important-links",
        description: "SEBI SCORES, SMART ODR, MF Central and more",
      },
      {
        title: "SID / SAI / KIM",
        path: "/compliances/mf-compliance/sid-sai-kim",
        description: "Scheme documents for all mutual fund schemes",
      },
    ],
  },
  {
    id: "legal",
    title: "Legal & Investor Information",
    links: [
      { title: "Disclaimer", path: "/disclaimer", description: "Website disclaimer" },
      {
        title: "Privacy Policy",
        path: "/privacy-policy",
        description: "Privacy policy",
      },
      {
        title: "Advisory for Investors",
        path: "/advisiory-for-investors",
        description: "Investor advisory information",
      },
      {
        title: "Investor Complaints Disclosure",
        path: "/investor-complaints-disclosure",
        description: "Investor complaints disclosure",
      },
    ],
  },
];

export const getAllSitePages = () =>
  SITE_MAP_SECTIONS.flatMap((section) =>
    section.links.map((link) => ({
      ...link,
      sectionId: section.id,
      sectionTitle: section.title,
    })),
  );
