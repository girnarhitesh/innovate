import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Modal.css";
import AdvisioryForInvestors from "../AdvisioryForInvestors/AdvisioryForInvestors";

const Modal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [showAdvisory, setShowAdvisory] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const modalBodyRef = useRef(null);

  const handleModalClose = () => {
    setIsOpen(false);

    if (location.pathname !== '/advisiory-for-investors') {
      setShowAdvisory(true);
    }
  };

  const handleAdvisoryClose = () => {
    setShowAdvisory(false);
  };


  useEffect(() => {
    if (isOpen && modalBodyRef.current) {
      const checkScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = modalBodyRef.current;
        const hasMoreContent = scrollHeight > clientHeight;
        const isNotAtBottom = scrollTop < scrollHeight - clientHeight - 10;
        setShowScrollArrow(hasMoreContent && isNotAtBottom);
      };

        checkScroll();
        modalBodyRef.current.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
          if (modalBodyRef.current) {
            modalBodyRef.current.removeEventListener("scroll", checkScroll);
          }
          window.removeEventListener("resize", checkScroll);
        };
      }
    }, [isOpen]);

  const handleScrollDown = () => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTo({
        top: modalBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };
 

  if (showAdvisory) {
    return (
      <div className="modal-overlay" key="advisory-modal">
        <div
          className="modal-content advisory-modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="advisory-modal-title"
        >
          <div className="modal-header">
            <h2 id="advisory-modal-title">Advisory for Investors</h2>
            <button
              type="button"
              className="modal-close"
              onClick={handleAdvisoryClose}
              aria-label="Close advisory for investors dialog"
            >
              ×
            </button>
          </div>
          <div className="modal-body" style={{ display: 'block', gridTemplateColumns: '1fr' }}>
            <AdvisioryForInvestors />
          </div>
          <div className="modal-footer">
            <button type="button" className="modal-button" onClick={handleAdvisoryClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }


//    if (showSecondModal) {
//   return (
//     <div className="image-loader-second">
//       <div className="image-box-second">
//         <img
//           src="/Image/modelImage/ThirdImg.jpg"
//           alt="Second Screen"
//           className="second-image"
//         />
//         <button className="image-close-btn" onClick={handleSecondModalClose}>
//           ×
//         </button>
//       </div>
//     </div>
//   );
// }

  // if (showImage) {
  //   return (
  //     <div className="image-loader">
  //       <div className="image-box">
  //         <img
  //           src="/Image/modelImage/innovatesecModel-2.jpg"
  //           alt="First Screen"
  //           className="first-image"
  //           loading="eager"
  //         />
  //         <button className="image-close-btn" onClick={handleImageClose}>
  //           ×
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trading-advisory-modal-title"
        >
          <div className="modal-header">
            <h2 id="trading-advisory-modal-title">
              <span aria-hidden="true">📞 </span>
              Trading Call:{" "}
              <a href="tel:9376199199">93761 99199</a>
            </h2>
            <button
              type="button"
              className="modal-close"
              onClick={handleModalClose}
              aria-label="Close trading advisory dialog"
            >
              ×
            </button>
          </div>

          <div className="modal-body" ref={modalBodyRef}>
            <div className="left-column">
              <div className="sebi-section">
                <div className="sebi-header">
                  <div className="sebi-logo">
                    <span className="logo-text">SEBI</span>
                  </div>
                  <div className="sebi-tagline">
                    <p>हर निवेशक की ताकत</p>
                    <p>The strength of every investor</p>
                  </div>
                </div>

                <div className="website-link">
                  <a
                    href="https://investor.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://investor.sebi.gov.in
                  </a>
                </div>

                <div className="sebi-awareness-panel" role="region" aria-label="SEBI investor awareness highlights">
                  <p className="sebi-awareness-kicker">Investor Awareness</p>
                  <ul className="sebi-awareness-list">
                    <li>Learn personal finance basics with Money Matters</li>
                    <li>Access educational resources on the securities market</li>
                    <li>Use financial tools and calculators</li>
                    <li>Check your financial health online</li>
                  </ul>
                  <a
                    className="sebi-awareness-cta"
                    href="https://investor.sebi.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit SEBI Investor Website
                  </a>
                </div>

                <div className="main-message">
                  <h3>
                    UNLOCK THE <strong>WEALTH</strong> OF <strong>KNOWLEDGE</strong>
                  </h3>
                  <p className="subtitle">
                    Empower yourself in the world of investing
                  </p>
                </div>
              </div>

              <div className="features-section">
                <div className="feature-item">
                  <span className="feature-icon" aria-hidden="true">💰</span>
                  <div className="feature-text">
                    <strong>Money Matters:</strong> Dive into Money Matters to
                    grasp Personal Finance concepts.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon" aria-hidden="true">📚</span>
                  <div className="feature-text">
                    <strong>Educational Resources:</strong> Related to
                    investments, including securities market.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon" aria-hidden="true">🧮</span>
                  <div className="feature-text">
                    <strong>Financial Tools:</strong> Access a range of Financial
                    Tools and Calculators.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon" aria-hidden="true">❤️</span>
                  <div className="feature-text">
                    <strong>Financial Health Check:</strong> Evaluate your
                    Financial Health with the easy check.
                  </div>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="risk-disclosure">
                <h4>
                  <span aria-hidden="true">⚠️ </span>
                  Risk Disclosures on Derivatives
                </h4>
                <ul>
                  <li>
                    9 out of 10 individual traders in equity Futures and Options
                    Segment, incurred net losses.
                  </li>
                  <li>
                    On an average, loss makers registered net trading loss close
                    to ₹ 50,000.
                  </li>
                  <li>
                    Over and above the net trading losses incurred, loss makers
                    expended an additional 28% of net trading losses as
                    transaction costs.
                  </li>
                  <li>
                    Those making net trading profits, incurred between 15% to 50%
                    of such profits as transaction cost.
                  </li>
                </ul>
                <p className="source">
                  Source: SEBI study dated January 25, 2023
                </p>
              </div>

              <div className="advisory-section">
                <h4>
                  <span aria-hidden="true">🚨 </span>
                  Advisory to Clients for Trading in Securities Market
                </h4>
                <p>
                  <strong>Investors should avoid practices like:</strong>
                </p>
                <ul>
                  <li>
                    Sharing of trading credentials - login id & passwords
                    including OTPs.
                  </li>
                  <li>
                    Trading in leveraged products like options without proper
                    understanding.
                  </li>
                  <li>
                    Writing/selling options or trading in option strategies based
                    on tips, without basic knowledge.
                  </li>
                  <li>
                    Dealing in unsolicited tips through WhatsApp, Telegram,
                    YouTube, Facebook, SMS, Calls, etc.
                  </li>
                  <li>
                    Trading in "Options" based on recommendations from
                    unauthorized/unregistered investment advisors.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="modal-button" onClick={handleModalClose}>
              I Understand
            </button>
          </div>

          {showScrollArrow && (
            <button className="scroll-arrow" onClick={handleScrollDown}>
              <span>↓</span>
              <span className="scroll-text">Scroll Down</span>
            </button>
          )}
        </div>
      </div>
    );
  };

  export default Modal;
