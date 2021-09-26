import { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { useHistory } from "react-router";

export const useOnSubmitTitle = () => {
  const { setOpen, value, setCurrentPage } = useContext(MoviePagesContext);

  const history = useHistory();

  const onSubmitMovieTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (value === "") {
      setOpen(true);
      return;
    }
    setCurrentPage(1);
    history.push({ pathname: `/search/${value}` });
  };

  return { onSubmitMovieTitle };
};
