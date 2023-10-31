import { Button } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";
import { useEffect, useState } from "react";

export const HomePage = () => {
  const images = [
    require("../assets/POSTER.jpeg"),
    require("../assets/Party.jpg"),
    require("../assets/The Weeknd.jpg"),
  ];
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
        setCurrentImage(images[Math.floor(Math.random() * images.length)]);
    }, 5000)
    
    return () => clearInterval(intervalId);
}, [])
  
  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.TopBarPosition}>
        <TopBar />
      </div>
      <div className={styles.imageContainer}>
        <img
          src={currentImage}
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
