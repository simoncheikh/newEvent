import { Button, ThemeProvider, createTheme } from "@mui/material";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/profile.module.css";
import { MyAccount } from "../Components/MyAccount";
import { useEffect, useState } from "react";
import { EventHistory } from "../Components/EventHistory";
import { Favorites } from "../Components/Favorites";
import { UpdateAccount } from "../Components/UpdateAccount";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../Components/ChangePassword";
import { Warning } from "../Components/Warning";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#161855",
    },
  },
});

export const Profile = () => {
  const [checkButton, setCheckButton] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [changePasswordMessage, setChangePasswordMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [cardWidth, setCardWidth] = useState("23.8%");

  const { authenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.type == null && !user) {
      return;
    } else if ((user.type == 3 || user.type == 2) && user && authenticated) {
      return;
    } else {
      navigate("/SignIn");
    }
  }, [authenticated, user, navigate]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setCardWidth("100%");
      } else {
        setCardWidth("50%");
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={changePasswordMessage || { severity: "", label: "" }}
        />
      </div>
      <br />
      <br />
      <br />
      <div className={styles.profileMainPage}>
        <h1 className={styles.welcome}>Welcome User</h1>
        {window.innerWidth <= 600 ? (
          <div className={styles.profileActions}>
            <div className={styles.responsiveProfileActions}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCheckButton(1)}
                  sx={{ width: cardWidth }}
                >
                  My Account
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCheckButton(2)}
                  sx={{ width: cardWidth }}
                >
                  Event History
                </Button>
              </ThemeProvider>
            </div>
            <div className={styles.responsiveProfileActions}>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCheckButton(3)}
                  sx={{ width: "32%" }}
                >
                  Favorites
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCheckButton(4)}
                  sx={{ width: "32%" }}
                >
                  Update Account
                </Button>
              </ThemeProvider>
              <ThemeProvider theme={theme}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setCheckButton(5)}
                  sx={{ width: "32%" }}
                >
                  Change Password
                </Button>
              </ThemeProvider>
            </div>
          </div>
        ) : (
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
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setCheckButton(5)}
              >
                Change Password
              </Button>
            </ThemeProvider>
          </div>
        )}
        {checkButton == 1 ? (
          <MyAccount />
        ) : checkButton == 2 ? (
          <EventHistory />
        ) : checkButton == 3 ? (
          <Favorites
            setChangePasswordMessage={setChangePasswordMessage}
            setShowAlert={setShowAlert}
          />
        ) : checkButton == 4 ? (
          <UpdateAccount
            setChangePasswordMessage={setChangePasswordMessage}
            setShowAlert={setShowAlert}
          />
        ) : (
          <ChangePassword
            setChangePasswordMessage={setChangePasswordMessage}
            setShowAlert={setShowAlert}
          />
        )}
      </div>
    </div>
  );
};
