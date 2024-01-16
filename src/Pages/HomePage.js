import { Button, IconButton } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/HomePage.module.css";
import { useEffect, useState } from "react";
import { EventCard } from "../Components/EventCard";
import { DownBar } from "../Components/DownBar";
import Carousel from "@itseasy21/react-elastic-carousel";
import { Warning } from "../Components/Warning";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

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
  const [warningText, setWarningText] = useState({});
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-user-info", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.error) {
          console.error("Error fetching userID:", data.error);
        } else {
          setUserData(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
    getEvent();
  }, []);

  const getEvent = async () => {
    try {
      const response = await fetch("http://localhost:3001/event_promoted", {
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
          userID: userData,
        }),
      });

      if (!response.ok) {
        if (response.status === 409) {
          setWarningText({
            severity: "warning",
            label: "Favorite event already exists",
          });
        } else if(response.status==400){
          setWarningText({
            severity: "warning",
            label: "Login First",
          });
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } else {
        const data = await response.json();
      
        if (data.success) {
          setWarningText({
            severity: "success",
            label: "Favorite event inserted successfully",
          });
        } else {
          setWarningText({
            severity: "warning",
            label: "Unexpected response from the server",
          });
        }
      }
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
  };

  const originalDate = (formattedDate) => {
    const date = new Date(`${formattedDate}`);
    return date.toDateString();
  };
  const { authenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type == null && !user) {
      navigate("/");
    } else if (user.type == 3 && user && authenticated) {
      navigate("/");
    } else {
      navigate("/SignIn");
    }
  }, [authenticated, user, navigate]);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.TopBarPosition}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
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
            Uncover the ultimate destination for all your event desires! Our
            website is where you can easily explore, plan, and enjoy exciting
            happenings that match your interests and passions.
          </h3>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={require("../assets/Party.jpg")}
            className={styles.imageView}
            alt="Event Image"
          />
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
