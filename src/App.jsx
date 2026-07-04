import React from 'react'
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

function App() {
  // Initialize global animations
  useGlobalAnimation()

  // Configure Ant Design notification
  const [, contextHolder] = notification.useNotification();

  return (
    <AccessibilityProvider>
      <>
        <div className="a11y-app-shell">
          {contextHolder}
          <HashRouter>
            <Modal />
            <Navbar />
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
            </Routes>

            <NewsLetters />
            <Footer />
          </HashRouter>
        </div>
        <AccessibilityWidget />
      </>
    </AccessibilityProvider>
  )
}

export default App;
