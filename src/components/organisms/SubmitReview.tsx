import { Avatar, Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { VoteRating } from "../atoms/VoteRating";

export const SubmitReview = () => {
  const [value, setValue] = React.useState("Controlled");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Typography variant="h5" component="h2">
          レビュー
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <Avatar
            alt="No Avatar"
            src="https://mui.com/static/images/avatar/1.jpg"
          />
          <Box sx={{ ml: 2 }}>
            <Typography>名無しさん</Typography>
            <Typography>
              ああああああああああああああああああああああああああああああああああああああああああああああああ
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <VoteRating readOnlyValue={false} />
        </Box>
        <Box sx={{ mt: 5 }}>
          <TextField
            id="outlined-multiline-static"
            label="レビュー投稿"
            multiline
            rows={4}
            fullWidth={true}
            defaultValue="Default Value"
            onChange={handleChange}
            color="warning"
            InputLabelProps={{
              style: { color: "#fff" },
            }}
            InputProps={{
              style: { background: "#1e1e1e", color: "#fff" },
            }}
          />
        </Box>
        <Button
          sx={{ mt: 3, width: "10%" }}
          variant="contained"
          color="warning"
          endIcon={<SendIcon />}
        >
          送信
        </Button>
      </Box>
    </>
  );
};
