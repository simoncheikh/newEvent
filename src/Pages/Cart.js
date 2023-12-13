import { DownBar } from "../Components/DownBar";
import { TopBar } from "../Components/TopBar";
import styles from "../Styles/cart.module.css";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { Button, IconButton } from "@mui/material";
import { FormDialogue } from "../Components/FormDialogue";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Warning } from "../Components/Warning";
import AlertDialog from "../Components/Dialog";

export const Cart = () => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cartEvent, setCartEvent] = useState([]);
  const [usersID, setUsersID] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [numberTicket, setNumberTicket] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});

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
          setUsersID(data.userID);
          getCartEvent(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (editMode && cartEvent.length > 0) {
      setNumberTicket(cartEvent[0].orderQuantity);
    }
  }, [editMode, cartEvent]);

  const getCartEvent = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/getEvent/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCartEvent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const editQuantity = async (orderDetailsID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/editCart/${orderDetailsID}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderQuantity: numberTicket }),
        }
      );

      if (response.ok) {
        await getCartEvent(usersID);

        setWarningText({
          severity: "success",
          label: "Cart updated successfully.",
        });
        setShowEditDialog(false);
        setEditMode(false);
      } else {
        const errorData = await response.json();
        setWarningText({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
  };

  const deleteQuantity = async (orderDetailsID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/cart/delete/${orderDetailsID}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        await getCartEvent(usersID);

        setWarningText({
          severity: "success",
          label: "Cart Deleted successfully.",
        });
        setShowDeleteDialog(false);
        setEditMode(false);
      } else {
        const errorData = await response.json();
        setWarningText({ severity: "error", label: errorData.error });
      }
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
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
      <div className={styles.mainCart}>
        <div className={styles.cartTitle}>Your Cart</div>
        <div className={styles.mainCartRow}>
          {cartEvent.map((value) => (
            <div className={styles.cartRow} key={value.eventID}>
              {/* <img src={require(`../assets/${value.}`).image} className={styles.eventImage} /> */}
              <div className={styles.eventName}>{value.orderName}</div>
              {editMode == true ? (
                <div className={styles.increaseDecreaseButton}>
                  <button
                    type="submit"
                    className={styles.increaseButton}
                    onClick={() => setNumberTicket((prev) => prev + 1)}
                  >
                    <div className={styles.plusButton}>+</div>
                  </button>
                  <div type="number" className={styles.inputNumber}>
                    {numberTicket}
                  </div>
                  <button
                    type="submit"
                    disabled={numberTicket === 1}
                    className={styles.decreaseButton}
                    onClick={() =>
                      setNumberTicket((prev) => Math.max(prev - 1, 1))
                    }
                  >
                    <div className={styles.minusButton}>-</div>
                  </button>
                </div>
              ) : (
                <div className={styles.eventQuantity}>
                  x{value.orderQuantity}
                </div>
              )}
              <div className={styles.eventPrice}>{value.orderPrice}$</div>
              <div className={styles.eventTotal}>{value.orderTotalPrice}$</div>
              <div>
                <IconButton onClick={() => setEditMode(true)}>
                  <ModeEditIcon />
                </IconButton>
                <IconButton onClick={() => setShowDeleteDialog(true)}>
                  <DeleteIcon />
                </IconButton>

                {editMode == true && (
                  <>
                    <IconButton onClick={() => setEditMode(false)}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => setShowEditDialog(true)}>
                      <DoneIcon />
                    </IconButton>
                  </>
                )}
              </div>
            </div>
          ))}
          <AlertDialog
            description={`Are you sure you want to delete ${value.orderName} ?`}
            title={"Delete order"}
            acceptLabel={"Confirm"}
            closeLabel={"Cancel"}
            CloseOnClick={() => setShowDeleteDialog(false)}
            AcceptOnClick={() => deleteQuantity(value.order_detailsID)}
            open={showDeleteDialog}
          />
          <AlertDialog
            description={"Are you sure you want to edit?"}
            title={"Edit Quantity"}
            acceptLabel={"Confirm"}
            closeLabel={"Cancel"}
            CloseOnClick={() => setShowEditDialog(false)}
            AcceptOnClick={() => editQuantity(value.order_detailsID)}
            open={showEditDialog}
          />
        </div>
        <div className={styles.mainCheckout}>
          <div className={styles.checkoutRow}>
            <div className={styles.checkoutName}>SubTotal:</div>
            <div>100$</div>
          </div>
          <div className={styles.checkoutRow}>
            <div className={styles.checkoutName}>Sales Taxes{"(11%)"}:</div>
            <div>100$</div>
          </div>
          <div className={styles.checkoutRow}>
            <div className={styles.checkoutName}>Grand Total:</div>
            <div>100$</div>
          </div>
          <Link to={"/CheckOut"}>
            <Button variant="contained" color="secondary">
              Check Out
            </Button>
          </Link>
        </div>
      </div>
      {/* <DownBar /> */}
    </div>
  );
};
