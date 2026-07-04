import React, { useEffect, useRef } from "react";
import "./OnlineDesk.css";
import { onlineDeskItems } from "./OnlineDeskData";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { AnimationObserver, AnimationConfigs } from "../../utils/animationObserver";

const ScoresDisclosureContent = ({ disclosure }) => (
    <div className="ScoresDisclosure ScoresDisclosure--card">
        <p className="ScoresDisclosureTitle">{disclosure.title}</p>
        <ol className="ScoresDisclosureList" type="a">
            {disclosure.points.map((point, i) => (
                <li key={i}>{point}</li>
            ))}
        </ol>
    </div>
);

const DeskCardTop = ({ item }) => (
    <>
        <div className="DeskLogoWrap">
            <img src={item.logo} alt={item.title} />
        </div>
        <br />
        <div className="DeskContent">
            <p>{item.title}</p>
            <span className="DeskLink">
                {item.cta} <LuSquareArrowOutUpRight />
            </span>
        </div>
    </>
);

const OnlineDesk = () => {
    const headerRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const observer = new AnimationObserver({
            threshold: 0.1,
            rootMargin: "-20px 0px 0px 0px",
            animationDelay: 200,
        });

        if (headerRef.current) {
            observer.observe(headerRef.current, AnimationConfigs.BLUR_3D);
        }

        if (cardsRef.current) {
            observer.observe(cardsRef.current, AnimationConfigs.ZOOM_3D);
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
                                    <img
                                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/AboutHome.png"
                                        alt="Online Desk Icon"
                                    />
                                </div>
                                <div>
                                    <p>Online Desk</p>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-center">Online Desk</h1>
                    </div>
                    <div className="OnlineDeskGrid marginTop" ref={cardsRef}>
                        {onlineDeskItems.map((item, index) =>
                            item.disclosure ? (
                                <a
                                    className="DeskCard DeskCard--withDisclosure"
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={index}
                                >
                                    <div className="DeskCardTop">
                                        <DeskCardTop item={item} />
                                    </div>
                                    <ScoresDisclosureContent disclosure={item.disclosure} />
                                </a>
                            ) : (
                                <a
                                    className="DeskCard"
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    key={index}
                                >
                                    <div className="DeskCardInner">
                                        <div>
                                            <DeskCardTop item={item} />
                                        </div>
                                    </div>
                                </a>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineDesk;
