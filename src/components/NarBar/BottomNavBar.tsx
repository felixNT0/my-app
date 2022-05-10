import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ViewListIcon from "@mui/icons-material/ViewList";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import * as React from "react";
import { Link } from "react-router-dom";

function BottomNavBar() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          color: "primary",
        }}
        elevation={3}
      >
        <BottomNavigation showLabels value={value} onChange={handleChange}>
          {/* <Tooltip title="Home" placement="top"> */}
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            value="home"
            icon={<HomeIcon />}
          />
          {/* </Tooltip> */}
          {/* <Tooltip title="Add Todo" placement="top"> */}
          <BottomNavigationAction
            component={Link}
            to="/add-todo"
            label="Add Todo"
            value="add-todo"
            icon={<AddIcon />}
          />
          {/* </Tooltip> */}
          {/* <Tooltip title="Todo List" placement="top"> */}
          <BottomNavigationAction
            component={Link}
            to="/todo-list"
            label="Todo List"
            value="todo-list"
            icon={<ViewListIcon />}
          />
          {/* </Tooltip> */}
          {/* <Tooltip title="Todo Post" placement="top"> */}
          <BottomNavigationAction
            component={Link}
            to="/todo-post"
            label="Todo Post"
            value="todo-post"
            icon={<PostAddIcon />}
          />
          {/* </Tooltip> */}
          {/* <Tooltip title="Music PlayList" placement="top"> */}
          <BottomNavigationAction
            component={Link}
            to="/music-play-list"
            label="Music PlayList"
            value="music-play-list"
            icon={<LibraryMusicIcon />}
          />
          {/* </Tooltip> */}
        </BottomNavigation>
      </Paper>
    </div>
  );
}

export default BottomNavBar;
