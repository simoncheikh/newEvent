import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function InputFile({ onChange, fileName }) {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Button
        component="label"
        variant="contained"
        color="secondary"
        startIcon={<CloudUploadIcon />}
      >
        Event Image
        <VisuallyHiddenInput
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={onChange}
        />
      </Button>
      {fileName && <p style={{ color: "#161855" }}> {fileName}</p>}
    </div>
  );
}
