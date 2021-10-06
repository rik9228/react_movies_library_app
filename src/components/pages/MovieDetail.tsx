import { useHistory } from "react-router-dom";
import React, { memo, useEffect, useState } from "react";
import { Box, styled } from "@mui/system";
import {
  Button,
  Container,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { CastCard } from "../organisms/CastCard";
import { VoteRating } from "../atoms/VoteRating";
import { useFetchCredits } from "../hooks/useFetchCredits";
import { SubmitReview } from "../organisms/SubmitReview";
import { db } from "../../firebase";

const Img = styled("img")({
  display: "block",
  maxWidth: "500px",
  maxHeight: "100%",
  cursor: "pointer",
});

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "500px",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 0.5,
};

export const MovieDetail = memo(() => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { goBack } = useHistory();
  const { fetchCredits, credits } = useFetchCredits();

  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const fetchMovieDetail = async () => {
      await db
        .collection("movieDetails")
        .doc("info")
        .get()
        .then((result: unknown) => setMovieDetail(result.data()));
    };
    fetchMovieDetail();
    fetchCredits();
  }, []);

  return (
    <Container>
      <>
        <div key={movieDetail.id}>
          <Box sx={{ textAlign: "center", my: 8 }}>
            <h2>{movieDetail.title}</h2>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Img
              onClick={handleOpen}
              src={
                movieDetail.poster_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    movieDetail.poster_path
                  : "https://img.freepik.com/free-vector/movie-film_23-2147498233.jpg"
              }
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
              <Typography variant="h6" component="p">
                あらすじ：
                <br />
                {movieDetail.overview}
              </Typography>
              <Box sx={{ display: "flex", gap: "8px", mt: 5 }}>
                TMDbレビュー評価：{movieDetail.vote_average / 2}
                <VoteRating voteCount={movieDetail.vote_average / 2} />
              </Box>
              <Typography sx={{ mt: 5 }}>
                公開日：{movieDetail.release_date}
              </Typography>
            </Box>
          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Img
                src={
                  movieDetail.backdrop_path
                    ? "https://image.tmdb.org/t/p/original/" +
                      movieDetail.backdrop_path
                    : "https://img.freepik.com/free-vector/movie-film_23-2147498233.jpg"
                }
              />
            </Box>
          </Modal>
        </div>
        <Box sx={{ mt: 10 }}>
          <Typography variant="h5" component="h2">
            キャスト一覧
          </Typography>
          <Grid container spacing={5} sx={{ mt: 0 }}>
            {credits.map((credit, index) => {
              if (index < 20) {
                return (
                  <Grid item xs={6} md={2} key={index}>
                    <CastCard
                      character={credit.character}
                      original_name={credit.original_name}
                      profileImg={credit.profile_path}
                    ></CastCard>
                  </Grid>
                );
              }
            })}
          </Grid>
          <SubmitReview />
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <Button onClick={goBack}>一覧に戻る</Button>
          </Box>
        </Box>
      </>
    </Container>
  );
});
