import * as React from "react";
import { LinearProgress, Box } from "@material-ui/core";

export default function Loading() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
