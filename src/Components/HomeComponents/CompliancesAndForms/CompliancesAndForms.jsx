import { useEffect, useRef } from "react";
import "./CompliancesAndForms.css";
import { AnimationObserver, AnimationConfigs } from "../../../utils/animationObserver";
import { Link } from "react-router-dom";
import { FileTextOutlined, SafetyOutlined, BookOutlined, BarChartOutlined, FundOutlined } from "@ant-design/icons";

const landingCards = [
    {
        key: "forms",
        label: "Forms",
        icon: <FileTextOutlined />,
        description: "",
        route: "/compliances/forms"
    },
    {
        key: "policies",
        label: "Policies",
        icon: <SafetyOutlined />,
        description: "",
        route: "/compliances/policies"
    },
    {
        key: "investorCharters",
        label: "Investor Charters",
        icon: <BookOutlined />,
        description: "",
        route: "/compliances/investor-charters"
    },
    {
        key: "compliance",
        label: "Compliance Data",
        icon: <BarChartOutlined />,
        description: "",
        route: "/compliances/compliance-data"
    },
    {
        key: "mfCompliance",
        label: "MF Compliance",
        icon: <FundOutlined />,
        description: "",
        route: "/compliances/mf-compliance"
    }
]
const CompliancesAndForms = () => {
    const headerRef = useRef(null);
    const tabsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Animation setup
    useEffect(() => {
        const observer = new AnimationObserver({
            threshold: 0.1,
            rootMargin: '-20px 0px 0px 0px',
            animationDelay: 200
        });

        if (headerRef.current) {
            observer.observe(headerRef.current, AnimationConfigs.BLUR_3D);
        }

        if (tabsRef.current) {
            observer.observe(tabsRef.current, AnimationConfigs.SLIDE_3D);
        }

        return () => {
            observer.destroy();
        };
    }, []);

    return (
        <div className="MainContainer marginTop">
            <div className="Container">
                <div className="paddingSide">
                    <div className="CommonHeader" ref={headerRef}>
                        <div className="SectionTagLabelContainer">
                            <div style={{ margin: "auto" }}>
                                <div className="flexVertically">
                                    <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png" alt="Forms Icon" />
                                </div>
                                <div>
                                    <p>Compliances</p>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-center">Documents & Forms</h1>
                    </div>

                    {/* <div className="TabsContainer" ref={tabsRef}>
                        <Tabs
                            defaultActiveKey="forms"
                            items={tabItems}
                            onChange={setActiveTab}
                            className="CustomTabs"
                        />
                    </div> */}

                     {/* Landing Cards — replaces Tabs */}
                    <div className="TabsContainer LandingCardsContainer" ref={tabsRef}>
                        <div className="LandingCardsGrid">
                            {landingCards.map((card) => (
                                <Link
                                    key={card.key}
                                    to={card.route}
                                    className="LandingCard"
                                    aria-label={card.description ? `${card.label}. ${card.description}` : card.label}
                                >
                                    <span className="LandingCardIcon" aria-hidden="true">{card.icon}</span>
                                    <span className="LandingCardTitle">{card.label}</span>
                                    {card.description ? (
                                        <span className="LandingCardDesc">{card.description}</span>
                                    ) : null}
                                </Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompliancesAndForms