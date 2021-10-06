import "./index.css";
import React, { useContext } from "react";
import { Route, Switch } from "react-router";
import { Header } from "./components/organisms/Header";
import { MoviePagesContext } from "./components/providers/MoviePagesProvider";
import { MovieDetail } from "./components/pages/MovieDetail";
import { SearchMovies } from "./components/pages/SearchMovies";
import { PopularMovies } from "./components/pages/PopularMovies";
import MyPage from "./components/pages/MyPage";
import Container from "@mui/material/Container";
import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Error } from "./components/pages/Error";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const { open, setOpen } = useContext(MoviePagesContext);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Container maxWidth="lg" sx={{ my: 3 }}>
            <PopularMovies />
            {open && (
              <Snackbar
                open={open}
                autoHideDuration={12000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  データが見つかりません
                </Alert>
              </Snackbar>
            )}
          </Container>
        </Route>

        <Route path="/search/:params">
          <SearchMovies />
          {open && (
            <Snackbar
              open={open}
              autoHideDuration={12000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                データが見つかりません
              </Alert>
            </Snackbar>
          )}
        </Route>

        <Route exact path="/movie/:id" component={MovieDetail}></Route>
        <Route path="/myPage" component={MyPage}></Route>
        <Route component={Error}></Route>
      </Switch>
    </div>
  );
}

export default App;
