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
import { Link, useNavigate } from "react-router-dom";
import { Warning } from "../Components/Warning";
import AlertDialog from "../Components/Dialog";
import { useAuth } from "../AuthContext";

export const Cart = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [deleteDialogStates, setDeleteDialogStates] = useState({});
  const [cartEvent, setCartEvent] = useState([]);
  const [usersID, setUsersID] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [numberTicket, setNumberTicket] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [eventData, setEventData] = useState([]);

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
    getAllEvent();
  }, []);

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
    if (editMode && cartEvent.length > 0) {
      const initialQuantities = {};
      cartEvent.forEach((item) => {
        initialQuantities[item.order_detailsID] = item.orderQuantity;
      });
      setNumberTicket(initialQuantities);
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

  const getAllEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3001/event_getAll`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
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
          body: JSON.stringify({ orderQuantity: numberTicket[orderDetailsID] }),
        }
      );

      if (response.ok) {
        await getCartEvent(usersID);

        setWarningText({
          severity: "success",
          label: "Cart updated successfully.",
        });
        setShowDialog(false);
        setEditMode(false);
        setEditItemId(null);
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
        setShowDialog(false);
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
  const handleEditMode = (orderDetailsID) => {
    setEditMode(true);
    setEditItemId(orderDetailsID);
    setNumberTicket((prev) => ({
      ...prev,
      [orderDetailsID]:
        cartEvent.find((item) => item.order_detailsID === orderDetailsID)
          ?.orderQuantity || 1,
    }));
  };
  const openDeleteDialog = (orderDetailsID) => {
    setDeleteDialogStates((prev) => ({ ...prev, [orderDetailsID]: true }));
  };

  const closeDeleteDialog = (orderDetailsID) => {
    setDeleteDialogStates((prev) => ({ ...prev, [orderDetailsID]: false }));
  };

  const totalOrderPrice = cartEvent.reduce(
    (sum, order) => sum + order.orderTotalPrice,
    0
  );

  const totalQuantity = eventData.find((value) =>
    cartEvent.some((event) => event.eventID === value.eventID)
  )?.eventTicket;

  const increaseQuantity = (orderDetailsID) => {
    setNumberTicket((prev) => ({
      ...prev,
      [orderDetailsID]: Math.min(
        (prev[orderDetailsID] || 0) + 1,
        totalQuantity || 1
      ),
    }));
  };

  const decreaseQuantity = (orderDetailsID) => {
    setNumberTicket((prev) => ({
      ...prev,
      [orderDetailsID]: Math.max((prev[orderDetailsID] || 0) - 1, 1),
    }));
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
              <div className={styles.eventName}>{value.orderName}</div>
              {editMode && editItemId === value.order_detailsID ? (
                <div className={styles.increaseDecreaseButton}>
                  <button
                    type="submit"
                    className={styles.increaseButton}
                    onClick={() => increaseQuantity(value.order_detailsID)}
                  >
                    <div className={styles.plusButton}>+</div>
                  </button>
                  <div type="number" className={styles.inputNumber}>
                    {numberTicket[value.order_detailsID]}
                  </div>
                  <button
                    type="submit"
                    disabled={numberTicket[value.order_detailsID] === 1}
                    className={styles.decreaseButton}
                    onClick={() => decreaseQuantity(value.order_detailsID)}
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
                <IconButton
                  onClick={() => {
                    handleEditMode(value.order_detailsID);
                  }}
                >
                  <ModeEditIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    openDeleteDialog(value.order_detailsID);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <AlertDialog
                  description={`Are you sure you want to Delete ${value.orderName}`}
                  title={"Delete Order"}
                  acceptLabel={"Confirm"}
                  closeLabel={"Cancel"}
                  CloseOnClick={() => closeDeleteDialog(value.order_detailsID)}
                  AcceptOnClick={() => deleteQuantity(value.order_detailsID)}
                  open={deleteDialogStates[value.order_detailsID] || false}
                />
                {editMode && editItemId === value.order_detailsID && (
                  <>
                    <IconButton onClick={() => setEditMode(false)}>
                      <CloseIcon />
                    </IconButton>
                    <IconButton onClick={() => setShowDialog(true)}>
                      <DoneIcon />
                    </IconButton>
                    <AlertDialog
                      description={"Are you sure you want to edit?"}
                      title={"Edit Quantity"}
                      acceptLabel={"Confirm"}
                      closeLabel={"Cancel"}
                      CloseOnClick={() => setShowDialog(false)}
                      AcceptOnClick={() => editQuantity(value.order_detailsID)}
                      open={showDialog}
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.mainCheckout}>
          <div className={styles.checkoutRow}>
            <div className={styles.checkoutName}>Grand Total:</div>
            <div>{totalOrderPrice}$</div>
          </div>

          <Button
            variant="contained"
            color="secondary"
            disabled={cartEvent.length == 0 ? true : false}
          >
            <Link
              to={"/CheckOut"}
              className={styles.linkStyle}
              state={{
                orderID: cartEvent[0]?.orderID,
                userID: usersID,
                orderQuantity: cartEvent[0]?.orderQuantity,
                eventID: cartEvent[0]?.eventID,
              }}
            >
              Check Out
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
