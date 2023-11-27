import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function AlertDialog({
  title,
  description,
  onClose,
  CloseOnClick,
  AcceptOnClick,
  closeLabel,
  acceptLabel,
  open,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseOnClick}>{closeLabel}</Button>
          <Button onClick={AcceptOnClick} autoFocus>
            {acceptLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
