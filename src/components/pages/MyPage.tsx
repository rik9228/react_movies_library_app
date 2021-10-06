import { Container, Grid, Link, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth, db, provider } from "../../firebase";
import { deleteFavoriteMovie } from "../../logics/util/deleteAnFavoriteMovie";
import { FavoriteMovies } from "../organisms/FavoriteMovies";
import { useAuthContext } from "../providers/AuthProvider";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { Img } from "../styles/Img";

export const MyPage = () => {
  const { user } = useAuthContext();
  const { favoriteMovies, setFavoriteMovies } = useContext(MoviePagesContext);
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      let movies: any = [];
      db.collection("movies")
        .where("uid", "==", user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            movies.push(doc.data().content);
            [];
          });
          setFavoriteMovies(movies);
        });
    }
  }, []);

  const onClickAnFavorite = (movieId) => {
    const newMovies = favoriteMovies.filter((movie) => {
      if (movie.id === movieId) {
        deleteFavoriteMovie(movie);
      } else {
        return movie;
      }
    });
    setFavoriteMovies(newMovies);
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

  return (
    <Container sx={{ my: 5 }}>
      <h1>マイページ</h1>
      {user ? (
        <>
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">{user.displayName}</Typography>
            <Box>
              <Img
                src={user.photoURL}
                style={{
                  margin: "initial",
                  maxWidth: "250px",
                  borderRadius: "100%",
                  width: "100%",
                }}
              />
            </Box>
            <Typography variant="h6">Email：{user.email}</Typography>
            <Typography variant="h6">
              最終アクセス時間：{user.metadata.lastSignInTime}
            </Typography>
          </Stack>

          <Box sx={{ mt: 10 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 5 }}>
              お気に入りした映画
            </Typography>
            <FavoriteMovies
              favoriteMovies={favoriteMovies}
              onClickAnFavorite={onClickAnFavorite}
            />
          </Box>
        </>
      ) : (
        <>
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5">ゲストさん</Typography>
            <Box>
              <Img
                src="https://mui.com/static/images/avatar/1.jpg"
                style={{
                  margin: "initial",
                  maxWidth: "120px",
                  borderRadius: "100%",
                  width: "100%",
                }}
              />
              <Typography variant="h5" sx={{ mt: 5 }}>
                <Link onClick={handleLogin}>ログイン</Link>
                するとお気に入りした映画が確認できます。
              </Typography>
            </Box>
          </Stack>
        </>
      )}
    </Container>
  );
};

export default MyPage;
