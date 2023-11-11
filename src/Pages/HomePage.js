import { Button, IconButton } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";
import { useEffect, useState } from "react";
import { EventCard } from "../Components/EventCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { DownBar } from "../Components/DownBar";
import Carousel from "@itseasy21/react-elastic-carousel";

const eventCardValue = [
  {
    id: 1,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 2,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 3,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 4,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 5,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 6,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 7,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
  {
    id: 8,
    title: "VIRTUAL SOFTWARE DEVELOPMENT CONFERENCE",
    date: "Wed, Nov 15, 10:00 AM",
    status: "Online",
    location: "Beirut, 98000",
    fees: "free",
    tickets: "10 Tickets Left",
  },
];

const breakPoints = [
  { width: 750, itemsToShow: 1 },
  { width: 1050, itemsToShow: 2 },
  { width: 1050, itemsToShow: 3 },
  { width: 1050, itemsToShow: 4 },
];

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
          <h3 className={styles.mainEventDescription}>
            Discover the ultimate destination for all things events! Our event
            website is your go-to platform for exploring, planning, and
            attending a wide variety of events that cater to every interest and
            passion.
          </h3>
        </div>
        <div className={styles.imageContainer}>
          <img src={currentImage} className={styles.imageView} />
        </div>
      </div>
      <div>
        <div className={styles.mainPromotedCards}>
          <div className={styles.promotedTitle}>Promoted Events</div>
          <Carousel breakPoints={breakPoints}>
            {eventCardValue.map((value) => (
              <EventCard
                key={value.id}
                title={value.tickets}
                date={value.date}
                status={value.status}
                location={value.location}
                fees={value.fees}
                tickets={value.tickets}
                width={"90%"}
                marginBottom={"2%"}
              />
            ))}
          </Carousel>
        </div>
      </div>
      <DownBar />
    </div>
  );
};
