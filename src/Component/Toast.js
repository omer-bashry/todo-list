import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

export default function Toast({ open, message }) {
  return (
    <Box sx={{ width: "30%", position: "absolute", bottom: 0, left: 0 }}>
      <Collapse in={open}>
        <Alert>{message}</Alert>
      </Collapse>
    </Box>
  );
}
