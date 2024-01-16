import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Warning = ({ onClick, collapseIn, alertProps, labelButton }) => {
  const { severity, label } = alertProps;

  return (
    <Collapse in={collapseIn}>
      <Alert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {label}
          <Link to={"/SignIn"}>
            <div>{labelButton}</div>
          </Link>
        </div>
      </Alert>
    </Collapse>
  );
};
