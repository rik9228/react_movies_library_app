import React from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

export const FormComponent = (props) => {
  const { onSubmitMovieTitle, onChangeValue } = props;
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={onSubmitMovieTitle}
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <FormControl
          sx={{
            width: "100%",
            background: "#808080",
            borderRadius: "200px",
            mr: 4,
          }}
        >
          <OutlinedInput
            placeholder="映画を検索"
            onChange={onChangeValue}
            inputProps={{
              style: {
                fontSize: "14px",
                padding: 10,
                color: "#fff",
              },
            }}
          />
        </FormControl>
      </Box>
    </>
  );
};
