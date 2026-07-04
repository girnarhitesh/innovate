import React, { useState } from "react";
import "./NewsLetters.css";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { notification, Modal } from "antd";
import { Link } from "react-router-dom";
const NewsLetters = () => {
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [isContactOpen, setIsContactOpen] = useState(false);

    const openContactModal = () => setIsContactOpen(true);
    const closeContactModal = () => setIsContactOpen(false);

    const handleEmailClick = () => {
        const email = 'innovate95@rediffmail.com';
        const subject = 'Contact from Website';
        const body = 'Hello,\n\nI would like to get in touch with Innovate Securities.\n\n';

        const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Use window.open for better compatibility
        const emailWindow = window.open(mailtoLink, '_self');

        // If window.open fails, try direct navigation
        if (!emailWindow) {
            window.location.href = mailtoLink;
        }

        closeContactModal();
    };

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle email input change
    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (value === "") {
            setIsValid(true); // Don't show error for empty field
        } else {
            setIsValid(validateEmail(value));
        }
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (!email.trim()) {
            api.error({
                message: "Email Required",
                description: "Please enter your email address to subscribe.",
                placement: "topRight",
                duration: 4,
            });
            return;
        }

        if (!validateEmail(email)) {
            api.error({
                message: "Invalid Email",
                description: "Please enter a valid email address.",
                placement: "topRight",
                duration: 4,
            });
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);

            api.success({
                message: "Successfully Subscribed!",
                description: `Thank you for subscribing to our newsletter. We've sent a confirmation email to ${email}.`,
                placement: "topRight",
                duration: 6,
                icon: <HiOutlineCheckCircle style={{ color: 'var(--brand-color)', fontSize: '20px' }} />,
                style: {
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                },
            });

            // Reset form
            setEmail("");
            setIsValid(true);
        }, 1500);
    };

    // Handle Enter key press
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <>
            {contextHolder}
            <div className="MainContainer NewsLetterMainContainer">
                <div className="Container">
                    <div className="paddingSide">
                        <div className="NewsletterContainer">
                            <div className="NewsletterContent">
                                <h2 className="text-center white">Let's Connect</h2>
                                <p className="text-center NewsletterSubtitle white">
                                    We're here to help you with your financial needs.
                                </p>
                                {/* <br /> */}
                                <div className="ExpertSection">
                                    <p className="ExpertText white">Our experts are ready to help!</p>
                                    <div className="ExpertProfiles">
                                        <div className="ExpertProfile">
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/UserIcon.png" alt="Innovate Securities Financial Expert - Investment Advisory Specialist" />
                                        </div>
                                        <div className="ExpertProfile">
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/UserIcon.png" alt="Innovate Securities Portfolio Manager - Wealth Management Expert" />
                                        </div>
                                        <div className="ExpertProfile">
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/UserIcon.png" alt="Innovate Securities Market Analyst - Financial Planning Specialist" />
                                        </div>
                                        <div className="ExpertProfile">
                                            <img src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/UserIcon.png" alt="Innovate Securities Investment Advisor - Financial Services Expert" />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="NewsletterInputContainer">
                                    {/* <div className="InputWrapper">
                                        <HiOutlineMail className="EmailIcon" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email address"
                                            className={`NewsletterInput ${!isValid ? 'error' : ''}`}
                                            value={email}
                                            onChange={handleEmailChange}
                                            onKeyPress={handleKeyPress}
                                        />
                                    </div> */}
                                    <button
                                        className={`NewsletterButton ${isLoading ? 'loading' : ''}`}
                                        onClick={openContactModal}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Please wait..." : "Contact Us"}
                                    </button>
                                </div>

                                {!isValid && email && (
                                    <div className="ErrorMessage">
                                        Please enter a valid email address
                                    </div>
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={isContactOpen}
                onCancel={closeContactModal}
                footer={null}
                centered
                destroyOnHidden
            >
                <div style={{ display: 'grid', gap: 12 }}>
                    <h3 style={{ margin: 0 }}>Get in touch</h3>
                    <p style={{ margin: 0, color: '#666' }}>Choose how you'd like to contact us:</p>
                    <div style={{ display: 'grid', gap: 10, marginTop: 8 }}>
                        <a href="tel:07926474500" style={{ textDecoration: 'none' }}>
                            <button className="NewsletterButton" style={{ width: '100%' }} onClick={closeContactModal}>
                                Call now: 079-2647-4500
                            </button>
                        </a>
                        <a
                            href="mailto:innovate95@rediffmail.com?subject=Contact from Website&body=Hello,%0A%0AI would like to get in touch with Innovate Securities.%0A%0A"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', width: '100%' }}
                            onClick={closeContactModal}
                        >
                            <button className="NewsletterButton secondary" style={{ width: '100%' }}>
                                Email us: innovate95@rediffmail.com
                            </button>
                        </a>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default NewsLetters;