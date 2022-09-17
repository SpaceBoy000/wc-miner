import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const footerArray = [
    { items: "AUDIT", to: "https://www.encryptosecurity.com/AuditRecord?project=64" },
    { items: "CONTRACT", to: "https://bscscan.com/address/0xae12362c87dab9cf6567f63c892dd80f38828d8f" },
    { items: "DISCORD", to: "https://discord.gg/bBwPdV6q8U" },
    { items: "TELEGRAM", to: "https://t.me/WCMinerOfficial" },
    { items: "TWITTER", to: "https://twitter.com/WolfOfCrypto885" },
  ];

  return (
    <div className={styles.footer}>
      <div className="d-flex justify-content-center align-items-center">
        {footerArray.map((el, i) => (
          <a
            target="_blank"
            rel="noreferrer"
            href={el.to}
            className={styles.footerItem}
            key={i}
          >
            {el.items}
          </a>
          /* I have looped the footerArray here so that we can use less code and you can edit it easily */
        ))}
      </div>
      <p className={styles.copyRight}>© Wolf Crypto Team , All Rights Reserved</p>
    </div>
  );
};

export default Footer;
