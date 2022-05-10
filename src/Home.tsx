import PostAddIcon from "@mui/icons-material/PostAdd";
import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <br />
      <Typography sx={{ textAlign: "center" }} variant="h3" gutterBottom>
        Welcome to My TodoList App
      </Typography>
      <Typography sx={{ textAlign: "center" }} variant="h5" gutterBottom>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae sed
          ipsam tempore asperiores animi eligendi magnam non sunt error
          obcaecati corporis debitis veritatis necessitatibus, aliquid nemo ad
          natus dignissimos iure perspiciatis, deleniti assumenda! Eaque
          doloremque, minus, a asperiores labore, commodi ad amet tempora ullam
          quis officiis. Esse, ipsam! Rem, earum?
        </p>
        <br />
        {/* <Form /> */}
        <br />
      </Typography>
      Click to go to the Todo List to see Posts on Todos{" "}
      <Button
        variant="contained"
        endIcon={<PostAddIcon />}
        component={Link}
        to="/todo-post"
      >
        Todo Post
      </Button>
    </div>
  );
}

export default Home;
