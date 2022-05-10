// import React from "react";
// import PostAddIcon from "@mui/icons-material/PostAdd";
import CottageIcon from "@mui/icons-material/Cottage";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Fab } from "@mui/material";
import Avatar from "@mui/material/Avatar";
// import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Link } from "react-router-dom";
// import Form from "../Todo/Form/Form";
// import Demo from "./Demo";
import Img from "./Img.jpg";
import styles from "./Profile.module.css";

// import Testing from "./Testing";

const Input = styled("input")({
  display: "none",
});

function Profile() {
  return (
    <div>
      <div>
        <div className={styles.root}>
          <label className={styles.btn} htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
            />
            <Button
              variant="contained"
              component="span"
              endIcon={<PhotoCamera />}
            >
              Upload
            </Button>
          </label>
        </div>
        <div>
          <Avatar
            sx={{
              top: "7px",
              alignItems: "center",
              width: "150px",
              height: "150px",
            }}
            alt="Remy Sharp"
            src={Img}
          />
        </div>
        <Stack
          marginTop={-7}
          marginLeft={13}
          direction="row"
          alignItems="center"
          spacing={3}
        >
          <Fab sx={{ width: "45px", height: "45px" }}>
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Fab>
          <AvatarGroup total={25}>
            <Avatar
              alt="Remy Sharp"
              src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
            />
            <Avatar
              alt="Travis Howard"
              src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://lh3.googleusercontent.com/a-/AOh14Gi9NB4fM57ogfxOZ1v-k4Kxjj8xcZIzgK1S3aBuXg=s60-c-rg-br100"
            />
          </AvatarGroup>
        </Stack>
      </div>
      {/* <Form /> */}
      <div>
        <Button
          sx={{
            top: "50px",
          }}
          variant="contained"
          endIcon={<CottageIcon />}
          component={Link}
          to="/"
        >
          Home PAge
        </Button>
      </div>
    </div>
  );
}

export default Profile;
