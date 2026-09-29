import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container h">
      <div className="footer-content">
        <div className="footer-left">
          <a href="#" className="footer-link">
            Help
          </a>
          <span className="footer-separator">-</span>
          <a href="#" className="footer-link">
            Sitemap
          </a>
        </div>

        <div className="footer-logos">
          <div className="logo cartrade-tech">
            <span className="logo-text">Car</span>
            <span className="logo-circle">T</span>
            <span className="logo-text">rade</span>
            <span className="logo-tech">Tech</span>
            <span className="logo-group">GROUP</span>
          </div>

          <div className="logo-divider"></div>

          <div className="logo olx">
            <span className="olx-text">olx</span>
          </div>

          <div className="logo carwale">
            <span className="carwale-text">carwale</span>
          </div>

          <div className="logo bikewale">
            <span className="bikewale-text">bikewale</span>
          </div>

          <div className="logo cartrade">
            <span className="logo-text">Car</span>
            <span className="logo-circle">T</span>
            <span className="logo-text">rade</span>
          </div>

          <div className="logo mobility-outlook">
            <span className="mobility-text">MOBILITY</span>
            <span className="outlook-text">OUTLOOK</span>
          </div>
        </div>

        <div className="footer-right">
          <span className="copyright-text">
            All rights reserved © 2006-2025 OLX
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
