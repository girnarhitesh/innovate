import { useRef, useState, useEffect } from "react";
import "./OurStory.css";
import { Row, Col } from "antd";

const timelineEvents = [
    {
        year: "1986",
        dateTime: "1986",
        title: "The Foundation",
        description:
            "Bhushan Shah, along with Piyush Parikh & Amar Parikh started out as AMPI Investments as a proprietor firm. Started broking business. Worked as a Sub Broker.",
    },
    {
        year: "1992",
        dateTime: "1992",
        title: "Ahmedabad Stock Exchange Membership",
        description:
            "Acquired Ahmedabad Stock Exchange Membership, expanding our presence in the regional market.",
    },
    {
        year: "1993",
        dateTime: "1993",
        title: "Birth of Innovate Securities",
        description:
            "Amar Parikh and Piyush Parikh launched Innovate Securities Pvt. Ltd. (ISPL) as a Private Corporate Firm, marking a significant milestone in our journey.",
    },
    {
        year: "15th Aug 1994",
        dateTime: "1994-08-15",
        title: "Ahmedabad Office Inauguration",
        description:
            "Inaugurated Ahmedabad Office (current headquarters), establishing our central hub for operations.",
    },
    {
        year: "1995",
        dateTime: "1995",
        title: "NSE Membership",
        description:
            "Acquired NSE Card (4th in Gujarat; one of the first members), expanding our reach to the National Stock Exchange.",
    },
    {
        year: "2004",
        dateTime: "2004",
        title: "Depository Participant",
        description:
            "Became a Depository Participant (DP) with CDSL (Central Depository Services Ltd.), enhancing our service offerings.",
    },
    {
        year: "2010",
        dateTime: "2010",
        title: "BSE Card Acquisition",
        description:
            "Acquired BSE Card, strengthening our position in the Bombay Stock Exchange.",
    },
    {
        year: "2018",
        dateTime: "2018",
        title: "Mutual Fund Distribution",
        description:
            "Launched Mutual Fund Distribution with Amit Shah, diversifying our financial services portfolio.",
    },
    {
        year: "2025",
        dateTime: "2025",
        title: "Innovate is Innovating",
        description:
            "Continuing our legacy of innovation, we're constantly evolving to meet the changing needs of modern investors. Through cutting-edge technology, personalized service, and forward-thinking strategies, we're not just keeping pace with the industry—we're setting new standards and redefining what it means to be a trusted financial partner in the digital age.",
    },
    {
        year: "2010",
        dateTime: "2010",
        title: "BSE Card Acquisition",
        description:
            "Acquired BSE Card, strengthening our position in the Bombay Stock Exchange.",
    },
];

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
        <section className="OurStoryContainer" ref={sectionRef} aria-labelledby="our-story-heading">
            <div className="MainContainer marginTop">
                <div className="Container">
                    <div className="paddingSide">
                        <header className="CommonHeader">
                            <div className="SectionTagLabelContainer" style={{ margin: "auto" }}>
                                <div>
                                    <div className="flexVertically">
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png" alt="" />
                                    </div>
                                    <div>
                                        <p>Our Journey Since 1986</p>
                                    </div>
                                </div>
                            </div>
                            <h1 className="sr-only">Our Story</h1>
                            <h2 id="our-story-heading" className="text-center">From Humble Beginnings to Trusted Excellence</h2>
                        </header>

                        <div className="marginTop centerContainer">
                            <Row gutter={[16, 16]}>
                                <Col lg={24} md={24} xs={24}>
                                    <div className={`StoryImageContainer LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/OurStory.jpg" alt="Illustration of city buildings on a platform, circled by dollar-sign icons, above a dotted world map" />
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

                        <section className="StackImageAnimation" aria-labelledby="our-story-timeline-heading">
                            <h2 id="our-story-timeline-heading" className="sr-only">Milestones</h2>
                            <div className="marginTop">
                                <ol className={`StoryTimelineContainer ${isVisible ? 'animate-timeline' : ''}`}>
                                    {timelineEvents.map((event, index) => (
                                        <li className="TimelineItem" key={`${event.dateTime}-${event.title}-${index}`}>
                                            <div className="TimelineSide">
                                                <time className="TimelineYear" dateTime={event.dateTime}>{event.year}</time>
                                                <div className="TimelineContent">
                                                    <h3>{event.title}</h3>
                                                    <p>{event.description}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;