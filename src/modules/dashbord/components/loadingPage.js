import * as React from "react";
import { Skeleton } from "@material-ui/lab";

export default function LoadingPage() {
  return (
    <>
      <Skeleton variant="rect" width={"100%"} height={100} />
      <Skeleton variant="text" />
    </>
  );
}
