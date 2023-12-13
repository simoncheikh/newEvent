import { ClassNames } from "@emotion/react";
import styles from "../Styles/component/eventInfo.module.css";
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid, Paper } from "@mui/material";
import { blue, purple, yellow } from "@mui/material/colors";
import { useLocation } from "react-router-dom";
import { Warning } from "./Warning";

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
  const [numberTicket, setNumberTicket] = useState(1);
  const [oneEvent, setOneEvent] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});

  const { state } = useLocation();

  useEffect(() => {
    getEvent();
  }, []);

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
      const response = await fetch(`http://localhost:3001/EventInfo/cart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: 1,
          orderPrice: oneEvent.eventPrice,
          orderQuantity: numberTicket,
          orderName: oneEvent.eventName,
          orderTotalPrice:
            parseFloat(oneEvent.eventPrice) * parseFloat(numberTicket),
          eventID: oneEvent.eventID,
        }),
      });
      setWarningText({ severity: "success", label: "Event Added to Cart" });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
  };

  return (
    <>
      <div className={styles.topBarStyle}>
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
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
              onClick={() => setNumberTicket(numberTicket + 1)}
            >
              <div className={styles.plusButton}>+</div>
            </button>
            <div type="number" className={styles.inputNumber}>
              {numberTicket}
            </div>
            <button
              type="submit"
              disabled={numberTicket == 0 ? true : false}
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
            <Button
              variant="contained"
              color="secondary"
              className={styles.checkoutButton}
            >
              Buy It Now
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              className={styles.checkoutButton}
              onClick={orderEvent}
            >
              Add To Cart
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
};
