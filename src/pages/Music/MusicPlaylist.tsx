import { Box } from "@mui/material";
import React from "react";
import Music from "./Music";
import styles from "./Music.module.css";

function MusicPlaylist() {
  return (
    <div className={styles.root}>
      <br />
      <Box className={styles.list}>
        <Music />
        <Music />
        <Music />
        {/* <Music />
        <Music />
        <Music /> */}
      </Box>
    </div>
  );
}

export default MusicPlaylist;
