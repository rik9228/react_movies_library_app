import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormComponent } from "./FormComponent";
import { useOnChangeValue } from "../hooks/useOnChangeValue";
import { useOnSubmitTitle } from "../hooks/useOnSubmitTitle";
import { Link } from "react-router-dom";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { useFetchPopularMovies } from "../hooks/useFetchPopularMovies";

export const Header = () => {
  const { onChangeValue } = useOnChangeValue();
  const { onSubmitMovieTitle } = useOnSubmitTitle();
  const { setIsPopular, setIsSearched } = React.useContext(MoviePagesContext);
  const { fetchPopularMovies } = useFetchPopularMovies();

  const toHome = () => {
    setIsPopular(true);
    setIsSearched(false);
    fetchPopularMovies();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "rgb(30,30,30)" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" onClick={toHome}>
              Search Movies App
            </Link>
          </Typography>
          <FormComponent
            onSubmitMovieTitle={onSubmitMovieTitle}
            onChangeValue={onChangeValue}
          />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
