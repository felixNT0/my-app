import SearchIcon from "@mui/icons-material/Search";
import { Button, Divider, Fade, Menu, MenuItem, styled } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { TodoProps } from "../../types/todo";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchBar() {
  const [searchTodo, setSearchTodo] = useState<string>("");
  const [todoResult, setTodoResult] = useState<TodoProps[]>();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorEl);

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const { data, getData, setData } = useLocalStorage<TodoProps[]>();

  const handleChangeSearch = (event: any) => {
    setSearchTodo(event.target.value);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    setMenuAnchorEl(event.currentTarget);
    const todos = data || [];
    let searched = todos.filter(
      (todo) => todo.title.toLowerCase().includes(searchTodo.toLowerCase())
      // todo.description.toLowerCase().includes(searchTodo.toLowerCase())
    );
    // console.log(searched);
    setData("todos", searched);
    setTodoResult(searched);
  };

  useEffect(() => {
    getData("todos");
  }, []);

  return (
    <div>
      <Search>
        <SearchIconWrapper></SearchIconWrapper>
        <form onSubmit={handleSearch}>
          <StyledInputBase
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onChange={handleChangeSearch}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <Button
            sx={{
              color: "whitesmoke",
            }}
            type="submit"
          >
            <SearchIcon />
          </Button>
        </form>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          // openMenu={openMenu}
          anchorEl={menuAnchorEl}
          open={open}
          onClose={handleCloseMenu}
          TransitionComponent={Fade}
        >
          {todoResult && !todoResult.length && (
            <MenuItem sx={{ textAlign: "center" }}>Search Not Found</MenuItem>
          )}
          {todoResult?.map((todo) => (
            <React.Fragment key={todo.id}>
              <MenuItem onClick={handleCloseMenu}>{todo.title}</MenuItem>
              <Divider />
            </React.Fragment>
          ))}
        </Menu>
      </Search>
    </div>
  );
}

export default SearchBar;
