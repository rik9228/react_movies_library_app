import { CircularProgress, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, VFC } from "react";
import { useParams } from "react-router";
import { useFetchAllPageCount } from "../hooks/useFetchAllPageCount";
import { useFetchMovie } from "../hooks/useFetchMovie";
import { Movies } from "../organisms/Movies";
import { PaginationComponents } from "../organisms/PaginationComponents";
import { MoviePagesContext } from "../providers/MoviePagesProvider";

export const SearchMovies: VFC = React.memo(() => {
  const { params } = useParams<{ params: string }>();
  const { fetchMovie } = useFetchMovie(params);
  const { fetchAllPageCount } = useFetchAllPageCount(params);

  const { currentPage, isLoading } = useContext(MoviePagesContext);

  // currentPageが更新されるたびに走らせる処理;
  useEffect(() => {
    fetchMovie();
    fetchAllPageCount();
  }, [currentPage, params]);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress size={80} />
        </Box>
      ) : (
        <Container>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", my: 4 }}
          >
            検索結果：{params}
          </Typography>
          <Movies />
          <PaginationComponents />
        </Container>
      )}
    </>
  );
});
