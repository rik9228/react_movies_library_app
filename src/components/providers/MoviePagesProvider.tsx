import React, { createContext, useState } from "react";

export const MoviePagesContext = createContext({});

export const MoviePagesProvider = (props) => {
  const { children } = props;

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isPopular, setIsPopular] = useState(true);
  const [isSearched, setIsSearched] = useState(false);
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState("");
  // クレジットで使う値
  const [movieId, setMovieId] = useState("");

  return (
    <MoviePagesContext.Provider
      value={{
        totalPages,
        setTotalPages,
        currentPage,
        setCurrentPage,
        isLoading,
        setIsLoading,
        open,
        setOpen,
        movies,
        setMovies,
        value,
        setValue,
        isPopular,
        setIsPopular,
        isSearched,
        setIsSearched,
        movieId,
        setMovieId,
      }}
    >
      {children}
    </MoviePagesContext.Provider>
  );
};
