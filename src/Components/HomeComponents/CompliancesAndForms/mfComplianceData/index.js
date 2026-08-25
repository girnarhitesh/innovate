import registeredDetails from "./registeredDetails.json";
import regulatoryRegistrations from "./regulatoryRegistrations.json";
import disclaimer from "./disclaimer.json";
import commissionDisclosure from "./commissionDisclosure.json";
import investorGrievanceRedressal from "./investorGrievanceRedressal.json";
import investorCharter from "./investorCharter.json";
import rightsObligations from "./rightsObligations.json";
import privacyPolicy from "./privacyPolicy.json";
import termsConditions from "./termsConditions.json";
import fundSelectionPolicy from "./fundSelectionPolicy.json";
import amfiCodeOfConduct from "./amfiCodeOfConduct.json";
import ourEmpanelments from "./ourEmpanelments.json";
import importantLinks from "./importantLinks.json";
import sidSaiKim from "./sidSaiKim.json";

/**
 * MF Compliance disclosure pages keyed by URL slug.
 * Add more JSON entries here as card detail pages are built.
 */
export const mfCompliancePages = {
  [registeredDetails.slug]: registeredDetails,
  [regulatoryRegistrations.slug]: regulatoryRegistrations,
  [disclaimer.slug]: disclaimer,
  [commissionDisclosure.slug]: commissionDisclosure,
  [investorGrievanceRedressal.slug]: investorGrievanceRedressal,
  [investorCharter.slug]: investorCharter,
  [rightsObligations.slug]: rightsObligations,
  [privacyPolicy.slug]: privacyPolicy,
  [termsConditions.slug]: termsConditions,
  [fundSelectionPolicy.slug]: fundSelectionPolicy,
  [amfiCodeOfConduct.slug]: amfiCodeOfConduct,
  [ourEmpanelments.slug]: ourEmpanelments,
  [importantLinks.slug]: importantLinks,
  [sidSaiKim.slug]: sidSaiKim,
};

export const getMfCompliancePage = (slug) => mfCompliancePages[slug] || null;

export const MF_COMPLIANCE_CARDS = [
  {
    slug: "registered-details",
    title: "Registered Details",
    description: "Entity, AMFI ARN, SEBI/CDSL registrations & grievance officer.",
    hasDetail: true,
  },
  {
    slug: "regulatory-registrations",
    title: "Regulatory Registrations",
    description: "AMFI, SEBI & CDSL registration numbers and validity.",
    hasDetail: true,
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Risk factors and important disclaimers for investors.",
    hasDetail: true,
  },
  {
    slug: "commission-disclosure",
    title: "Commission Disclosure",
    description: "Trail commission ranges across fund categories and AMCs.",
    hasDetail: true,
  },
  {
    slug: "investor-grievance-redressal",
    title: "Investor Grievance Redressal",
    description: "How to raise and escalate a complaint.",
    hasDetail: true,
  },
  {
    slug: "investor-charter",
    title: "Investor Charter",
    description: "Rights and responsibilities of investors.",
    hasDetail: true,
  },
  {
    slug: "rights-obligations",
    title: "Rights & Obligations",
    description: "Rights and obligations of investors and distributor.",
    hasDetail: true,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How your personal data is collected and used.",
    hasDetail: true,
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    description: "Terms governing the use of this website.",
    hasDetail: true,
  },
  {
    slug: "fund-selection-policy",
    title: "Fund Selection Policy",
    description: "Our process for recommending mutual fund schemes.",
    hasDetail: true,
  },
  {
    slug: "amfi-code-of-conduct",
    title: "AMFI Code of Conduct",
    description: "Code of conduct for mutual fund distributors.",
    hasDetail: true,
  },
  {
    slug: "our-empanelments",
    title: "Our Empanelments",
    description: "AMCs and partners we are empanelled with.",
    hasDetail: true,
  },
  {
    slug: "important-links",
    title: "Important Links",
    description: "SEBI SCORES, SMART ODR, MF Central & more.",
    hasDetail: true,
  },
  {
    slug: "sid-sai-kim",
    title: "SID / SAI / KIM",
    description: "Scheme documents for all mutual fund schemes.",
    hasDetail: true,
  },
];
