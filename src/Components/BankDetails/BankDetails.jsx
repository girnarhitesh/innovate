import React from "react";
import "./BankDetails.css";

const BankDetails = () => {
  const bankData = [
    {
      id: 1,
      segment: "CASH – F & O",
      bankName: "HDFC BANK LTD",
      branch: "NAVRANGPURA",
      accountNo: "00060340003131",
      ifscCode: "HDFC0000006",
    },
    {
      id: 2,
      segment: "DP",
      bankName: "HDFC BANK LTD",
      branch: "NAVRNAGPURA",
      accountNo: "00060340005445",
      ifscCode: "HDFC0000006",
    },
  ];

  return (
    <div className="MainContainer bank-details-container">
      <div className="Container">
        <div className="paddingSide marginTop marginBottom">
          <div className="bank-details-wrapper">
            <h2 className="bank-details-title">
              LIST OF UPSTREAM BANK A/C: INNOVATE SECURITIES PVT LTD USCNBA
            </h2>

            <div className="bank-table-wrapper">
              <table className="bank-table">
                <thead>
                  <tr>
                    <th>Segment</th>
                    <th>Bank Name</th>
                    <th>Branch</th>
                    <th>Account No.</th>
                    <th>IFSC Code</th>
                  </tr>
                </thead>
                <tbody>
                  {bankData.map((item) => (
                    <tr key={item.id}>
                      <td>{item.segment}</td>
                      <td>{item.bankName}</td>
                      <td>{item.branch}</td>
                      <td>{item.accountNo}</td>
                      <td>{item.ifscCode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
