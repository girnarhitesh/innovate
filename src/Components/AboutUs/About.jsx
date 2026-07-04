import React, { useRef, useEffect } from "react";
import "./About.css";
import { BiSolidQuoteLeft } from "react-icons/bi";
import { Row, Col } from "antd";
import Directors from "../Directors/Directors";
import Table from "./Table";
const About = () => {
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
    <>
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
                      alt="About Innovate Securities Brand Icon - Trusted Financial Services"
                    />
                  </div>
                  <div>
                    <p>About InnvoteSecurities</p>
                  </div>
                </div>
              </div>
              {/* <div className="BtnContainer" style={{ margin: "auto" }}>
                            <button>Portfolio</button>
                        </div> */}
            </div>
            <div className="marginTop">
              <div className="CommonHeader">
                <h2 className="text-center">Escalation Matrix</h2>
                <p className="text-center">
                  Contact information for various departments and personnel
                </p>
              </div>
              <Table />
            </div>
            <div className="marginTop">
              <div className="CommonHeader">
                <h2 className="text-center">Compliance Officers</h2>
                <p className="text-center">
                  Names and contact details of all Key Managerial Personnel
                  including the Compliance Officer
                </p>
              </div>
              <div className="marginTop escalation-matrix-container">
                <div className="escalation-table-wrapper">
                  <table className="escalation-table">
                    <thead>
                      <tr>
                        <th>Sr. No.</th>
                        <th>Name of the Individual</th>
                        <th>Designation</th>
                        <th>Mobile Number</th>
                        <th>Email Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Amar M. Parikh</td>
                        <td>Managing Director - CEO</td>
                        <td>
                          <a href="tel:9825032652">9825032652</a>
                        </td>
                        <td>
                          <a href="mailto:innovatescrap@gmail.com">
                            innovatescrap@gmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Pimal K. Panchal</td>
                        <td>Executive Director - Compliance Officer</td>
                        <td>
                          <a href="tel:9429893549">9429893549</a>
                        </td>
                        <td>
                          <a href="mailto:Innovate95@rediffmail.com">
                            Innovate95@rediffmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>Kashyap R. Mehta</td>
                        <td>Director- C.S.</td>
                        <td>
                          <a href="tel:9825015581">9825015581</a>
                        </td>
                        <td>
                          <a href="mailto:kashyaprmehta@hotmail.com">
                            kashyaprmehta@hotmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>Amit P. Shah</td>
                        <td>Director</td>
                        <td>
                          <a href="tel:9879506993">9879506993</a>
                        </td>
                        <td>
                          <a href="mailto:Amitpshah83@gmail.com">
                            Amitpshah83@gmail.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <div className="marginTop">
                        <div className="ImagesGridAnimation">
                            <Row gutter={[8, 8]}>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div className="FirstGrid">
                                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsMain2.jpg" alt="Financial Services Team Collaboration - Professional Investment Advisory" />
                                        </div>
                                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsMain3.jpg" alt="Business Strategy and Financial Planning - Corporate Investment Solutions" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={12} md={12} sm={12} xs={12}>
                                    <div className="SecondGrid">
                                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutMain1.jpg" alt="Digital Financial Services Platform - Modern Investment Technology" />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <div className="ThirdGrid">
                                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsmain4.jpg" alt="Investment Portfolio Analysis - Financial Market Research" />
                                        </div>
                                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutUsMain5.jpg" alt="Corporate Financial Services - Business Investment Solutions" />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div> */}
            <div className="marginTop">
              <div className="CommonHeader">
                <h2 className="text-center">About Brand</h2>
                <p className="text-center">
                  Welcome to Innovate Securities Pvt. Ltd. (ISPL)
                </p>
              </div>
              <div className="CommonHeader marginTop text-center">
                <p>
                  <b>Innovate Securities Pvt. Ltd. (ISPL)</b>, established in{" "}
                  <b>October 1993</b>, brings over <b>30 years of expertise</b>{" "}
                  in the <b>Indian capital markets</b>. We offer a comprehensive
                  suite of financial services, including{" "}
                  <b>Shares & Securities</b>, <b>Mutual Funds</b>,{" "}
                  <b>Government & Corporate Bonds</b>,{" "}
                  <b>Corporate Fixed Deposits (FDs)</b>, and{" "}
                  <b>Non-Convertible Debentures (NCDs)</b>, designed to meet the
                  diverse needs of our clients.
                </p>
                <p>
                  As corporate members of the{" "}
                  <b>National Stock Exchange (NSE)</b>, covering the{" "}
                  <b>Capital Market & F&O segments</b>, and the{" "}
                  <b>Bombay Stock Exchange (BSE)</b>, alongside being a{" "}
                  <b>Depository Participant</b> with{" "}
                  <b>Central Depository Services Limited (CDSL)</b>, we ensure
                  seamless access to a wide range of investment opportunities.
                  Our diverse clientele includes <b>HNIs</b>, <b>MNIs</b>,{" "}
                  <b>Family and Religious Trusts</b>, <b>Corporates</b>,{" "}
                  <b>Cooperative Banks</b>, and individual investors, all of
                  whom benefit from bespoke financial solutions tailored to
                  their unique objectives.
                </p>
                <p>
                  Our <b>leadership team</b> is committed to delivering{" "}
                  <b>innovative, client-centric services</b> while fostering{" "}
                  <b>long-term relationships</b> grounded in{" "}
                  <b>trust, professionalism, and integrity</b>. At ISPL, we are
                  dedicated to helping clients achieve{" "}
                  <b>sustainable financial success</b> with{" "}
                  <b>expert guidance</b> and <b>personalized support</b>.
                </p>
                {/* <p>Thank you for choosing <b>Innovate Securities Pvt. Ltd.</b>. We look forward to being a <b>trusted partner</b> in your financial journey.</p> */}
              </div>
            </div>
            <div className="marginTop">
              <div className="BackGroundImageWithContent">
                <div className="ContentContainerAboutUs ">
                  <BiSolidQuoteLeft className="white" />

                  <h2 className="white">
                    Our leadership delivers innovative, client-focused services
                    for sustainable financial success.
                  </h2>
                  <br />
                  <p className="white">
                    Thank you for choosing <b>Innovate Securities Pvt. Ltd.</b>{" "}
                    We look forward to being a <b>trusted partner</b> in your
                    financial journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Directors />
    </>
  );
};

export default About;
