import { Grid } from "@mui/material";
import React from "react";
import { Movie } from "../molecules/Movie";

export const FavoriteMovies = (props) => {
  const { favoriteMovies, onClickFavorite, onClickAnFavorite } = props;
  return (
    <div>
      <Grid container spacing={5}>
        {favoriteMovies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            onClickFavorite={onClickFavorite}
            onClickAnFavorite={onClickAnFavorite}
          />
        ))}
      </Grid>
    </div>
  );
};
