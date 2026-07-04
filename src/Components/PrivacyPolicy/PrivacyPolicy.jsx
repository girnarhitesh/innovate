import React, { useRef, useEffect } from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Observer callback for future animations
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-20px 0px 0px 0px",
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="MainContainer marginTop" ref={sectionRef}>
      <div className="Container">
        <div className="paddingSide">
          <div className="CommonHeader">
            <div
              className="SectionTagLabelContainer"
              style={{ margin: "auto" }}
            >
              <div>
                <div className="flexVertically">
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutBrand.png"
                    alt="Privacy Policy - Innovate Securities"
                  />
                </div>
                <div>
                  <p>Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
          <div className="marginTop privacy-policy-content">
            <div className="CommonHeader">
              <h2 className="text-center">Privacy Policy</h2>
              <p className="text-center">
                Your privacy is important to us. Please read this policy
                carefully.
              </p>
            </div>
            <div className="marginTop privacy-policy-text">
              <div className="privacy-section">
                <h3>Introduction</h3>
                <p>
                  Innovate Securities Pvt. Ltd. ("we", "our", or "us") is
                  committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your
                  information when you use our services or visit our website.
                </p>
              </div>

              <div className="privacy-section">
                <h3>Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul>
                  <li>
                    <strong>Personal Information:</strong> Name, address, email
                    address, phone number, date of birth, PAN, Aadhaar number,
                    and other identification documents
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Bank account
                    details, trading account information, investment preferences
                  </li>
                  <li>
                    <strong>Technical Information:</strong> IP address, browser
                    type, device information, and usage data
                  </li>
                  <li>
                    <strong>Transaction Information:</strong> Details of
                    transactions, trading history, and investment activities
                  </li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>How We Use Your Information</h3>
                <p>We use the collected information for the following purposes:</p>
                <ul>
                  <li>To provide and maintain our services</li>
                  <li>To process your transactions and manage your account</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To communicate with you about our services</li>
                  <li>To improve our services and user experience</li>
                  <li>To detect and prevent fraud or other illegal activities</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>Information Sharing and Disclosure</h3>
                <p>
                  We do not sell your personal information. We may share your
                  information only in the following circumstances:
                </p>
                <ul>
                  <li>
                    With regulatory authorities and exchanges (NSE, BSE, SEBI,
                    CDSL) as required by law
                  </li>
                  <li>
                    With service providers who assist us in operating our
                    business (under strict confidentiality agreements)
                  </li>
                  <li>
                    When required by law, court order, or government regulation
                  </li>
                  <li>
                    To protect our rights, property, or safety, or that of our
                    clients
                  </li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures
                  to protect your personal information against unauthorized
                  access, alteration, disclosure, or destruction. However, no
                  method of transmission over the internet or electronic storage
                  is 100% secure.
                </p>
              </div>

              <div className="privacy-section">
                <h3>Your Rights</h3>
                <p>You have the right to:</p>
                <ul>
                  <li>Access and review your personal information</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal
                    requirements)</li>
                  <li>Opt-out of certain communications</li>
                  <li>File a complaint with relevant authorities</li>
                </ul>
              </div>

              <div className="privacy-section">
                <h3>Cookies and Tracking Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. You can control cookie
                  preferences through your browser settings.
                </p>
              </div>

              <div className="privacy-section">
                <h3>Changes to This Privacy Policy</h3>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify you of any changes by posting the new Privacy Policy on
                  this page and updating the "Last Updated" date.
                </p>
              </div>

              <div className="privacy-section">
                <h3>Contact Us</h3>
                <p>
                  If you have any questions about this Privacy Policy, please
                  contact us at:
                </p>
                <p>
                  <strong>Innovate Securities Pvt. Ltd.</strong>
                  <br />
                  1st Floor, DEVASHISH, 39, Sardar Patel Nagar
                  <br />
                  Opp. ABC-III, Navrangpura
                  <br />
                  Ahmedabad - 380 009
                  <br />
                  Email:{" "}
                  <a href="mailto:ispl@innovatesec.com">ispl@innovatesec.com</a>
                  <br />
                  Phone: <a href="tel:07926421314">079-26421314</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

