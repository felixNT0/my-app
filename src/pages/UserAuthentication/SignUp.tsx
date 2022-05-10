import GroupAddIcon from "@mui/icons-material/GroupAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Slide, { SlideProps } from "@mui/material/Slide";
import { SnackbarOrigin } from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserProps } from "../../types/todo";
import styles from "./SignUp.module.css";

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export interface SnackState extends SnackbarOrigin {
  openSnack: boolean;
}

type TransitionProps = Omit<SlideProps, "direction">;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

function SignUp() {
  const { data, getData, setData } = useLocalStorage<UserProps[]>();
  const [value, setValue] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const [add, setAdd] = useState<boolean>(false);
  // const [displayError, setDisplayError] = useState(false)

  const handleChange = (event: any) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  // const navigate = useNavigate();

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    let users = data || [];

    let checkUser = users.find(
      (user) => user.username === value.username && user.email === value.email
      // user.password === value.password
    );
    if (checkUser) {
      setAdd(true);
      return;
    } else {
      let user = { ...value, id: new Date().toJSON() };
      users.push(user);
      setData("users", users);
      setData("currentUser", user);
      setValue(value);
      navigate("/signup-successful");
    }
  };

  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined);

  const [snackOpen, setSnackOpen] = React.useState<SnackState>({
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
    // navigate("/todo-list");
  };

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChangePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    getData("users");
    getData("currentUser");
  }, []);

  return (
    <div>
      <br />
      <br />
      <div className={styles.root}>
        <Typography variant="h3" gutterBottom>
          Create An Account
        </Typography>
        {add && (
          <p>
            `{value.username} You have an account already click on login to log
            you to your account`
          </p>
        )}
        <Avatar>
          <GroupAddIcon />
        </Avatar>

        <br />
        <form onSubmit={handleSubmitForm}>
          <Typography variant="h6" gutterBottom>
            Username
          </Typography>
          <div>
            <TextField
              required
              id="outlined-basic"
              label="Username Here"
              name="username"
              onChange={handleChange}
              value={value?.username}
            />
          </div>
          <Typography variant="h6" gutterBottom>
            Email
          </Typography>
          <div>
            <TextField
              required
              id="outlined-basic"
              label="Email Here"
              name="email"
              onChange={handleChange}
              value={value?.email}
            />
          </div>
          <Typography variant="h6" gutterBottom>
            Password
          </Typography>
          <div onChange={handleChange}>
            <OutlinedInput
              required
              label="Password"
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChangePassword("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
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
              Sign Up
            </Button>
          </Stack>
        </form>
        <div>
          <p>
            Already Registered <Link to="/sign-in">Login to Account</Link>
          </p>
        </div>
        {/* <Snackbar
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
        </Snackbar> */}
      </div>
    </div>
  );
}

export default SignUp;
