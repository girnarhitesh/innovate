import React, { useEffect } from "react";
import "./AdvisioryForInvestors.css";

const AdvisioryForInvestors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="HomeAboutContainer">
      <div className="MainContainer ">
        <div className="Container ">
          <div className="paddingSide padding-side">
            <div className="CommonHeader padding30">
              <h2 className="text-center">Advisiory for Investors</h2>
            </div>
            <div className="advisiory-title">
              <h3 className="danger">Attention Investors !</h3>
            </div>
            <div className="advisiory-content">
              <ul className="advisiory-list">
                <li>
                  Beware of fixed / guaranteed / regular returns / capital
                  protection schemes. Brokers or theirauthorized persons or
                  their associates are not authorized to offer fixed /
                  guaranteed / regularreturns / capital protection on your
                  investment or authorized to enter into any loan agreement with
                  you to pay interest on the funds offered by you. In case of
                  default of a member claim for funds or securities given to the
                  broker under any arrangement / agreement of indicative return
                  will not be accepted by the relevant Committee of the Exchange
                  as per the approved norms.
                </li>
                <li>
                  Do not keep funds idle with the Stock Broker. Your stock
                  broker has to return the credit balance lying with them,
                  within 3 working days in case you have not done any
                  transaction with in last 30 calendar days. In case of default
                  of a Member, claim for funds and securities,without any
                  transaction on the exchange will not be accepted by the
                  relevant Committee of the Exchangeas per the approved norms.
                </li>
                <li>
                  Check the frequency of accounts settlement opted for. If you
                  have opted for running account, please ensure that your broker
                  settles your account and, in any case, not later thanonce in
                  90 days (or 30 days if you have opted for 30 days settlement).
                  In case of declaration of trading member as defaulter, the
                  claims of clients against such defaulter member wouldbe
                  subject to norms for eligibility of claims for compensation
                  from IPF to the clients of the defaulter member.
                </li>
                <li>
                  These norms are available on Exchange website at following
                  link:
                  <br /><br /><a href="https://www.nseindia.com/invest/about-defaulter-section" target="_blank" rel="noopener noreferrer">https://www.nseindia.com/invest/about-defaulter-section</a>
                  <br />
                  <a href="https://www.bseindia.com/static/investors/Claim_against_Defaulter.aspx" target="_blank" rel="noopener noreferrer">https://www.bseindia.com/static/investors/Claim_against_Defaulter.aspx</a>
                </li>
                <li>
                    Brokers are not permitted to accept transfer of securities as margin. Securities offered asmargin / collateral MUST remainin the account of the client and can be pledged to the broker only by way of ‘margin pledge’, created in the Depository system. Clients are not permitted to place any securities with the broker or associate of the broker or authorized person of the broker for any reason. Broker can take securities belonging to clients only for settlement of securities sold by the client.
                </li>
                <li>
                    Always keep your contact details viz. Mobile number / Email ID updated with the stockbroker. Email and mobile number is mandatory and you must provide the same to your broker for updation in Exchange records. You must immediately take up the matter with Stock Broker / Exchange if you are not receiving the messages from Exchange / Depositories regularly.
                </li>
                <li>
                    Always keep your contact details viz. Mobile number / Email ID updated with the stockbroker. Email and mobile number is mandatory and you must provide the same to your broker for updation in Exchange records. You must immediately take up the matter with Stock Broker / Exchange if you are not receiving the messages from Exchange / Depositories regularly.
                </li>
                <li>
                    Check messages sent by Exchanges on a weekly basis regarding funds and securities balances reported by the trading member, compare it with the weekly statement of account sent by broker and immediately raise a concern to the exchange if you notice a discrepancy.
                </li>
                <li>
                    Please do not transfer funds, for the purposes of trading to anyone, including an authorized person or an associate of the broker , other than a SEBI registered Stockbroker.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisioryForInvestors;
