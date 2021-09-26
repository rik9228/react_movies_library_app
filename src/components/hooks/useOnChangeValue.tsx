import { useContext } from "react";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const useOnChangeValue = () => {
  const { setValue } = useContext(MoviePagesContext);
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return { onChangeValue };
};
