import React from "react";
import "./AppDownload.css";
import AppStoreButtons from "../../AppStoreButtons/AppStoreButtons";

const AppDownload = () => (
  <section
    className="AppDownloadSection AppDownloadSection--home"
    style={{ paddingTop: "16px" }}
    aria-label="Download Innovate Trading App"
  >
    <div className="SectionTagLabelContainer AppDownload__label">
      <div>
        <div className="flexVertically">
          <img
            src="https://s3.ap-south-1.amazonaws.com/prepseed/prod/ldoc/media/RocketPng.png"
            alt="Download App"
          />
        </div>
        <p>Innovate Trading App</p>
      </div>
    </div>

    <div style={{ margin: "10px 0px" }}>
      <AppStoreButtons iosLabel="App Store" androidLabel="Play Store" />
    </div>

    <p className="AppDownload__subtitle text-center">
      <span style={{ textAlign: "center", display: "block" }}>
        Download the app and stay connected on&nbsp;the&nbsp;go!
      </span>
    </p>
  </section>
);

export default AppDownload;
