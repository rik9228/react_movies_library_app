import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { Movie } from "../molecules/Movie";
import { db } from "../../firebase";
import { useAuthContext } from "../providers/AuthProvider";

export const Movies = () => {
  const { movies, setMovies } = useContext(MoviePagesContext);
  const { user } = useAuthContext();

  const onClickFavorite = (movieId) => {
    const newMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        movie.isFavorite = true;
        db.collection("movies").add({
          content: movie,
          uid: user.uid,
        });
      }
      return movie;
    });
    setMovies(newMovies);
  };

  const onClickAnFavorite = async (movieId) => {
    const newMovies = await Promise.all(
      movies.map(async (movie) => {
        const postDoc_query = await db
          .collection("movies")
          .where("content.id", "==", movie.id)
          .get();

        postDoc_query.forEach((doc) => {
          if (
            doc.data().content.id === movieId &&
            doc.data().uid === user.uid
          ) {
            doc.ref.delete();
            movie.isFavorite = false;
          }
        });
        return movie;
      })
    );
    setMovies(newMovies);
  };

  useEffect(() => {
    const InitFavoriteState = async () => {
      const newMovies = await Promise.all(
        movies.map(async (movie) => {
          const postDoc_query = await db
            .collection("movies")
            .where("content.id", "==", movie.id)
            .get();

          postDoc_query.forEach((postDoc) => {
            if (
              postDoc.data().content.id === movie.id &&
              postDoc.data().uid === user.uid
            ) {
              movie.isFavorite = true;
            }
          });
          return movie;
        })
      );
      setMovies(newMovies);
    };
    InitFavoriteState();
  }, []);

  return (
    <>
      <Grid container spacing={5}>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            movie={movie}
            onClickFavorite={onClickFavorite}
            onClickAnFavorite={onClickAnFavorite}
          />
        ))}
      </Grid>
    </>
  );
};
