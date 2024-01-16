import { useEffect, useState } from "react";
import { Warning } from "../../Components/Warning";
import { TopBar } from "../../Components/TopBar";
import styles from "../../Styles/order.module.css";
import { Table } from "../../Components/Table";
import { Button, IconButton, InputBase, Paper, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { FormDialogue } from "../../Components/FormDialogue";
import { Dropdown } from "../../Components/Dropdown";
import { BasicDatePicker } from "../../Components/BasicDatePicker";
import dayjs from "dayjs";
import AlertDialog from "../../Components/Dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const Order = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [receiptData, setReceiptData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editOrder, setEditOrder] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addOrder, setAddOrder] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePayment, setDeletePayment] = useState(null);
  const [userAll, setUserAll] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const columns = [
    {
      field: "orderName",
      headerName: "Order Name",
      width: 170,
    },
    {
      field: "orderPrice",
      headerName: "Price",
      width: 170,
    },
    {
      field: "orderQuantity",
      headerName: "Quantity",
      width: 170,
    },
    {
      field: "orderTotalPrice",
      headerName: "Total Price",
      width: 170,
    },
    {
      field: "eventID",
      headerName: "Event Name",
      width: 170,
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 170,
    },
    {
      field: "userID",
      headerName: "User Name",
      width: 170,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 170,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row?.orderID)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const paid = [{ value: 0, label: "Not Paid" }];

  const fetchData = async () => {
    try {
      const [userData, eventData] = await Promise.all([
        fetch("http://localhost:3001/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
        fetch("http://localhost:3001/event_getAll", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
      ]);

      setUserAll(userData);
      setEventData(eventData);
      getReceipt(userData, eventData);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-user-info", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          setUser(data);
          if (data?.type === 1) {
          } else {
            navigate("/SignIn");
          }
        } else {
          console.log("Authentication failed.");
          navigate("/SignIn");
          setUser(null);
        }
      } catch (error) {
        console.error("Check authentication error:", error);
      }
    };

    checkAuthentication();
  }, []);

  const orderEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/order/table/add`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...addOrder,
            orderTotalPrice:
              parseFloat(
                eventData.find((value) => value.eventID == addOrder.eventID)
                  ?.eventPrice
              ) * parseFloat(addOrder.orderQuantity),
            createdDate: formatDate(new Date()),
            orderName: evenDrop.find((value) => value.value == addOrder.eventID)
              ?.label,
            orderPrice: eventData.find(
              (value) => value.eventID == addOrder.eventID
            )?.eventPrice,
          }),
        }
      );
      window.location.reload()
      setWarningText({ severity: "success", label: "Event Added to Cart" });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
  };

  const updateOrder = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/order/table/edit`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editOrder,
            orderTotalPrice:
              parseFloat(
                eventData.find((value) => value.eventID == editOrder.eventID)
                  ?.eventPrice
              ) * parseFloat(editOrder.orderQuantity),
            orderName: evenDrop.find(
              (value) => value.value == editOrder.eventID
            )?.label,
          }),
        }
      );
      setWarningText({ severity: "success", label: "order Updated to Cart" });
      window.location.reload()
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
  };

  const getReceipt = async (userID, eventAll) => {
    try {
      const response = await fetch("http://localhost:3001/admin/order/table", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const receiptID = data.map((receipt) => ({
        ...receipt,
        id: receipt.orderID,
        userID: userID.find((user) => user.userID == receipt.userID)?.userName,
        eventID: eventAll.find((event) => event.eventID === receipt.eventID)
          ?.eventName,
        paid: paid.find((value) => value.value === receipt.paid)?.label,
      }));
      setReceiptData(receiptID);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  const deleteOrder = async (orderID) => {
    try {
      const respond = await fetch(
        "http://localhost:3001/admin/order/table/delete",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ orderID: orderID }),
        }
      );
      setWarningText({
        severity: "success",
        label: "Order Deleted Successfuly",
      });
      window.location.reload();
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);

    return `${year}-${month < 10 ? "0" : ""}${month}-${day}`;
  }

  const userDrop = userAll.map((value) => ({
    value: value.userID,
    label: value.userName,
  }));

  const evenDrop = eventData.map((value) => ({
    value: value.eventID,
    label: value.eventName,
  }));

  const handleDelete = (orderID) => {
    setOpenDeleteDialog(true);
    setDeletePayment(orderID);
  };

  const handleEdit = (row) => {
    setEditOrder({
      eventID: evenDrop.find((e) => e.label === row.eventID)?.value,
      userID: userDrop.find((e) => e.label === row.userID)?.value,
      orderPrice: row.orderPrice,
      orderQuantity: row.orderQuantity,
      orderID: row.orderID,
    });
    setOpenDialog(true);
  };

  const filteredRows = receiptData.filter((payment) => {
    const {
      paid,
      eventID,
      userID,
      orderName,
      orderPrice,
      orderTotalPrice,
      orderQuantity
    } = payment;
  
    const searchTerm = searchValue.toLowerCase();
  
    const includesSearchTerm = (value) => {
      return typeof value === 'string' && value.toLowerCase().includes(searchTerm);
    };
  
    return (
      includesSearchTerm(eventID) ||
      includesSearchTerm(userID) ||
      includesSearchTerm(paid) ||
      includesSearchTerm(orderName) ||
      includesSearchTerm(orderPrice) ||
      includesSearchTerm(orderTotalPrice) ||
      includesSearchTerm(orderQuantity)
    );
  });
  
  
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
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className={styles.mainPageContainer}>
        <h1 className={styles.mainTitle}>Orders Table</h1>
        <div className={styles.mainAddUserBtn}>
          <Button
            className={styles.addUserbtn}
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Order
          </Button>
        </div>
        <div className={styles.searchBar}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "Search Table" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <Table rows={filteredRows} columns={columns} />
      </div>
      <FormDialogue
        show={openDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Edit Payment"}
        onClose={() => setOpenDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={updateOrder}
      >
        <div className={styles.dialogueContainer}>
          <Dropdown
            placeholder={"Events"}
            options={evenDrop}
            onChange={(value) => setEditOrder({ ...editOrder, eventID: value })}
            value={editOrder.eventID}
            nullable
          />
          <TextField
            placeholder="Quantity"
            onChange={(e) =>
              setEditOrder({ ...editOrder, orderQuantity: e.target.value })
            }
            value={editOrder.orderQuantity || ""}
          />
          <Dropdown
            placeholder={"Users"}
            options={userDrop}
            onChange={(value) => setEditOrder({ ...editOrder, userID: value })}
            value={editOrder.userID}
            nullable
          />
        </div>
      </FormDialogue>
      <FormDialogue
        show={openAddDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Add Receipt"}
        onClose={() => setOpenAddDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={orderEvent}
      >
        <div className={styles.dialogueContainer}>
          <Dropdown
            placeholder={"Events"}
            options={evenDrop}
            onChange={(value) => setAddOrder({ ...addOrder, eventID: value })}
            value={addOrder.eventID}
            nullable
          />
          <TextField
            placeholder="Quantity"
            onChange={(e) =>
              setAddOrder({ ...addOrder, orderQuantity: e.target.value })
            }
            value={addOrder.orderQuantity || ""}
          />
          <Dropdown
            placeholder={"Users"}
            options={userDrop}
            onChange={(value) => setAddOrder({ ...addOrder, userID: value })}
            value={addOrder.userID}
            nullable
          />
        </div>
      </FormDialogue>
      <AlertDialog
        open={openDeleteDialog}
        AcceptOnClick={() => deleteOrder(deletePayment)}
        acceptLabel={"Confirm"}
        closeLabel={"Close"}
        description={"Are you sure you want to Delete?"}
        title={"Delete User"}
        CloseOnClick={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};
