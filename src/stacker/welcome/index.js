import React from "react";
import "./welcome.css";

import WelcomeMobile from "../../images/welcomeMobile.jpg";
import WelcomeDesktop from "../../images/welcomeDesktop.jpg";

import { ReactComponent as CrossIcon } from "../../images/close-line-icon.svg";

const Welcome = ({ setShowWelcome }) => {
  return (
    <div className="welcome">
      <CrossIcon
        className="welcome__crossIcon"
        onClick={() => setShowWelcome(false)}
      />
      <picture>
        <source media="(max-width: 468px )" srcSet={WelcomeMobile} />
        <img src={WelcomeDesktop} alt="Welcome" />
      </picture>
    </div>
  );
};

export default Welcome;
