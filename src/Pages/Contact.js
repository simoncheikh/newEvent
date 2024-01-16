import { useState } from "react";
import { TopBar } from "../Components/TopBar";
import { Warning } from "../Components/Warning";
import styles from "../Styles/contact.module.css";
import emailjs from "@emailjs/browser";
import {
  InputAdornment,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Button } from "react-admin";
import { blue } from "@mui/material/colors";

export const Contact = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [contactData, setContactData] = useState([]);

  const theme = createTheme({
    palette: {
      primary: blue,
      secondary: {
        main: "#161855",
        dark: "#161855",
      },
    },
  });

  const sendEmail = () => {
    const serviceID = "service_l1bipck";
    const templateID = "template_nuamg8l";
    const userID = "ORaa2ocgdQPiEGdjP";

    const templateParams = {
      email: contactData?.email,
      to_name: "Lebanon Luxe Event",
      from_name: contactData?.userName,
      message: contactData?.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log("Email sent:", response);
        setWarningText({
          severity: "success",
          label: "Your Feedback have been sended successfully",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
    setContactData([]);
  };

  const validation = () => {
    return !contactData.email || !contactData.userName || !contactData.message;
  };

  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
        <Warning
          onClick={() => setShowAlert(false)}
          collapseIn={showAlert}
          alertProps={warningText}
        />
      </div>
      <br />
      <div className={styles.mainPage}>
        <h1>Contact US:</h1>
        <div className={styles.rowContact}>
          <TextField
            placeholder="Email"
            variant="outlined"
            onChange={(e) =>
              setContactData({ ...contactData, email: e.target.value })
            }
            value={contactData.email || ""}
          />
          <TextField
            placeholder="User Name"
            variant="outlined"
            onChange={(e) =>
              setContactData({ ...contactData, userName: e.target.value })
            }
            value={contactData.userName || ""}
          />
          <TextField
            placeholder="Message"
            variant="outlined"
            multiline
            maxRows={5}
            sx={{ width: "100%" }}
            onChange={(e) =>
              setContactData({ ...contactData, message: e.target.value })
            }
            value={contactData.message || ""}
          />
        </div>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="secondary"
            className={styles.sendBtn}
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "white",
              borderRadius:"0px",
              marginBottom:"2%"
            }}
            onClick={() => {
              if (validation()) {
                setWarningText({
                  severity: "error",
                  label: "Some fields are required",
                });
                setShowAlert(true);
              } else {
                sendEmail();
              }
            }}
          >
            <div style={{ color: "white" }}>Send</div>
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
};
