import { ClassNames } from "@emotion/react";
import styles from "../Styles/component/eventInfo.module.css";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Grid, Paper } from "@mui/material";
import { blue, purple, yellow } from "@mui/material/colors";

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

  return (
    <div className={styles.mainEventInfo}>
      <img
        src={require("../assets/nightParty.jpg")}
        className={styles.eventImage}
      />
      <div className={styles.EventTitle}>Party ALL NIGHT</div>
      <div className={styles.EventPlace}>VOID CLUB</div>
      <div className={styles.EventTime}>
        From Today, 10:00 PM Till Tomorrow, 4:00 AM
      </div>
      <div className={styles.EventDescription}>
        <div className={styles.description}>Description</div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sagittis
        sapien turpis, sit amet ultricies purus lobortis eget. Nulla ex tellus,
        facilisis sed rutrum ut, congue et tellus. Curabitur sed dolor sit amet
        leo mollis consequat non vitae est. Sed rutrum, felis at lacinia ornare,
        ligula nulla pharetra diam, ut sodales nulla erat vitae lacus.
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Sed et sagittis turpis. Quisque non cursus
        libero.
      </div>
      <div className={styles.mainLocation}>
        <div className={styles.location}>Location</div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3297.8142972465917!2d35.65775471090821!3d34.253281906976476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f598714ccf9d3%3A0x256fc359c73fba2f!2sVoid%20nightclub!5e0!3m2!1sen!2slb!4v1699687210713!5m2!1sen!2slb"
          allowfullscreen=""
          loading="eager"
          referrerpolicy="no-referrer-when-downgrade"
          className={styles.locationMap}
        ></iframe>
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
          >
            Add To Cart
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};
