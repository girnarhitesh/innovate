import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Modal.css";
import AdvisioryForInvestors from "../AdvisioryForInvestors/AdvisioryForInvestors";

const Modal = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true); // modal shows first
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showAdvisory, setShowAdvisory] = useState(false); // advisory shows second
  const [showImage, setShowImage] = useState(false); // image shows third
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const modalBodyRef = useRef(null);

  const handleModalClose = () => {
    setIsOpen(false);
      
    // Only show advisory modal if not on the advisory page
    if (location.pathname !== '/advisiory-for-investors') {
      setShowAdvisory(true);
    } else {
      // On advisory page, skip advisory modal and go directly to image
      setShowSecondModal(true);
    }
  };

  const handleSecondModalClose = () => {
  setShowSecondModal(false);

};


  const handleAdvisoryClose = () => {
    setShowAdvisory(false);
    setShowSecondModal(true);
  };

  const handleImageClose = () => {
    setShowImage(false);
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
        <div className="modal-content advisory-modal-content">
          <div className="modal-header">
            <h2>Advisory for Investors</h2>
            <button className="modal-close" onClick={handleAdvisoryClose}>
              ×
            </button>
          </div>
          <div className="modal-body" style={{ display: 'block', gridTemplateColumns: '1fr' }}>
            <AdvisioryForInvestors />
          </div>
          <div className="modal-footer">
            <button className="modal-button" onClick={handleAdvisoryClose}>
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
        <div className="modal-content">
          <div className="modal-header">
            <h2>📞 Trading Call: 93761 99199</h2>
            <button className="modal-close" onClick={handleModalClose}>
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

                <div className="sebi-image">
                  <img
                    src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/sebi_investor_awareness_website.jpg"
                    alt="SEBI Investor Awareness Website"
                    className="sebi-banner"
                  />
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
                  <span className="feature-icon">💰</span>
                  <div className="feature-text">
                    <strong>Money Matters:</strong> Dive into Money Matters to
                    grasp Personal Finance concepts.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📚</span>
                  <div className="feature-text">
                    <strong>Educational Resources:</strong> Related to
                    investments, including securities market.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🧮</span>
                  <div className="feature-text">
                    <strong>Financial Tools:</strong> Access a range of Financial
                    Tools and Calculators.
                  </div>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">❤️</span>
                  <div className="feature-text">
                    <strong>Financial Health Check:</strong> Evaluate your
                    Financial Health with the easy check.
                  </div>
                </div>
              </div>
            </div>

            <div className="right-column">
              <div className="risk-disclosure">
                <h4>⚠️ Risk Disclosures on Derivatives</h4>
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
                <h4>🚨 Advisory to Clients for Trading in Securities Market</h4>
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
            <button className="modal-button" onClick={handleModalClose}>
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
