import React, { useEffect, useState } from "react";
import styles from "../Styles/component/sideMenu.module.css";
import { ClassNames } from "@emotion/react";
import { Link, useNavigate } from "react-router-dom";
import { Warning } from "./Warning";
import { useAuth } from "../AuthContext";

export const SideMenu = ({
  openSpaceDiv,
  wideSpaceOnClick,
  closeSignIn = true,
  userName,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});

  const navigate = useNavigate();

  const { authenticated, user } = useAuth();

  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:3001/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setWarningText({ severity: "success", label: "Logout" });
      navigate("/");
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert(true);
    window.location.reload();
  };
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
              <div>{userName}</div>
            </div>
            {user?.type == 1 ? null : (
              <Link to="/Profile" className={styles.linkStyle}>
                <div className={styles.actionButton}>Profile</div>
              </Link>
            )}
            {closeSignIn == true ? (
              <Link to="/SignIn" className={styles.linkStyle}>
                <div className={styles.actionButton}>Sign In</div>
              </Link>
            ) : null}
            {user?.type == 2 || user?.type == 1 ? null : (
              <Link to="/Cart" className={styles.linkStyle}>
                <div className={styles.actionButton}>Cart</div>
              </Link>
            )}
            <Link to="/Privacy" className={styles.linkStyle}>
              <div className={styles.actionButton}>Privacy and condition</div>
            </Link>
          </div>
          <div className={styles.sideMenuBottom}>
            {user?.type == null ? null : (
              <div className={styles.actionButton} onClick={logout}>
                Logout
              </div>
            )}
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
      >
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
    </div>
  );
};
