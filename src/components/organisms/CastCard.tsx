import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

export const CastCard = (props) => {
  const { character, original_name, profileImg } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="auto"
        image={
          profileImg
            ? "https://image.tmdb.org/t/p/original/" + profileImg
            : "https://www.paddlesteamers.org/wp-content/uploads/2018/01/profile-unknown-male.jpg"
        }
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom component="h3">
          <Box sx={{ fontWeight: "bold" }}>{character}</Box>
        </Typography>
        <Typography gutterBottom component="p">
          {original_name}
        </Typography>
      </CardContent>
    </Card>
  );
};
