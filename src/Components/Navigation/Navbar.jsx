import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Navbar.css";
import NavData from "./NavData";
import { Link } from "react-router-dom";
import { Drawer, Button, Modal } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import Table from "../AboutUs/Table";
import NavbarSearch from "./NavbarSearch";

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== "undefined"
            ? window.matchMedia("(max-width: 1016px)").matches
            : false,
    );
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [mobileAccordionOpen, setMobileAccordionOpen] = useState(null);

    const SIGN_UP_URL = "https://bo.innovatesec.com/EKYC/EKYCAccountOpening";
    
    // Use refs instead of state for values that don't need to trigger re-renders
    const lastScrollYRef = useRef(0);
    const ticking = useRef(false);
    const dropdownTimeoutRef = useRef(null);
    const resizeTimeoutRef = useRef(null);

    const openContactModal = () => {
        // Close drawer if open on mobile
        if (mobileDrawerOpen) {
            setMobileDrawerOpen(false);
        }
        setIsContactOpen(true);
    };

    const openSignUp = () => {
        // Close drawer if open on mobile
        if (mobileDrawerOpen) {
            setMobileDrawerOpen(false);
        }
        window.open(SIGN_UP_URL, "_blank", "noopener,noreferrer");
    };
    
    const closeContactModal = () => setIsContactOpen(false);

    // Close drawer and reset accordion state
    const closeMobileDrawer = useCallback(() => {
        setMobileDrawerOpen(false);
        // Reset accordion state when drawer closes
        setTimeout(() => {
            setMobileAccordionOpen(null);
        }, 300); // Wait for drawer close animation
    }, []);

    // Debounced resize handler kept only for layout side-effects if needed later.
    // Mobile/desktop switching uses matchMedia (fires reliably with DevTools device mode).

    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = useCallback(() => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const scrollDifference = currentScrollY - lastScrollYRef.current;

                // Batch state updates
                if (currentScrollY > 100) {
                    if (!hasScrolled) setHasScrolled(true);
                    
                    // Only update visibility if scroll direction changed significantly
                    if (scrollDifference > 5 && isVisible) {
                        setIsVisible(false);
                    } else if (scrollDifference < -5 && !isVisible) {
                        setIsVisible(true);
                    }
                } else {
                    if (hasScrolled) setHasScrolled(false);
                    if (!isVisible) setIsVisible(true);
                }

                lastScrollYRef.current = currentScrollY;
                ticking.current = false;
            });

            ticking.current = true;
        }
    }, [hasScrolled, isVisible]);

    // Sync mobile breakpoint with matchMedia (works with Chrome device toolbar)
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 1016px)");

        const syncMobile = (event) => {
            const nowMobile =
                typeof event?.matches === "boolean"
                    ? event.matches
                    : mediaQuery.matches;

            setIsMobile(nowMobile);

            if (!nowMobile) {
                setMobileDrawerOpen(false);
                setMobileAccordionOpen(null);
            }
        };

        syncMobile();

        if (typeof mediaQuery.addEventListener === "function") {
            mediaQuery.addEventListener("change", syncMobile);
        } else {
            mediaQuery.addListener(syncMobile);
        }

        return () => {
            if (typeof mediaQuery.removeEventListener === "function") {
                mediaQuery.removeEventListener("change", syncMobile);
            } else {
                mediaQuery.removeListener(syncMobile);
            }
        };
    }, []);

    // Scroll listener
    useEffect(() => {
        lastScrollYRef.current = window.scrollY;
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);

            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
            if (resizeTimeoutRef.current) {
                clearTimeout(resizeTimeoutRef.current);
            }
            if (ticking.current) {
                ticking.current = false;
            }
        };
    }, [handleScroll]);

    // Lock body scroll when drawer is open on mobile
    useEffect(() => {
        if (mobileDrawerOpen && isMobile) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [mobileDrawerOpen, isMobile]);

    const handleMobileNavClick = useCallback((path) => {
        // Close accordion first
        setMobileAccordionOpen(null);
        
        // Close drawer with slight delay for external links
        if (path.startsWith('http')) {
            setTimeout(() => {
                setMobileDrawerOpen(false);
            }, 100);
        } else {
            setMobileDrawerOpen(false);
            if (path === "/") {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    }, []);

    const handleMobileAccordionToggle = useCallback((itemId) => {
        setMobileAccordionOpen(prev => prev === itemId ? null : itemId);
    }, []);

    const handleDropdownMouseEnter = useCallback((itemId) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }
        setActiveDropdown(itemId);
    }, []);

    const handleDropdownMouseLeave = useCallback(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 200); // Increased from 150ms for better UX
    }, []);

    const toggleLoginDropdown = useCallback(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }

        setActiveDropdown((current) => (current === 7 ? null : 7));
    }, []);

    const closeLoginDropdown = useCallback(() => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
            dropdownTimeoutRef.current = null;
        }

        setActiveDropdown(null);
    }, []);

    useEffect(() => {
        if (activeDropdown !== 7) {
            return undefined;
        }

        const handleDocumentKeyDown = (event) => {
            if (event.key === "Escape") {
                closeLoginDropdown();
            }
        };

        const handlePointerDown = (event) => {
            const target = event.target;
            const loginMenu = document.getElementById("login-dropdown-menu");
            const loginTrigger = document.getElementById("login-dropdown-trigger");

            if (
                loginMenu?.contains(target) ||
                loginTrigger?.contains(target)
            ) {
                return;
            }

            closeLoginDropdown();
        };

        document.addEventListener("keydown", handleDocumentKeyDown);
        document.addEventListener("mousedown", handlePointerDown);

        return () => {
            document.removeEventListener("keydown", handleDocumentKeyDown);
            document.removeEventListener("mousedown", handlePointerDown);
        };
    }, [activeDropdown, closeLoginDropdown]);

    const renderMobileDrawer = () => (
        <Drawer
            title={
                <div className="mobile-drawer-header">
                    <img
                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/InnovateLogoAddSince.png"
                        alt="Innovate Securities Logo"
                        style={{ width: '160px' }}
                    />
                </div>
            }
            placement="right"
            onClose={closeMobileDrawer}
            open={mobileDrawerOpen}
            width={280}
            classNames={{
                header: 'custom-drawer-header',
                body: 'custom-drawer-body'
            }}
            destroyOnClose={false}
            maskClosable={true}
            id="mobile-navigation-drawer"
            aria-label="Mobile navigation"
        >
            <div className="NavLinksContainerMobile">
                {NavData.map((item) => (
                    <div key={item.id}>
                        {item.hasDropdown ? (
                            <div>
                                <div
                                    onClick={() => handleMobileAccordionToggle(item.id)}
                                    className="mobile-nav-item"
                                >
                                    <span>{item.name}</span>
                                </div>
                                {mobileAccordionOpen === item.id && (
                                    <div className="mobile-sublinks">
                                        {item.sublinks.map((sublink) => (
                                            <Link
                                                key={sublink.id}
                                                to={sublink.path}
                                                onClick={() => handleMobileNavClick(sublink.path)}
                                                className="mobile-sublink-item"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {sublink.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to={item.path}
                                onClick={() => handleMobileNavClick(item.path)}
                                className="mobile-nav-item"
                            >
                                {item.name}
                            </Link>
                        )}
                    </div>
                ))}
                <div className="mobile-login-section">
                    <button
                        type="button"
                        className="mobile-login-trigger"
                        onClick={() => handleMobileAccordionToggle(7)}
                        aria-expanded={mobileAccordionOpen === 7}
                        aria-controls="mobile-login-menu"
                    >
                        <span>Login</span>
                    </button>
                    {mobileAccordionOpen === 7 && (
                        <div
                            id="mobile-login-menu"
                            className="mobile-login-dropdown"
                            role="menu"
                            aria-label="Login options"
                        >
                            <Link
                                to="https://bo.innovatesec.com/Account/Login"
                                onClick={() => handleMobileNavClick("https://bo.innovatesec.com/Account/Login")}
                                className="mobile-login-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Equity Market and Derivatives
                            </Link>
                            <Link
                                to="https://wealthelite.in/client-login"
                                onClick={() => handleMobileNavClick("https://wealthelite.in/client-login")}
                                className="mobile-login-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Mutual Funds and Bonds
                            </Link>
                            <Link
                                to="https://evoting.cdslindia.com/Evoting/EvotingLogin"
                                onClick={() => handleMobileNavClick("https://evoting.cdslindia.com/Evoting/EvotingLogin")}
                                className="mobile-login-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Depository Services
                            </Link>
                            <Link
                                to="/services"
                                onClick={() => handleMobileNavClick("/services")}
                                className="mobile-login-item"
                            >
                                NCD Investment Services
                            </Link>
                            <Link
                                to="/services"
                                onClick={() => handleMobileNavClick("/services")}
                                className="mobile-login-item"
                            >
                                Corporate Fixed Deposits
                            </Link>
                            <Link
                                to="https://ipo.innovatesec.com/"
                                onClick={() => handleMobileNavClick("https://ipo.innovatesec.com/")}
                                className="mobile-login-item"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                IPO Submission Services
                            </Link>
                        </div>
                    )}
                </div>

                <Link
                    to={SIGN_UP_URL}
                    onClick={() => handleMobileNavClick(SIGN_UP_URL)}
                    className="mobile-login-trigger mobile-signup-trigger"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span>Sign Up</span>
                </Link>

                <div className="BtnContainer">
                    <button
                        type="button"
                        onClick={openContactModal}
                        style={{ width: "100%", textAlign: "center", margin: "auto", justifyContent: "center" }}
                    >
                        Contact Us
                    </button>
                </div>
            </div>
        </Drawer>
    );

    return (
        <div className={`NavigationbarContainer ${isVisible ? 'nav-visible' : 'nav-hidden'} ${hasScrolled ? 'nav-scrolled' : ''}`}>
            <nav className="MainContainer" aria-label="Primary">
                <div className="Container">
                    <div>
                        <div className="NavigationContainer">
                            <div className="NavigationLogoContainer">
                                <Link
                                    to="/"
                                    aria-label="Innovate Securities home"
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: "smooth",
                                        });
                                    }}
                                >
                                    <img 
                                        src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/InnovateLogoAddSince.png" 
                                        alt="Innovate Securities Logo - Trusted Financial Services" 
                                    />
                                </Link>
                            </div>

                            <div className="NavbarDesktopNav">
                                    <div className="NavLinksContainer">
                                        {NavData.map((item) => (
                                            <div key={item.id} className="nav-item">
                                                {item.hasDropdown ? (
                                                    <div
                                                        className="dropdown-container"
                                                        onMouseEnter={() => handleDropdownMouseEnter(item.id)}
                                                        onMouseLeave={handleDropdownMouseLeave}
                                                    >
                                                        <Link to={item.path} className="dropdown-trigger">
                                                            {item.name}
                                                        </Link>
                                                        {activeDropdown === item.id && (
                                                            <div 
                                                                className="dropdown-menu"
                                                                onMouseEnter={() => handleDropdownMouseEnter(item.id)}
                                                                onMouseLeave={handleDropdownMouseLeave}
                                                            >
                                                                <div>
                                                                    {item.sublinks.map((sublink) => (
                                                                        <Link
                                                                            key={sublink.id}
                                                                            to={sublink.path}
                                                                            className="dropdown-item"
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                        >
                                                                            {sublink.name}
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <Link to={item.path}>{item.name}</Link>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="NavbarDesktopActions">
                                        <NavbarSearch isMobile={false} instanceId="desktop" />
                                        <div className="BtnContainer" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                            <button type="button" onClick={openContactModal}>
                                                Contact Us
                                            </button>

                                            <button type="button" className="login-dropdown-trigger" onClick={openSignUp}>
                                                Sign Up
                                            </button>

                                            <div className="dropdown-container">
                                                <button 
                                                    type="button"
                                                    id="login-dropdown-trigger"
                                                    className="login-dropdown-trigger"
                                                    aria-expanded={activeDropdown === 7}
                                                    aria-haspopup="true"
                                                    aria-controls={activeDropdown === 7 ? "login-dropdown-menu" : undefined}
                                                    onClick={toggleLoginDropdown}
                                                    onMouseEnter={() => handleDropdownMouseEnter(7)}
                                                    onMouseLeave={handleDropdownMouseLeave}
                                                >
                                                    Login
                                                </button>
                                                {activeDropdown === 7 && (
                                                    <div 
                                                        id="login-dropdown-menu"
                                                        className="dropdown-menu"
                                                        role="menu"
                                                        aria-label="Login options"
                                                        onMouseEnter={() => handleDropdownMouseEnter(7)}
                                                        onMouseLeave={handleDropdownMouseLeave}
                                                    >
                                                        <div>
                                                            <Link
                                                                to="https://bo.innovatesec.com/Account/Login"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Equity Market and Derivatives
                                                            </Link>
                                                            <Link
                                                                to="https://wealthelite.in/client-login"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Mutual Funds and Bonds
                                                            </Link>
                                                            <Link
                                                                to="https://evoting.cdslindia.com/Evoting/EvotingLogin"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                Depository Services
                                                            </Link>
                                                            <Link
                                                                to="/services"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                            >
                                                                NCD Investment Services
                                                            </Link>
                                                            <Link
                                                                to="/services"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                            >
                                                                Corporate Fixed Deposits
                                                            </Link>
                                                            <Link
                                                                to="https://ipo.innovatesec.com/"
                                                                className="dropdown-item"
                                                                role="menuitem"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                IPO Submission Services
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                            </div>

                            <div className="NavbarMobileActions">
                                    <NavbarSearch
                                        isMobile={true}
                                        instanceId="mobile"
                                        onNavigate={closeMobileDrawer}
                                    />
                                    <Button
                                        type="text"
                                        className="NavbarHamburgerBtn"
                                        icon={<MenuOutlined />}
                                        onClick={() => setMobileDrawerOpen(true)}
                                        aria-label="Open navigation menu"
                                        aria-expanded={mobileDrawerOpen}
                                        aria-controls="mobile-navigation-drawer"
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {renderMobileDrawer()}

            <Modal
                open={isContactOpen}
                onCancel={closeContactModal}
                footer={null}
                centered
                title="Contact Us"
                destroyOnClose
                width={1220}
                className="contact-modal"
            >
                <Table />
            </Modal>
        </div>
    )
}

export default Navbar;