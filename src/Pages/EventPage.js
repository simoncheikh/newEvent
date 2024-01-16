import { Button, Pagination } from "@mui/material";
import styles from "../Styles/eventPage.module.css";
import { EventCard } from "../Components/EventCard";
import { TopBar } from "../Components/TopBar";
import { useEffect, useState } from "react";
import { SearchInput } from "../Components/SearchInput";
import { DownBar } from "../Components/DownBar";
import { Warning } from "../Components/Warning";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export const EventPage = () => {
  const [sortByPrice, setSortByPrice] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [event, setEvent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [userData, setUserData] = useState(null);
  const [cardWidth, setCardWidth] = useState("23.8%");

  const itemsPerPage = 8;

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
  const { authenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type == null && !user) {
      return;
    } else if (user.type == 3 && user && authenticated) {
      return;
    } else {
      navigate("/SignIn");
    }
  }, [authenticated, user, navigate]);

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
      setShowAlert(true);
      setWarningText({
        severity: "error",
        label: error.message,
        error,
      });
    }
  };

  const insertFavEvent = async (eventID) => {
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
        } else if (response.status == 400) {
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

  const sortedEventCardValue = sortByPrice
    ? [...event].sort((a, b) => a.eventPrice - b.eventPrice)
    : event;

  const totalItems = sortedEventCardValue.length;

  const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
  const indexOfFirstItem = Math.max((currentPage - 1) * itemsPerPage, 0);

  const currentItems = sortedEventCardValue.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
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
    <div className={`${styles.mainPageEvent} page`}>
      <div className={styles.topBarStyle}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
      <br />

      <div className={styles.eventPageContainer}>
        <h2>Discover your Events</h2>
        <div className={styles.mainSearchInput}>
          <SearchInput className={styles.SearchInput} />
          <Button
            onClick={() => setSortByPrice(!sortByPrice)}
            className={styles.sortBtn}
          >
            {sortByPrice ? "Sort by Default" : "Sort by Price"}
          </Button>
        </div>
        <div className={styles.eventCardStyle}>
          {currentItems.map((value) => (
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
              width={cardWidth}
              marginBottom={"2%"}
              height={"50vh"}
              data={{ eventID: value.eventID }}
              onClick={(e) => {
                e.preventDefault();
                insertFavEvent(value.eventID);
              }}
            />
          ))}
          <div className={styles.mainPagination}>
            <Pagination
              count={Math.ceil(totalItems / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
            />
          </div>
        </div>
      </div>
      <DownBar />
    </div>
  );
};
