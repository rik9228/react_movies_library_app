import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, memo } from "react";
import { useFetchPopularMovies } from "../hooks/useFetchPopularMovies";
import { Movies } from "../organisms/Movies";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const PopularMovies = () => {
  const { fetchPopularMovies } = useFetchPopularMovies();
  const { movies, isLoading } = useContext(MoviePagesContext);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size={80} />
        </Box>
      ) : (
        <>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", my: 4 }}
          >
            人気映画20
          </Typography>
          <Movies movies={movies} />
        </>
      )}
    </>
  );
};
