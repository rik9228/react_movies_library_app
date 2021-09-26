import axios from "axios";
import { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const useFetchAllPageCount = (params) => {
  const { setTotalPages } = useContext(MoviePagesContext);

  async function fetchAllPageCount() {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=16d17ebf095de29704d3061e20719382&language=ja-JA&query=${params}&total_pages`
      )
      .then((res) => res.data)
      .then((data) => setTotalPages(data.total_pages))
      .catch((error) => console.error(error));
  }

  return { fetchAllPageCount };
};
