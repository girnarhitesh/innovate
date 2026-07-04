import React from 'react'
import HeroHome from './HeroHome/HeroHome'
import HomeAbout from './HomeAbout/HomeAbout'
import ServicesHome from './ServicesHome/ServicesHome'
import ProgressReach from './ProgressReachComponent/ProgressReach'
import InvestorCharters from './InvestorCharters/InvestorCharters'
import ClientRegDocs from './ClientRegDocs/ClientRegDocs'
import BankDetails from '../BankDetails/BankDetails'
import AppDownload from './AppDownload/AppDownload'
import './HomeSplash/HomeSplash.css'

const HomeComponents = () => {
    return (
        <>
            <div className="HomeSplash">
                <AppDownload />
                <HeroHome />
            </div>
            <ServicesHome />
            <HomeAbout />
            <InvestorCharters />
            <ClientRegDocs />
            <BankDetails />
            {/* <ListOfUpstream /> */}
            {/* <ProgressReach /> */}
        </>
    )
}

export default HomeComponents