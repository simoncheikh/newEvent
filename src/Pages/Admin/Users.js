import { useEffect, useState } from "react";
import { TopBar } from "../../Components/TopBar";
import { Warning } from "../../Components/Warning";
import styles from "../../Styles/users.module.css";
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

export const Users = () => {
  const [searchValue, setSearchValue] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [warningText, setWarningText] = useState({});
  const [userType, setUserType] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [edituser, setEditUser] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [addUser, setAddUser] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteUserID, setDeleteUserID] = useState(null);
  const [user, setUser] = useState(null);

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
            getUser();
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

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/admin/user_table`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const userTypeWithId = data.map((user) => ({
        ...user,
        id: user.userID,
        type: typeOfUser.find((t) => t.value == user.type)?.label,
      }));
      setUserType(userTypeWithId);
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
  };

  const updateUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/admin/user_table/edit",
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...edituser,
          }),
        }
      );

      if (response.ok) {
        setWarningText({
          severity: "success",
          label: "User Updated Successfully",
        });
      } else {
        const errorMessage = await response.text();
        setWarningText({
          severity: "error",
          label: errorMessage,
        });
      }
      window.location.reload();
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
  };
  const AddUser = async () => {
    try {
      const dateOfBirth = new Date(addUser.dateOfBirth);
      const formattedDateOfBirth = isNaN(dateOfBirth.getTime())
        ? null
        : dateOfBirth.toISOString().split("T")[0];

      const response = await fetch(
        "http://localhost:3001/admin/user_table/add",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...addUser,
          }),
        }
      );

      if (response.ok) {
        const successMessage = await response.text();
        setWarningText({
          severity: "success",
          label: "User inserted successfully",
        });
      } else {
        const errorMessage = await response.text();
        setWarningText({
          severity: "error",
          label: errorMessage,
        });
      }
      window.location.reload();
    } catch (error) {
      setWarningText({
        severity: "error",
        label: error.message,
      });
    }
    setShowAlert(true);
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

  const columns = [
    {
      field: "firstname",
      headerName: "First name",
      width: 170,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 170,
    },
    {
      field: "email",
      headerName: "Email",
      width: 170,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      width: 170,
    },
    {
      field: "userName",
      headerName: "userName",
      width: 170,
    },
    {
      field: "type",
      headerName: "Type",
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
          <IconButton onClick={() => handleDelete(params.row?.userID)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const typeOfUser = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Client" },
    { value: 3, label: "User" },
  ];

  const handleDelete = (userID) => {
    setOpenDeleteDialog(true);
    setDeleteUserID(userID);
  };

  const handleEdit = (row) => {
    setEditUser({
      userID: row.userID,
      firstname: row.firstname,
      lastName: row.lastName,
      email: row.email,
      type: typeOfUser.find((g) => g.label === row.type)?.value,
      userName: row.userName,
      phoneNumber: row.phoneNumber,
      dateOfBirth: row.dateOfBirth,
    });
    setOpenDialog(true);
  };

  const filteredRows = userType.filter((user) => {
    const phoneNumber =
      user.phoneNumber && user.phoneNumber.toString().toLowerCase();

    return (
      user.firstname.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.type.toLowerCase().includes(searchValue.toLowerCase()) ||
      (phoneNumber && phoneNumber.includes(searchValue.toLowerCase())) ||
      user.userName.toLowerCase().includes(searchValue.toLowerCase()) 
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
        <h1 className={styles.mainTitle}>Users Table</h1>
        <div className={styles.mainAddUserBtn}>
          <Button
            className={styles.addUserbtn}
            variant="contained"
            onClick={() => setOpenAddDialog(true)}
          >
            Add User
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
        dialogueTitle={"Edit User"}
        onClose={() => setOpenDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={updateUser}
      >
        <div className={styles.dialogueContainer}>
          <TextField
            variant="outlined"
            label="First Name"
            onChange={(e) =>
              setEditUser({ ...edituser, firstname: e.target.value })
            }
            value={edituser.firstname || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Last Name"
            onChange={(e) =>
              setEditUser({ ...edituser, lastName: e.target.value })
            }
            value={edituser.lastName || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Email"
            onChange={(e) =>
              setEditUser({ ...edituser, email: e.target.value })
            }
            value={edituser.email || ""}
            size="small"
            fullWidth
          />
          <Dropdown
            placeholder={"Type"}
            options={typeOfUser}
            onChange={(value) => setEditUser({ ...edituser, type: value })}
            value={edituser.type}
            nullable
          />
          <TextField
            variant="outlined"
            label="UserName"
            onChange={(e) =>
              setEditUser({ ...edituser, userName: e.target.value })
            }
            value={edituser.userName || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Phone Number"
            onChange={(e) =>
              setEditUser({ ...edituser, phoneNumber: e.target.value })
            }
            value={edituser.phoneNumber || ""}
            size="small"
            fullWidth
          />
        </div>
      </FormDialogue>
      <FormDialogue
        show={openAddDialog}
        acceptLabel={"Save"}
        dialogueTitle={"Add User"}
        onClose={() => setOpenAddDialog(false)}
        titleStyle={{ height: "1000px" }}
        fullwidth={"100%"}
        onAccept={AddUser}
      >
        <div className={styles.dialogueContainer}>
          <TextField
            variant="outlined"
            label="First Name"
            onChange={(e) =>
              setAddUser({ ...addUser, firstname: e.target.value })
            }
            value={addUser.firstname || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Last Name"
            onChange={(e) =>
              setAddUser({ ...addUser, lastName: e.target.value })
            }
            value={addUser.lastName || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Email"
            onChange={(e) => setAddUser({ ...addUser, email: e.target.value })}
            value={addUser.email || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            onChange={(e) =>
              setAddUser({ ...addUser, password: e.target.value })
            }
            value={addUser.password || ""}
            size="small"
            fullWidth
          />
          <Dropdown
            placeholder={"Type"}
            options={typeOfUser}
            onChange={(value) => setAddUser({ ...addUser, type: value })}
            value={addUser.type}
            nullable
          />
          <TextField
            variant="outlined"
            label="UserName"
            onChange={(e) =>
              setAddUser({ ...addUser, userName: e.target.value })
            }
            value={addUser.userName || ""}
            size="small"
            fullWidth
          />
          <TextField
            variant="outlined"
            label="Phone Number"
            onChange={(e) =>
              setAddUser({ ...addUser, phoneNumber: e.target.value })
            }
            value={addUser.phoneNumber || ""}
            size="small"
            fullWidth
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
