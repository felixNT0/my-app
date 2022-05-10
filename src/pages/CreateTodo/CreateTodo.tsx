import Button from "@mui/material/Button";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../../components/CustomAlert";
import useLocalStorage from "../../hooks/useLocalStorage";
import { TodoProps } from "../../types/todo";
import styles from "./CreateTodo.module.css";

export interface State extends SnackbarOrigin {
  openSnack: boolean;
}

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

export default function CreateTodo() {
  const { data, getData, setData } = useLocalStorage<TodoProps[]>();

  const [value, setValue] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });

  const handleChange = (event: any) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let todos = data || [];
    todos.push({
      ...value,
      createdAt: new Date().toJSON(),
      id: Math.random(),
    });
    // console.log(todos);
    setData("todos", todos);
  };

  useEffect(() => {
    getData("todos");
  }, []);

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const [snackOpen, setSnackOpen] = React.useState<State>({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnack } = snackOpen;
  const navigate = useNavigate();
  const handleOpenSnack = (newState: SnackbarOrigin) => () => {
    setSnackOpen({ openSnack: true, ...newState });
  };

  const handleCloseSnack = () => {
    setSnackOpen({ ...snackOpen, openSnack: false });
    navigate("/todo-list");
  };

  return (
    <div>
      <br />
      <div className={styles.root}>
        <Typography variant="h3" gutterBottom>
          Add Todo
        </Typography>
        <hr />
        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            Title
          </Typography>
          <div>
            <TextField
              required
              id="outlined-basic"
              label="Title Here"
              name="title"
              onChange={handleChange}
              value={value?.title}
            />
          </div>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <div>
            <TextField
              required
              id="outlined-multiline"
              multiline
              rows={4}
              value={value?.description}
              placeholder="Description Here"
              name="description"
              onChange={handleChange}
            />
          </div>

          <br />
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button
              type="submit"
              variant="contained"
              onClick={handleOpenSnack({
                vertical: "top",
                horizontal: "center",
              })}
            >
              Add Todo
            </Button>
          </Stack>
        </form>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={handleCloseSnack}
          TransitionComponent={transition}
          message="You have successfully added a todo"
          key={transition ? transition.name : ""}
        >
          <CustomAlert
            onClose={handleCloseSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            You have success Add Todo!
          </CustomAlert>
        </Snackbar>
      </div>
    </div>
  );
}
