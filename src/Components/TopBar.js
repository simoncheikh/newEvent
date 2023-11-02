import styles from "../Styles/component/topBar.module.css";
import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className={styles.mainTopBar}>
      <img
        src={require("../assets/menu.png")}
        style={{ cursor: "pointer" }}
        className={styles.menuStyle}
      />
      <div>
        <div className={styles.buttonBar}>
          <Link to="/event" className={styles.linkStyle}>
            <div className={styles.buttonName}>Events</div>
          </Link>
          <Link to="/event" className={styles.linkStyle}>
            <div className={styles.buttonName}>Ticket</div>
          </Link>
          <Link to="/event" className={styles.linkStyle}>
            <div className={styles.buttonName}>Contact</div>
          </Link>
        </div>
      </div>
      <Link to="/event" className={styles.linkStyle}>
        <div className={styles.contactButton}>Contact Us</div>
      </Link>
    </div>
  );
};
