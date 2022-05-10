import { Avatar, Chip, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { Link } from "react-router-dom";
// import Img from "./Img.jpg";

function TodoHeader() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Profile">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2, cursor: "pointer" }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <ListItemAvatar>
                <Stack direction="row" spacing={1}>
                  <Chip
                    avatar={
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          alignContent: "center",
                          cursor: "pointer",
                          color: "whitesmoke",
                        }}
                        alt="Natacha"
                        src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
                      />
                    }
                    label="Felix"
                    variant="outlined"
                  />
                </Stack>
              </ListItemAvatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              ml: 10,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                left: 15,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link to="/profile">
            <MenuItem>
              <Avatar
                alt="Remy Sharp"
                src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
              />
              Felix Profile
            </MenuItem>
          </Link>
        </Menu>
      </React.Fragment>
    </div>
  );
}

export default TodoHeader;
