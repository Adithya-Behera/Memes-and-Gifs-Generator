import React from "react";
import { Container, Skeleton, Box } from "@mui/material";
import { HeroText } from "./HeroText";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useTrending from "../hooks/useTrending";
import MemeSelector from "./MemeSelector";
import { useNavigate, createSearchParams } from "react-router-dom";

const Home = (props) => {
  const tag = Object.keys(props).length > 0;

  const { memes, loading } = useTrending(tag);
  const navigate = useNavigate();

  const memeSelected = (meme) => {
    console.log("meme selected: ", meme);
    navigate({
      pathname: "create",
      search: createSearchParams({
        meme: meme.name,
      }).toString(),
    });
  };

  return (
    <>
      <HeroText text="Discover the best memes" />
      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          display: "flex",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        {loading && (
          <Skeleton
            variant="rectangular"
            width={"100%"}
            height={"100%"}
          ></Skeleton>
        )}
        {!loading && (
          <Swiper pagination={true} modules={[Pagination]}>
            {tag
              ? memes.map((meme) => (
                  <SwiperSlide key={meme.title}>
                    <img src={meme.url} alt="Meme" />
                  </SwiperSlide>
                ))
              : memes.length > 1 && (
                  <SwiperSlide>
                    <img src={memes[1].url} alt="Meme" />
                  </SwiperSlide>
                )}
          </Swiper>
        )}
      </Container>
      <Box sx={{ mt: 8 }}>
        <MemeSelector onSelect={(meme) => memeSelected(meme)} />
      </Box>
    </>
  );
};

export default Home;
