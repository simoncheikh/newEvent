import { Button } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";
import { useEffect, useState } from "react";
import { EventCard } from "../Components/EventCard";

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
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.TopBarPosition}>
        <TopBar />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.imageDescriptionContainer}>
        <div className={styles.eventDescription}>
          <h1 className={styles.titleEvent}>
            Lebanon Luxe Events: Discover, Experience, Repeat
          </h1>
          <h2 className={styles.mainEventDescription}>
            Discover the ultimate destination for all things events! Our event
            website is your go-to platform for exploring, planning, and
            attending a wide variety of events that cater to every interest and
            passion.
          </h2>
        </div>
        <div className={styles.imageContainer}>
          <img src={currentImage} className={styles.imageView} />
        </div>
      </div>
      <div>
        <div className={styles.mainPromotedCards}>
          <div className={styles.promotedTitle}>Promoted Events</div>
          <div className={styles.promotedCard}>
            <EventCard />
            <EventCard />
            <EventCard />
            <EventCard />
          </div>
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
