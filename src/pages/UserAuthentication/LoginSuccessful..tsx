import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";

import CottageIcon from "@mui/icons-material/Cottage";
import { Link } from "react-router-dom";

function LoginSuccessful() {
  // const navigate = useNavigate();
  // const handleHomePage = () => {
  //   navigate("/");
  // };

  return (
    <div>
      <br />
      <br />
      <br />
      <div>
        <i className="fas fa-user-plus"></i>
      </div>
      <h1>
        You have Successful <br /> Login to your Acount
      </h1>
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        endIcon={<CottageIcon />}
        component={Link}
        to="/"
      >
        Home PAge
      </Button>
    </div>
  );
}

export default LoginSuccessful;
