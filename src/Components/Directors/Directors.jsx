import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "antd";
import "./Directors.css";

const Directors = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const directorsData = [
        {
            id: 1,
            name: "Amar M Parikh",
            position: "Managing Director",
            description: "Leading the strategic vision and overall operations of Innovate Securities. With extensive experience in financial markets, Amar drives innovation and growth while ensuring the highest standards of service excellence.",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/director-1.jpg"
        },
        {
            id: 2,
            name: "Kashyap R Mehta",
            position: "Director",
            description: "Overseeing key business operations and strategic partnerships. Kashyap brings deep market insights and operational expertise to ensure sustainable growth and client satisfaction.",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/director-2.jpg"
        },
        {
            id: 3,
            name: "Amit P Shah",
            position: "Executive Director",
            description: "Managing day-to-day operations and implementing strategic initiatives. Amit's leadership ensures seamless execution of our business objectives and maintains operational excellence.",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/director-3.jpg"
        },
        {
            id: 4,
            name: "Pimal K Panchal",
            position: "Compliance Officer/ Director",
            description: "Ensuring regulatory compliance and maintaining the highest standards of corporate governance. Pimal's expertise in compliance frameworks safeguards our operations and client interests.",
            image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/director-4.jpg"
        }
    ];

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
                                    <p>INNOVATE DIRECTORS</p>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-center">Meet Our Leadership Team</h2>
                        <p className="text-center subtitle">Experienced professionals driving innovation and excellence in financial services</p>
                    </div>

                    <div className="directors-container">
                        <Row gutter={[32, 32]} className="directors-row">
                            {directorsData.map((director, index) => (
                                <Col lg={12} md={24} xs={24} key={director.id}>
                                    <div
                                        className={`director-card ${isVisible ? 'card-visible' : ''}`}
                                        style={{ animationDelay: `${index * 0.2}s` }}
                                    >
                                        <div className="card-header">
                                            {/* <div className="director-image">
                                                <img
                                                    src={director.image}
                                                    alt={director.name}
                                                    onError={(e) => {
                                                        e.target.src = "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/default-director.jpg";
                                                    }}
                                                />
                                            </div> */}
                                            <div className="director-info">
                                                <h3 className="director-name">{director.name}</h3>
                                                <span className="director-position">{director.position}</span>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <p className="director-description">
                                                {director.description}
                                            </p>
                                        </div>

                                        <div className="card-footer">
                                            <div className="director-badge">
                                                <span className="badge-icon">👔</span>
                                                <span className="badge-text">Leadership</span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <div className="leadership-section">
                        <div className="leadership-content">
                            <div className="leadership-text">
                                <h3>Our Leadership Philosophy</h3>
                                <p>
                                    Our directors bring together decades of combined experience in financial markets,
                                    regulatory compliance, and strategic business development. Their leadership ensures
                                    that Innovate Securities maintains the highest standards of professionalism,
                                    innovation, and client-centric service delivery.
                                </p>
                            </div>
                            <div className="leadership-stats">
                                <div className="stat-item">
                                    <span className="stat-number">30+</span>
                                    <span className="stat-label">Years Combined Experience</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">4</span>
                                    <span className="stat-label">Expert Directors</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Compliance Focus</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Directors;