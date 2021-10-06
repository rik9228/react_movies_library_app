import React from "react";
import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export const Error = () => {
  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h1" component="h2" sx={{ fontWeight: 600 }}>
        404
      </Typography>
      <Typography variant="h6" component="p" sx={{ mt: 3 }}>
        お探しのページは見つかりませんでした。
      </Typography>
      <Button
        to="/"
        component={Link}
        color="primary"
        variant="contained"
        sx={{ mt: 5, px: 10 }}
      >
        ホームに戻る
      </Button>
    </Container>
  );
};
