import ServicesData from "../Components/Services/ServicesData";
import { compliancesAndFormsData } from "../Components/HomeComponents/CompliancesAndForms/CompliancesAndFormsData";
import { getAllSitePages } from "./siteMapData";

const CATEGORY_META = {
  pages: {
    id: "pages",
    label: "Pages",
    browsePath: "/sitemap",
  },
  services: {
    id: "services",
    label: "Services",
    browsePath: "/services",
  },
  forms: {
    id: "forms",
    label: "Forms",
    browsePath: "/compliances/forms",
  },
  policies: {
    id: "policies",
    label: "Policies",
    browsePath: "/compliances/policies",
  },
  investorCharters: {
    id: "investorCharters",
    label: "Investor Charters",
    browsePath: "/compliances/investor-charters",
  },
  compliance: {
    id: "compliance",
    label: "Compliance Data",
    browsePath: "/compliances/compliance-data",
  },
};

const toServiceSlug = (title = "") =>
  title
    .replace(/\u2060/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizeSearchText = (value = "") =>
  value
    .toString()
    .replace(/\u2060/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const buildSearchIndex = () => {
  const pages = getAllSitePages()
    .filter((page) => page.path !== "/sitemap")
    .map((page) => ({
      id: `page-${page.path}`,
      title: page.title,
      category: CATEGORY_META.pages.id,
      categoryLabel: CATEGORY_META.pages.label,
      type: "route",
      path: page.path,
      keywords: normalizeSearchText(
        `${page.title} ${page.description || ""} ${page.sectionTitle || ""} sitemap`,
      ),
      hint: page.sectionTitle || "Page",
    }));

  const services = ServicesData.map((service) => {
    const title = (service.title || "").replace(/\u2060/g, "").trim();

    return {
      id: `service-${service.id}`,
      title,
      category: CATEGORY_META.services.id,
      categoryLabel: CATEGORY_META.services.label,
      type: "route",
      path: `/services/${toServiceSlug(title)}`,
      keywords: normalizeSearchText(
        `${title} ${service.servicesCardText || ""} ${service.buttonText || ""}`,
      ),
      hint: "Service page",
    };
  });

  const documentGroups = [
    ["forms", compliancesAndFormsData.forms],
    ["policies", compliancesAndFormsData.policies],
    ["investorCharters", compliancesAndFormsData.investorCharters],
    ["compliance", compliancesAndFormsData.compliance],
  ];

  const documents = documentGroups.flatMap(([categoryKey, items]) => {
    const meta = CATEGORY_META[categoryKey];

    return (items || []).map((item) => ({
      id: `${categoryKey}-${item.id}`,
      title: item.title,
      category: meta.id,
      categoryLabel: meta.label,
      type: "document",
      path: item.viewUrl?.startsWith("http")
        ? item.viewUrl
        : item.viewUrl?.startsWith("/")
          ? item.viewUrl
          : `/${item.viewUrl || ""}`,
      browsePath: meta.browsePath,
      keywords: normalizeSearchText(`${item.title} ${meta.label} documents forms`),
      hint: item.size ? `${meta.label} · ${item.size}` : meta.label,
    }));
  });

  return [...pages, ...services, ...documents];
};

const SEARCH_INDEX = buildSearchIndex();

const scoreItem = (item, query) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const title = normalizeSearchText(item.title);
  const keywords = item.keywords || "";

  if (title === normalizedQuery) {
    return 100;
  }

  if (title.startsWith(normalizedQuery)) {
    return 80;
  }

  if (title.includes(normalizedQuery)) {
    return 60;
  }

  const queryParts = normalizedQuery.split(" ").filter(Boolean);
  const matchedParts = queryParts.filter(
    (part) => title.includes(part) || keywords.includes(part),
  ).length;

  if (matchedParts === queryParts.length && queryParts.length > 1) {
    return 45;
  }

  if (matchedParts > 0) {
    return 20 + matchedParts * 5;
  }

  return 0;
};

export const getSearchSuggestions = (limit = 8) => {
  const featuredPages = SEARCH_INDEX.filter((item) =>
    ["/", "/services", "/compliances", "/about-us"].includes(item.path),
  );
  const featuredServiceIds = [1, 2, 3];
  const featuredForms = SEARCH_INDEX.filter((item) => item.category === "forms").slice(0, 2);
  const featuredServices = SEARCH_INDEX.filter(
    (item) =>
      item.category === "services" &&
      featuredServiceIds.some((id) => item.id === `service-${id}`),
  ).slice(0, 2);

  return [...featuredPages, ...featuredServices, ...featuredForms].slice(0, limit);
};

export const searchNavbarContent = (query, { limit = 16 } = {}) => {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return {
      query: "",
      groups: [],
      total: 0,
      suggestions: getSearchSuggestions(),
    };
  }

  const ranked = SEARCH_INDEX.map((item) => ({
    ...item,
    score: scoreItem(item, normalizedQuery),
  }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);

  const groupOrder = [
    "pages",
    "services",
    "forms",
    "policies",
    "investorCharters",
    "compliance",
  ];

  const groups = groupOrder
    .map((categoryId) => {
      const items = ranked.filter((item) => item.category === categoryId);

      if (!items.length) {
        return null;
      }

      return {
        id: categoryId,
        label: CATEGORY_META[categoryId].label,
        browsePath: CATEGORY_META[categoryId].browsePath,
        items,
      };
    })
    .filter(Boolean);

  return {
    query: normalizedQuery,
    groups,
    total: ranked.length,
    suggestions: ranked.length ? [] : getSearchSuggestions(),
  };
};

export const SEARCH_CATEGORY_META = CATEGORY_META;
