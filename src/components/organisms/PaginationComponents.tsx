import React, { useContext } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { MoviePagesContext } from "../providers/MoviePagesProvider";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
}));

export const PaginationComponents = () => {
  const { currentPage, totalPages, setCurrentPage } =
    useContext(MoviePagesContext);

  const updateCurrentPage = (e) => {
    setCurrentPage(Number(e.target.textContent));
  };

  const classes = useStyles();

  return (
    <>
      {totalPages ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Stack spacing={2}>
            <Pagination
              count={totalPages} // 総ページ数
              page={currentPage} // 現在のページ
              onClick={updateCurrentPage}
              color="primary"
              classes={{ ul: classes.ul }}
            />
          </Stack>
        </Box>
      ) : null}
    </>
  );
};
