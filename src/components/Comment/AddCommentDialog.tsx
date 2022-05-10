import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import { TodoProps } from "../../types/todo";
import CustomAlert from "../CustomAlert";
import AddComment from "./AddComment";

interface Props {
  todo: TodoProps;
  open: boolean;
  onClose: () => void;
}

function AddCommentDialog(props: Props) {
  const { onClose, open, todo } = props;

  const [snackbar, setSnackbarOpen] = useState<boolean>(false);

  const handleAddComment = () => {
    setSnackbarOpen(true);
    onClose();
  };

  const closeSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Comment
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddComment onAddComment={handleAddComment} todo={todo} />
        </DialogContent>
      </Dialog>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={closeSnackbar}>
        <CustomAlert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have success Comment on This Todo!
        </CustomAlert>
      </Snackbar>
    </div>
  );
}

export default AddCommentDialog;
