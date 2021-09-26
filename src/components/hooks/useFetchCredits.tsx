import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

export const useFetchCredits = () => {
  const [credits, setCredits] = useState([]);
  const params: { id: string } = useParams();

  const fetchCredits = async () => {
    const movieId = params.id;
    if (movieId === "") {
      return;
    }
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=16d17ebf095de29704d3061e20719382`
      )
      .then((res) => res.data)
      .then((data) => {
        setCredits(data.cast);
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("foo"));
  };

  return { fetchCredits, credits };
};

// useEffect(() => {
//   async function fetchCredits() {
//     if (movieId === "") {
//       return;
//     }
//     axios
//       .get(
//         `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=16d17ebf095de29704d3061e20719382`
//       )
//       .then((res) => res.data)
//       .then((data) => setCredits(data.cast))
//       .catch((error) => console.error(error));
//   }
//   setMovieId(params.id);
//   fetchCredits();
// }, [movieId]);
