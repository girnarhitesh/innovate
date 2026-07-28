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
            <section className="HomePageSection" aria-labelledby="home-services-heading">
                <ServicesHome />
            </section>
            <section className="HomePageSection" aria-label="About Innovate Securities">
                <HomeAbout />
            </section>
            <section className="HomePageSection" aria-label="Investor charters">
                <InvestorCharters />
            </section>
            <section className="HomePageSection" aria-label="Client registration documents">
                <ClientRegDocs />
            </section>
            <section className="HomePageSection" aria-label="Bank account details">
                <BankDetails />
            </section>
        </div>
    )
}

export default HomeComponents
