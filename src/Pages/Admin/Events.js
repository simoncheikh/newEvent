import { useEffect, useState } from "react";
import { TopBar } from "../../Components/TopBar";
import { Warning } from "../../Components/Warning";
import styles from "../../Styles/eventsAdmin.module.css";
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
import BasicTimePicker from "../../Components/BasicTimePicker";
import InputFile from "../../Components/InputFile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const Events = () => {
  const [searchValue, setSearchValue] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [eventData, setEventData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editEvent, setEditEvent] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addEvent, setAddEvent] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUserID, setDeleteUserID] = useState(null);
  const [reqImage, setReqImage] = useState([]);
  const [userAll, setUserAll] = useState([]);
  const [user, setUser] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [imageID, setImageID] = useState(null);
  const [openImageDialog, setOpenImageDialog] = useState(false);

  const promoted = [
    { value: 0, label: "Not Promoted" },
    { value: 1, label: "Promoted" },
  ];
  const paymentMethods = [
    { value: 1, label: "Visa Card" },
    { value: 2, label: "Master Card" },
  ];
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:3001/user", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserAll(data);
        getEvent(data);
      } catch (error) {
        setWarningText({
          severity: "error",
          label: error.message,
        });
      }
    };
    getUser();
  }, []);

  const userDrop = userAll.map((value) => ({
    value: value.userID,
    label: value.userName,
  }));

  const getEvent = async (userName) => {
    try {
      const response = await fetch(`http://localhost:3001/event_getAll`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const eventDataWithId = data.map((event) => ({
        ...event,
        id: event.eventID,
        promoted: promoted.find((row) => row.value === event.Promoted)?.label,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
        CreatedDate: new Date(event.CreatedDate).toLocaleDateString(),
        userID: userName.find((user) => user.userID == event.userID)?.userName,
      }));

      setEventData(eventDataWithId);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  const updateEvent = async () => {
    try {
      const date = new Date(editEvent?.eventDate);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = new Date(editEvent?.eventTime).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );
      // const formData = new FormData();
      // Object.entries(editEvent).forEach(([key, value]) => {
      //   if (key !== "eventDate" && key !== "eventTime") {
      //     formData.append(key, value);
      //   }
      // });

      const response = await fetch(
        "http://localhost:3001/admin/table_event/updateEvent",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...editEvent,
            eventTime: formattedTime,
            eventDate: formattedDate,
            CreatedDate: new Date().toISOString().split("T")[0],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setWarningText({
        severity: "success",
        label: "Event updated successfully",
      });
      window.location.reload();
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
    setAddEvent([]);
  };

  const createEvent = async () => {
    try {
      const date = new Date(addEvent?.eventDate);
      const formattedDate = date.toISOString().split("T")[0];
      const formattedTime = new Date(addEvent?.eventTime).toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );
      const formData = new FormData();
      Object.entries(addEvent).forEach(([key, value]) => {
        if (key !== "eventDate" && key !== "eventTime") {
          formData.append(key, value);
        }
      });

      formData.append("eventDate", formattedDate);
      formData.append("eventTime", formattedTime);
      formData.append("CreatedDate", new Date().toISOString().split("T")[0]);

      Object.entries(editEvent).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        "http://localhost:3001/admin/table_event/createEvent",
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
    setAddEvent([]);
  };

  const updateEventImage = async () => {
    try {
      const formData = new FormData();
      formData.append('eventImage', imageData.eventImage); 
      formData.append('eventID', imageID); 
  
      const response = await fetch(
        "http://localhost:3001/admin/table_event/updateImage",
        {
          method: "PATCH",
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
  
      setWarningText({
        severity: "success",
        label: "Event Updated successfully",
      });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenImageDialog(false);
  };

  const deleteUser = async (userID) => {
    try {
      const respond = await fetch(
        "http://localhost:3001/event/admin/delete",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eventID: userID }),
        }
      );
      setWarningText({
        severity: "success",
        label: "User Deleted Successfuly",
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
      field: "eventName",
      headerName: "Event Name",
      width: 170,
    },
    {
      field: "eventDesc",
      headerName: "Event Desc",
      width: 170,
    },
    {
      field: "eventPrice",
      headerName: "Event Price",
      width: 170,
    },
    {
      field: "eventImage",
      headerName: "Event Image",
      width: 170,
    },
    {
      field: "eventLocation",
      headerName: "Event Location",
      width: 170,
    },
    {
      field: "eventLocationLink",
      headerName: "Event Location Link",
      width: 170,
    },
    {
      field: "eventDate",
      headerName: "Event Date",
      width: 170,
    },
    {
      field: "eventTime",
      headerName: "Event Time",
      width: 170,
    },
    {
      field: "eventTicket",
      headerName: "Event Ticket",
      width: 170,
    },
    {
      field: "promoted",
      headerName: "Promoted",
      width: 170,
      renderCell: (params) => <span>{params.value}</span>,
    },
    {
      field: "CreatedDate",
      headerName: "Created Date",
      width: 170,
    },
    {
      field: "userID",
      headerName: "User",
      width: 170,
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEdit(params.row)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row?.eventID)}>
            <DeleteIcon />
          </IconButton>
          <Button onClick={() => handleImage(params.row?.eventID)}>
            Update Image
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (userID) => {
    setOpenDeleteDialog(true);
    setDeleteUserID(userID);
  };

  const handleEdit = (row) => {
    setEditEvent({
      eventID: row.eventID,
      eventName: row.eventName,
      eventDesc: row.eventDesc,
      eventPrice: row.eventPrice,
      eventImage: row.eventImage,
      eventLocation: row.eventLocation,
      eventLocationLink: row.eventLocationLink,
      eventDate: row.eventDate,
      eventTime: dayjs(row.eventTime, "HH:mm:ss").toDate(),
      eventTicket: row.eventTicket,
      Promoted: promoted.find((g) => g.value === row.Promoted)?.value,
      userID: userAll.find((r) => r.userName == row.userID)?.userID,
    });

    setOpenDialog(true);
  };

  const handleImage = (eventID) => {
    setOpenImageDialog(true);
    setImageID(eventID);
  };

  const filteredRows = eventData.filter((event) => {
    return (
      (event.eventName &&
        event.eventName.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.Promoted &&
        event.Promoted.toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (event.eventDate &&
        event.eventDate.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.eventTime &&
        event.eventTime.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.eventDesc &&
        event.eventDesc.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.eventLocationLink &&
        event.eventLocationLink
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (event.eventLocation &&
        event.eventLocation
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (event.CreatedDate &&
        event.CreatedDate.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.eventPrice &&
        event.eventPrice.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.eventTicket &&
        event.eventTicket
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase())) ||
      (event.eventImage &&
        event.eventImage.toLowerCase().includes(searchValue.toLowerCase())) ||
      (event.userID &&
        event.userID.toLowerCase().includes(searchValue.toLowerCase()))
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
        <h1 className={styles.mainTitle}>Events Table</h1>
        <div className={styles.mainAddUserBtn}>
          <Button
            className={styles.addUserbtn}
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
          >
            Add Event
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
        dialogueTitle={"Edit Event"}
        onClose={() => setOpenDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={updateEvent}
      >
        <div className={styles.dialogueContainer}>
          <>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="First Name"
                onChange={(e) =>
                  setEditEvent({ ...editEvent, eventName: e.target.value })
                }
                value={editEvent.eventName || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Last Name"
                onChange={(e) =>
                  setEditEvent({ ...editEvent, eventDesc: e.target.value })
                }
                value={editEvent.eventDesc || ""}
                size="small"
                fullWidth
              />
            </div>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="Email"
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    eventLocation: e.target.value,
                  })
                }
                value={editEvent.eventLocation || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Event Location Link"
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    eventLocationLink: e.target.value,
                  })
                }
                value={editEvent.eventLocationLink || ""}
                size="small"
                fullWidth
              />
            </div>
            <div className={styles.addRowContainer}>
              <div className={styles.addRowContainer}>
                <BasicTimePicker
                  placeholder={"Event Time"}
                  onChange={(value) =>
                    setEditEvent({ ...editEvent, eventTime: value })
                  }
                  value={editEvent.eventTime}
                  width={"50%"}
                />
                <BasicDatePicker
                  placeholder={"Event Date"}
                  onChange={(value) =>
                    setEditEvent({ ...editEvent, eventDate: value })
                  }
                  value={dayjs(editEvent.eventDate)}
                  width="50%"
                />
              </div>
            </div>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="Ticket"
                onChange={(e) =>
                  setEditEvent({ ...editEvent, eventTicket: e.target.value })
                }
                value={editEvent.eventTicket || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Event Price"
                onChange={(e) =>
                  setEditEvent({ ...editEvent, eventPrice: e.target.value })
                }
                value={editEvent.eventPrice || ""}
                size="small"
                fullWidth
              />
            </div>
            <div className={styles.addRowContainer}>
              <Dropdown
                placeholder={"Promoted"}
                options={promoted}
                onChange={(value) =>
                  setEditEvent({ ...editEvent, Promoted: value })
                }
                value={editEvent.Promoted}
                nullable
              />
              <Dropdown
                placeholder={"User"}
                options={userDrop}
                onChange={(value) =>
                  setEditEvent({ ...editEvent, userID: value })
                }
                value={editEvent.userID}
                nullable
              />
            </div>
            {/* <div
              className={styles.addRowContainer}
              style={{ justifyContent: "space-between" }}
            >
              <InputFile
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    setEditEvent({
                      ...editEvent,
                      eventImage: file,
                    });
                  }
                }}
                fileName={editEvent.eventImage?.name || ""}
              />
            </div> */}
          </>
        </div>
      </FormDialogue>
      <FormDialogue
        show={openAddDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Add Event"}
        onClose={() => setOpenAddDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={createEvent}
      >
        <div className={styles.dialogueContainer}>
          <>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="Event Name"
                onChange={(e) =>
                  setAddEvent({ ...addEvent, eventName: e.target.value })
                }
                value={addEvent.eventName || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Event Description"
                onChange={(e) =>
                  setAddEvent({ ...addEvent, eventDesc: e.target.value })
                }
                value={addEvent.eventDesc || ""}
                size="small"
                fullWidth
              />
            </div>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="Event Location"
                onChange={(e) =>
                  setAddEvent({ ...addEvent, eventLocation: e.target.value })
                }
                value={addEvent.eventLocation || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Event Location Link"
                onChange={(e) =>
                  setAddEvent({
                    ...addEvent,
                    eventLocationLink: e.target.value,
                  })
                }
                value={addEvent.eventLocationLink || ""}
                size="small"
                fullWidth
              />
            </div>

            <div className={styles.addRowContainer}>
              <BasicTimePicker
                placeholder={"Event Time"}
                onChange={(value) =>
                  setAddEvent({ ...addEvent, eventTime: value })
                }
                value={addEvent.eventTime}
                width={"50%"}
              />
              <BasicDatePicker
                placeholder={"Event Date"}
                onChange={(value) =>
                  setAddEvent({ ...addEvent, eventDate: value })
                }
                value={dayjs(addEvent.eventDate)}
                width="50%"
              />
            </div>
            <div className={styles.addRowContainer}>
              <TextField
                variant="outlined"
                label="Ticket"
                onChange={(e) =>
                  setAddEvent({ ...addEvent, eventTicket: e.target.value })
                }
                value={addEvent.eventTicket || ""}
                size="small"
                fullWidth
              />
              <TextField
                variant="outlined"
                label="Event Price"
                onChange={(e) =>
                  setAddEvent({ ...addEvent, eventPrice: e.target.value })
                }
                value={addEvent.eventPrice || ""}
                size="small"
                fullWidth
              />
            </div>
            <div className={styles.addRowContainer}>
              <Dropdown
                placeholder={"Promoted"}
                options={promoted}
                onChange={(value) =>
                  setAddEvent({ ...addEvent, Promoted: value })
                }
                value={addEvent.Promoted}
                nullable
              />
              <Dropdown
                placeholder={"User"}
                options={userDrop}
                onChange={(value) =>
                  setAddEvent({ ...addEvent, userID: value })
                }
                value={addEvent.userID}
                nullable
              />
            </div>
            <div
              className={styles.addRowContainer}
              style={{ justifyContent: "space-between" }}
            >
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
          </>
          {/* <div className={styles.mainPayment}>
              <IconButton
                onClick={() => setNextBtn(false)}
                className={styles.arrowBack}
              >
                <ArrowBackIcon />
              </IconButton>
              <Dropdown
                options={paymentMethods}
                onChange={(value) =>
                  setAddEvent({
                    ...addEvent,
                    paymentType: value,
                  })
                }
                value={addEvent.paymentType}
                nullable
                placeholder={"Payment Methods"}
              />
              {addEvent.paymentType ? (
                <div className={styles.paymentInputs}>
                  <TextField
                    label="Card Number"
                    onChange={(value) =>
                      setAddEvent({
                        ...addEvent,
                        cardNumber: value.target.value,
                      })
                    }
                    value={addEvent.cardNumber || ""}
                  />
                  <div className={styles.paymentRow}>
                    <Dropdown
                      options={months}
                      onChange={(value) =>
                        setAddEvent({
                          ...addEvent,
                          cardMonth: value,
                        })
                      }
                      value={addEvent.cardMonth}
                      nullable
                      placeholder={"Month"}
                    />

                    <Dropdown
                      options={years}
                      onChange={(value) =>
                        setAddEvent({
                          ...addEvent,
                          cardYear: value,
                        })
                      }
                      value={addEvent.cardYear}
                      nullable
                      placeholder={"Year"}
                    />
                  </div>

                  <TextField
                    label="Card Holder"
                    onChange={(value) =>
                      setAddEvent({
                        ...addEvent,
                        cardHolder: value.target.value,
                      })
                    }
                    value={addEvent.cardHolder || ""}
                  />
                  <TextField
                    label="CVV2 Security Code"
                    onChange={(value) =>
                      setAddEvent({
                        ...addEvent,
                        cvv2: value.target.value,
                      })
                    }
                    value={addEvent.cvv2 || ""}
                  />
                </div>
              ) : null}
            </div> */}
        </div>
      </FormDialogue>
      <FormDialogue
        show={openImageDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Update Event"}
        onClose={() => setOpenImageDialog(false)}
        titleStyle={{ height: "100px" }}
        fullwidth={"100%"}
        onAccept={updateEventImage}
      >
        <div
          className={styles.addRowContainer}
          style={{ justifyContent: "center" }}
        >
          <InputFile
            onChange={(event) => {
              const file = event.target.files[0];
              if (file) {
                setImageData({
                  ...imageData,
                  eventImage: file,
                });
              }
            }}
            fileName={imageData.eventImage?.name || ""}
          />
        </div>
      </FormDialogue>
      <AlertDialog
        open={openDeleteDialog}
        AcceptOnClick={() => deleteUser(deleteUserID)}
        acceptLabel={"Confirm"}
        closeLabel={"Close"}
        description={"Are you sure you want to Delete?"}
        title={"Delete Event"}
        CloseOnClick={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};
