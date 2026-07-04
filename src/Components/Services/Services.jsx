import React, { useState, useEffect, useRef } from "react";
import "./Services.css";
import { Row, Col } from "antd";
import ServicesData from "./ServicesData";
import { useNavigate } from "react-router-dom";

const Services = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredCard, setHoveredCard] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 500);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '-30px 0px 0px 0px'
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleServiceClick = (service) => {
        const serviceSlug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        navigate(`/services/${serviceSlug}`);
    };

    return (
        <div className="MainContainer marginTop" ref={sectionRef}>
            <div className="Container">
                <div className="paddingSide">
                    <div className="CommonHeader">
                        <div className="SectionTagLabelContainer" style={{ margin: "auto" }}>
                            <div>
                                <div className="flexVertically">
                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png" alt="Financial Services Icon - Investment Solutions" />
                                </div>
                                <div>
                                    <p>OUR SERVICES</p>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center">Professional Financial Services for Your Success</h2>
                    </div>

                    <div className="marginTop ServicesBannerImage">
                        <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/service.jpg" alt="" className="w-100" />
                        </div>
                    </div>

                    <div className="services-cards-container centerContainer">
                        <Row gutter={[24, 24]} className="services-cards-row">
                            {ServicesData.map((service, index) => (
                                <Col lg={8} md={12} xs={24} key={service.id}>
                                    <div
                                        className={`service-card ${isVisible ? 'card-visible' : ''}`}
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                        onMouseEnter={() => setHoveredCard(index)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        onClick={() => handleServiceClick(service)}
                                    >
                                        {/* <div className="card-image-container">
                                            <img 
                                                src={service.image} 
                                                alt={service.title}
                                                className="card-image"
                                            />
                                            <div className="card-overlay">
                                                <div className="overlay-content">
                                                    <span className="view-more-text">View More</span>
                                                    <span className="arrow-icon">→</span>
                                                </div>
                                            </div>
                                        </div> */}

                                        <div className="card-content">
                                            <div className="service-icon">
                                                <img
                                                    src={service.iconImage}
                                                    alt={`${service.title} icon`}
                                                    className="icon-image"
                                                />
                                            </div>

                                            <h3 className="service-title">{service.title}</h3>

                                            <p className="service-description">
                                                {service.servicesCardText}
                                            </p>

                                            <div className="card-footer">
                                                <button
                                                    className="view-details-btn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleServiceClick(service);
                                                    }}
                                                >
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className="services-additional-section">
                        <div className="additional-content">
                            <div className="additional-image">
                                <img
                                    src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/SquareSmall.jpg"
                                    alt="Professional Financial Advisory Team - Innovate Securities"
                                />
                            </div>
                            <div className="additional-text">
                                <h3>Expert Financial Guidance</h3>
                                <p>
                                    Our expert team provides personalized financial guidance tailored to your investment goals.
                                    With over 30 years of market experience, we help you make informed decisions for sustainable wealth creation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;