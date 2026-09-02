import { useRef, useState, useEffect } from "react";
import "./HomeAbout.css";
import { Row, Col } from "antd";
import HomeAboutImage from "../../../assets/FinancialGrowth.jpg";

const HomeAbout = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add 1 second delay before starting the animation
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                }
            },
            {
                threshold: 0.1, // Small threshold to detect early
                rootMargin: '-30px 0px 0px 0px' // Trigger when user enters section by 30px
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div className="HomeAboutContainer" ref={sectionRef}>
            <div className="MainContainer">
                <div className="Container">
                    <div className="paddingSide">
                        <div className="CommonHeader">
                            <div className="SectionTagLabelContainer">
                                <div>
                                    <div className="flexVertically">
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png" alt="Investment Confidence Icon - Trusted Financial Guidance" />
                                    </div>
                                    <div>
                                        <p>Invest with Confidence and Clarity</p>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-center">Welcome to Innovate Securities Pvt. Ltd. (ISPL)</h2>
                        </div>
                        <div className="marginTop centerContainer">
                            <Row gutter={[16, 16]}>
                                <Col lg={12} md={12} xs={24}>
                                    <div className="AboutCardContainer BoxDesigns">
                                        {/* <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Innovative Logo.png" alt="Innovate Securities Company Logo - 30+ Years of Financial Excellence" className="LogoIcon" /> */}
                                        <div>
                                            <h3>Empowering Financial Growth with 30+ Years of Trusted Expertise</h3>
                                            <br />
                                            <p>Founded in 1993, Innovate Securities Pvt. Ltd. (ISPL) has over three decades of experience in the Indian capital markets. We offer a wide spectrum of investment services including Shares & Securities, Mutual Funds, Government & Corporate Bonds, Fixed Deposits (FDs), and Non-Convertible Debentures (NCDs). As corporate members of NSE and BSE, and a depository participant with CDSL, we provide our clients with seamless and secure access to financial markets.</p>
                                            <br />
                                            <p>Our clientele ranges from HNIs and MNIs to Trusts, Corporates, and Cooperative Banks, all benefiting from tailored financial strategies aligned with their goals. With a leadership team rooted in trust, integrity, and professionalism, ISPL is committed to building long-term relationships and delivering expert, personalized guidance for sustainable financial growth.</p>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={12} md={12} xs={24}>
                                    <div className={`AboutImageContainerHome LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                        <img src={HomeAboutImage} alt="Professional Financial Services Team - Innovate Securities Investment Experts" />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAbout;