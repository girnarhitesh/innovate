import React, { useRef, useState, useEffect } from "react";
import "./ProgressReach.css"
import { Row, Col } from "antd";
const ProgressReach = () => {
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
        <div className="MainContainer" ref={sectionRef}>
            <div className="Container ">
                <div className="paddingSide">
                    <div className="ReachQuateContainer centerContainer">
                        <Row gutter={[16, 16]}>
                            <Col lg={12} md={12} xs={24}>
                                <div className="ReachQuateContainerLeft">
                                    <div>
                                        <h2 className="white">Elevate your digital strategy in 2025</h2>
                                        <br />
                                       <p className="white">Innovate Securities Pvt. Ltd. (ISPL) is a leading financial services provider in India, offering a diverse range of solutions including equities, derivatives, mutual funds, bonds, corporate fixed deposits, and NCDs. With over 30 years of expertise, ISPL caters to a wide range of clients, ensuring seamless access to investments through advanced technology and personalized support.</p>
                                      <br />
                                       <p className="white">Whether your goal is capital growth, wealth preservation, or tax savings, ISPL’s tailored strategies ensure your financial objectives are achieved. With a strong commitment to client success, ISPL provides expert guidance, reliable execution, and the tools necessary for making informed financial decisions.</p>
                                        <br />
                                    </div>
                                    <div>
                                        <div className="BtnContainerWhite">
                                            <button>Read More</button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                                <div className="ReachQuateContainerRight centerContainer">
                                    <Row gutter={[10, 10]}>
                                        <Col lg={12} md={12} xs={24}>
                                            <div>
                                                <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/digitalstrategy1.jpg" alt="Financial Planning and Investment Strategy - Professional Wealth Management" />
                                                </div>
                                                <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/digitalStrategy2.jpg" alt="Business Growth and Investment Success - Corporate Financial Services" />
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                            <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                                <img src="https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Investment Portfolio Management - Financial Advisory Services" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProgressReach;