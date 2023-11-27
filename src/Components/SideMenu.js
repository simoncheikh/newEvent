import React from "react";
import styles from "../Styles/component/sideMenu.module.css";
import { ClassNames } from "@emotion/react";
import { Link } from "react-router-dom";

export const SideMenu = ({ openSpaceDiv, wideSpaceOnClick }) => {
  return (
    <div className={styles.mainSideBar}>
      <div className={styles.leftSpaceStyle}>
        <div className={styles.mainLogo}>
          <img
            src={require("../assets/Screenshot 2023-11-05 113206 (2).png")}
            className={styles.logoStyle}
          />
        </div>
        <div className={styles.sideMenuContainer}>
          <div className={styles.actionSideMenu}>
            <div className={styles.userNameContainer}>
              <img src={require("../assets/profile.png")} />
              <div>Simon Al Cheikh</div>
            </div>
            <Link to="/SignIn" className={styles.linkStyle}>
              <div className={styles.actionButton}>Profile</div>
            </Link>
            <Link to="/SignIn" className={styles.linkStyle}>
              <div className={styles.actionButton}>Sign In</div>
            </Link>
            <Link to="/SignIn" className={styles.linkStyle}>
              <div className={styles.actionButton}>Cart</div>
            </Link>
            <Link to="/SignIn" className={styles.linkStyle}>
              <div className={styles.actionButton}>Privacy and condition</div>
            </Link>
          </div>
          <div className={styles.sideMenuBottom}>
            <div className={styles.actionButton}>Logout</div>
            <div className={styles.copyrightStyle}>
              Powered © By Lebanon Luxe Events
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.openSpace} ${
          openSpaceDiv ? styles.showOpenSpace : ""
        }`}
        onClick={wideSpaceOnClick}
      ></div>
    </div>
  );
};
