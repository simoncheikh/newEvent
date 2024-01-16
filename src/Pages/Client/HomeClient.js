import { useEffect, useState } from "react";
import { TopBar } from "../../Components/TopBar";
import { Warning } from "../../Components/Warning";
import styles from "../../Styles/clientsHome.module.css";
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
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TimePicker from "react-time-picker";

export const HomeClient = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openPromoteDialog, setOpenPromoteDialog] = useState(false);
  const [addPromoteData, setAddPromoteData] = useState([]);
  const [promoteID, setPromoteID] = useState(null);
  const [addEvent, setAddEvent] = useState([]);
  const [reqImage, setReqImage] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [eventPromote, setEventPromote] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editEvent, setEditEvent] = useState([]);
  const [deleteUserID, setDeleteUserID] = useState(null);
  const [userData, setUserData] = useState(null);
  const [nextBtn, setNextBtn] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [imageID, setImageID] = useState(null);

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
          getEvent(data.userID);
          setUserData(data.userID);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []);

  const getEvent = async (userID) => {
    try {
      const response = await fetch(
        `http://localhost:3001/client/home/${userID}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setEventPromote(...data);
      const eventDataWithId = data.map((event) => ({
        ...event,
        id: event.eventID,
        promoted: promoted.find((row) => row.value === event.Promoted)?.label,
        eventDate: new Date(event.eventDate).toLocaleDateString(),
        CreatedDate: new Date(event.CreatedDate).toLocaleDateString(),
      }));
      setEventData(eventDataWithId);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };
  const promoted = [
    { value: 0, label: "Not Promoted" },
    { value: 1, label: "Promoted" },
  ];

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
      const response = await fetch("http://localhost:3001/clients/editEvent", {
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
          userID: userData,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setWarningText({
        severity: "success",
        label: "Event Updated successfully",
      });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
  };

  const updateEventImage = async () => {
    try {
      const formData = new FormData();
      formData.append('eventImage', imageData.eventImage); 
      formData.append('eventID', imageID); 
  
      const response = await fetch(
        "http://localhost:3001/clients/updateImage",
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
      formData.append("userID", userData);
      formData.append("Promoted", 0);

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
    setAddEvent([]);
  };

  const deleteUser = async (userID) => {
    try {
      const respond = await fetch(
        "http://localhost:3001/admin/user_table/delete",
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userID }),
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

  const createPromotion = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/client/addPromotion",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...addPromoteData,
            userID: userData,
            eventID: promoteID,
          }),
        }
      );
      setWarningText({
        severity: "success",
        label: "Payment inserted successfully",
      });
    } catch (error) {
      setWarningText({ severity: "error", label: error.message });
    }
    setShowAlert(true);
    setOpenDialog(false);
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
          {params.row?.Promoted === 0 && (
            <Button onClick={() => handlePromote(params.row?.eventID)}>
              Promote
            </Button>
          )}
          <Button onClick={() => handleImage(params.row?.eventID)}>
            Update Image
          </Button>
        </div>
      ),
    },
  ];

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
  const handleEdit = (row) => {
    setEditEvent({
      eventID: row.eventID,
      eventName: row.eventName,
      eventDesc: row.eventDesc,
      eventPrice: row.eventPrice,
      eventLocation: row.eventLocation,
      eventLocationLink: row.eventLocationLink,
      eventDate: row.eventDate,
      eventTime: dayjs(row.eventTime, "HH:mm:ss").toDate(),
      eventTicket: row.eventTicket,
    });

    setOpenDialog(true);
  };

  const handleDelete = (userID) => {
    setOpenDeleteDialog(true);
    setDeleteUserID(userID);
  };

  const handlePromote = (eventID) => {
    setOpenPromoteDialog(true);
    setPromoteID(eventID);
  };

  const handleImage = (eventID) => {
    setOpenImageDialog(true);
    setImageID(eventID);
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
      <div className={styles.mainPageContainer}>
        <h1 className={styles.mainTitle}> Client's Events Table</h1>
        <div style={{ color: "#161855", fontSize: "20px" }}>
          Fee for promoting an event: 20$
        </div>
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
                  onChange={(value) => {
                    setEditEvent({ ...editEvent, eventTime: value });
                  }}
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
                  disablePast
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
        <div
          className={styles.dialogueContainer}
          style={{
            justifyContent: nextBtn == true ? "initial" : "space-evenly",
          }}
        >
          {nextBtn == false ? (
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
                  disablePast
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
              <div
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

                <IconButton onClick={() => setNextBtn(true)}>
                  <ArrowForwardIcon />
                </IconButton>
              </div>
            </>
          ) : (
            <div className={styles.mainPayment}>
              <IconButton
                onClick={() => setNextBtn(false)}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "7%",
                }}
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
            </div>
          )}
        </div>
      </FormDialogue>
      <FormDialogue
        show={openPromoteDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Promote Event"}
        onClose={() => setOpenPromoteDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={createPromotion}
      >
        <div className={styles.mainPayment}>
          <Dropdown
            options={paymentMethods}
            onChange={(value) =>
              setAddPromoteData({
                ...addPromoteData,
                paymentType: value,
              })
            }
            value={addPromoteData.paymentType}
            nullable
            placeholder={"Payment Methods"}
          />
          <div className={styles.paymentInputs}>
            <TextField
              label="Card Number"
              onChange={(value) =>
                setAddPromoteData({
                  ...addPromoteData,
                  cardNumber: value.target.value,
                })
              }
              value={addPromoteData.cardNumber || ""}
            />
            <div className={styles.paymentRow}>
              <Dropdown
                options={months}
                onChange={(value) =>
                  setAddPromoteData({
                    ...addPromoteData,
                    cardMonth: value,
                  })
                }
                value={addPromoteData.cardMonth}
                nullable
                placeholder={"Month"}
              />

              <Dropdown
                options={years}
                onChange={(value) =>
                  setAddPromoteData({
                    ...addPromoteData,
                    cardYear: value,
                  })
                }
                value={addPromoteData.cardYear}
                nullable
                placeholder={"Year"}
              />
            </div>

            <TextField
              label="Card Holder"
              onChange={(value) =>
                setAddPromoteData({
                  ...addPromoteData,
                  cardHolder: value.target.value,
                })
              }
              value={addPromoteData.cardHolder || ""}
            />
            <TextField
              label="CVV2 Security Code"
              onChange={(value) =>
                setAddPromoteData({
                  ...addPromoteData,
                  cvv2: value.target.value,
                })
              }
              value={addPromoteData.cvv2 || ""}
            />
          </div>
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
        title={"Delete User"}
        CloseOnClick={() => setOpenDeleteDialog(false)}
      />
    </div>
  );
};
