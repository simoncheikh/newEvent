import { useEffect, useState } from "react";
import { BasicDatePicker } from "../Components/BasicDatePicker";
import BasicTimePicker from "../Components/BasicTimePicker";
import { Dropdown } from "../Components/Dropdown";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/addEvent.module.css";
import TextField from "@mui/material/TextField";
import { Box, Button, Grid, Paper, Alert } from "@mui/material";
import { Warning } from "../Components/Warning";
import AlertDialog from "../Components/Dialog";
import InputFile from "../Components/InputFile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const AddEvent = () => {
  const [paymentInput, setPaymenInput] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [reqImage, setReqImage] = useState([]);
  const [userData, setUserData] = useState(null);
  const [cardWidth, setCardWidth] = useState("23.8%");

  const paymentMethods = [
    { value: 1, label: "Visa Card" },
    { value: 2, label: "Master Card" },
  ];

  const months = [
    { value: "01", label: "01" },
    { value: "02", label: "02" },
    { value: "03", label: "03" },
    { value: "04", label: "04" },
    { value: "05", label: "05" },
    { value: "06", label: "06" },
    { value: "07", label: "07" },
    { value: "08", label: "08" },
    { value: "09", label: "09" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
  ];

  const years = [
    { value: 2023, label: "2023" },
    { value: 2024, label: "2024" },
    { value: 2025, label: "2025" },
    { value: 2026, label: "2026" },
    { value: 2027, label: "2027" },
    { value: 2028, label: "2028" },
    { value: 2029, label: "2029" },
    { value: 2030, label: "2030" },
    { value: 2031, label: "2031" },
    { value: 2032, label: "2032" },
    { value: 2033, label: "2033" },
    { value: 2034, label: "2034" },
  ];
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
  }, []);

  const logout = async () => {
    try {
      const response = await fetch(`http://localhost:3001/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      setWarningText({ severity: "success", label: "Logout" });
      navigate("/");
    } catch (error) {
      setWarningText({ severity: "error", label: error });
    }
    setShowAlert(true);
    window.location.reload();
  };

  const createEvent = async () => {
    try {
      const date = new Date(paymentInput?.eventDate);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = new Date(paymentInput.eventTime).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );
      const formData = new FormData();

      Object.entries(paymentInput).forEach(([key, value]) => {
        if (key !== "eventDate" && key !== "eventTime") {
          formData.append(key, value);
        }
      });

      formData.append("eventDate", formattedDate);
      formData.append("eventTime", formattedTime);
      formData.append("CreatedDate", new Date().toISOString().split("T")[0]);
      formData.append("userID", userData);

      Object.entries(reqImage).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        "http://localhost:3001/addevents/createEvent",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setWarningText({
          severity: "error",
          label: errorData.error,
        });
      } else {
        setWarningText({
          severity: "success",
          label: "Event inserted successfully",
        });
        logout();
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
    setPaymenInput([]);
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
      <br />
      <br />
      <div className={styles.mainAddEvent}>
        <h1>Create Event</h1>
        <div className={styles.priceLabel}>Fee for creating an event: 20$</div>
        <div className={styles.addEventActions}>
          <div className={styles.mainOverview}>
            <h3 className={styles.overview}>Overview</h3>
            <TextField
              label="Event Name"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventName: value.target.value,
                })
              }
              value={paymentInput.eventName || ""}
            />
            <TextField
              label="Event Description"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventDesc: value.target.value,
                })
              }
              value={paymentInput.eventDesc || ""}
            />
            <TextField
              label="Event Location"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventLocation: value.target.value,
                })
              }
              value={paymentInput.eventLocation || ""}
            />
            <TextField
              label="Event Link Location"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventLocationLink: value.target.value,
                })
              }
              value={paymentInput.eventLocationLink || ""}
            />
            <TextField
              label="Number of Tickets"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventTicket: value.target.value,
                })
              }
              value={paymentInput.eventTicket || ""}
            />
            <TextField
              label="Ticket Price"
              onChange={(value) =>
                setPaymenInput({
                  ...paymentInput,
                  eventPrice: value.target.value,
                })
              }
              value={paymentInput.eventPrice || ""}
            />
            <InputFile
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  setReqImage({
                    ...reqImage,
                    eventImage: file,
                  });
                }
              }}
              fileName={reqImage.eventImage?.name || ""}
            />
          </div>
          <div className={styles.mainScheduling}>
            <h3 className={styles.scheduling}>Scheduling</h3>
            <BasicDatePicker
              placeholder={"Pick a Date"}
              disablePast
              onChange={(value) =>
                setPaymenInput({ ...paymentInput, eventDate: value })
              }
              value={paymentInput.eventDate}
            />
            <BasicTimePicker
              placeholder={"Pick a Time"}
              onChange={(event) =>
                setPaymenInput({
                  ...paymentInput,
                  eventTime: event,
                })
              }
              value={paymentInput.eventTime}
            />

            <div className={styles.mainPayment}>
              <h3 className={styles.payments}>Payments</h3>
              <Dropdown
                options={paymentMethods}
                onChange={(value) =>
                  setPaymenInput({
                    ...paymentInput,
                    paymentType: value,
                  })
                }
                value={paymentInput.paymentType}
                nullable
                placeholder={"Payment Methods"}
              />
              {paymentInput.paymentType ? (
                <div className={styles.paymentInputs}>
                  <TextField
                    label="Card Number"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        cardNumber: value.target.value,
                      })
                    }
                    value={paymentInput.cardNumber || ""}
                  />
                  <div className={styles.paymentRow}>
                    <Dropdown
                      options={months}
                      onChange={(value) =>
                        setPaymenInput({
                          ...paymentInput,
                          cardMonth: value,
                        })
                      }
                      value={paymentInput.cardMonth}
                      nullable
                      placeholder={"Month"}
                    />

                    <Dropdown
                      options={years}
                      onChange={(value) =>
                        setPaymenInput({
                          ...paymentInput,
                          cardYear: value,
                        })
                      }
                      value={paymentInput.cardYear}
                      nullable
                      placeholder={"Year"}
                    />
                  </div>

                  <TextField
                    label="Card Holder"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        cardHolder: value.target.value,
                      })
                    }
                    value={paymentInput.cardHolder || ""}
                  />
                  <TextField
                    label="CVV2 Security Code"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        cvv2: value.target.value,
                      })
                    }
                    value={paymentInput.cvv2 || ""}
                  />
                </div>
              ) : null}
              <div className={styles.createBtn}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.checkoutButton}
                  onClick={() => setOpenDialog(true)}
                  disabled={userData == null ? true : false}
                >
                  Create
                </Button>
              </div>
              <div className={styles.note}>
                Note: Login first if you want to create an event
              </div>
              <AlertDialog
                title={"Create Event"}
                description={"Are you sure you want to create this event?"}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                CloseOnClick={() => setOpenDialog(false)}
                acceptLabel={"Accept"}
                closeLabel={"Cancel"}
                AcceptOnClick={createEvent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
