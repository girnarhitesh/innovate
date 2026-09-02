
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
        <div className="paddingSide marginBottom">
          <div className="bank-details-wrapper">
            <h2 className="bank-details-title">
              LIST OF UPSTREAM BANK A/C: INNOVATE SECURITIES PVT LTD USCNBA
            </h2>

            <div className="bank-table-wrapper">
              <table className="bank-table">
                <caption className="sr-only">
                  Upstream bank accounts for Innovate Securities Pvt Ltd
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Segment</th>
                    <th scope="col">Bank Name</th>
                    <th scope="col">Branch</th>
                    <th scope="col">Account No.</th>
                    <th scope="col">IFSC Code</th>
                  </tr>
                </thead>
                <tbody>
                  {bankData.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.segment}</th>
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
