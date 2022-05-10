import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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

function SignIn() {
  const [error, setError] = useState<boolean>(false);
  const { data, getData, setData } = useLocalStorage<UserProps[]>();
  const [value, setValue] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (event: any) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    let users = data || [];

    let user = users.find(
      (user) => user.email === value.email
      // || user.password === value.password
    );

    if (!user) {
      setError(true);
      return;
    }
    setData("currentUser", user);
    // localStorage.setItem("currentUser", JSON.stringify(user));
    // setUpdated(true);
    navigate("/login-successful");
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
          Sign In To Your Account
        </Typography>
        {error && <p>Invalid email/password</p>}
        <Avatar>
          <AccountCircleIcon />
        </Avatar>

        <br />
        <form onSubmit={handleSubmit}>
          {/* <Typography variant="h6" gutterBottom>
            Username
          </Typography>
          <div>
            <TextField
              required
              id="outlined-basic"
              label="Username Here"
              name="email"
              onChange={handleChange}
              value={value?.email}
            />
          </div> */}
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
          <div>
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
              Sign In
            </Button>
          </Stack>
        </form>
        <div>
          <p>
            Not Registered <Link to="/sign-up">Create Account</Link>
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

export default SignIn;
