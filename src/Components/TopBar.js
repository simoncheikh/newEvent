import { useState } from "react";
import styles from "../Styles/component/topBar.module.css";
import { Link } from "react-router-dom";
import { SideMenu } from "./SideMenu";

export const TopBar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSpaceDiv, setOpenSpaceDiv] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    setTimeout(() => {
      setOpenSpaceDiv(true);
    }, 400);
  };

  return (
    <div className={styles.mainTopBar}>
      <div
        className={styles.sideBarStyle}
        style={{
          transform: openMenu == true ? "translateX(0)" : "translateX(-300vw)",
          transition: "500ms",
        }}
      >
        <SideMenu
          wideSpaceOnClick={() => {
            setOpenSpaceDiv(false);
            setOpenMenu(false);
          }}
          openSpaceDiv={openSpaceDiv}
        />
      </div>
      <img
        src={require("../assets/menu.png")}
        style={{
          cursor: "pointer",
        }}
        className={styles.menuStyle}
        onClick={handleOpenMenu}
      />
      <div>
        <div className={styles.buttonBar}>
          <Link to="/" className={styles.linkStyle}>
            <div className={styles.buttonName}>Home</div>
          </Link>
          <Link to="/event" className={styles.linkStyle}>
            <div className={styles.buttonName}>Events</div>
          </Link>
          <Link to="/AddEvent" className={styles.linkStyle}>
            <div className={styles.buttonName}>Create Events</div>
          </Link>
        </div>
      </div>
      <Link to="/event" className={styles.linkStyle}>
        <div className={styles.contactButton}>Contact Us</div>
      </Link>
    </div>
  );
};
