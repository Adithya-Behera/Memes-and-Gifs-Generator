import { Close, DownloadOutlined } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { HeroText } from "./HeroText";
import MemeSelector from "./MemeSelector";
import Temp from "./Temp";
const Creator = () => {
  const { createMeme } = useApi();
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState();
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState();
  const [imageError, setImageError] = useState(false);
  const [input,setInput]=useState('');
  useEffect(() => {
    const activeMeme = searchParams.get("meme");
    console.log("in activememe ",activeMeme);
    setSelected(activeMeme||"10-Guy");
  }, [searchParams]);

  useEffect(() => {
    console.log("Selected meme updated: ", selected);
    doCreate();
  }, [input]);   

  const memeSelected = (meme) => {
    setSelected(meme.name);
    setImageError(false);
  };
  const doCreate = async () => {
    setLoading(true);
    const result = await createMeme(top, bottom, selected);
    setLoading(false);
    setResult(result);
    console.log("result: ", result);
  };

  const nameSelected = (name) => {
    setSelected(name); 
    setInput(name);
    setImageError(true);
  };

  const doCreateMeme = async () => {
    setLoading(true);
    const result = await createMeme(top, bottom, selected);
    setLoading(false);
    setResult(result);
    console.log("result: ", result);
    setShowModal(true);
  };

  const startDownload = () => {
    const element = document.createElement("a");
    element.href = result;
    element.download = "image.jpg";
    element.click();
  };

  return (
    <>
      <HeroText text="Create your Meme"></HeroText>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            textAlign: "center",
            maxHeight: "88vh",
            overflow: "auto",
          }}
        >
          <Stack
            spacing={2}
            p={{ xs: 2, md: 4 }}
            bgcolor="#fff"
            sx={{
              maxHeight: "100%",
              overflow: "auto",
            }}
          >
            <Typography variant="h4">Grab your Meme!</Typography>
            <Button
              fullWidth
              variant="contained"
              onClick={() => startDownload()}
              startIcon={<DownloadOutlined />}
            >
              Download Meme
            </Button>
            <img
              src={result}
              alt="Meme"
              style={{ maxWidth: "100%", maxHeight: "60vh" }}
            />
            <Button onClick={() => setShowModal(false)}>
              <Close />
            </Button>
          </Stack>
        </Container>
      </Modal>

      <Backdrop
        open={loading}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit"></CircularProgress>
      </Backdrop>

      <Box sx={{ mt: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} md={6} lg={8}>
            <Stack spacing={2}>
              <FormControl>
                <TextField
                  placeholder="Top text"
                  onChange={(ev) => setTop(ev.target.value)}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  placeholder="Bottom text"
                  onChange={(ev) => setBottom(ev.target.value)}
                ></TextField>
              </FormControl>
              <Temp onSelect={(name) => nameSelected(name)} />
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={() => doCreateMeme()}
                disabled={selected === ""}
              >
                Create meme
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={6}
            lg={4}
            sx={{ img: { width: "100%" } }}
          >
            <img src={imageError ? result : `/img/${selected}.jpeg`} alt="create meme"></img>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 8 }}>
        <MemeSelector
          onSelect={(meme) => memeSelected(meme)}
          activeMeme={selected}
        />
      </Box>
    </>
  );
};

export default Creator;
