import styles from "../Styles/component/eventInfo.module.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid, IconButton, Paper } from "@mui/material";
import { blue, purple, yellow } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import { Warning } from "./Warning";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: {
      main: "#ffffff",
      dark: "#161855",
    },
  },
});

export const EventInfo = () => {
  const [numberTicket, setNumberTicket] = useState(0);
  const [oneEvent, setOneEvent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [getUserID, setGetUserID] = useState([]);

  const navigate = useNavigate();

  const { state } = useLocation();

  useEffect(() => {
    fetchData();
    getEvent();
  }, []);
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
        setGetUserID(data.userID);
      }
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

  const getEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/events/${state.eventID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setOneEvent(data[0] || {});
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const orderEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/EventInfo/handleCartEvent`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: getUserID,
            orderPrice: oneEvent.eventPrice,
            orderQuantity: numberTicket,
            orderName: oneEvent.eventName,
            orderTotalPrice:
              parseFloat(oneEvent.eventPrice) * parseFloat(numberTicket),
            createdDate: formatDate(new Date()),
            eventID: oneEvent.eventID,
          }),
        }
      );
      setWarningText({ severity: "success", label: "Event Added to Cart" });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    return `${year}-${month < 10 ? "0" : ""}${month}-${day}`;
  }

  return (
    <>
      <div className={styles.topBarStyle}>
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
          labelButton={
            warningText.label == "Please Login First" ? "Click Here" : null
          }
        />
      </div>
      <div className={styles.mainEventInfo}>
        {oneEvent.eventImage && (
          <img
            src={require(`../assets/${oneEvent.eventImage}`)}
            className={styles.eventImage}
            alt="Event"
          />
        )}
        <div className={styles.EventTitle}>{oneEvent.eventName}</div>
        <div className={styles.EventPlace}>{oneEvent.eventLocation}</div>
        <div className={styles.EventTime}>
          {new Date(oneEvent.eventDate).toDateString() +
            " " +
            oneEvent.eventTime}
        </div>
        <div className={styles.EventDescription}>
          <div className={styles.description}>Description</div>
          {oneEvent.eventDesc}
        </div>
        <div className={styles.mainLocation}>
          <div className={styles.location}>Location</div>
          <iframe
            src={oneEvent.eventLocationLink}
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.locationMap}
          ></iframe>
        </div>
        <div className={styles.mainPrice}>
          <div>Price</div>
          <div className={styles.price}>{oneEvent.eventPrice}$</div>
        </div>
        <div className={styles.mainTickets}>
          <div className={styles.tickets}>Tickets</div>
          <div className={styles.increaseDecreaseButton}>
            <button
              type="submit"
              className={styles.increaseButton}
              onClick={() => {
                if (numberTicket < oneEvent.eventTicket) {
                  setNumberTicket(numberTicket + 1);
                }
              }}
            >
              <div className={styles.plusButton}>+</div>
            </button>
            <div type="number" className={styles.inputNumber}>
              {numberTicket}
            </div>
            <button
              type="submit"
              disabled={numberTicket === 0}
              className={styles.decreaseButton}
              onClick={() => setNumberTicket(numberTicket - 1)}
            >
              <div className={styles.minusButton}>-</div>
            </button>
          </div>
          <div className={styles.ticketsLeft}>
            {oneEvent.eventTicket} Tickets Left
          </div>
        </div>
        <div className={styles.mainCheckout}>
          <ThemeProvider theme={theme}>
            <IconButton color="secondary" onClick={() => navigate("/Cart")}>
              <AddShoppingCartIcon />
            </IconButton>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              className={styles.checkoutButton}
              onClick={() => {
                setShowAlert(true);
                getUserID.length === 0
                  ? setWarningText({
                      severity: "error",
                      label: "Please Login First",
                    })
                  : orderEvent();
              }}
              disabled={oneEvent.eventTicket == 0 ? true : false}
            >
              Add To Cart
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};
