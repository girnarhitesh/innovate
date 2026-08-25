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
    {
      id: 14,
      month: "July 2026",
      pdfLink: "/InvestorComplaints/July-2026.pdf",
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
                  <caption className="sr-only">
                    Monthly investor complaints disclosure documents
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Sr.No</th>
                      <th scope="col">Month & Year</th>
                      <th scope="col">Download</th>
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
                            aria-label={`Download ${item.month} investor complaints PDF`}
                          >
                            <FaFilePdf aria-hidden="true" />
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
