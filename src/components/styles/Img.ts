import { styled } from "@mui/system";

const BaseImg = {
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
};

export const Img = styled("img")({ ...BaseImg });

export const ImgRound = styled("img")({
  ...BaseImg,
  maxWidth: "50%",
  maxHeight: "50%",
  borderRadius: "100%",
});
