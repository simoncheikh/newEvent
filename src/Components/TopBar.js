import { Button } from "@mui/material";
import styles from "../Styles/component/topBar.module.css";

export const TopBar = () => {
  return (
    <div className={styles.mainTopBar}>
      <div className={styles.menuButtons}>
        <img src={require("../assets/menu.png")} style={{cursor:"pointer"}} />
        <div className={styles.buttonBar}>
          <div className={styles.buttonName}>Events</div>
          <div className={styles.buttonName}>Ticket</div>
          <div className={styles.buttonName}>Contact</div>
        </div>
        <Button variant="contained" className={styles.contactButton}>
          Contact Us
        </Button>
      </div>
    </div>
  );
};
