import React, { useRef, useEffect } from "react";
import "./Disclaimer.css";

const Disclaimer = () => {
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
                    alt="Disclaimer - Innovate Securities"
                  />
                </div>
                <div>
                  <p>Disclaimer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="marginTop disclaimer-content">
            <div className="CommonHeader">
              <h2 className="text-center">Disclaimer</h2>
              <p className="text-center">
                Please read this disclaimer carefully before using our services
              </p>
            </div>
            <div className="marginTop disclaimer-text">
              <div className="disclaimer-section">
                <h3>General Information</h3>
                <p>
                  The information contained in this website is for general
                  information purposes only. While we endeavor to keep the
                  information up to date and correct, we make no representations
                  or warranties of any kind, express or implied, about the
                  completeness, accuracy, reliability, suitability, or
                  availability with respect to the website or the information,
                  products, services, or related graphics contained on the
                  website for any purpose.
                </p>
              </div>

              <div className="disclaimer-section">
                <h3>Investment Risks</h3>
                <p>
                  Investments in securities market are subject to market risks.
                  Read all the related documents carefully before investing.
                  Past performance is not indicative of future returns. The value
                  of investments may go up or down depending on the factors
                  affecting the securities market.
                </p>
              </div>

              <div className="disclaimer-section">
                <h3>No Guarantee</h3>
                <p>
                  Any reliance you place on such information is therefore
                  strictly at your own risk. In no event will we be liable for
                  any loss or damage including without limitation, indirect or
                  consequential loss or damage, or any loss or damage whatsoever
                  arising from loss of data or profits arising out of, or in
                  connection with, the use of this website.
                </p>
              </div>

              <div className="disclaimer-section">
                <h3>External Links</h3>
                <p>
                  Through this website you are able to link to other websites
                  which are not under the control of Innovate Securities Pvt.
                  Ltd. We have no control over the nature, content, and
                  availability of those sites. The inclusion of any links does
                  not necessarily imply a recommendation or endorse the views
                  expressed within them.
                </p>
              </div>

              <div className="disclaimer-section">
                <h3>Regulatory Compliance</h3>
                <p>
                  Innovate Securities Pvt. Ltd. is registered with SEBI as a
                  Stock Broker (NSE-BSE SEBI Registration No. INZ000224735) and
                  as a Depository Participant with CDSL (Registration No.
                  IN-DP-CDSL-594-2021). All services are provided in accordance
                  with applicable laws and regulations.
                </p>
              </div>

              <div className="disclaimer-section">
                <h3>Contact Information</h3>
                <p>
                  For any queries or clarifications regarding this disclaimer,
                  please contact us at:
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
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;

