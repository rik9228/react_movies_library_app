import { useParams, useHistory } from "react-router-dom";
import React, { memo, useContext, useEffect, useState } from "react";
import { Box, styled } from "@mui/system";
import { Button, Container, Grid, Modal, Typography } from "@mui/material";
import { CastCard } from "../organisms/CastCard";
import { VoteRating } from "../atoms/VoteRating";
import { useFetchCredits } from "../hooks/useFetchCredits";

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
  const params: { id: string } = useParams();

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchCredits();
  }, []);

  useEffect(() => {
    const moviesInfo = JSON.parse(localStorage.getItem("movies"));
    setMovies(moviesInfo);
  }, []);

  return (
    <Container>
      {movies.map((movie) => {
        if (String(movie.id) === params.id) {
          return (
            <div key={movie.id}>
              <Box sx={{ textAlign: "center", my: 8 }}>
                <h2>{movie.title}</h2>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Img
                  onClick={handleOpen}
                  src={
                    movie.poster_path
                      ? "https://image.tmdb.org/t/p/original/" +
                        movie.poster_path
                      : "https://img.freepik.com/free-vector/movie-film_23-2147498233.jpg"
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 5 }}>
                  <Typography variant="h6" component="p">
                    あらすじ：
                    <br />
                    {movie.overview}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "8px", mt: 5 }}>
                    TMDbレビュー評価：{movie.vote_average / 2}
                    <VoteRating voteCount={movie.vote_average / 2} />
                  </Box>
                  <Typography sx={{ mt: 5 }}>
                    公開日：{movie.release_date}
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
                      movie.backdrop_path
                        ? "https://image.tmdb.org/t/p/original/" +
                          movie.backdrop_path
                        : "https://img.freepik.com/free-vector/movie-film_23-2147498233.jpg"
                    }
                  />
                </Box>
              </Modal>
            </div>
          );
        }
      })}
      <Box sx={{ mt: 10 }}>
        <h2>キャスト一覧</h2>
        <Grid container spacing={5}>
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
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Button onClick={goBack}>一覧に戻る</Button>
        </Box>
      </Box>
    </Container>
  );
});
