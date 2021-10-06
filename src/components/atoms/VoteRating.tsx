import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export const VoteRating = (props) => {
  const { voteCount, readOnlyValue } = props;

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating"
        defaultValue={voteCount}
        precision={0.5}
        max={5}
        readOnly={readOnlyValue}
      />
    </Stack>
  );
};

// props デフォ値
VoteRating.defaultProps = {
  voteCount: 5,
  readOnlyValue: true,
};
