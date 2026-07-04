import React from "react";
import "./AppStoreButtons.css";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const APP_STORE_URL = "https://apps.apple.com/app/id6762111197";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.saral_info.moneymakerapi.innovate&pcampaignid=web_share";

const AppStoreButtons = ({
  simple = false,
  iosLabel = "Download iOS App",
  androidLabel = "Download Android App",
}) => (
  <div className={`AppStoreButtons${simple ? " AppStoreButtons--simple" : ""}`}>
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="AppStoreButtons__btn"
    >
      <FaApple className="AppStoreButtons__icon" aria-hidden />
      {simple ? (
        <span className="AppStoreButtons__label">{iosLabel}</span>
      ) : (
        <div className="AppStoreButtons__text">
          <span className="AppStoreButtons__title">{iosLabel}</span>
        </div>
      )}
    </a>
    <a
      href={PLAY_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="AppStoreButtons__btn"
    >
      <FaGooglePlay className="AppStoreButtons__icon" aria-hidden />
      {simple ? (
        <span className="AppStoreButtons__label">{androidLabel}</span>
      ) : (
        <div className="AppStoreButtons__text">
          <span className="AppStoreButtons__title">{androidLabel}</span>
        </div>
      )}
    </a>
  </div>
);

export default AppStoreButtons;
