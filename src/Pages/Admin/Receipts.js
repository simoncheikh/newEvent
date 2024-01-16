import { useEffect, useState } from "react";
import { Warning } from "../../Components/Warning";
import { TopBar } from "../../Components/TopBar";
import styles from "../../Styles/receipt.module.css";
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
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

export const Receipt = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [receiptData, setReceiptData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editReceipt, setEditReceipt] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addReceipt, setAddReceipt] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePayment, setDeletePayment] = useState(null);
  const [userAll, setUserAll] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);

  const columns = [
    {
      field: "userID",
      headerName: "User Name",
      width: 400,
    },
    {
      field: "eventID",
      headerName: "Event Name",
      width: 400,
    },
    {
      field: "paid",
      headerName: "Paid",
      width: 400,
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

  const navigate = useNavigate();

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

  const paid = [
    { value: 0, label: "Not Paid" },
    { value: 1, label: "Paid" },
  ];

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

  const getReceipt = async (userID, eventAll) => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/ticket_receipt/table",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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

  const userDrop = userAll.map((value) => ({
    value: value.userID,
    label: value.userName,
  }));

  const evenDrop = eventData.map((value) => ({
    value: value.eventID,
    label: value.eventName,
  }));

  const handleDelete = (paymentID) => {
    setOpenDeleteDialog(true);
    setDeletePayment(paymentID);
  };

  const handleEdit = (row) => {
    setEditReceipt({
      paid: paid.find((value) => value.value === row.paid)?.label,
      orderID: row.orderID,
    });
    setOpenDialog(true);
  };

  const filteredRows = receiptData.filter((payment) => {
    const { paid, eventID, userID } = payment;

    return (
      eventID.toLowerCase().includes(searchValue.toLowerCase()) ||
      userID.toLowerCase().includes(searchValue.toLowerCase()) ||
      paid.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  // const CreateReceipt = async () => {
  //   try {
  //     const response = await fetch("/admin/ticket_receipt/table/add", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ...addReceipt,
  //       }),
  //     });
  //     if (response.ok) {
  //       const successMessage = await response.text();
  //       setWarningText({
  //         severity: "success",
  //         label: successMessage,
  //       });
  //     } else {
  //       const errorMessage = await response.json();
  //       console.log(errorMessage.error);
  //       setWarningText({
  //         severity: "error",
  //         label: errorMessage.error,
  //       });
  //     }
  //   } catch (error) {
  //     setWarningText({
  //       severity: "error",
  //       label: error,
  //     });
  //   }
  // };

  const updateReceipt = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/ticket_receipt/table/edit",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editReceipt),
        }
      );
      if (response.ok) {
        setWarningText({
          severity: "success",
          label: "Receipt updated Successfully",
        });
      } else {
        const errorMessage = await response.json();
        setWarningText({
          severity: "error",
          label: errorMessage.error,
        });
      }
      window.location.reload();
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error,
      });
    }
    setShowAlert(true);
  };

  const deleteOrder = async (orderID) => {
    try {
      const respond = await fetch(
        "http://localhost:3001/admin/ticket_receipt/table/edit",
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
        label: "Receipt Deleted Successfuly",
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
        <h1 className={styles.mainTitle}>Receipt Tickets Table</h1>
        {/* <div className={styles.mainAddUserBtn}>
          <Button
            className={styles.addUserbtn}
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Receipt
          </Button>
        </div> */}
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
        onAccept={updateReceipt}
      >
        <div className={styles.dialogueContainer}>
          <Dropdown
            placeholder={"Paid"}
            options={paid}
            onChange={(value) =>
              setEditReceipt({ ...editReceipt, paid: value })
            }
            value={editReceipt.paid}
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
