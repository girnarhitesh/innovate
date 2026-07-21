import React from 'react'
import HeroHome from './HeroHome/HeroHome'
import HomeAbout from './HomeAbout/HomeAbout'
import ServicesHome from './ServicesHome/ServicesHome'
import InvestorCharters from './InvestorCharters/InvestorCharters'
import ClientRegDocs from './ClientRegDocs/ClientRegDocs'
import BankDetails from '../BankDetails/BankDetails'
import AppDownload from './AppDownload/AppDownload'
import './HomeSplash/HomeSplash.css'
import './HomePage.css'

const HomeComponents = () => {
    return (
        <div className="HomePage">
            <div className="HomeSplash">
                <AppDownload />
                <HeroHome />
            </div>
            <div className="HomePageSection">
                <ServicesHome />
            </div>
            <div className="HomePageSection">
                <HomeAbout />
            </div>
            <div className="HomePageSection">
                <InvestorCharters />
            </div>
            <div className="HomePageSection">
                <ClientRegDocs />
            </div>
            <div className="HomePageSection">
                <BankDetails />
            </div>
        </div>
    )
}

export default HomeComponents
