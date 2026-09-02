import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
  SearchOutlined,
  ExportOutlined,
  BankOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  NotificationOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { getMfCompliancePage, MF_COMPLIANCE_CARDS } from "./mfComplianceData";
import StructuredComplianceContent from "./StructuredComplianceContent";
import "./CompliancesAndForms.css";
import "./MfComplianceDetailPage.css";

const EXTERNAL_SITE_PATHS = new Set(["/privacy-policy", "/disclaimer"]);

const isComplianceLinkAvailable = (path) => {
  if (EXTERNAL_SITE_PATHS.has(path)) return true;
  const match = path.match(/^\/compliances\/mf-compliance\/([^/]+)$/);
  if (!match) return false;
  const slug = match[1];
  if (getMfCompliancePage(slug)) return true;
  return MF_COMPLIANCE_CARDS.some((card) => card.slug === slug && card.hasDetail);
};

const socialIcon = (type) => {
  switch (type) {
    case "facebook":
      return <FaFacebook aria-hidden="true" />;
    case "instagram":
      return <FaInstagram aria-hidden="true" />;
    case "linkedin":
      return <FaLinkedin aria-hidden="true" />;
    case "whatsapp":
      return <FaWhatsapp aria-hidden="true" />;
    default:
      return <GlobalOutlined aria-hidden="true" />;
  }
};

