import React from 'react'
import './Table.css'

const Table = () => {
  return (
    <div className="marginTop escalation-matrix-container">
                <div className="escalation-table-wrapper">
                  <table className="escalation-table">
                    <thead>
                      <tr>
                        <th>Details of</th>
                        <th>Contact Person</th>
                        <th>Address</th>
                        <th>Contact No.</th>
                        <th>Email Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Customer care <br /> <span style={{ fontSize: '12px'}}>(9 AM to 6 PM)</span></td>
                        <td>Meet V. Panchal</td>
                        <td>
                          1st Floor, DEVASHISH, 39, Sardar Patel Nagar, Near
                          Opp. ABC-III, Navrangpura, Ahmedabad - 380 009
                        </td>
                        <td>
                          <a href="tel:07926421314">079-26421314</a>
                        </td>
                        <td>
                          <a href="mailto:Innovate93@yahoo.co.in">
                            Innovate93@yahoo.co.in
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Head of Customer care <br /> <span style={{ fontSize: '12px'}}>(9 AM to 6 PM)</span></td>
                        <td>Hiten Shah</td>
                        <td>
                          1st Floor, DEVASHISH, 39, Sardar Patel Nagar, Near
                          Opp. ABC-III, Navrangpura, Ahmedabad - 380 009
                        </td>
                        <td>
                          <a href="tel:07926474514">079-26474514</a>
                        </td>
                        <td>
                          <a href="mailto:ispl@innovatesec.com">
                            ispl@innovatesec.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Compliance Officer-Broking <br /> <span style={{ fontSize: '12px'}}>(9 AM to 6 PM)</span></td>
                        <td>Pimal K. Panchal</td>
                        <td>
                          1st Floor, DEVASHISH, 39, Sardar Patel Nagar, Near
                          Opp. ABC-III, Navrangpura, Ahmedabad - 380 009
                        </td>
                        <td>
                          <a href="tel:07926474522">079-26474522</a>
                        </td>
                        <td>
                          <a href="mailto:Innovate95@rediffmail.com">
                            Innovate95@rediffmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>Compliance Officer-Depository Operation <br /> <span style={{ fontSize: '12px'}}>(9 AM to 6 PM)</span></td>
                        <td>Mitesh N. Shah</td>
                        <td>
                          1st Floor, DEVASHISH, 39, Sardar Patel Nagar, Near
                          Opp. ABC-III, Navrangpura, Ahmedabad - 380 009
                        </td>
                        <td>
                          <a href="tel:07926474513">079-26474513</a>
                        </td>
                        <td>
                          <a href="mailto:Innovate95@rediffmail.com">
                            Innovate95@rediffmail.com
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td>CEO<br /> <span style={{ fontSize: '12px'}}>( 9 A.M to 6 P.M )</span></td>
                        <td>Amar M. Parikh</td>
                        <td>
                          1st Floor, DEVASHISH, 39, Sardar Patel Nagar, Near
                          Opp. ABC-III, Navrangpura, Ahmedabad - 380 009
                        </td>
                        <td>
                          <a href="tel:07926561106">079-26561106</a>
                        </td>
                        <td>
                          <a href="mailto:innovatescrap@gmail.com">
                            innovatescrap@gmail.com
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
  )
}

export default Table