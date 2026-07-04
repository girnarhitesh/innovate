import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import "./CompliancesAndForms.css";
import { compliancesAndFormsData } from "./CompliancesAndFormsData";
import { AnimationObserver, AnimationConfigs } from "../../../utils/animationObserver";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, SafetyOutlined, BookOutlined, BarChartOutlined } from "@ant-design/icons";
import DocumentCard from "./DocumentCard";

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
    }
]

const CompliancesAndForms = () => {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("forms");
    
    // Refs for animation
    const headerRef = useRef(null);
    const tabsRef = useRef(null);

    const getTabData = (tabKey) => {
        return compliancesAndFormsData[tabKey] || [];
    };

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

        // Animate header section
        if (headerRef.current) {
            observer.observe(headerRef.current, AnimationConfigs.BLUR_3D);
        }

        // Animate tabs container
        if (tabsRef.current) {
            observer.observe(tabsRef.current, AnimationConfigs.SLIDE_3D);
        }

        return () => {
            observer.destroy();
        };
    }, []); // Only run once on mount

    const tabItems = [
        {
            key: "forms",
            label: "Forms",
            children: (
                <div className="DocumentsGrid">
                    {getTabData("forms").map((document, index) => (
                        <DocumentCard key={document.id} document={document} index={index} />
                    ))}
                </div>
            )
        },
        {
            key: "policies",
            label: "Policies",
            children: (
                <div className="DocumentsGrid">
                    {getTabData("policies").map((document, index) => (
                        <DocumentCard key={document.id} document={document} index={index} />
                    ))}
                </div>
            )
        },
        {
            key: "investorCharters",
            label: "Investor Charters",
            children: (
                <div className="DocumentsGrid">
                    {getTabData("investorCharters").map((document, index) => (
                        <DocumentCard key={document.id} document={document} index={index} />
                    ))}
                </div>
            )
        },
        {
            key: "compliance",
            label: "Compliance Data",
            children: (
                <div className="DocumentsGrid">
                    {getTabData("compliance").map((document, index) => (
                        <DocumentCard key={document.id} document={document} index={index} />
                    ))}
                </div>
            )
        }
    ];

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
                                <div
                                    key={card.key}
                                    className="LandingCard"
                                    onClick={() => navigate(card.route)}
                                >
                                    <div className="LandingCardIcon">{card.icon}</div>
                                    <h3 className="LandingCardTitle">{card.label}</h3>
                                    <p className="LandingCardDesc">{card.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CompliancesAndForms