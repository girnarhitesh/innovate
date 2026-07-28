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
