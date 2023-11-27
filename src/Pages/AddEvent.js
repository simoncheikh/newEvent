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

export const AddEvent = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [monthOptions, setMonthOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [paymentInput, setPaymenInput] = useState([]);
  const [closeWarning, setCloseWarning] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
      </div>
      <br />
      <br />
      <br />
      <Warning
        onClick={() => setCloseWarning(false)}
        collapseIn={closeWarning}
      />
      <div className={styles.mainAddEvent}>
        <h1>Create Event</h1>
        <div className={styles.addEventActions}>
          <div className={styles.mainOverview}>
            <h3 className={styles.overview}>Overview</h3>
            <TextField label="Event Name" />
            <TextField label="Event Description" />
            <Dropdown placeholder={"Cities"} />
            <TextField label="Event Location" />
            <TextField label="Event Link Location" />
            <Dropdown placeholder={"Visibilities"} />
          </div>
          <div className={styles.mainScheduling}>
            <h3 className={styles.scheduling}>Scheduling</h3>
            <BasicDatePicker placeholder={"Pick a Date"} />
            <BasicTimePicker placeholder={"Pick a Time"} />
            <div className={styles.mainPayment}>
              <h3 className={styles.payments}>Payments</h3>
              <Dropdown
                options={paymentMethods}
                onChange={(e) => setPaymentOptions(e)}
                nullable
                placeholder={"Payment Methods"}
                value={paymentOptions || ""}
              />
              {paymentOptions == "" ? null : (
                <div className={styles.paymentInputs}>
                  <TextField
                    label="Card Number"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        CardNumber: value.target.value,
                      })
                    }
                    value={paymentInput.CardNumber || ""}
                  />
                  <div className={styles.paymentRow}>
                    <Dropdown
                      options={months}
                      onChange={(e) => setMonthOptions(e)}
                      nullable
                      placeholder={"Month"}
                      value={monthOptions || ""}
                    />

                    <Dropdown
                      options={years}
                      onChange={(e) => setYearOptions(e)}
                      nullable
                      placeholder={"Year"}
                      value={yearOptions || ""}
                    />
                  </div>

                  <TextField
                    label="Card Holder"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        CardHolder: value.target.value,
                      })
                    }
                    value={paymentInput.CardHolder || ""}
                  />
                  <TextField
                    label="CVV2 Security Code"
                    onChange={(value) =>
                      setPaymenInput({
                        ...paymentInput,
                        security: value.target.value,
                      })
                    }
                    value={paymentInput.security || ""}
                  />
                </div>
              )}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
