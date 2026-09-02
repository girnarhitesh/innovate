import { useEffect, useRef, useState } from "react";
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
  const [isDisclosurePaused, setIsDisclosurePaused] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isTaglineVisible, setIsTaglineVisible] = useState(true);
  const videoRef = useRef(null);
  const swiperInstanceRef = useRef(null);
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

  // Tagline rotation effect — pauses with video / reduced motion
  useEffect(() => {
    if (isReducedMotionEnabled || !isPlaying) {
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
      }, 300);
    }, 3000);

    return () => {
      clearInterval(interval);
      window.clearTimeout(rotationTimeoutId);
    };
  }, [isReducedMotionEnabled, isPlaying, taglines.length]);

  useEffect(() => {
    let revealTimeoutId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isReducedMotionEnabled) {
            setIsVisible(true);
            return;
          }

          revealTimeoutId = window.setTimeout(() => {
            setIsVisible(true);
          }, 500);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "-30px 0px 0px 0px",
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
    const swiperInstance = swiperInstanceRef.current;

    if (swiperInstance?.autoplay) {
      if (isReducedMotionEnabled || isDisclosurePaused) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }

    if (videoRef.current) {
      if (isReducedMotionEnabled || !isPlaying) {
        videoRef.current.pause();
      } else {
        const playPromise = videoRef.current.play();

        if (playPromise?.catch) {
          playPromise.catch(() => {});
        }
      }
    }
  }, [isPlaying, isDisclosurePaused, isReducedMotionEnabled]);

  const togglePlayPause = (event) => {
    event?.stopPropagation?.();

    if (isReducedMotionEnabled) {
      return;
    }

    setIsPlaying((prev) => {
      const next = !prev;

      if (videoRef.current) {
        if (next) {
          const playPromise = videoRef.current.play();
          if (playPromise?.catch) {
            playPromise.catch(() => {});
          }
        } else {
          videoRef.current.pause();
        }
      }

      return next;
    });
  };

  const toggleDisclosureAutoplay = () => {
    if (isReducedMotionEnabled) {
      return;
    }

    const swiperInstance = swiperInstanceRef.current;

    setIsDisclosurePaused((prev) => {
      const next = !prev;

      if (swiperInstance?.autoplay) {
        if (next) {
          swiperInstance.autoplay.stop();
        } else {
          swiperInstance.autoplay.start();
        }
      }

      return next;
    });
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

  const isHeroMotionPaused = !isPlaying || isReducedMotionEnabled;
  const isDisclosureMotionPaused =
    isDisclosurePaused || isReducedMotionEnabled;

  return (
    <section
      className="HeroHomeSection"
      ref={sectionRef}
      aria-label="Homepage hero"
    >
      <div className="MainContainer">
        <div className="Container">
          <div className="FlexContainer ">
            <h1 className="sr-only">
              Innovate Securities Pvt. Ltd. — Your Trusted Partner in Financial
              Growth
            </h1>
            <div className={`LayerImage ${isVisible ? "reveal-image" : ""}`}>
              <div
                className="VideoWrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <video
                  ref={videoRef}
                  src="https://cdn.prod.website-files.com/67df2c20360768e358fdd20a%2F682b74c0505f21d18c54d43f_4426377-uhd_3840_2160_25fps-transcode.mp4"
                  autoPlay={!isReducedMotionEnabled}
                  muted
                  loop
                  playsInline
                  className="w-100"
                  aria-label="Innovate Securities brand introduction video"
                ></video>

                <div className="TaglinesOverlay" aria-live="polite">
                  <p
                    className={`TaglineText ${isTaglineVisible ? "visible" : "hidden"}`}
                  >
                    {taglines[currentTaglineIndex]}
                  </p>
                </div>

                <button
                  type="button"
                  className={`PlayPauseButton ${showButton || isHeroMotionPaused ? "visible" : ""} ${isPlaying ? "playing" : "paused"}`}
                  onClick={togglePlayPause}
                  aria-label={
                    isPlaying
                      ? "Pause hero video and rotating taglines"
                      : "Play hero video and rotating taglines"
                  }
                  aria-pressed={!isPlaying}
                  disabled={isReducedMotionEnabled}
                >
                  <span className="ButtonIcon" aria-hidden="true">
                    {isPlaying && !isReducedMotionEnabled ? (
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
                  </span>
                </button>
              </div>
            </div>
            <div className="VerticalSwiperContainer">
              <div className="VerticalSwiperControls">
                <button
                  type="button"
                  className={`disclosure-autoplay-btn ${isDisclosureMotionPaused ? "is-paused" : "is-playing"}`}
                  onClick={toggleDisclosureAutoplay}
                  aria-label={
                    isDisclosureMotionPaused
                      ? "Resume investor disclosures carousel"
                      : "Pause investor disclosures carousel"
                  }
                  aria-pressed={isDisclosureMotionPaused}
                  title={isDisclosureMotionPaused ? "Resume" : "Pause"}
                  disabled={isReducedMotionEnabled}
                >
                  {isDisclosureMotionPaused ? (
                    <span aria-hidden="true">▶</span>
                  ) : (
                    <span aria-hidden="true">❚❚</span>
                  )}
                </button>
              </div>
              <Swiper
                onSwiper={(swiper) => {
                  swiperInstanceRef.current = swiper;
                  if (isReducedMotionEnabled || isDisclosurePaused) {
                    swiper.autoplay?.stop();
                  }
                }}
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
                        <p>{item.title}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroHome;
