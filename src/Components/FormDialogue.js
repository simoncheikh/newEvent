import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  height,
} from "@mui/material";

export const FormDialogue = ({
  show,
  dialogueTitle,
  onAccept,
  onClose,
  acceptLabel,
  children,
  rootStyle,
  style,
  titleStyle,
  fullwidth,
  maxWidth
}) => (
  <Dialog
    open={show}
    onClose={onClose}
    sx={{
      ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": { ...rootStyle },
      ".css-un36eq-MuiDialogContent-root": {
        ...style,
        display: "flex",
        justifyContent: "center",
      },
      ".MuiDialogTitle-root+.css-ypiqx9-MuiDialogContent-root": {
        ...titleStyle,
      },
    }}
    fullWidth={fullwidth} maxWidth={maxWidth}
  >
    <DialogTitle>{dialogueTitle}</DialogTitle>

    <DialogContent sx={{}}>{children}</DialogContent>

    <DialogActions>
      <Button
        onClick={() => {
          onClose();
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={() => {
          onClose();
          onAccept();
        }}
      >
        {acceptLabel}
      </Button>
    </DialogActions>
  </Dialog>
);
