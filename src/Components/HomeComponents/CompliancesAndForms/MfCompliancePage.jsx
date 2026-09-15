import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { MF_COMPLIANCE_CARDS } from "./mfComplianceData";
import "./CompliancesAndForms.css";
import "./MfCompliancePage.css";

const STATUS_BADGES = [
  "AMFI Registered Mutual Fund Distributor and SIF Distributor",
  "ARN-42505",
  "ARN Valid Until 05-Apr-2027",
];

const MfCompliancePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="MainContainer MfCompliancePage">
      <div className="Container MfComplianceLayout">
        <aside className="MfComplianceSidebar" aria-label="Compliance overview">
          <div className="MfComplianceSidebar__inner">
            <button
              type="button"
              className="BackButton MfComplianceSidebar__back"
              onClick={() => navigate("/compliances")}
            >
              <ArrowLeftOutlined aria-hidden="true" /> Back
            </button>

            <div className="CommonHeader MfComplianceSidebar__header">
              <div className="SectionTagLabelContainer">
                <div>
                  <div className="flexVertically">
                    <img
                      src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutBrand.png"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p>MF Compliance</p>
                  </div>
                </div>
              </div>

              <h1>Compliance &amp; Disclosures</h1>
              <p>
                In the interest of full transparency and in line with SEBI and AMFI
                regulations, all of our mandatory regulatory disclosures are
                available below. Please review them carefully.
              </p>
            </div>

            <ul className="MfComplianceBadges" aria-label="Registration status">
              {STATUS_BADGES.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section
          className="MfComplianceContent"
          aria-label="Disclosure categories"
        >
          <div className="paddingSide MfComplianceContent__inner">
            <div className="MfComplianceGrid" role="list">
              {MF_COMPLIANCE_CARDS.map((card) => {
                const cardBody = (
                  <>
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <span aria-hidden="true">READ MORE →</span>
                  </>
                );

                if (card.hasDetail) {
                  return (
                    <Link
                      key={card.slug}
                      to={`/compliances/mf-compliance/${card.slug}`}
                      className="MfComplianceCard MfComplianceCard--link"
                      role="listitem"
                    >
                      {cardBody}
                    </Link>
                  );
                }

                return (
                  <article
                    key={card.slug}
                    className="MfComplianceCard"
                    role="listitem"
                  >
                    {cardBody}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MfCompliancePage;
