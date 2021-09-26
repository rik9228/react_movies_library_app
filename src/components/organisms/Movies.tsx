import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { Movie } from "../molecules/Movie";

export const Movies = () => {
  const { movies } = useContext(MoviePagesContext);

  return (
    <>
      <Grid container spacing={5}>
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Grid>
    </>
  );
};
