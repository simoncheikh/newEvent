import styles from "../../Styles/users.module.css";
import { useEffect, useState } from "react";
import { TopBar } from "../../Components/TopBar";
import { Warning } from "../../Components/Warning";
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

export const MethodPaymentEvent = ({ setWarningText, setShowAlert }) => {
  const [searchValue, setSearchValue] = useState("");
  const [methodData, setMethodData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMethod, setEditMethod] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addMethod, setAddMethod] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deletePayment, setDeletePayment] = useState(null);
  const [userAll, setUserAll] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [user, setUser] = useState(null);

  const paymentFor = [
    { value: 2, label: "No Promoted Event" },
    { value: 3, label: "Promoted Event" },
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

  const getEventPayment = async (userID, eventAll) => {
    try {
      const response = await fetch(
        `http://localhost:3001/admin/method_payment/methodTable`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const methodWithId = data.map((method) => ({
        ...method,
        id: method.paymentID,
        paymentType: paymentType.find((row) => row.value === method.paymentType)
          ?.label,
        paymentFor: paymentFor.find((row) => row.value === method.paymentFor)
          ?.label,
        userID: userID.find((user) => user.userID == method.userID)?.userName,
        eventID: eventAll.find((event) => event.eventID == method.eventID)
          ?.eventName,
      }));
      // console.log(data)
      setMethodData(methodWithId);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  const fetchData = async () => {
    try {
      const [userData, orderData, eventData] = await Promise.all([
        fetch("http://localhost:3001/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()),
        fetch("http://localhost:3001/admin/method_Payment/orderAll", {
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
      setOrderData(orderData);
      setEventData(eventData);

      getEventPayment(userData, eventData);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  const eventDrop = eventData.map((value) => ({
    value: value.eventID,
    label: value.eventName,
  }));

  const userDrop = userAll.map((value) => ({
    value: value.userID,
    label: value.userName,
  }));

  const paymentType = [
    { value: 1, label: "VISA CARD" },
    { value: 2, label: "MASTER CARD" },
  ];

  const updateMethod = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/method_payment/methodTable/editEventMethod",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editMethod),
        }
      );

      if (response.ok) {
        const successMessage = await response.text();
        setWarningText({
          severity: "success",
          label: successMessage,
        });
        window.location.reload();
      } else {
        const errorMessage = await response.text();
        setWarningText({
          severity: "error",
          label: errorMessage,
        });
      }
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
  };
  const AddMethod = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/method_payment/methodTable/addEventMethod",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addMethod),
        }
      );

      if (response.ok) {
        const successMessage = await response.text();
        setWarningText({
          severity: "success",
          label: successMessage,
        });
      } else {
        const errorMessage = await response.json();
        console.log(errorMessage.error);
        setWarningText({
          severity: "error",
          label: errorMessage.error,
        });
      }
        window.location.reload();
    } catch (error) {
      console.log(error);
      setWarningText({
        severity: "error",
        label: error,
      });
    }
    setShowAlert(true);
  };

  const deleteUser = async (paymentID) => {
    try {
      const respond = await fetch(
        "http://localhost:3001/admin/method_payment/methodTable/deletePayment",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ paymentID: paymentID }),
        }
      );
      setWarningText({
        severity: "success",
        label: "Payment Deleted Successfuly",
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

  const columns = [
    {
      field: "paymentType",
      headerName: "Payment Type",
      width: 170,
    },
    {
      field: "cardNumber",
      headerName: "Card Number",
      width: 170,
    },
    {
      field: "cardMonth",
      headerName: "Card Month",
      width: 170,
    },
    {
      field: "cardYear",
      headerName: "Card Year",
      width: 170,
    },
    {
      field: "cvv2",
      headerName: "CVV2",
      width: 170,
    },
    {
      field: "eventID",
      headerName: "Event",
      width: 170,
    },
    {
      field: "userID",
      headerName: "User Name",
      width: 170,
    },
    {
      field: "paymentFor",
      headerName: "Payment For",
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
          <IconButton onClick={() => handleDelete(params.row?.paymentID)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDelete = (paymentID) => {
    setOpenDeleteDialog(true);
    setDeletePayment(paymentID);
  };

  const handleEdit = (row) => {
    setEditMethod({
      eventID: eventDrop.find((e) => e.label === row.eventID)?.value,
      paymentFor: paymentFor.find((p) => p.label === row.paymentFor)?.value,
      userID: userDrop.find((e) => e.label === row.userID)?.value,
      paymentID: row.paymentID,
    });
    setOpenDialog(true);
  };

  const filteredRows = methodData.filter((payment) => {
    const {
      paymentType,
      paymentFor,
      cardNumber,
      cardMonth,
      cardYear,
      cardHolder,
      cvv2,
      eventID,
      userID,
    } = payment;

    return (
      paymentType.toLowerCase().includes(searchValue.toLowerCase()) ||
      paymentFor.toLowerCase().includes(searchValue.toLowerCase()) ||
      cardNumber.toLowerCase().includes(searchValue.toLowerCase()) ||
      cardMonth.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
      cardYear.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
      cardHolder.toLowerCase().includes(searchValue.toLowerCase()) ||
      cvv2.toLowerCase().includes(searchValue.toLowerCase()) ||
      eventID.toLowerCase().includes(searchValue.toLowerCase()) ||
      userID.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <>
      <div>
        <div className={styles.mainAddUserBtn}>
          <Button
            className={styles.addUserbtn}
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Event Payment
          </Button>
        </div>
        <div
          className={styles.searchBar}
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h2 style={{ color: "#161855" }}>Event Table</h2>
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
        dialogueTitle={"Edit Event Payment"}
        onClose={() => setOpenDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={updateMethod}
      >
        <div className={styles.dialogueContainer}>
          <Dropdown
            placeholder={"Event"}
            options={eventDrop}
            onChange={(value) =>
              setEditMethod({ ...editMethod, eventID: value })
            }
            value={editMethod.eventID}
            nullable
          />
          <Dropdown
            placeholder={"Payment For"}
            options={paymentFor}
            onChange={(value) =>
              setEditMethod({ ...editMethod, paymentFor: value })
            }
            value={editMethod.paymentFor}
            nullable
          />
          <Dropdown
            placeholder={"Users"}
            options={userDrop}
            onChange={(value) =>
              setEditMethod({ ...editMethod, userID: value })
            }
            value={editMethod.userID}
            nullable
          />
        </div>
      </FormDialogue>
      <FormDialogue
        show={openAddDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Add Event Payment"}
        onClose={() => setOpenAddDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={AddMethod}
      >
        <div className={styles.dialogueContainer}>
          <Dropdown
            placeholder={"Payment Type"}
            options={paymentType}
            onChange={(value) =>
              setAddMethod({ ...addMethod, paymentType: value })
            }
            value={addMethod.paymentType}
            nullable
          />
          <TextField
            variant="outlined"
            label="Card Number"
            onChange={(e) =>
              setAddMethod({ ...addMethod, cardNumber: e.target.value })
            }
            value={addMethod.cardNumber || ""}
            size="small"
            fullWidth
          />
          <Dropdown
            placeholder={"Card Month"}
            options={months}
            onChange={(value) =>
              setAddMethod({ ...addMethod, cardMonth: value })
            }
            value={addMethod.cardMonth}
            nullable
          />
          <Dropdown
            placeholder={"Card Year"}
            options={years}
            onChange={(value) =>
              setAddMethod({ ...addMethod, cardYear: value })
            }
            value={addMethod.cardYear}
            nullable
          />
          <TextField
            variant="outlined"
            label="Card Holder"
            onChange={(e) =>
              setAddMethod({ ...addMethod, cardHolder: e.target.value })
            }
            value={addMethod.cardHolder || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="CVV2"
            onChange={(e) =>
              setAddMethod({ ...addMethod, cvv2: e.target.value })
            }
            value={addMethod.cvv2 || ""}
            size="small"
            fullWidth
          />
          <Dropdown
            placeholder={"Event"}
            options={eventDrop}
            onChange={(value) => setAddMethod({ ...addMethod, eventID: value })}
            value={addMethod.eventID}
            nullable
          />
          <Dropdown
            placeholder={"Payment For"}
            options={paymentFor}
            onChange={(value) =>
              setAddMethod({ ...addMethod, paymentFor: value })
            }
            value={addMethod.paymentFor}
            nullable
          />
          <Dropdown
            placeholder={"Users"}
            options={userDrop}
            onChange={(value) => setAddMethod({ ...addMethod, userID: value })}
            value={addMethod.userID}
            nullable
          />
        </div>
      </FormDialogue>
      <AlertDialog
        open={openDeleteDialog}
        AcceptOnClick={() => deleteUser(deletePayment)}
        acceptLabel={"Confirm"}
        closeLabel={"Close"}
        description={"Are you sure you want to Delete?"}
        title={"Delete User"}
        CloseOnClick={() => setOpenDeleteDialog(false)}
      />
    </>
  );
};
