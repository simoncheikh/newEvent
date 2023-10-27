import { Button } from "@mui/material";
import styles from "../Styles/component/topBar.module.css";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={styles.mainTopBar}>
      <img src={require("../assets/menu.png")} style={{ cursor: "pointer" }} />
      <div>
        <div className={styles.buttonBar}>
          <div className={styles.buttonName}>Events</div>
          <div className={styles.buttonName}>Ticket</div>
          <div className={styles.buttonName}>Contact</div>
        </div>
      </div>
      <Link to="/event" className={styles.linkStyle}>
        <div className={styles.contactButton}>Contact Us</div>
      </Link>
    </div>
  );
};
