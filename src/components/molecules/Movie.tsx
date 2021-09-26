// memo化でvalueに変更があった場合の不要な再レンダリングを防ぐ？

import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";

export const Movie = React.memo((props) => {
  const { movie } = props;

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

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
            <Button to={/movie/ + movie.id} color="inherit" component={Link}>
              {movie.title}
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography gutterBottom component="h3">
              公開日：{movie.release_date}
            </Typography>
          </Box>
        </Item>
      </Grid>
    </>
  );
});
