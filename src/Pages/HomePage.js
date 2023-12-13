import { Button, IconButton } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";
import { useEffect, useState } from "react";
import { EventCard } from "../Components/EventCard";
import { DownBar } from "../Components/DownBar";
import Carousel from "@itseasy21/react-elastic-carousel";
import { Warning } from "../Components/Warning";
import { useLocation } from "react-router-dom";

const breakPoints = [
  { width: 1050, itemsToShow: 1 },
  { width: 1050, itemsToShow: 2 },
  { width: 1050, itemsToShow: 3 },
  { width: 1050, itemsToShow: 4 },
];

export const HomePage = () => {
  const [image, setImage] = useState([]);
  const [event, setEvent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  // const location = useLocation();
  // const { state } = location;
  // const { userID, type, firstName, lastName } = state || {};

  useEffect(() => {
    getEvent();
    getImage();
  }, []);

  const getEvent = async () => {
    try {
      const response = await fetch("http://localhost:3001/event_getAll", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:3001/image", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setImage(data.map((value) => value.homeImage));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };
  

  const insertFavEvent = async (eventID, userID) => {
    try {
      const response = await fetch("http://localhost:3001/profile/fav-event", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventID: eventID,
          userID: userID,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Favorite event inserted successfully:", data);
      setShowAlert(true);
    } catch (error) {
      console.error("Error inserting favorite event:", error);
    }
  };

  const originalDate = (formattedDate) => {
    const date = new Date(`${formattedDate}`);
    return date.toDateString();
  };

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.TopBarPosition}>
        <TopBar
          // closeSignIn={userID == null ? true : false}
          // userName={`${firstName} ${lastName}`}
        />
        {/* <Warning
          label="Favorite event inserted successfully"
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
        /> */}
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
          {image.length > 0 && (
            <img
              src={require(`../assets/${image[0]}`)}
              className={styles.imageView}
              alt="Event Image"
            />
          )}
        </div>
      </div>
      <div>
        <div className={styles.mainPromotedCards}>
          <div className={styles.promotedTitle}>Promoted Events</div>
          <Carousel breakPoints={breakPoints}>
            {event.map((value) => (
              <EventCard
                key={value.eventID}
                title={value.eventName}
                date={originalDate(value.eventDate)}
                // status={value.status}
                location={value.eventLocation}
                fees={
                  value.eventPrice == "free"
                    ? `${value.eventPrice}`
                    : ` ${value.eventPrice}$`
                }
                image={require(`../assets/${value.eventImage}`)}
                tickets={value.eventTicket + " Tickets"}
                width={event.length == 1 ? "40%" : "90%"}
                marginBottom={"2%"}
                height={"50vh"}
                data={{ eventID: value.eventID }}
                onClick={(e) => {
                  e.preventDefault();
                  insertFavEvent(value.eventID, value.userID);
                }}
              />
            ))}
          </Carousel>
        </div>
      </div>
      <DownBar />
    </div>
  );
};
