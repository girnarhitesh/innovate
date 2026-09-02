import { useState } from "react";
import "./NewsLetters.css";
import { notification, Modal } from "antd";
import { announceStatus } from "../../utils/announceStatus";

const NewsLetters = () => {
    const [, contextHolder] = notification.useNotification();
    const [isContactOpen, setIsContactOpen] = useState(false);

    const openContactModal = () => setIsContactOpen(true);
    const closeContactModal = () => setIsContactOpen(false);

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
                                    <button
                                        type="button"
                                        className="NewsletterButton"
                                        onClick={() => {
                                            openContactModal();
                                            announceStatus("Contact options opened.");
                                        }}
                                    >
                                        Contact Us
                                    </button>
                                </div>
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
                        <a
                            href="tel:07926474500"
                            className="NewsletterButton"
                            style={{ width: '100%', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
                            onClick={closeContactModal}
                        >
                            Call now: 079-2647-4500
                        </a>
                        <a
                            href="mailto:innovate95@rediffmail.com?subject=Contact from Website&body=Hello,%0A%0AI would like to get in touch with Innovate Securities.%0A%0A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="NewsletterButton secondary"
                            style={{ width: '100%', textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box' }}
                            onClick={closeContactModal}
                        >
                            Email us: innovate95@rediffmail.com
                        </a>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default NewsLetters;
