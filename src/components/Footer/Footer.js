import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p className="footer-name">Nguyen Quoc An</p>
      <p className="footer-contact">
        <a target="_blank" rel="noreferrer" href="https://github.com/an678-mhg">
          <box-icon
            color="white"
            size="md"
            type="logo"
            name="github"
          ></box-icon>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/an70008/"
        >
          <box-icon
            color="#0abde3"
            size="md"
            type="logo"
            name="facebook-circle"
          ></box-icon>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.youtube.com/channel/UCJeY2ZgtRzY3NSiLZYu9ddg"
        >
          <box-icon
            color="#ee5253"
            size="md"
            name="youtube"
            type="logo"
          ></box-icon>
        </a>
      </p>
    </div>
  );
}

export default Footer;
