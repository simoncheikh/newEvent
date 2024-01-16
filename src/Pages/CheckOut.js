import { Button, TextField } from "@mui/material";
import styles from "../Styles/checkOut.module.css";
import { Dropdown } from "../Components/Dropdown";
import AlertDialog from "../Components/Dialog";
import { useEffect, useRef, useState } from "react";
import { TopBar } from "../Components/TopBar";
import { Warning } from "../Components/Warning";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import emailjs from "@emailjs/browser";
import bwipjs from "bwip-js";

export const CheckOut = () => {
  const [paymentInput, setPaymenInput] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [userData, setUserData] = useState([]);
  const [tickeQuantity, setTicketQuantity] = useState([]);
  const navigate = useNavigate();

  const navigation = useLocation();
  useEffect(() => {
    if (!navigation.state?.orderID || !navigation.state?.userID) {
      navigate("/");
    }
  }, [navigation, navigate]);

  const { orderID, userID, orderQuantity, eventID } = navigation.state ?? {};

  // console.log(orderQuantity, eventID);

  // console.log(
  //   tickeQuantity.find((value) => value.eventID == eventID)?.eventTicket -
  //     orderQuantity
  // );

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
          getUserInfo(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
    getAllTicket();
  }, []);

  const getUserInfo = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/userDetails/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserData(...data);
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

  const getAllTicket = async () => {
    try {
      const response = await fetch(`http://localhost:3001/ticketLeft`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTicketQuantity(data);
    } catch (error) {
      console.error("Error fetching userID:", error);
    }
  };

  const inserPayment = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/method_payment`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...paymentInput,
            orderID: orderID,
            userID: userID,
            cardYear: paymentInput.cardYear?.toString(),
            paymentFor: 1,
            eventTicket:
              tickeQuantity.find((value) => value.eventID == eventID)
                ?.eventTicket - orderQuantity,
            eventID: eventID,
          }),
        }
      );
      if (response.ok) {
        setWarningText({
          severity: "success",
          label: "Payment inserted successfully",
        });
        sendEmail();
        navigate("/");
      } else {
        const errorData = await response.json();
        setWarningText({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
    setOpenDialog(false);
    setPaymenInput([]);
  };

  const sendEmail = () => {
    const serviceID = "service_akd5ugg";
    const templateID = "template_ae2fl4k";
    const userID = "ORaa2ocgdQPiEGdjP";

    const templateParams = {
      to_email: userData.email,
      to_name: userData.userName,
      from_name: "Lebanon Luxe",
      message: "Your Ticket successfully Bought",
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log("Email sent:", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
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
        <h1>Check Out</h1>
        <div className={styles.addEventActions}>
          <div className={styles.mainScheduling}>
            <div className={styles.mainPayment}>
              <Dropdown
                options={paymentMethods}
                onChange={(value) =>
                  setPaymenInput({ ...paymentInput, paymentType: value })
                }
                nullable
                placeholder={"Payment Methods"}
                value={paymentInput.paymentType || ""}
              />
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
                      setPaymenInput({ ...paymentInput, cardMonth: value })
                    }
                    nullable
                    placeholder={"Month"}
                    value={paymentInput.cardMonth || ""}
                  />

                  <Dropdown
                    options={years}
                    onChange={(value) =>
                      setPaymenInput({ ...paymentInput, cardYear: value })
                    }
                    nullable
                    placeholder={"Year"}
                    value={paymentInput.cardYear}
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
              <div className={styles.createBtn}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={styles.checkoutButton}
                  onClick={() => setOpenDialog(true)}
                >
                  Proceed
                </Button>
              </div>
              <AlertDialog
                title={"Check Payment"}
                description={"Are you sure you want to Proceed?"}
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                CloseOnClick={() => setOpenDialog(false)}
                acceptLabel={"Accept"}
                closeLabel={"Cancel"}
                AcceptOnClick={inserPayment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
