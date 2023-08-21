import { Button } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.mainPage}>
      <TopBar />
      <div className={styles.bodyHomePage}>
        <div className={styles.titleEvent}>Today's Event</div>
        <div className={styles.mainImage}>
          <img
            src={require("../assets/The Weeknd.jpg")}
            className={styles.imageView}
          />
        </div>
        <div className={styles.concertTitle}>The Weeknd's Concert</div>
        <div className={styles.mainEventDate}>
          <div className={styles.mainDate}>
            <div>Date:</div>
            <div>27/9/2023</div>
          </div>
          <div className={styles.mainDate}>
            <div>Time:</div>
            <div>27/9/2023</div>
          </div>
          <div className={styles.mainDate}>
            <div>Location:</div>
            <div>Lebanon-Beirut-Downtown</div>
          </div>
        </div>
        <Button variant="contained" className={styles.ticketsButton}>
          Book Your Ticket
        </Button>
        <div className={styles.mainSponsor}>
          <img src={require("../assets/beirut beer.png")} />
          <img src={require("../assets/mtv.jpg")} />
          <img src={require("../assets/xxl.jpg")}  />
        </div>
      </div>
    </div>
  );
};
