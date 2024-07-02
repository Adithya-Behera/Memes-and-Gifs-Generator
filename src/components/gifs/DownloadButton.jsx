import React from "react";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
const DownloadButton = ({ url }) => {
  const downloadGif = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      saveAs(blob, "download.gif");
    } catch (error) {
      console.error("Error downloading the GIF:", error);
    }
  };
  return (
    <IconButton onClick={downloadGif} aria-label="Download">
      <DownloadIcon />
    </IconButton>
  );
};

export default DownloadButton;
