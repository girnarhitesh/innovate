import React, { useEffect, useRef, useState } from 'react';
import "./ServicesHome.css";
import ServicesData from "../../Services/ServicesData";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper/modules';
import { useAccessibility } from '../../../context/AccessibilityContext';

const Services = () => {
    const swiperInstanceRef = useRef(null);
    const navigate = useNavigate();
    const { isReducedMotionEnabled } = useAccessibility();
    const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);

    const syncAutoplay = (swiper = swiperInstanceRef.current) => {
        if (!swiper?.autoplay) {
            return;
        }

        if (isReducedMotionEnabled || isAutoplayPaused) {
            swiper.autoplay.stop();
            return;
        }

        swiper.autoplay.start();
    };

    useEffect(() => {
        syncAutoplay();
    }, [isReducedMotionEnabled, isAutoplayPaused]);

    const handlePrevSlide = () => {
        swiperInstanceRef.current?.slidePrev();
    };

    const handleNextSlide = () => {
        swiperInstanceRef.current?.slideNext();
    };

    const handleToggleAutoplay = () => {
        if (isReducedMotionEnabled) {
            return;
        }

        const swiper = swiperInstanceRef.current;

        setIsAutoplayPaused((prev) => {
            const next = !prev;

            if (swiper?.autoplay) {
                if (next) {
                    swiper.autoplay.stop();
                } else {
                    swiper.autoplay.start();
                }
            }

            return next;
        });
    };

    const handleMouseEnter = () => {
        if (isAutoplayPaused || isReducedMotionEnabled) {
            return;
        }

        swiperInstanceRef.current?.autoplay?.pause();
    };

    const handleMouseLeave = () => {
        if (isAutoplayPaused || isReducedMotionEnabled) {
            return;
        }

        swiperInstanceRef.current?.autoplay?.resume();
    };

    const handleServiceClick = (service) => {
        const serviceSlug = service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        navigate(`/services/${serviceSlug}`);
    };

    return (
        <div className="MainContainer ServicesHomeContainer" >
            <div className="Container">
                <div className="paddingSide">
                    <div className='CommonHeader' style={{ margin: "unset" }}>
                        <div>
                            <h2 id="home-services-heading">Guiding You to Smarter Investments</h2>
                            <div className='SwiperBtnContainer'>
                                <button
                                    type="button"
                                    className={`swiper-btn swiper-btn-autoplay ${isAutoplayPaused ? "is-paused" : "is-playing"}`}
                                    onClick={handleToggleAutoplay}
                                    aria-label={isAutoplayPaused ? "Resume services carousel" : "Pause services carousel"}
                                    aria-pressed={isAutoplayPaused}
                                    title={isAutoplayPaused ? "Resume" : "Pause"}
                                    disabled={isReducedMotionEnabled}
                                >
                                    {isAutoplayPaused ? (
                                        <span className="swiper-autoplay-icon" aria-hidden="true">▶</span>
                                    ) : (
                                        <span className="swiper-autoplay-icon" aria-hidden="true">❚❚</span>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="swiper-btn swiper-btn-prev"
                                    onClick={handlePrevSlide}
                                    aria-label="Previous slide"
                                >
                                    &#8249;
                                </button>
                                <button
                                    type="button"
                                    className="swiper-btn swiper-btn-next"
                                    onClick={handleNextSlide}
                                    aria-label="Next slide"
                                >
                                    &#8250;
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        className='SwiperContainer'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Swiper
                            onSwiper={(swiper) => {
                                swiperInstanceRef.current = swiper;
                                if (isReducedMotionEnabled || isAutoplayPaused) {
                                    swiper.autoplay?.stop();
                                }
                            }}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            speed={800}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            navigation={false}
                            modules={[Autoplay, FreeMode, Pagination, Navigation]}
                            className="mySwiper"
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 30,
                                },
                            }}
                        >
                            {
                                ServicesData.map((item, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <div className='ServicesContainerCard marginTop'>
                                                <div>
                                                    <div className='IconsImageContainer'>
                                                        <div>
                                                            <img src={item.iconImage} alt="" aria-hidden="true" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='ServicesHeadingContainer'>
                                                            <h3>{item.title}</h3>
                                                        </div>
                                                        <div>
                                                            <p>{item.servicesCardText}</p>
                                                        </div>

                                                    </div>
                                                    <div className="BtnContainer">
                                                        <button onClick={() => handleServiceClick(item)}>
                                                            Read More
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
