import React from "react";
import { TbDownload } from "react-icons/tb";
import "./ClientRegDoc.css";

const languages = [
  { name: "Assamese", file: "Assamese.zip" },
  { name: "Bengali", file: "Bengali.zip" },
  { name: "Gujrati", file: "Gujrati.zip" },
  { name: "Hindi", file: "Hindi.zip" },
  { name: "Kanada", file: "Kanada.zip" },
  { name: "Kashmiri", file: "Kashmiri.zip" },
  { name: "Konkani", file: "Konkani.zip" },
  { name: "Malayalam", file: "Malayalam.zip" },
  { name: "Marathi", file: "Marathi.zip" },
  { name: "Oriya", file: "Oriya.zip" },
  { name: "Punjabi", file: "Punjabi.zip" },
  { name: "Sindhi", file: "Sindhi.zip" },
  { name: "Tamil", file: "Tamil.zip" },
  { name: "Telegu", file: "Telegu.zip" },
  { name: "Urdu", file: "Urdu.zip" },
];

const ClientRegDocs = () => {
  return (
    <div className="MainContainer">
      <div className="Container">
        <div className="paddingSide">
          <div className="client-docs-wrapper">
            <h2 className="client-docs-title text-center">
              Client Registration Documents
            </h2>

            <p className="client-docs-para">
              Download Client Registration Documents (Rights &amp; Obligations,
              Risk Disclosure Document, Do's &amp; Don'ts) in Vernacular
              Language :
            </p>

            <div className="download-grid">
              {languages.map((lang) => (
                <a
                  key={lang.name}
                  href={`/Image/ClientRegDocs/${lang.file}`}
                  download={lang.file}
                  className="download-item"
                >
                  <TbDownload className="icon" />
                  <span>{lang.name}</span>
                </a>
              ))}
            </div>
            <div className="note-section">
              <p>
                <strong>Note:</strong>
                <em>
                  "This document is a translated version of the client
                  registration documents in English and is being provided in
                  vernacular language to facilitate better understanding by the
                  investors. In case of any ambiguity, the contents of the
                  English version would prevail."
                </em>
              </p>

              <p className="study-title">
                Study conducted by SEBI on Risk Disclosures
              </p>

              <a
                href="https://www.sebi.gov.in/reports-and-statistics/research/jan-2023/study-analysis-of-profit-and-loss-of-individual-traders-dealing-in-equity-fando-segment_67525.html"
                target="_blank"
                rel="noopener noreferrer"
                className="study-link"
              >
                https://www.sebi.gov.in/reports-and-statistics/research/jan-2023/study-analysis-of-profit-and-loss-of-individual-traders-dealing-in-equity-fando-segment_67525.html
              </a>

              <p className="study-title">
                SMART ODR - Securities Market Approach for Resolution Through ODR Portal
              </p>

              <a
                href="https://smartodr.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="study-link"
              >
                https://smartodr.in/login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientRegDocs;