const PageShell = ({ title, breadcrumbs, navigate, children }) => (
  <div className="MainContainer MfDetailPage">
    <div className="Container">
      <div className="paddingSide MfDetailShell">
        <header className="MfDetailTop">
          <div className="SubPageHeader MfDetailTop__row">
            <button
              type="button"
              className="BackButton"
              onClick={() => navigate("/compliances/mf-compliance")}
            >
              <ArrowLeftOutlined aria-hidden="true" /> Back
            </button>
            <div className="MfDetailTop__titles">
              <h1 className="SubPageTitle">{title}</h1>
              <nav className="MfDetailBreadcrumb" aria-label="Breadcrumb">
                <ol>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={`${crumb.label}-${index}`}>
                      {crumb.path ? (
                        <Link to={crumb.path}>{crumb.label}</Link>
                      ) : (
                        <span aria-current="page">{crumb.label}</span>
                      )}
                      {index < breadcrumbs.length - 1 ? (
                        <span className="MfDetailBreadcrumb__sep" aria-hidden="true">
                          {" "}
                          /{" "}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  </div>
);

const RegisteredDetailsContent = ({ page }) => {
  const {
    profile,
    entityInformation,
    management,
    regulatoryRegistrations,
    importantNotes = [],
    grievanceOfficer,
    escalationSteps,
    empanelledAmcs = [],
    amcVerificationLinks = [],
    socialPresence,
    independentVerification,
  } = page;

  const phoneHref =
    entityInformation.contact.phoneHref ||
    entityInformation.contact.phone.replace(/\s+/g, "");
  const hasAmcs = empanelledAmcs.length > 0;

  return (
    <>
      <div className="MfDetailIntro" aria-label="Profile summary">
        <div className="MfDetailIntro__main">
          <p className="MfDetailIntro__label">Registered entity</p>
          <h2>{profile.name}</h2>
          <p className="MfDetailIntro__role">{profile.designation}</p>
          {profile.subtitle ? (
            <p className="MfDetailIntro__sub">{profile.subtitle}</p>
          ) : null}
        </div>
        <div className="MfDetailIntro__meta">
          <span>{profile.badge}</span>
          <a
            href={entityInformation.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entityInformation.website}
          </a>
        </div>
      </div>

      <section className="MfDetailSection" aria-labelledby="entity-info-heading">
        <h2 id="entity-info-heading" className="MfDetailSection__title">
          Entity Information
        </h2>
        <dl className="MfDetailInfoList">
          <div>
            <dt>Legal Name</dt>
            <dd>{entityInformation.legalName}</dd>
          </div>
          <div>
            <dt>Entity Type</dt>
            <dd>{entityInformation.entityType}</dd>
          </div>
          {entityInformation.pan ? (
            <div>
              <dt>PAN</dt>
              <dd>{entityInformation.pan}</dd>
            </div>
          ) : null}
          {entityInformation.gstin ? (
            <div>
              <dt>GSTIN</dt>
              <dd>{entityInformation.gstin}</dd>
            </div>
          ) : null}
          <div className="MfDetailInfoList__full">
            <dt>Registered Address</dt>
            <dd>{entityInformation.registeredAddress}</dd>
          </div>
          <div className="MfDetailInfoList__full">
            <dt>Contact</dt>
            <dd className="MfDetailContact">
              <a href={`tel:${phoneHref}`}>
                <PhoneOutlined aria-hidden="true" />
                {entityInformation.contact.phone}
              </a>
              <a href={`mailto:${entityInformation.contact.email}`}>
                <MailOutlined aria-hidden="true" />
                {entityInformation.contact.email}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="MfDetailSection" aria-labelledby="management-heading">
        <h2 id="management-heading" className="MfDetailSection__title">
          Directors / Partners / Proprietors
        </h2>
        <div className="MfDetailPeople">
          {management.map((person) => (
            <article key={`${person.role}-${person.name}`} className="MfDetailPersonCard">
              <p className="MfDetailPersonCard__role">{person.role}</p>
              <h3>{person.name}</h3>
              {person.education ? (
                <p className="MfDetailPersonCard__meta">{person.education}</p>
              ) : null}
              {person.euin || person.nismNumber ? (
                <div className="MfDetailPersonCard__creds">
                  {person.euin ? <span>EUIN: {person.euin}</span> : null}
                  {person.nismNumber ? (
                    <span>
                      NISM: {person.nismNumber}
                      {person.validity ? ` · Valid: ${person.validity}` : ""}
                    </span>
                  ) : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="regulatory-heading">
        <h2 id="regulatory-heading" className="MfDetailSection__title">
          Regulatory Registrations &amp; Validity
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">
              Regulatory registrations and validity periods
            </caption>
            <thead>
              <tr>
                <th scope="col">Regulatory Body / Segment</th>
                <th scope="col">Registration No.</th>
                <th scope="col">Validity Period</th>
              </tr>
            </thead>
            <tbody>
              {regulatoryRegistrations.map((row) => (
                <tr key={row.body}>
                  <td>{row.body}</td>
                  <td className="MfDetailTable__accent">{row.registrationNo}</td>
                  <td>{row.validity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {importantNotes.length > 0 ? (
        <section className="MfDetailSection" aria-labelledby="notes-heading">
          <h2 id="notes-heading" className="MfDetailSection__title">
            Important Registration Notes
          </h2>
          <ul className="MfDetailNotesList">
            {importantNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="MfDetailSection" aria-labelledby="grievance-heading">
        <h2 id="grievance-heading" className="MfDetailSection__title">
          Investor Grievance Redressal
        </h2>
        <div className="MfDetailGroCard">
          <p className="MfDetailGroCard__label">
            <FileTextOutlined aria-hidden="true" /> {grievanceOfficer.title}
          </p>
          <div className="MfDetailGroCard__grid">
            <p>
              <span>Name</span>
              <strong>{grievanceOfficer.name}</strong>
            </p>
            {grievanceOfficer.designation ? (
              <p>
                <span>Designation</span>
                <strong>{grievanceOfficer.designation}</strong>
              </p>
            ) : null}
            <p>
              <span>Email</span>
              <a href={`mailto:${grievanceOfficer.email}`}>{grievanceOfficer.email}</a>
            </p>
            <p>
              <span>Phone</span>
              <a href={`tel:${grievanceOfficer.phone}`}>{grievanceOfficer.phone}</a>
            </p>
            <p>
              <span>Response time</span>
              <strong>{grievanceOfficer.responseTime}</strong>
            </p>
          </div>
        </div>

        <ol className="MfDetailEscalation">
          {escalationSteps.map((step) => (
            <li key={step.step} className={`MfDetailEscalation__item is-${step.tone}`}>
              <span className="MfDetailEscalation__num" aria-hidden="true">
                {step.step}
              </span>
              <p className="MfDetailEscalation__label">{step.label}</p>
              <p className="MfDetailEscalation__detail">{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      {hasAmcs || amcVerificationLinks.length > 0 ? (
        <section className="MfDetailSection" aria-labelledby="amc-heading">
          <h2 id="amc-heading" className="MfDetailSection__title">
            {hasAmcs
              ? `Empanelled Mutual Fund AMCs (${empanelledAmcs.length})`
              : "AMC & ARN Verification"}
          </h2>
          {hasAmcs ? (
            <ul className="MfDetailAmcGrid">
              {empanelledAmcs.map((amc) => (
                <li key={amc.id} className="MfDetailAmcCard">
                  <span className="MfDetailAmcCard__index">{amc.id}.</span>
                  <span className="MfDetailAmcCard__name">{amc.name}</span>
                  <span className="MfDetailAmcCard__code">{amc.registrationNo}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {amcVerificationLinks.length >= 2 ? (
            <div className="MfDetailNote">
              <p>
                Verify AMC registrations at{" "}
                <a
                  href={amcVerificationLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {amcVerificationLinks[0].label}
                </a>{" "}
                and ARN at{" "}
                <a
                  href={amcVerificationLinks[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {amcVerificationLinks[1].label}
                </a>
                .
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="MfDetailSection" aria-labelledby="social-heading">
        <h2 id="social-heading" className="MfDetailSection__title">
          {socialPresence.heading}
        </h2>
        <div className="MfDetailSocialLinks">
          {socialPresence.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="MfDetailSocialBtn"
            >
              {socialIcon(link.type)}
              {link.label}
            </a>
          ))}
        </div>
        <div className="MfDetailNote">
          <p>{socialPresence.note}</p>
        </div>
      </section>

      <section className="MfDetailVerify" aria-labelledby="verify-heading">
        <h2 id="verify-heading">
          <SearchOutlined aria-hidden="true" /> {independentVerification.heading}
        </h2>
        <div className="MfDetailVerify__grid">
          {independentVerification.links.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="MfDetailVerifyCard"
            >
              <span className="MfDetailVerifyCard__title">
                {item.title} <ExportOutlined aria-hidden="true" />
              </span>
              <span className="MfDetailVerifyCard__sub">{item.subtitle}</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
};

const RegulatoryRegistrationsContent = ({ page }) => {
  const {
    intro,
    entityCard,
    registrations,
    teamCertifications,
    verificationHub,
    transparency,
  } = page;

  return (
    <>
      <section className="MfDetailSection" aria-labelledby="reg-intro-heading">
        <h2 id="reg-intro-heading" className="MfDetailSection__title">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
        <div className="MfDetailNote">
          <p>{intro.notice}</p>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="entity-card-heading">
        <div className="MfRegEntityCard">
          <h2 id="entity-card-heading" className="MfRegEntityCard__heading">
            <BankOutlined aria-hidden="true" /> {entityCard.heading}
          </h2>
          <dl className="MfRegEntityCard__grid">
            {entityCard.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd>
                  {field.href ? (
                    <a
                      href={field.href}
                      target={field.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        field.href.startsWith("http") ? "noopener noreferrer" : undefined
                      }
                    >
                      {field.value}
                    </a>
                  ) : (
                    field.value
                  )}
                </dd>
              </div>
            ))}
            <div className="MfRegEntityCard__full">
              <dt>Registered Address</dt>
              <dd>{entityCard.registeredAddress}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="all-reg-heading">
        <h2 id="all-reg-heading" className="MfDetailSection__title">
          All Regulatory Registrations &amp; Licences
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable MfRegTable">
            <caption className="sr-only">
              All regulatory registrations and licences
            </caption>
            <thead>
              <tr>
                <th scope="col">Registration Type</th>
                <th scope="col">Registration Number &amp; Details</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((row) => (
                <tr key={row.number}>
                  <td>{row.type}</td>
                  <td>
                    <p className="MfRegTable__number">{row.number}</p>
                    <p className="MfRegTable__meta">{row.details}</p>
                    <a
                      href={row.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="MfRegTable__verify"
                    >
                      Verify: {row.verifyLabel}
                    </a>
                  </td>
                  <td>
                    <span className="MfRegStatus">
                      <CheckCircleOutlined aria-hidden="true" /> {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="team-heading">
        <h2 id="team-heading" className="MfDetailSection__title">
          {teamCertifications.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{teamCertifications.description}</p>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable MfRegTeamTable">
            <caption className="sr-only">
              Key managerial personnel and certification details
            </caption>
            <thead>
              <tr>
                <th scope="col">Name &amp; Designation</th>
                <th scope="col">EUIN</th>
                <th scope="col">NISM Series V-A</th>
                <th scope="col">Valid Until</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {teamCertifications.members.map((member) => (
                <tr key={member.name}>
                  <td>
                    <p className="MfRegTeamTable__name">{member.name}</p>
                    <p className="MfRegTeamTable__role">{member.designation}</p>
                  </td>
                  <td className="MfDetailTable__accent">{member.euin}</td>
                  <td>{member.nism}</td>
                  <td>{member.validUntil}</td>
                  <td>
                    <span className="MfRegStatus MfRegStatus--plain">{member.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="MfDetailNote">
          <p>{teamCertifications.note}</p>
        </div>
      </section>

      <section className="MfRegVerifyHub" aria-labelledby="verify-hub-heading">
        <h2 id="verify-hub-heading">
          <SearchOutlined aria-hidden="true" /> {verificationHub.heading}
        </h2>
        <p className="MfRegVerifyHub__sub">{verificationHub.subtitle}</p>
        <div className="MfRegVerifyHub__grid">
          {verificationHub.links.map((item) => (
            <article key={item.title} className="MfRegVerifyHub__card">
              <h3>{item.title}</h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.label} <ExportOutlined aria-hidden="true" />
              </a>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="MfRegTransparency" aria-labelledby="transparency-heading">
        <h2 id="transparency-heading">{transparency.heading}</h2>
        <p>
          {transparency.body}{" "}
          <a href={`mailto:${transparency.email}`}>{transparency.email}</a> or call{" "}
          <a href={`tel:${transparency.phoneHref}`}>{transparency.phone}</a>.
        </p>
      </section>
    </>
  );
};

const DisclaimerContent = ({ page }) => {
  const {
    importantNotice,
    intro,
    standardDisclaimer,
    sections,
    commitment,
  } = page;

  return (
    <>
      <aside className="MfDiscAlert" aria-label="Important notice">
        <p className="MfDiscAlert__heading">
          <WarningOutlined aria-hidden="true" /> {importantNotice.heading}
        </p>
        <p className="MfDiscAlert__body">{importantNotice.body}</p>
      </aside>

      <section className="MfDetailSection" aria-labelledby="disc-intro-heading">
        <h2 id="disc-intro-heading" className="MfDiscMainTitle">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
      </section>

      <aside className="MfDiscStandard" aria-label="Standard mutual fund disclaimer">
        <p className="MfDiscStandard__heading">
          <NotificationOutlined aria-hidden="true" /> {standardDisclaimer.heading}
        </p>
        <p className="MfDiscStandard__body">{standardDisclaimer.body}</p>
      </aside>

      {sections.map((section) => (
        <section
          key={section.id}
          className="MfDetailSection MfDiscSection"
          aria-labelledby={`disc-${section.id}-heading`}
        >
          <h2 id={`disc-${section.id}-heading`} className="MfDetailSection__title">
            {section.title}
          </h2>

          {section.intro ? <p className="MfDiscSection__intro">{section.intro}</p> : null}

          {section.body ? <p className="MfDiscSection__body">{section.body}</p> : null}

          {section.bullets ? (
            <ul className="MfDiscList">
              {section.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}

          {section.notDo ? (
            <div className="MfDiscNotDo">
              <p className="MfDiscNotDo__heading">{section.notDo.heading}</p>
              <p className="MfDiscNotDo__items">{section.notDo.items.join(" | ")}</p>
            </div>
          ) : null}

          {section.subsections
            ? section.subsections.map((sub) => (
                <div key={sub.heading} className="MfDiscSub">
                  <h3>{sub.heading}</h3>
                  {sub.bullets ? (
                    <ul className="MfDiscList">
                      {sub.bullets.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {sub.callout ? (
                    <div className="MfDetailNote">
                      <p>{sub.callout}</p>
                    </div>
                  ) : null}
                </div>
              ))
            : null}

          {section.callout ? (
            <div className="MfDetailNote">
              <p>
                <strong>{section.callout.heading}: </strong>
                {section.callout.body}
              </p>
            </div>
          ) : null}

          {section.fields ? (
            <dl className="MfDiscGro">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>
                    {field.href ? (
                      <a href={field.href}>{field.value}</a>
                    ) : (
                      field.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {section.steps ? (
            <ol className="MfDetailEscalation">
              {section.steps.map((step) => (
                <li
                  key={step.step}
                  className={`MfDetailEscalation__item is-${step.tone}`}
                >
                  <span className="MfDetailEscalation__num" aria-hidden="true">
                    {step.step}
                  </span>
                  <p className="MfDetailEscalation__label">{step.label}</p>
                  <p className="MfDetailEscalation__detail">{step.detail}</p>
                  {step.meta ? (
                    <p className="MfDetailEscalation__detail">{step.meta}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}

          {section.rows ? (
            <>
              <div className="MfDetailTableWrap">
                <table className="MfDetailTable">
                  <caption className="sr-only">Regulatory registration details</caption>
                  <thead>
                    <tr>
                      <th scope="col">Registration Type</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.rows.map((row) => (
                      <tr key={row.type}>
                        <td>{row.type}</td>
                        <td className="MfDetailTable__accent">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {section.note ? (
                <div className="MfDetailNote" style={{ marginTop: 12 }}>
                  <p>{section.note}</p>
                </div>
              ) : null}
            </>
          ) : null}
        </section>
      ))}

      <section className="MfRegTransparency" aria-labelledby="commitment-heading">
        <h2 id="commitment-heading">{commitment.heading}</h2>
        <p>
          Innovate Securities Private Limited is committed to ethical, transparent,
          and investor-first practices. If you believe any content on this website
          is misleading or any of our practices are non-compliant, please contact
          our GRO at{" "}
          <a href={`mailto:${commitment.email}`}>{commitment.email}</a> or report
          to SEBI SCORES at{" "}
          <a href={commitment.scoresUrl} target="_blank" rel="noopener noreferrer">
            {commitment.scoresLabel}
          </a>
          .
        </p>
      </section>
    </>
  );
};

const CommissionDisclosureContent = ({ page }) => {
  const {
    intro,
    transparencyNote,
    commissionModel,
    categoryOverview,
    investorMeaning,
    amcOverview,
    policy,
    prohibited,
    verifyWhere,
    onDemand,
    regulatoryReference,
    regulatoryLink,
  } = page;

  return (
    <>
      <section className="MfDetailSection" aria-labelledby="comm-intro-heading">
        <h2 id="comm-intro-heading" className="MfDiscMainTitle">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
        <div className="MfDetailNote">
          <p>{transparencyNote}</p>
        </div>
        <div className="MfCommModel">
          <p className="MfCommModel__heading">{commissionModel.heading}</p>
          <p className="MfCommModel__body">{commissionModel.body}</p>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="cat-overview-heading">
        <h2 id="cat-overview-heading" className="MfDetailSection__title">
          {categoryOverview.heading}
        </h2>
        <div className="MfDetailNote MfCommInfoNote">
          <p>{categoryOverview.note}</p>
        </div>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable MfCommCatTable">
            <caption className="sr-only">
              Commission rate overview by fund category
            </caption>
            <thead>
              <tr>
                <th scope="col">Fund Category &amp; Sub-Category</th>
                <th scope="col">Risk Level</th>
                <th scope="col">Typical Horizon</th>
                <th scope="col">Trail Rate Range (p.a.)</th>
                <th scope="col">Commission Type</th>
              </tr>
            </thead>
            <tbody>
              {categoryOverview.rows.map((row) => (
                <tr key={row.category}>
                  <td>
                    <p className="MfCommCatTable__name">{row.category}</p>
                    <p className="MfCommCatTable__sub">{row.subCategories}</p>
                  </td>
                  <td>{row.risk}</td>
                  <td>{row.horizon}</td>
                  <td className="MfDetailTable__accent">{row.rate}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="MfCommMeaning">
          <p className="MfCommMeaning__heading">
            <CheckOutlined aria-hidden="true" /> {investorMeaning.heading}
          </p>
          <p className="MfCommMeaning__body">{investorMeaning.body}</p>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="amc-overview-heading">
        <h2 id="amc-overview-heading" className="MfDetailSection__title">
          {amcOverview.heading}
        </h2>
        <div className="MfDetailNote MfCommInfoNote">
          <p>{amcOverview.note}</p>
        </div>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable MfCommAmcTable">
            <caption className="sr-only">
              AMC-wise indicative trail commission ranges
            </caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Asset Management Company (AMC)</th>
                <th scope="col">Equity Trail (p.a.)</th>
                <th scope="col">Hybrid Trail (p.a.)</th>
                <th scope="col">Debt Trail (p.a.)</th>
                <th scope="col">Commission Type</th>
              </tr>
            </thead>
            <tbody>
              {amcOverview.rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td className="MfCommAmcTable__name">{row.name}</td>
                  <td>{row.equity}</td>
                  <td>{row.hybrid}</td>
                  <td>{row.debt}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="policy-heading">
        <h2 id="policy-heading" className="MfDetailSection__title">
          {policy.heading}
        </h2>
        <div className="MfCommPolicyGrid">
          {policy.cards.map((card) => (
            <article key={card.title} className="MfCommPolicyCard">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="prohibit-heading">
        <div className="MfCommProhibit">
          <h2 id="prohibit-heading">{prohibited.heading}</h2>
          <ul>
            {prohibited.items.map((item) => (
              <li key={item}>
                <CloseOutlined aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="verify-comm-heading">
        <h2 id="verify-comm-heading" className="MfDetailSection__title">
          {verifyWhere.heading}
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">
              Where to verify commission information
            </caption>
            <thead>
              <tr>
                <th scope="col">Resource</th>
                <th scope="col">What You Can Verify</th>
                <th scope="col">Link</th>
              </tr>
            </thead>
            <tbody>
              {verifyWhere.rows.map((row) => (
                <tr key={row.resource}>
                  <td>
                    <strong>{row.resource}</strong>
                  </td>
                  <td>{row.verify}</td>
                  <td>
                    {row.linkUrl ? (
                      <a
                        href={row.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.linkLabel}
                      </a>
                    ) : (
                      row.linkLabel
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfCommOnDemand" aria-labelledby="ondemand-heading">
        <h2 id="ondemand-heading">
          <FileTextOutlined aria-hidden="true" /> {onDemand.heading}
        </h2>
        {onDemand.paragraphs.map((para) => (
          <p
            key={para}
            className={
              para.includes(onDemand.highlight) ? "MfCommOnDemand__highlight" : undefined
            }
          >
            {para}
          </p>
        ))}
        <div className="MfCommOnDemand__contact">
          <a href={`mailto:${onDemand.contact.email}`}>
            <MailOutlined aria-hidden="true" /> {onDemand.contact.email}
          </a>
          <span aria-hidden="true">|</span>
          <a href={`tel:${onDemand.contact.phoneHref}`}>
            <PhoneOutlined aria-hidden="true" /> {onDemand.contact.phone}
          </a>
          <span aria-hidden="true">|</span>
          <a
            href={onDemand.contact.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GlobalOutlined aria-hidden="true" /> {onDemand.contact.website}
          </a>
        </div>
      </section>

      <div className="MfDetailNote MfCommInfoNote">
        <p>
          {regulatoryReference}{" "}
          <a
            href={regulatoryLink.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {regulatoryLink.label} <ExportOutlined aria-hidden="true" />
          </a>
        </p>
      </div>
    </>
  );
};

const InvestorGrievanceContent = ({ page }) => {
  const {
    intro,
    commitment,
    groCard,
    submitSteps,
    includeChecklist,
    complaintTypes,
    escalationMatrix,
    responseTimelines,
    investorRights,
    contactsAtGlance,
    closingCommitment,
  } = page;

  return (
    <>
      <section className="MfDetailSection" aria-labelledby="igr-intro-heading">
        <h2 id="igr-intro-heading" className="MfDiscMainTitle">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
        <div className="MfDetailNote">
          <p>
            <strong>{commitment.heading}</strong>
            <br />
            {commitment.body}
          </p>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-gro-heading">
        <div className="MfIgrGroCard">
          <h2 id="igr-gro-heading" className="MfIgrGroCard__heading">
            <FileTextOutlined aria-hidden="true" /> {groCard.heading}
          </h2>
          <dl className="MfIgrGroCard__grid">
            {groCard.fields.map((field) => (
              <div key={field.label}>
                <dt>{field.label}</dt>
                <dd className={field.accent ? "is-accent" : undefined}>
                  {field.href ? <a href={field.href}>{field.value}</a> : field.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-steps-heading">
        <h2 id="igr-steps-heading" className="MfDetailSection__title">
          {submitSteps.heading}
        </h2>
        <ol className="MfIgrSteps">
          {submitSteps.steps.map((step) => (
            <li key={step.step}>
              <span className="MfIgrSteps__num" aria-hidden="true">
                {step.step}
              </span>
              <h3>{step.title}</h3>
              <p>{step.detail}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-include-heading">
        <h2 id="igr-include-heading" className="MfDetailSection__title">
          {includeChecklist.heading}
        </h2>
        <ul className="MfDiscList">
          {includeChecklist.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-types-heading">
        <h2 id="igr-types-heading" className="MfDetailSection__title">
          {complaintTypes.heading}
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">Types of complaints and typical resolution</caption>
            <thead>
              <tr>
                <th scope="col">Complaint Type</th>
                <th scope="col">Examples</th>
                <th scope="col">Typical Resolution</th>
              </tr>
            </thead>
            <tbody>
              {complaintTypes.rows.map((row) => (
                <tr key={row.type}>
                  <td>
                    <strong>{row.type}</strong>
                  </td>
                  <td>{row.examples}</td>
                  <td className="MfDetailTable__accent">{row.resolution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-escalation-heading">
        <h2 id="igr-escalation-heading" className="MfDetailSection__title">
          {escalationMatrix.heading}
        </h2>
        <ol className="MfIgrLevels">
          {escalationMatrix.levels.map((level) => (
            <li key={level.level} className={`MfIgrLevel is-${level.tone}`}>
              <span className="MfIgrLevel__num" aria-hidden="true">
                {level.level}
              </span>
              <div className="MfIgrLevel__body">
                <h3>{level.title}</h3>
                <p className="MfIgrLevel__contact">{level.contact}</p>
                <p className="MfIgrLevel__timeline">{level.timeline}</p>
                <p className="MfIgrLevel__desc">{level.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-timelines-heading">
        <h2 id="igr-timelines-heading" className="MfDetailSection__title">
          {responseTimelines.heading}
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">Committed response timelines</caption>
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Details</th>
                <th scope="col">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {responseTimelines.rows.map((row) => (
                <tr key={row.action}>
                  <td>
                    <strong>{row.action}</strong>
                  </td>
                  <td>{row.details}</td>
                  <td className="MfDetailTable__accent">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-rights-heading">
        <h2 id="igr-rights-heading" className="MfDetailSection__title">
          {investorRights.heading}
        </h2>
        <ul className="MfDiscList">
          {investorRights.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="MfDetailSection" aria-labelledby="igr-contacts-heading">
        <h2 id="igr-contacts-heading" className="MfDetailSection__title">
          {contactsAtGlance.heading}
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">Important grievance contacts</caption>
            <thead>
              <tr>
                <th scope="col">Organisation</th>
                <th scope="col">Contact Details</th>
                <th scope="col">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {contactsAtGlance.rows.map((row) => (
                <tr key={row.organisation}>
                  <td>
                    <strong>{row.organisation}</strong>
                  </td>
                  <td>{row.contact}</td>
                  <td className="MfDetailTable__accent">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfRegTransparency" aria-labelledby="igr-close-heading">
        <h2 id="igr-close-heading">{closingCommitment.heading}</h2>
        <p>{closingCommitment.body}</p>
      </section>
    </>
  );
};

const InvestorCharterContent = ({ page }) => {
  const {
    intro,
    notice,
    officialDocs,
    visionMission,
    services,
    rights,
    commitments,
    dosDonts,
    tat,
    escalation,
    compliancePages,
    contactBanner,
  } = page;

  return (
    <>
      <section className="MfDetailSection" aria-labelledby="ic-intro-heading">
        <h2 id="ic-intro-heading" className="MfDiscMainTitle">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
        <div className="MfDetailNote">
          <p>{notice}</p>
        </div>
      </section>

      <section className="MfIcDocs" aria-labelledby="ic-docs-heading">
        <p className="MfIcDocs__badge">{officialDocs.badge}</p>
        <h2 id="ic-docs-heading">{officialDocs.heading}</h2>
        <p className="MfIcDocs__sub">{officialDocs.subtitle}</p>
        <div className="MfIcDocs__grid">
          {officialDocs.docs.map((doc) => (
            <article key={doc.title} className="MfIcDocs__card">
              <p className="MfIcDocs__label">{doc.label}</p>
              <h3>{doc.title}</h3>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.linkLabel} <ExportOutlined aria-hidden="true" />
              </a>
              <p>{doc.description}</p>
            </article>
          ))}
        </div>
        <div className="MfIcDocs__extra">
          {officialDocs.extraLinks.map((doc) => (
            <article key={doc.title} className="MfIcDocs__card">
              <p className="MfIcDocs__label">{doc.label}</p>
              <h3>{doc.title}</h3>
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                {doc.linkLabel} <ExportOutlined aria-hidden="true" />
              </a>
              <p>{doc.description}</p>
            </article>
          ))}
        </div>
        <p className="MfIcDocs__footer">{officialDocs.footerNote}</p>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-vm-heading">
        <h2 id="ic-vm-heading" className="MfDetailSection__title">
          {visionMission.heading}
        </h2>
        <div className="MfIcVmGrid">
          {visionMission.cards.map((card) => (
            <article key={card.title} className={`MfIcVmCard is-${card.tone}`}>
              <h3>{card.title}</h3>
              {card.body ? <p>{card.body}</p> : null}
              {card.values ? (
                <ul>
                  {card.values.map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-services-heading">
        <h2 id="ic-services-heading" className="MfDetailSection__title">
          {services.heading}
        </h2>
        <div className="MfIcServiceGrid">
          {services.items.map((item) => (
            <article key={item.title} className="MfIcServiceCard">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-rights-heading">
        <h2 id="ic-rights-heading" className="MfDetailSection__title">
          {rights.heading}
        </h2>
        <ol className="MfIcRights">
          {rights.items.map((item, index) => (
            <li key={item.title}>
              <span className="MfIcRights__num" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-commit-heading">
        <h2 id="ic-commit-heading" className="MfDetailSection__title">
          {commitments.heading}
        </h2>
        <ul className="MfIcCommitList">
          {commitments.items.map((item) => (
            <li key={item}>
              <CheckOutlined aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-dos-heading">
        <h2 id="ic-dos-heading" className="MfDetailSection__title">
          {dosDonts.heading}
        </h2>
        <div className="MfIcDosDonts">
          <div className="MfIcDos">
            <h3>
              <CheckOutlined aria-hidden="true" /> {dosDonts.dos.heading}
            </h3>
            <ul>
              {dosDonts.dos.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="MfIcDonts">
            <h3>
              <CloseOutlined aria-hidden="true" /> {dosDonts.donts.heading}
            </h3>
            <ul>
              {dosDonts.donts.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-tat-heading">
        <h2 id="ic-tat-heading" className="MfDetailSection__title">
          {tat.heading}
        </h2>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">Service and grievance turnaround times</caption>
            <thead>
              <tr>
                <th scope="col">Service / Activity</th>
                <th scope="col">Description</th>
                <th scope="col">TAT</th>
              </tr>
            </thead>
            <tbody>
              {tat.rows.map((row) => (
                <tr key={row.service}>
                  <td>
                    <strong>{row.service}</strong>
                  </td>
                  <td>{row.description}</td>
                  <td className="MfDetailTable__accent">{row.tat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-escalation-heading">
        <h2 id="ic-escalation-heading" className="MfDetailSection__title">
          {escalation.heading}
        </h2>
        <ol className="MfDetailEscalation">
          {escalation.steps.map((step) => (
            <li
              key={step.step}
              className={`MfDetailEscalation__item is-${step.tone}`}
            >
              <span className="MfDetailEscalation__num" aria-hidden="true">
                {step.step}
              </span>
              <p className="MfDetailEscalation__label">{step.label}</p>
              <p className="MfDetailEscalation__detail">{step.detail}</p>
              <p className="MfDetailEscalation__detail">{step.meta}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="MfDetailSection" aria-labelledby="ic-infra-heading">
        <h2 id="ic-infra-heading" className="MfDetailSection__title">
          {compliancePages.heading}
        </h2>
        <p className="MfDiscSection__intro">{compliancePages.intro}</p>
        <div className="MfIcInfraGrid">
          {compliancePages.links.map((link) => {
            const available = isComplianceLinkAvailable(link.path);

            if (available) {
              return (
                <Link key={link.path} to={link.path} className="MfIcInfraCard">
                  <strong>{link.title}</strong>
                  <span>{link.path}</span>
                </Link>
              );
            }

            return (
              <div
                key={link.path}
                className="MfIcInfraCard MfIcInfraCard--disabled"
                aria-disabled="true"
              >
                <strong>{link.title}</strong>
                <span>Coming soon</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="MfRegTransparency" aria-labelledby="ic-contact-heading">
        <h2 id="ic-contact-heading">{contactBanner.heading}</h2>
        <p>
          {contactBanner.body}{" "}
          <strong>{contactBanner.name}</strong> |{" "}
          <a href={`mailto:${contactBanner.email}`}>{contactBanner.email}</a> |{" "}
          <a href={`tel:${contactBanner.phone}`}>{contactBanner.phone}</a> |{" "}
          <Link to={contactBanner.grievancePath}>{contactBanner.grievanceLabel}</Link>
        </p>
      </section>
    </>
  );
};

const RightsObligationsContent = ({ page }) => {
  const { intro, rights, obligations, dosDonts, contacts, formalDeclaration } = page;

  return (
    <>
      <section className="MfDetailSection" aria-labelledby="ro-intro-heading">
        <h2 id="ro-intro-heading" className="MfDiscMainTitle">
          {intro.heading}
        </h2>
        <p className="MfRegIntro__subtitle">{intro.subtitle}</p>
        <p className="MfRegIntro__summary">{intro.summaryLine}</p>
        <div className="MfDetailNote">
          <p>{intro.notice}</p>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ro-rights-heading">
        <h2 id="ro-rights-heading" className="MfDetailSection__title">
          {rights.heading}
        </h2>
        {rights.items.map((item) => (
          <article key={item.title} className="MfRoBlock">
            <h3>{item.title}</h3>
            {item.intro ? <p className="MfRoBlock__intro">{item.intro}</p> : null}
            {item.bullets ? (
              <ul className="MfDiscList">
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {item.groSummary ? (
              <div className="MfRoGroBox">
                <p>
                  <strong>Grievance Redressal Officer:</strong> {item.groSummary.name} (
                  {item.groSummary.designation})
                </p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${item.groSummary.email}`}>{item.groSummary.email}</a> | Phone:{" "}
                  <a href={`tel:${item.groSummary.phone}`}>{item.groSummary.phone}</a>
                </p>
                <p>
                  {item.groSummary.ack} | {item.groSummary.resolution}
                </p>
              </div>
            ) : null}
            {item.escalationRows ? (
              <div className="MfDetailTableWrap">
                <table className="MfDetailTable">
                  <caption className="sr-only">Grievance escalation levels</caption>
                  <thead>
                    <tr>
                      <th scope="col">Level</th>
                      <th scope="col">Escalate To</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.escalationRows.map((row) => (
                      <tr key={row.level}>
                        <td>{row.level}</td>
                        <td>
                          <strong>{row.escalateTo}</strong>
                        </td>
                        <td>{row.contact}</td>
                        <td className="MfDetailTable__accent">{row.timeline}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="MfDetailSection" aria-labelledby="ro-obligations-heading">
        <h2 id="ro-obligations-heading" className="MfDetailSection__title">
          {obligations.heading}
        </h2>
        {obligations.items.map((item) => (
          <article key={item.title} className="MfRoBlock">
            <h3>{item.title}</h3>
            <ul className="MfDiscList">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="MfDetailSection" aria-labelledby="ro-dos-heading">
        <h2 id="ro-dos-heading" className="MfDetailSection__title">
          {dosDonts.heading}
        </h2>
        <div className="MfIcDosDonts">
          <div className="MfIcDos">
            <h3>
              <CheckOutlined aria-hidden="true" /> {dosDonts.dos.heading}
            </h3>
            <ul>
              {dosDonts.dos.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="MfIcDonts">
            <h3>
              <CloseOutlined aria-hidden="true" /> {dosDonts.donts.heading}
            </h3>
            <ul>
              {dosDonts.donts.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ro-contacts-heading">
        <h2 id="ro-contacts-heading" className="MfDetailSection__title">
          {contacts.heading}
        </h2>
        <div className="MfRoContacts">
          {contacts.items.map((item) => (
            <article key={item.title} className="MfRoContactCard">
              <h3>{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="MfDetailSection" aria-labelledby="ro-formal-heading">
        <h2 id="ro-formal-heading" className="MfDetailSection__title">
          {formalDeclaration.heading}
        </h2>
        <div className="MfRoVm">
          <p>
            <strong>Vision:</strong> {formalDeclaration.visionMission.vision}
          </p>
          <p>
            <strong>Mission:</strong> {formalDeclaration.visionMission.mission}
          </p>
        </div>
        <h3 className="MfRoSubHeading">{formalDeclaration.servicesHeading}</h3>
        <div className="MfDetailTableWrap">
          <table className="MfDetailTable">
            <caption className="sr-only">Services and committed turnaround times</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Service</th>
                <th scope="col">Committed Timeline</th>
              </tr>
            </thead>
            <tbody>
              {formalDeclaration.serviceRows.map((row) => (
                <tr key={row.no}>
                  <td>{row.no}</td>
                  <td>{row.service}</td>
                  <td className="MfDetailTable__accent">{row.timeline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="MfRegTransparency" style={{ marginTop: 16 }}>
          <h3>Pledge by Innovate Securities</h3>
          <p>{formalDeclaration.pledge}</p>
          <p>
            <strong>Registered Address:</strong> {formalDeclaration.registeredAddress}
          </p>
          <p>
            <strong>Jurisdiction:</strong> {formalDeclaration.jurisdiction}
          </p>
          <p>
            <strong>Website:</strong>{" "}
            <a
              href={formalDeclaration.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {formalDeclaration.website}
            </a>
          </p>
          <p>{formalDeclaration.lastUpdated}</p>
        </div>
      </section>
    </>
  );
};

const MfComplianceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const page = getMfCompliancePage(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!page) {
    return (
      <div className="MainContainer marginTop">
        <div className="Container">
          <div className="paddingSide">
            <div className="SubPageHeader">
              <button
                type="button"
                className="BackButton"
                onClick={() => navigate("/compliances/mf-compliance")}
              >
                <ArrowLeftOutlined /> Back
              </button>
              <h1 className="SubPageTitle">Page not found</h1>
            </div>
            <p>This compliance disclosure page is not available yet.</p>
          </div>
        </div>
      </div>
    );
  }

  let content = <RegisteredDetailsContent page={page} />;
  if (page.pageType === "regulatory-registrations") {
    content = <RegulatoryRegistrationsContent page={page} />;
  } else if (page.pageType === "disclaimer") {
    content = <DisclaimerContent page={page} />;
  } else if (page.pageType === "commission-disclosure") {
    content = <CommissionDisclosureContent page={page} />;
  } else if (page.pageType === "investor-grievance-redressal") {
    content = <InvestorGrievanceContent page={page} />;
  } else if (page.pageType === "investor-charter") {
    content = <InvestorCharterContent page={page} />;
  } else if (page.pageType === "rights-obligations") {
    content = <RightsObligationsContent page={page} />;
  } else if (page.pageType === "structured") {
    content = <StructuredComplianceContent page={page} />;
  }

  return (
    <PageShell title={page.title} breadcrumbs={page.breadcrumbs} navigate={navigate}>
      {content}
    </PageShell>
  );
};

export default MfComplianceDetailPage;
