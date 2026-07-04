import React, { useRef, useState, useEffect } from "react";
import "./OurStory.css";
import { Row, Col } from "antd";

const OurStory = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 300);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '-20px 0px 0px 0px'
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

    const BackgroundImage = "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/OverlayBack.jpg"
    return (
        <div className="OurStoryContainer" ref={sectionRef}>
            <div className="MainContainer marginTop">
                <div className="Container">
                    <div className="paddingSide">
                        <div className="CommonHeader">
                            <div className="SectionTagLabelContainer" style={{ margin: "auto" }}>
                                <div>
                                    <div className="flexVertically">
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png" alt="Innovate Securities Journey Icon - 40+ Years of Financial Excellence" />
                                    </div>
                                    <div>
                                        <p>Our Journey Since 1986</p>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-center">From Humble Beginnings to Trusted Excellence</h2>

                        </div>

                        <div className="marginTop centerContainer">
                            <Row gutter={[16, 16]}>
                                <Col lg={24} md={24} xs={24}>
                                    <div className={`StoryImageContainer LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/OurStory.jpg" alt="Innovate Securities Success Story - Financial Growth and Investment Excellence" />
                                    </div>
                                </Col>
                                <Col lg={24} md={24} xs={24}>
                                    <div className={`StoryContentContainer ${isVisible ? 'animate-content' : ''}`}>
                                        <div className="StorySection">
                                            <div className="StoryParagraph">
                                                <p>
                                                    The journey of <strong>Innovate Securities Pvt. Ltd.</strong> began in 1986, when <strong>Bhushan Shah</strong>, along with <strong>Piyush Parikh</strong> and <strong>Amar Parikh</strong>, started out as <strong>AMPI Investments</strong> as a proprietor firm. They began their broking business operating as a Sub Broker. This marked the foundation of what would become a trusted name in the financial sector.
                                                </p>
                                            </div>

                                            <div className="StoryParagraph">
                                                <p>
                                                    In 1993, <strong>Amar Parikh</strong> and <strong>Piyush Parikh</strong> launched <strong>Innovate Securities Pvt. Ltd. (ISPL)</strong> as a Private Corporate Firm, marking a significant milestone in our evolution. Over the years, the company expanded its reach by acquiring memberships with various exchanges and diversifying its service offerings.
                                                </p>
                                            </div>

                                            <div className="StoryParagraph">
                                                <p>
                                                    Today, with over three decades of experience, Innovate Securities continues to serve a wide range of individual and corporate clients, sub-brokers, and dealers, delivering innovative and reliable financial solutions through our comprehensive suite of services including equity trading, mutual fund distribution, and depository services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                        <div className="StackImageAnimation">
                            <div className="marginTop">
                                <div className={`StoryTimelineContainer ${isVisible ? 'animate-timeline' : ''}`}>
                                    <div className="TimelineItem">
                                        <div className="TimelineYear">1986</div>
                                        <div className="TimelineContent">
                                            <h3>The Foundation</h3>
                                            <p>Bhushan Shah, along with Piyush Parikh & Amar Parikh started out as AMPI Investments as a proprietor firm. Started broking business. Worked as a Sub Broker.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">1992</div>
                                        <div className="TimelineContent">
                                            <h3>Ahmedabad Stock Exchange Membership</h3>
                                            <p>Acquired Ahmedabad Stock Exchange Membership, expanding our presence in the regional market.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">1993</div>
                                        <div className="TimelineContent">
                                            <h3>Birth of Innovate Securities</h3>
                                            <p>Amar Parikh and Piyush Parikh launched Innovate Securities Pvt. Ltd. (ISPL) as a Private Corporate Firm, marking a significant milestone in our journey.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">15th Aug 1994</div>
                                        <div className="TimelineContent">
                                            <h3>Ahmedabad Office Inauguration</h3>
                                            <p>Inaugurated Ahmedabad Office (current headquarters), establishing our central hub for operations.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">1995</div>
                                        <div className="TimelineContent">
                                            <h3>NSE Membership</h3>
                                            <p>Acquired NSE Card (4th in Gujarat; one of the first members), expanding our reach to the National Stock Exchange.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">2004</div>
                                        <div className="TimelineContent">
                                            <h3>Depository Participant</h3>
                                            <p>Became a Depository Participant (DP) with CDSL (Central Depository Services Ltd.), enhancing our service offerings.</p>
                                        </div>
                                    </div>

                                    <div className="TimelineItem">
                                        <div className="TimelineYear">2010</div>
                                        <div className="TimelineContent">
                                            <h3>BSE Card Acquisition</h3>
                                            <p>Acquired BSE Card, strengthening our position in the Bombay Stock Exchange.</p>
                                        </div>
                                    </div>
                                    <div className="TimelineItem">
                                        <div className="TimelineYear">2018</div>
                                        <div className="TimelineContent">
                                            <h3>Mutual Fund Distribution</h3>
                                            <p>Launched Mutual Fund Distribution with Amit Shah, diversifying our financial services portfolio.</p>
                                        </div>
                                    </div>
                                    <div className="TimelineItem">
                                        <div className="TimelineYear">2025</div>
                                        <div className="TimelineContent">
                                            <h3>Innovate is Innovating</h3>
                                            <p>Continuing our legacy of innovation, we're constantly evolving to meet the changing needs of modern investors. Through cutting-edge technology, personalized service, and forward-thinking strategies, we're not just keeping pace with the industry—we're setting new standards and redefining what it means to be a trusted financial partner in the digital age.</p>
                                        </div>
                                    </div>
                                    <div className="TimelineItem">
                                        <div className="TimelineYear">2010</div>
                                        <div className="TimelineContent">
                                            <h3>BSE Card Acquisition</h3>
                                            <p>Acquired BSE Card, strengthening our position in the Bombay Stock Exchange.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurStory;