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
    <section className="MainContainer" aria-labelledby="client-docs-heading">
      <div className="Container">
        <div className="paddingSide">
          <div className="client-docs-wrapper">
            <h2 id="client-docs-heading" className="client-docs-title text-center">
              Client Registration Documents
            </h2>

            <p className="client-docs-para">
              Download Client Registration Documents (Rights &amp; Obligations,
              Risk Disclosure Document, Do&apos;s &amp; Don&apos;ts) in Vernacular
              Language :
            </p>

            <ul className="download-grid">
              {languages.map((lang) => (
                <li key={lang.name}>
                  <a
                    href={`/Image/ClientRegDocs/${lang.file}`}
                    download={lang.file}
                    className="download-item"
                  >
                    <TbDownload className="icon" aria-hidden="true" />
                    <span>{lang.name}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="note-section">
              <p>
                <strong>Note:</strong>
                <em>
                  &quot;This document is a translated version of the client
                  registration documents in English and is being provided in
                  vernacular language to facilitate better understanding by the
                  investors. In case of any ambiguity, the contents of the
                  English version would prevail.&quot;
                </em>
              </p>

              <h3 className="study-title">
                Study conducted by SEBI on Risk Disclosures
              </h3>

              <a
                href="https://www.sebi.gov.in/reports-and-statistics/research/jan-2023/study-analysis-of-profit-and-loss-of-individual-traders-dealing-in-equity-fando-segment_67525.html"
                target="_blank"
                rel="noopener noreferrer"
                className="study-link"
              >
                https://www.sebi.gov.in/reports-and-statistics/research/jan-2023/study-analysis-of-profit-and-loss-of-individual-traders-dealing-in-equity-fando-segment_67525.html
              </a>

              <h3 className="study-title">
                SMART ODR - Securities Market Approach for Resolution Through ODR Portal
              </h3>

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
    </section>
  );
};

export default ClientRegDocs;
