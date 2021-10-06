import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FormComponent } from "./FormComponent";
import { useOnChangeValue } from "../hooks/useOnChangeValue";
import { useOnSubmitTitle } from "../hooks/useOnSubmitTitle";
import { Link, useHistory } from "react-router-dom";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { useFetchPopularMovies } from "../hooks/useFetchPopularMovies";
import { auth, provider } from "../../firebase";
import { useAuthContext } from "../providers/AuthProvider";
import { ImgRound } from "../styles/Img";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@material-ui/core";

export const Header = () => {
  const { onChangeValue } = useOnChangeValue();
  const { onSubmitMovieTitle } = useOnSubmitTitle();
  const { setIsPopular, setIsSearched } = useContext(MoviePagesContext);
  const history = useHistory();
  const [error, setError] = useState("");
  const { user } = useAuthContext();

  const toHome = () => {
    setIsPopular(true);
    setIsSearched(false);
  };

  const handleLogin = async () => {
    try {
      await auth.signInWithPopup(provider);
      history.push("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    if (confirm("ログアウトしますか？")) {
      auth.signOut();
      history.push("/");
    }
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
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            <Button
              to="/"
              component={Link}
              color="inherit"
              variant="text"
              disableRipple={true}
            >
              Search Movies App
            </Button>
          </Typography>
          <FormComponent
            onSubmitMovieTitle={onSubmitMovieTitle}
            onChangeValue={onChangeValue}
          />
          {!user ? (
            <>
              <Box sx={{ mr: 2 }}>
                <Typography>ゲスト</Typography>
              </Box>
              <Box sx={{ mr: 1 }}>
                <Link to="/myPage">
                  <AccountCircleIcon />
                </Link>
              </Box>
              <Box sx={{ mr: 0 }}>
                <Button color="inherit" onClick={handleLogin}>
                  Login
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ mr: 1 }}>
                <Typography>ようこそ、{user.displayName}さん</Typography>
              </Box>
              <Box sx={{ mr: 1 }}>
                <Link to="/myPage">
                  <ImgRound src={user.photoURL} />
                </Link>
              </Box>
              <Box sx={{ mr: 1 }}>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
