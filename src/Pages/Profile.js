import { Button, ThemeProvider, createTheme } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/profile.module.css";
import { MyAccount } from "../Components/MyAccount";
import { useState } from "react";
import { EventHistory } from "../Components/EventHistory";
import { Favorites } from "../Components/Favorites";
import { UpdateAccount } from "../Components/UpdateAccount";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#161855",
    },
  },
});

export const Profile = () => {
  const [checkButton, setCheckButton] = useState();

  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
      </div>
      <br />
      <br />
      <br />
      <div className={styles.profileMainPage}>
        <h1 className={styles.welcome}>Welcome User</h1>
        <div className={styles.profileActions}>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCheckButton(1)}
            >
              My Account
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCheckButton(2)}
            >
              Event History
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCheckButton(3)}
            >
              Favorites
            </Button>
          </ThemeProvider>
          <ThemeProvider theme={theme}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setCheckButton(4)}
            >
              Update Account
            </Button>
          </ThemeProvider>
        </div>
        {checkButton == 1 ? (
          <MyAccount />
        ) : checkButton == 2 ? (
          <EventHistory />
        ) : checkButton == 3 ? (
          <Favorites />
        ) : (
          <UpdateAccount />
        )}
      </div>
    </div>
  );
};
