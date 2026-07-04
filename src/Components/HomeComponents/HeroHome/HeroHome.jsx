import React, { useEffect, useRef, useState } from "react";
import "./HeroHome.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import { useAccessibility } from "../../../context/AccessibilityContext";

const HeroHome = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isTaglineVisible, setIsTaglineVisible] = useState(true);
  const videoRef = useRef(null);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { isReducedMotionEnabled } = useAccessibility();

  // Taglines array
  const taglines = [
    "Empowering Smarter Financial Futures",
    "Your Trusted Partner in Investment Success",
    "Building Wealth Through Strategic Planning",
    "Innovation Meets Financial Excellence",
    "Securing Tomorrow's Prosperity Today",
  ];

  // Tagline rotation effect
  useEffect(() => {
    if (isReducedMotionEnabled) {
      setIsTaglineVisible(true);
      return undefined;
    }

    let rotationTimeoutId;

    const interval = setInterval(() => {
      setIsTaglineVisible(false);

      rotationTimeoutId = window.setTimeout(() => {
        setCurrentTaglineIndex(
          (prevIndex) => (prevIndex + 1) % taglines.length,
        );
        setIsTaglineVisible(true);
      }, 300); // Half of the transition time for smooth fade
    }, 3000);

    return () => {
      clearInterval(interval);
      window.clearTimeout(rotationTimeoutId);
    };
  }, [isReducedMotionEnabled, taglines.length]);

  useEffect(() => {
    let revealTimeoutId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isReducedMotionEnabled) {
            setIsVisible(true);
            return;
          }

          // Add 1 second delay before starting the animation
          revealTimeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, 500);
        }
      },
      {
        threshold: 0.1, // Small threshold to detect early
        rootMargin: "-30px 0px 0px 0px", // Trigger when user enters section by 30px
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.clearTimeout(revealTimeoutId);
    };
  }, [isReducedMotionEnabled]);

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance?.autoplay) {
      if (isReducedMotionEnabled) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }

    if (videoRef.current) {
      if (isReducedMotionEnabled) {
        videoRef.current.pause();
      } else if (isPlaying) {
        const playPromise = videoRef.current.play();

        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isPlaying, isReducedMotionEnabled]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const SwiperData = [
    {
      title: "ISPL engages in proprietary (PRO) trading.",
    },
    {
      title:
        "Pay an upfront margin of 20% of the transaction value to trade in the cash market segment.",
    },
    {
      title:
        "No need to issue cheques by investors while subscribing to IPO. Just write the bank account number and sign in the application form to authorise your bank to make payment in case of allotment. No worries for refund as the money remains in investor's account.",
    },
    {
      title:
        "KYC is one time exercise while dealing in securities markets - once KYC is done through a SEBI registered intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same process again when you approach another intermediary.",
    },
    {
      title:
        "Prevent Unauthorized Transactions in your demat account --> Update your Mobile Number with your Depository Participant. Receive alerts on your Registered Mobile for all debit and other important transactions in your demat account directly from CDSL on the same day......................issued in the interest of investors.",
    },
    {
      title:
        "Effective 1 September 2020, stockbrokers may accept securities as margin from clients only through a pledge in the depository system.",
    },
    {
      title: "Client Bank Account Details",
    },
    {
      title:
        "New client login: https://bo.innovatesec.com. Username: your Trading Code; Password: your PAN.",
    },
    {
      title:
        "We have provide online closure and modification facility at our end. For more information, please contact us.",
    },
  ];

  return (
    <div className="HeroHomeSection" ref={sectionRef}>
      <div className="MainContainer">
        <div className="Container">
          <div className="FlexContainer ">
            {/* <div className="MaxWidthContainer">
                            <div className="LeftSideContentContainer">
                                <div className="SectionTagLabelContainer">
                                    <div>
                                        <div className="flexVertically">
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/RocketPng.png" alt="Financial Growth Rocket Icon - Empowering Investment Success" />
                                        </div>
                                        <div>
                                            <p>Empowering Smarter Financial Futures</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h1>Your Trusted Partner in Financial Growth</h1>
                                    <p>With over 30 years of experience in capital markets, Innovate Securities offers personalized investment solutions across shares, bonds, mutual funds, and more.</p>
                                    <p>We serve individuals, corporates, and institutions with expertise, integrity, and long-term vision.</p>
                                    <div className="BtnContainer">
                                        <Link to="/about-us"> <button>About Innovate</button></Link>
                                    </div>
                                    <div className="BackgroundImage">
                                        <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/S407.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div> */}
            <div className={`LayerImage ${isVisible ? "reveal-image" : ""}`}>
              <div
                className="VideoWrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="https://cdn.prod.website-files.com/67df2c20360768e358fdd20a%2F682b74c0505f21d18c54d43f_4426377-uhd_3840_2160_25fps-transcode.mp4"
                  autoPlay
                  muted
                  loop
                  className="w-100"
                ></video>

                {/* Taglines Overlay */}
                <div className="TaglinesOverlay">
                  <div
                    className={`TaglineText ${isTaglineVisible ? "visible" : "hidden"}`}
                  >
                    {taglines[currentTaglineIndex]}
                  </div>
                </div>

                <div
                  className={`PlayPauseButton ${showButton ? "visible" : ""} ${isPlaying ? "playing" : "paused"}`}
                  onClick={togglePlayPause}
                >
                  <div className="ButtonIcon">
                    {isPlaying ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="6" y="4" width="4" height="16"></rect>
                        <rect x="14" y="4" width="4" height="16"></rect>
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="5,3 19,12 5,21"></polygon>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="VerticalSwiperContainer">
              <Swiper
                ref={swiperRef}
                direction={"vertical"}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={800}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Autoplay]}
                className="mySwiper"
              >
                {SwiperData.map((item, index) => {
                  return (
                    <SwiperSlide key={index}>
                      <div className="ContentContainerInThisSWiper">
                        <h3> {item.title}</h3>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* <div
                            className="RightSideVideoContainer"
                            style={{ width: `${videoWidth}%` }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className={`LayerImage ${isVisible ? 'reveal-image' : ''}`}>
                                <div className="VideoWrapper">
                                    <video
                                        ref={videoRef}
                                        src="https://cdn.prod.website-files.com/67df2c20360768e358fdd20a%2F682b74c0505f21d18c54d43f_4426377-uhd_3840_2160_25fps-transcode.mp4"
                                        autoPlay
                                        muted
                                        loop
                                        className="w-100"

                                    ></video>
                                    <div
                                        className={`PlayPauseButton ${showButton ? 'visible' : ''} ${isPlaying ? 'playing' : 'paused'}`}
                                        onClick={togglePlayPause}
                                    >
                                        <div className="ButtonIcon">
                                            {isPlaying ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <rect x="6" y="4" width="4" height="16"></rect>
                                                    <rect x="14" y="4" width="4" height="16"></rect>
                                                </svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polygon points="5,3 19,12 5,21"></polygon>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            {/* <div className="AnimatedBannerImageContainer">
                            <img src={AnimatedBannerImage} alt="Innovate Securities Financial Services Banner - Investment Solutions" />
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroHome;
