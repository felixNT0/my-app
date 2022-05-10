import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import CustomAlert from "../CustomAlert";

interface Props {
  onDelete: () => void;
  open: boolean;
  onClose: () => void;
}

export default function DeleteTodo(props: Props) {
  const { open, onClose, onDelete } = props;

  const [snackbar, setSnackbar] = useState<boolean>(false);

  const openSnackbar = () => {
    setSnackbar(true);
  };

  const closeSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const handleDelete = () => {
    openSnackbar();
    onDelete();
    onClose();
  };

  const handleUndoDeletedTodos = () => {};

  return (
    <span>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button onClick={handleDelete}>Yes</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar} autoHideDuration={6000} onClose={closeSnackbar}>
        <Box>
          <CustomAlert
            onClose={closeSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            You have success Delete Todo!
          </CustomAlert>
          <br />
          <CustomAlert
            icon={<ViewListIcon />}
            // onClick={handleUndoDeletedTodos}
            onClose={handleUndoDeletedTodos}
            severity="success"
            sx={{ width: "100%" }}
          >
            Did u want to undo Delete Todo!
          </CustomAlert>
        </Box>
      </Snackbar>
    </span>
  );
}
