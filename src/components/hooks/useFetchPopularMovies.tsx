import axios from "axios";
import { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const useFetchPopularMovies = () => {
  const { setMovies, setIsLoading } = useContext(MoviePagesContext);
  async function fetchPopularMovies() {
    setIsLoading(true);
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=16d17ebf095de29704d3061e20719382&language=ja-JA&page=1"
      )
      .then((res) => res.data)
      .then((data) => {
        setMovies(data.results);
        localStorage.setItem("movies", JSON.stringify(data.results));
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return { fetchPopularMovies };
};
