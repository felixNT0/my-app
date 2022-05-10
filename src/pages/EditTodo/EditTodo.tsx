import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
} from "@mui/material";
import React, { useState } from "react";
import CustomAlert from "../../components/CustomAlert";
import TodoForm from "../../components/Todo/TodoForm";
import { editTodo } from "../../Services/todos";
import { TodoFormProps, TodoProps } from "../../types/todo";

interface Props {
  todo: TodoProps | null;
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

function EditTodo(props: Props) {
  const { todo, onClose, open, onUpdate } = props;

  const [snackbar, setSnackbarOpen] = useState<boolean>(false);

  const handleEdit = (props: TodoFormProps) => {
    if (!todo) return;
    setSnackbarOpen(true);
    editTodo({ ...props, id: todo.id });
    onUpdate();
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
          Edit Todo
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {todo && <TodoForm todo={todo} onEdit={handleEdit} />}
        </DialogContent>
      </Dialog>
      <Snackbar open={snackbar} autoHideDuration={6000} onClose={closeSnackbar}>
        <CustomAlert
          onClose={closeSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          You have success Edit Todo!
        </CustomAlert>
      </Snackbar>
    </div>
  );
}

export default EditTodo;
