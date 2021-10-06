// memo化でvalueに変更があった場合の不要な再レンダリングを防ぐ？

import React, { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { useAuthContext } from "../providers/AuthProvider";
import { Img } from "../styles/Img";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { db } from "../../firebase";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Movie = (props) => {
  const { movie, onClickFavorite, onClickAnFavorite } = props;
  const { user } = useAuthContext();

  const setMovieDetailhandler = () => {
    db.collection("movieDetails").doc("info").set({
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      backdrop_path: movie.backdrop_path,
    });
  };

  return (
    <>
      <Grid item xs={6} md={3}>
        <Item sx={{ background: "rgb(30,30,30)", color: "#fff" }}>
          <Img
            src={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/original/" + movie.poster_path
                : "https://img.freepik.com/free-vector/movie-film_23-2147498233.jpg"
            }
          />
          <Box sx={{ mt: 2, display: "block" }}>
            <Button
              to={/movie/ + movie.id}
              color="inherit"
              component={Link}
              onClick={setMovieDetailhandler}
            >
              {movie.title}
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography gutterBottom component="h3">
              公開日：{movie.release_date}
            </Typography>
          </Box>
          {user && (
            <Box sx={{ mt: 2 }}>
              {!movie.isFavorite ? (
                <Button
                  color="success"
                  fullWidth={true}
                  variant="contained"
                  onClick={() => onClickFavorite(movie.id)}
                >
                  お気に入り
                </Button>
              ) : (
                <Button
                  color="success"
                  fullWidth={true}
                  variant="outlined"
                  onClick={() => onClickAnFavorite(movie.id)}
                >
                  お気に入り解除
                </Button>
              )}
            </Box>
          )}
        </Item>
      </Grid>
    </>
  );
};
