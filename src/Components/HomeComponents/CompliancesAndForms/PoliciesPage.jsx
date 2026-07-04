import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import DocumentCard from "./DocumentCard";
import { compliancesAndFormsData } from "./CompliancesAndFormsData";

const PoliciesPage = () => {
    const navigate = useNavigate();
    const data = compliancesAndFormsData["policies"] || [];

    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="MainContainer margin-top bottom-margin" >
            <div className="Container">
                <div className="paddingSide">
                    <div className="SubPageHeader">
                        <button className="BackButton" onClick={() => navigate("/compliances")}>
                            <ArrowLeftOutlined /> Back
                        </button>
                        <h2 className="SubPageTitle">Policies</h2>
                    </div>
                    <div className="DocumentsGrid">
                        {data.map((document, index) => (
                            <DocumentCard key={document.id} document={document} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoliciesPage;