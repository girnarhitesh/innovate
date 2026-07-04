import React, { useEffect } from "react";
import "./InvestorComplaints.css";
import { FaFilePdf } from "react-icons/fa";

const InvestorComplaints = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const complaintsData = [
    { id: 1, month: "June 2025", pdfLink: "/InvestorComplaints/JUNE.pdf" },
    { id: 2, month: "July 2025", pdfLink: "/InvestorComplaints/JULY.pdf" },
    { id: 3, month: "August 2025", pdfLink: "/InvestorComplaints/AUG.pdf" },
    { id: 4, month: "September 2025", pdfLink: "/InvestorComplaints/SEP.pdf" },
    { id: 5, month: "October 2025", pdfLink: "/InvestorComplaints/OCT.pdf" },
    { id: 6, month: "November 2025", pdfLink: "/InvestorComplaints/NOV.pdf" },
    { id: 7, month: "December 2025", pdfLink: "/InvestorComplaints/DEC.pdf" },
    {
      id: 8,
      month: "January 2026",
      pdfLink: "/InvestorComplaints/JAN_2026.pdf",
    },
    {
      id: 9,
      month: "February 2026",
      pdfLink: "/InvestorComplaints/FEB_2026.pdf",
    },
    {
      id: 10,
      month: "March 2026",
      pdfLink: "/InvestorComplaints/MARCH_2026.pdf",
    },
    {
      id: 11,
      month: "April 2026",
      pdfLink: "/InvestorComplaints/APRIL_2026.pdf",
    },
    {
      id: 12,
      month: "May 2026",
      pdfLink: "/InvestorComplaints/MAY_2026.pdf",
    },
    {
      id: 13,
      month: "June 2026",
      pdfLink: "/InvestorComplaints/JUNE-2026.pdf",
    },
  ];

  return (
    <div className="HomeAboutContainer">
      <div className="MainContainer">
        <div className="Container">
          <div className="paddingSide padding-side">
            <div className="CommonHeader padding30">
              <h2 className="text-center">Investor Complaints Disclosure</h2>
            </div>

            <div className="complaints-content">
              <div className="complaints-table-wrapper">
                <table className="complaints-table">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Month & Year</th>
                      <th>Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaintsData.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.month}</td>
                        <td>
                          <a
                            href={item.pdfLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-link"
                          >
                            <FaFilePdf />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorComplaints;
