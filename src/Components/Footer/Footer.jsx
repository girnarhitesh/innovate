import React from "react";
import "./Footer.css";
import { Row, Col } from "antd";
import NavData from "../Navigation/NavData";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import AppStoreButtons from "../AppStoreButtons/AppStoreButtons";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import BrokingQrCode from "../../assets/footerImages/upi-qr-codee-BRO.png";
import DpQrCode from "../../assets/footerImages/upi-qr-code-DP.png";

const Footer = () => {
  const SocialMediaData = [
    {
      name: "Facebook",
      icon: <FaFacebook />,
      link: "https://www.facebook.com/profile.php?id=61577903109138",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram />,
      link: "https://www.instagram.com/innovatesecurities/",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/company/innovate-securities",
    },
  ];
  return (
    <div className="MainContainer FooterMainContainer">
      <div className="Container ">
        <div className="paddingSide marginTop marginBottom marginAuto">
          <Row gutter={[16, 16]} className="w-100">
            <Col lg={6} md={8} sm={24} xs={24}>
              <div className="CompanyBrandingContainer paddingRight">
                <div>
                  <h3>Innovate Securities Pvt. Ltd.</h3>
                  <p>
                    We are a team of experienced professionals who are dedicated
                    to providing the best possible service to our clients.
                  </p>
                </div>
                <div className="RegistrationCodeContainer">
                  <div>
                    <p>NSE-BSE SEBI Registration No.</p>
                    <p>
                      <b>INZ000224735</b>
                    </p>
                  </div>
                  <div>
                    <p>CDSL Registration No.</p>
                    <p>
                      <b>IN-DP-CDSL-594-2021</b>
                    </p>
                  </div>
                  <div>
                    <p>NSE Member Id</p>
                    <p>
                      <b>07002</b>
                    </p>
                  </div>
                  <div>
                    <p>BSE Member Id</p>
                    <p>
                      <b>6108</b>
                    </p>
                  </div>
                  <div>
                    <p>AMFI Registered Number</p>
                    <p>
                      <b>42505</b>
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={8} sm={24} xs={24}>
              <div className="SocialLinkstAndAdress">
                <div>
                  <h3>Quick Links</h3>
                  <ul>
                    {NavData.map((item, index) => (
                      <li key={index}>
                        <Link to={item.path}>{item.name}</Link>
                      </li>
                    ))}
                    <li><Link to="/disclaimer">Disclaimer</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/advisiory-for-investors">Advisiory for Investors</Link></li>
                    <li><Link to="/investor-complaints-disclosure">Investor Complaints Disclosure</Link></li>
                  </ul>
                
                </div>
                <div>
                  <div className="SocialMediaContainer">
                    <h3>Social Links</h3>
                    <ul>
                      {SocialMediaData.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.icon} {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} md={8} sm={24} xs={24}>
              <div className="MapContainer">
                <p>
                  1st Floor, DEVASHISH 39, Sardar Patel Nagar Opp. ABC-III, Nr.
                  Hotel Regency Navrangpura Ahmedabad - 380006
                </p>
                <br />
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.739721205993!2d72.55726109999999!3d23.033326999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8579d81d10e9%3A0xa79909e608211356!2sINNOVATE%20SECURITIES%20P%20LTD!5e0!3m2!1sen!2sin!4v1757922030852!5m2!1sen!2sin"
                  width="100%"
                  // height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Innovate Securities Location Map"
                ></iframe>
              </div>
            </Col>
            <Col lg={6} md={12} sm={24} xs={24}>
              <div className="QRCodeContainer">
                <div className="QRCodeSection">
                  <div className="QRCodeItem">
                    <img
                      src={BrokingQrCode}
                      alt="Broking UPI QR Code"
                      className="QRCodeImage"
                    />
                    <p className="QRCodeLabel">Broking</p>
                  </div>
                  <div className="QRCodeItem">
                    <img
                      src={DpQrCode}
                      alt="DP UPI QR Code"
                      className="QRCodeImage"
                    />
                    <p className="QRCodeLabel">DP</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <div className="FooterAppStoreRow">
            <AppStoreButtons />
          </div>
          <hr />
          <div className="CopyRightContainer">
            <p>
              <strong>
                © 2025 Innovate Securities Pvt. Ltd. All rights reserved.
              </strong>
            </p>
            <p>
              Designed & Developed by{" "}
              <a
                style={{ color: "black" }}
                href="https://www.outleadsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b>OutLead Solutions</b>
              </a>
            </p>
          </div>
        </div>
        {/* <div className="FooterBackImage">
                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/2371.jpg" alt="Innovate Securities Footer Background - Financial Services Excellence" />
                </div> */}
      </div>
    </div>
  );
};

export default Footer;
