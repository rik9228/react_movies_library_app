import axios from "axios";
import { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const useFetchMovie = (params) => {
  const { setMovies, setIsLoading, setOpen, currentPage } =
    useContext(MoviePagesContext);

  async function fetchMovie() {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=16d17ebf095de29704d3061e20719382&language=ja-JA&query=${params}&page=${currentPage}`
      )
      .then((res) => res.data)
      .then((data) => {
        if (data.results.length === 0) {
          setOpen(true);
          setMovies(data.results);
          return;
        }
        setMovies(data.results);
        localStorage.setItem("movies", JSON.stringify(data.results));
        setOpen(false);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { fetchMovie };
};
