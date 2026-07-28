import React, { useCallback } from 'react'
import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { notification } from 'antd'
import HomeComponents from './Components/HomeComponents/HomeComponents'
import Navbar from './Components/Navigation/Navbar'
import OurStory from './Components/OurStory/OurStory'
import { useGlobalAnimation } from './utils/useGlobalAnimation'
import About from './Components/AboutUs/About'
import NewsLetters from './Components/NewsLetter/NewsLetters'
import Footer from './Components/Footer/Footer'
import Services from './Components/Services/Services'
import SingleService from './Components/Services/SingleService'
import Modal from './Components/Modal/Modal'
import Directors from './Components/Directors/Directors'
import OnlineDesk from './Components/OnlineDesk/OnlineDesk'
import CompliancesAndForms from './Components/HomeComponents/CompliancesAndForms/CompliancesAndForms'
import Disclaimer from './Components/Disclaimer/Disclaimer'
import PrivacyPolicy from './Components/PrivacyPolicy/PrivacyPolicy'
import AdvisioryForInvestors from './Components/AdvisioryForInvestors/AdvisioryForInvestors'
import InvestorComplaints from './Components/InvestorComplaints/InvestorComplaints'
import FormsPage from './Components/HomeComponents/CompliancesAndForms/FormsPage'
import PoliciesPage from './Components/HomeComponents/CompliancesAndForms/PoliciesPage'
import InvestorChartersPage from './Components/HomeComponents/CompliancesAndForms/InvestorChartersPage'
import ComplianceDataPage from './Components/HomeComponents/CompliancesAndForms/ComplianceDataPage'
import { AccessibilityProvider } from './context/AccessibilityContext'
import AccessibilityWidget from './Components/Accessibility/AccessibilityWidget'
import Sitemap from './Components/Sitemap/Sitemap'
import StatusLiveRegions from './Components/Accessibility/StatusLiveRegions'

function App() {
  // Initialize global animations
  useGlobalAnimation()

  // Configure Ant Design notification
  const [, contextHolder] = notification.useNotification();

  // HashRouter uses the URL hash for routing, so a plain href="#main-content"
  // would navigate to a non-existent route instead of skipping the nav.
  const handleSkipToContent = useCallback((event) => {
    event.preventDefault();

    const main = document.getElementById('main-content');

    if (!main) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    main.focus({ preventScroll: true });
    main.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }, []);

  return (
    <AccessibilityProvider>
      <>
        <StatusLiveRegions />
        <a
          href="#main-content"
          className="skip-to-content"
          onClick={handleSkipToContent}
        >
          Skip to main content
        </a>
        <div className="a11y-app-shell">
          {contextHolder}
          <HashRouter>
            <Modal />
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              <Routes>
                <Route path='/' element={<HomeComponents />} />
                <Route path='/our-story' element={<OurStory />} />
                <Route path='/about-us' element={<About />} />
                <Route path='/services' element={<Services />} />
                <Route path='/services/:serviceName' element={<SingleService />} />
                <Route path='/directors' element={<Directors />} />
                <Route path='/online-desk' element={<OnlineDesk />} />
                <Route path='/compliances' element={<CompliancesAndForms />} />
                <Route path='/compliances/forms' element={<FormsPage />} />
                <Route path='/compliances/policies' element={<PoliciesPage />} />
                <Route path='/compliances/investor-charters' element={<InvestorChartersPage />} />
                <Route path='/compliances/compliance-data' element={<ComplianceDataPage />} />
                <Route path='/disclaimer' element={<Disclaimer />} />
                <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                <Route path='/advisiory-for-investors' element={<AdvisioryForInvestors />} />
                <Route path='/investor-complaints-disclosure' element={<InvestorComplaints />} />
                <Route path='/sitemap' element={<Sitemap />} />
              </Routes>

              <NewsLetters />
            </main>
            <Footer />
          </HashRouter>
        </div>
       <AccessibilityWidget />
      </>
    </AccessibilityProvider>
  )
}

export default App;
