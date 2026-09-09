
import { Row, Col } from 'antd';
import EquityMarketIcon from '../../assets/servicesIcons/equity-market.png';
const ServicesData = [
    {
        id: 1,
        title: "Equity Market and Derivatives",
        iconImage: EquityMarketIcon,
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/EQUITY MARKET AND DERIVATIVES-min.jpg",
        servicesCardText: "At Innovate Securities, we offer efficient and reliable broking services for the Equity Market, enabling seamless buying and selling of shares across NSE and BSE",
        buttonLink: "https://backoffice.innovatesec.com/Account/Login",
        buttonText: "Equity and Derivatives",
        description: <>
            <p><b>Equity Market Overview</b></p>
            <p>At Innovate Securities, we specialize in providing efficient broking services in the equity market, facilitating the buying and selling of shares on the NSE and BSE. Our streamlined processes ensure that your trades are executed swiftly and reliably.</p>
            <p><b>Understanding Derivatives</b></p>
            <p>In addition to equities, we offer broking services for deri vatives, including options and futures. This allows you to manage risk and take advantage of market opportunities with ease.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Why Choose Innovate Securities?</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📊</div>
                                <h3>Seamless Trading</h3>
                                <p>We provide fast and secure trade execution, ensuring your trades are completed quickly and without hassle. Our advanced trading platforms guarantee a smooth and efficient experience.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🛡️</div>
                                <h3>Technology-Driven Insights
                                </h3>
                                <p>Gain access to real-time market data and powerful analytics that help you make informed trading decisions. Our technology-driven approach keeps you ahead of market trends.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📈</div>
                                <h3>Dedicated Support</h3>
                                <p>Our experienced support team is always ready to assist you with any trading-related queries. We ensure that you receive expert guidance whenever needed, ensuring a smooth trading journey.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Partner with Innovate Securities for all your equity and derivatives trading needs and take the next step in your investment journey with us!</p>
            <br />


        </>,
    },

    {
        id: 2,
        title: "⁠⁠Mutual Funds and Bonds",
        iconImage: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Mutual Funds.png",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/MutualFunds-min.jpg",
        buttonLink: "https://wealthelite.in/client-login",
        buttonText: "Mutual Funds and Bonds",
        servicesCardText: "Access diversified investment portfolios managed by experienced fund managers across equity, debt, hybrid, and sectoral funds.",
        description: <>
            <p><b>Mutual Fund Distribution Services – Innovate Securities</b></p>
            <p>Innovate Securities offers tailored mutual fund distribution services, helping clients build personalized portfolios aligned with their financial goals and risk profiles. We provide access to a broad range of top-rated funds from leading mutual fund houses across India. Our expert team works closely with clients to design portfolios suited for capital growth, wealth preservation, or income generation. Through our advanced digital platform, we ensure seamless transactions, real-time fund data, and transparent reporting.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Types of Mutual Funds</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📈</div>
                                <h3>Equity Funds</h3>
                                <p>Focused on long-term capital growth through investment in stocks. These funds are ideal for investors seeking higher returns over extended periods and are willing to accept market volatility for potential growth opportunities.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🛡️</div>
                                <h3>Debt Funds</h3>
                                <p>Offer stable returns with lower risk by investing in bonds and fixed-income securities. Perfect for conservative investors looking for regular income with capital preservation and lower volatility compared to equity markets.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">⚖️</div>
                                <h3>Hybrid Funds</h3>
                                <p>A mix of equity and debt, balancing risk and return for diversified growth. These funds provide the best of both worlds - growth potential from equities and stability from debt instruments, making them suitable for moderate risk-takers.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🎯</div>
                                <h3>Sectoral/Thematic Funds</h3>
                                <p>Target specific industries or sectors for specialized investment strategies. These funds allow investors to capitalize on growth opportunities in particular sectors like technology, healthcare, or infrastructure, offering focused exposure to emerging trends.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">💰</div>
                                <h3>Tax-Saving Funds (ELSS)</h3>
                                <p>Equity funds offering tax benefits under Section 80C of the Income Tax Act. These funds not only help you save taxes but also provide the potential for wealth creation through equity investments, with a lock-in period of 3 years for tax benefits.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Partner with Innovate Securities for expert mutual fund guidance and build a diversified portfolio that aligns with your financial objectives. Our experienced advisors help you navigate the complex world of mutual funds to achieve your investment goals.</p>

        </>,
    },
    {
        id: 3,
        title: "Depository Services",
        iconImage: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/Depository Services.png",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/DEPOSITORY SERVICES-min.jpg",
        servicesCardText: "We offer secure and efficient depository services as an authorized participant with Central Depository Services Limited (CDSL). Our services include:",
        buttonLink: "https://evoting.cdslindia.com/Evoting/EvotingLogin",
        buttonText: "Depository Services",
        description: <>
            <p><b>Innovate Securities: Your Trusted CDSL Depository Participant</b></p>
            <p>We offer secure and efficient depository services as an authorized participant with Central Depository Services Limited (CDSL). Our comprehensive depository solutions ensure your securities are safely managed with complete transparency and seamless processing.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Our Depository Services</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📋</div>
                                <h3>Demat Account Opening</h3>
                                <p>Simplified online process for quick account setup with minimal documentation requirements. Get your demat account activated within 24 hours with our streamlined onboarding process.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🔒</div>
                                <h3>Asset Safekeeping</h3>
                                <p>Secure electronic storage of your securities, minimizing physical risks and ensuring complete protection of your investments. Your assets are protected with bank-grade security protocols.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">⚡</div>
                                <h3>Transaction Support</h3>
                                <p>Fast processing of buy and sell transactions for accurate record-keeping. Real-time settlement and instant updates ensure you always have the latest information about your holdings.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📊</div>
                                <h3>Portfolio Access</h3>
                                <p>Regular e-statements and an intuitive online platform for easy investment tracking. Monitor your portfolio performance with detailed analytics and comprehensive reporting tools.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📢</div>
                                <h3>Corporate Actions</h3>
                                <p>Timely notifications and processing for dividends, bonuses, and rights offerings. Stay informed about all corporate actions affecting your investments with automated alerts.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">👥</div>
                                <h3>Dedicated Support</h3>
                                <p>A professional team ready to assist you with personalized guidance. Our experienced support staff is available to help you with any depository-related queries and concerns.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Experience the future of depository services with Innovate Securities, where technology and customer focus empower your financial journey. Partner with us for secure, efficient, and transparent depository solutions.</p>
        </>,
    },

    {
        id: 4,
        title: "NCD",
        iconImage: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/NCD Investment.png",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/NCD Investment Services.jpg",
        servicesCardText: "Invest in Non-Convertible Debentures from leading companies for fixed returns with various maturity periods.",
        description: <>
            <p><b>NCD Investment Services – Innovate Securities Pvt. Ltd. (ISPL)</b></p>
            <p>Innovate Securities offers comprehensive Non-Convertible Debenture (NCD) investment services, providing clients with high-yield, fixed-income opportunities from leading corporates. NCDs offer a balanced mix of attractive interest rates and lower risk, making them an ideal choice for investors seeking regular income and capital preservation.</p>
            <p>Our expert team assists clients in selecting the right NCDs based on their financial goals, risk tolerance, and investment horizon. Through our seamless platform, clients enjoy real-time access to market data, transparent reporting, and easy management of their NCD investments.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Understanding NCD Investments</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📜</div>
                                <h3>What are NCDs?</h3>
                                <p>Non-Convertible Debentures are fixed-income instruments issued by companies to raise capital. Unlike convertible debentures, NCDs cannot be converted into equity shares, providing predictable returns with fixed interest payments and maturity dates.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">💰</div>
                                <h3>High-Yield Returns</h3>
                                <p>NCDs typically offer higher interest rates compared to traditional fixed deposits and government securities. Our curated selection of NCDs from top-rated companies provides attractive returns while maintaining strong credit quality.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🛡️</div>
                                <h3>Lower Risk Profile</h3>
                                <p>NCDs from well-rated companies provide a balance of security and yield. We carefully select NCDs from companies with strong credit ratings, ensuring your investments are backed by financially sound institutions.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📊</div>
                                <h3>Regular Income</h3>
                                <p>NCDs provide regular interest payments at predetermined intervals, making them ideal for investors seeking steady income. Choose from various payout frequencies to match your cash flow requirements.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🎯</div>
                                <h3>Portfolio Diversification</h3>
                                <p>NCDs help diversify your investment portfolio by adding fixed-income instruments with different risk profiles and maturity periods. Our expert advisors help you build a balanced portfolio that aligns with your financial objectives.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Why Choose Innovate Securities for NCD Investments?</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📈</div>
                                <h3>Attractive Returns</h3>
                                <p>Access to high-yield NCDs from trusted companies. Our carefully curated selection of NCDs offers competitive interest rates that help maximize your investment returns while maintaining strong credit quality.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">👨‍💼</div>
                                <h3>Expert Guidance</h3>
                                <p>Personalized NCD recommendations to align with your financial strategy. Our experienced advisors analyze your goals, risk tolerance, and investment horizon to recommend the most suitable NCD investments.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🌐</div>
                                <h3>Diversified Portfolio</h3>
                                <p>Enhance your portfolio with reliable, fixed-income investments. NCDs help create a well-balanced investment portfolio by combining different types of fixed-income instruments with varying risk profiles.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📱</div>
                                <h3>Effortless Management</h3>
                                <p>Real-time data and transparency for easy tracking and decision-making. Our digital platform provides instant access to your NCD portfolio, performance metrics, and transaction history for seamless management.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🤝</div>
                                <h3>Trusted Service</h3>
                                <p>Over three decades of experience in delivering client-centric financial solutions. With our proven track record and commitment to excellence, Innovate Securities has built a reputation for reliable, transparent, and professional NCD investment services.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Choose Innovate Securities for secure, high-return NCD investments with expert support and seamless service. Our comprehensive NCD investment services help you build a stable, income-generating portfolio that aligns with your financial goals and risk tolerance.</p>
        </>,
    },
    {
        id: 5,
        title: "FD",
        iconImage: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/icons8-money-60.png",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/FIXED DEPOSIT SERVICES.jpg",
        servicesCardText: "Earn higher returns through fixed deposits offered by top-rated corporations with flexible tenure options.",
        description: <>
            <p><b>Corporate Fixed Deposit Services – Innovate Securities</b></p>
            <p>Innovate Securities offers reliable Corporate Fixed Deposit (FD) services, providing clients with secure and high-yield investment options through leading corporates. Our services help clients diversify their portfolio by investing in corporate FDs that offer attractive interest rates with flexible tenures. Whether the goal is steady income or capital preservation, we assist in selecting FDs that align with individual financial needs and risk tolerance.</p>
            <p>Our intuitive platform simplifies the investment process, ensuring easy management of deposits, timely notifications of interest payments, and detailed reports for transparency and convenience.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Features of Corporate Fixed Deposits</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">💰</div>
                                <h3>Higher Interest Rates</h3>
                                <p>Corporate FDs often provide better returns than traditional bank deposits. Our curated selection of top-rated corporate FDs offers competitive interest rates that help maximize your investment returns while maintaining security.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📅</div>
                                <h3>Flexible Tenure</h3>
                                <p>Choose from a wide range of maturity periods, typically from 1 to 5 years. Our flexible tenure options allow you to align your investment with your specific financial goals and cash flow requirements.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">⭐</div>
                                <h3>Credit Rating</h3>
                                <p>FDs from well-rated companies provide a balance of security and yield. We carefully select corporate FDs from companies with strong credit ratings, ensuring your investments are backed by financially sound institutions.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📊</div>
                                <h3>Periodic Interest Payouts</h3>
                                <p>Options for monthly, quarterly, or annual interest payments to suit cash flow needs. Choose the payout frequency that best matches your income requirements and financial planning objectives.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🔄</div>
                                <h3>Premature Withdrawal</h3>
                                <p>Allows early withdrawal with applicable penalties, offering liquidity in times of need. While we encourage holding deposits until maturity for optimal returns, our corporate FDs provide the flexibility to withdraw funds when necessary, subject to terms and conditions.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Why Choose Our Corporate FD Services?</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🎯</div>
                                <h3>Curated Selection</h3>
                                <p>We carefully select corporate FDs from top-rated companies across various sectors, ensuring you have access to the best investment opportunities with optimal risk-reward profiles.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📱</div>
                                <h3>Digital Platform</h3>
                                <p>Our intuitive online platform provides real-time access to your FD portfolio, automated interest tracking, and seamless transaction management for a hassle-free investment experience.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">👨‍💼</div>
                                <h3>Expert Guidance</h3>
                                <p>Our experienced advisors help you select the most suitable corporate FDs based on your financial goals, risk tolerance, and investment horizon, ensuring optimal portfolio performance.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📈</div>
                                <h3>Portfolio Diversification</h3>
                                <p>Build a diversified investment portfolio by combining corporate FDs with other investment instruments, creating a balanced approach to wealth creation and income generation.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Partner with Innovate Securities for secure, high-yield corporate fixed deposit investments. Our comprehensive FD services help you build a stable, income-generating portfolio with the flexibility and security you need for your financial success.</p>
        </>,
    },
    {
        id: 6,
        title: "IPO Submission Services",
        iconImage: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/IPO Submission.png",
        image: "https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/IPO SUBMISSION SERVICES.jpg",
        servicesCardText: "Apply for Initial Public Offerings with expert guidance and market insights for informed investment decisions.",
        buttonLink: "https://ipo.innovatesec.com/",
        buttonText: "IPO Submission Services",
        description: <>
            <p><b>IPO Submission Services – Innovate Securities Pvt. Ltd. (ISPL)</b></p>
            <p>At Innovate Securities, we provide tailored IPO Submission Services designed to simplify the process for investors. Our comprehensive IPO services ensure that you can participate in Initial Public Offerings with confidence, backed by our expertise and advanced technology solutions.</p>
            <p>With our focus on accuracy, efficiency, and personalized support, Innovate Securities ensures a smooth and reliable IPO submission experience for all investors, helping you capitalize on exciting investment opportunities in the primary market.</p>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Our IPO Submission Services</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📋</div>
                                <h3>Form Assistance</h3>
                                <p>We handle the printing of physical IPO forms and provide expert assistance in ensuring accurate form completion. Our experienced team guides you through every step of the application process, minimizing errors and maximizing your chances of successful allotment.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">💳</div>
                                <h3>Mandate Support</h3>
                                <p>Our advanced software solution facilitates smooth UPI transactions, ensuring seamless mandate approvals and a streamlined process for investors. Experience hassle-free payment processing with our cutting-edge technology platform.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🏦</div>
                                <h3>Banking Assistance</h3>
                                <p>We also offer guidance on the banking process, helping clients manage payments and ensuring all financial obligations are met efficiently. Our banking experts ensure your transactions are processed smoothly without any complications.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📊</div>
                                <h3>Market Research</h3>
                                <p>Access comprehensive IPO research and analysis to make informed investment decisions. Our expert team provides detailed insights into company fundamentals, valuation metrics, and market positioning for each IPO opportunity.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📱</div>
                                <h3>Digital Platform</h3>
                                <p>Our user-friendly digital platform provides real-time IPO tracking, application status updates, and seamless document management. Stay informed about your IPO applications with instant notifications and transparent reporting.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">👨‍💼</div>
                                <h3>Expert Guidance</h3>
                                <p>Our experienced IPO specialists provide personalized advice on IPO selection, application strategies, and investment timing. Benefit from our deep market knowledge and proven track record in IPO investments.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='marginTop'>
                <h3 className='text-center marginBottom' style={{ color: "black" }}>Why Choose Innovate Securities for IPO Submissions?</h3>
                <div className='centerContainer'>
                    <Row gutter={[20, 20]}>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🎯</div>
                                <h3>Accuracy & Efficiency</h3>
                                <p>Our streamlined processes ensure accurate form completion and efficient submission, minimizing the risk of application rejections and maximizing your chances of successful IPO participation.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">⚡</div>
                                <h3>Quick Processing</h3>
                                <p>Experience fast and reliable IPO application processing with our advanced technology solutions. Our systems ensure timely submissions and real-time status updates throughout the process.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🛡️</div>
                                <h3>Secure Transactions</h3>
                                <p>Your IPO applications and financial transactions are protected with bank-grade security protocols. We ensure complete data protection and secure payment processing for all your IPO investments.</p>
                            </div>
                        </Col>
                        <Col lg={12} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">📈</div>
                                <h3>Success Track Record</h3>
                                <p>Benefit from our proven track record in IPO submissions and successful allotments. Our expertise helps you navigate the complex IPO landscape and make informed investment decisions.</p>
                            </div>
                        </Col>
                        <Col lg={24} xs={24}>
                            <div className="FeatureCard">
                                <div className="FeatureIcon">🤝</div>
                                <h3>Personalized Support</h3>
                                <p>Receive dedicated support throughout your IPO journey, from initial research to successful allotment. Our team is committed to providing personalized assistance and ensuring a smooth IPO experience for every investor.</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            <br /><br />
            <p>Partner with Innovate Securities for expert IPO submission services and capitalize on exciting investment opportunities in the primary market. Our comprehensive IPO services ensure you can participate in Initial Public Offerings with confidence and ease.</p>
        </>,
    },

]

export default ServicesData;