import { Button } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.TopBarPosition}>
        <TopBar />
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.overlay}></div>
        <img
          src={require("../assets/Party.jpg")}
          className={styles.imageView}
        />
      </div>
      <div className={styles.eventDescription}>
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
        <div>
          <div className={styles.ticketButton}>Book Your Ticket</div>
        </div>
      </div>

      <div className={styles.mainSponsor}>
        <img
          src={require("../assets/beirut beer.png")}
          className={styles.sponsorImage}
        />
        <img
          src={require("../assets/mtv.jpg")}
          className={styles.sponsorImage}
        />
        <img
          src={require("../assets/xxl.jpg")}
          className={styles.sponsorImage}
        />
      </div>
    </div>
  );
};
