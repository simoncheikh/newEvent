import { TextField } from "@mui/material";
import styles from "../Styles/component/favorites.module.css";
import { EventCard } from "./EventCard";
import { useEffect, useState } from "react";

export const Favorites = ({ setChangePasswordMessage, setShowAlert }) => {
  const [favEvent, setFavEvent] = useState([]);
  const [userData, setUserData] = useState(null);
  const [cardWidth, setCardWidth] = useState("23.8%");

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
        setUserData(data.userID);
        if (data.error) {
          console.error("Error fetching userID:", data.error);
        } else {
          getFavEvent(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  const getFavEvent = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/profile/add-fav-event/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setFavEvent(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavEvent = async (eventID) => {
    try {
      const response = await fetch(
        "http://localhost:3001/profile/fav-event/delete",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventID: eventID, userID: userData }),
        }
      );
      if (response.ok) {
        setChangePasswordMessage({
          severity: "success",
          label: "Event deleted from favorite successfully.",
        });
      } else {
        const errorData = await response.json();
        setChangePasswordMessage({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setChangePasswordMessage({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    window.location.reload();
  };

  const originalDate = (formattedDate) => {
    const date = new Date(`${formattedDate}`);
    return date.toDateString();
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setCardWidth("100%");
      } else {
        setCardWidth("23.8%");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.mainFavorites}>
      {favEvent.map((value) => (
        <EventCard
          key={value.favEventID}
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
          width={cardWidth}
          marginBottom={"2%"}
          height={"50vh"}
          data={{ eventID: value.eventID }}
          onClick={(e) => {
            e.preventDefault();
            deleteFavEvent(value.eventID);
          }}
        />
      ))}
    </div>
  );
};
