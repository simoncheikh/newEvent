import { useState } from "react";
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

export const AddEvent = () => {
  const [paymentInput, setPaymenInput] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [reqImage, setReqImage] = useState([]);

  const paymentMethods = [
    { value: 1, label: "Visa Card" },
    { value: 2, label: "Master Card" },
  ];

  const months = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: 4, label: "04" },
    { value: 5, label: "05" },
    { value: 6, label: "06" },
    { value: 7, label: "07" },
    { value: 8, label: "08" },
    { value: 9, label: "09" },
    { value: 10, label: "10" },
    { value: 11, label: "11" },
    { value: 12, label: "12" },
  ];

  const years = [
    { value: 1, label: "2023" },
    { value: 2, label: "2024" },
    { value: 3, label: "2025" },
    { value: 4, label: "2026" },
    { value: 5, label: "2027" },
    { value: 6, label: "2028" },
    { value: 7, label: "2029" },
    { value: 8, label: "2030" },
    { value: 9, label: "2031" },
    { value: 10, label: "2032" },
    { value: 11, label: "2033" },
    { value: 12, label: "2034" },
  ];

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setWarningText({
        severity: "success",
        label: "Event inserted successfully",
      });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
    setPaymenInput([]);
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
      <br />
      <br />
      <div className={styles.mainAddEvent}>
        <h1>Create Event</h1>
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
                >
                  Create
                </Button>
              </div>
              <div className={styles.note}>
                Note: Login first if you want to create an event
              </div>
              <AlertDialog
                title={"Create Event"}
                description={"Are you sure you wsnt to create this event?"}
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
