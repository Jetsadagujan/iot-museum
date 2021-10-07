import React, { useState, useEffect } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { TableCell } from "@material-ui/core";

export default function DashDeails(props) {
  const [dataItem, setSensor] = useState();
  useEffect(() => {
    const mydata = firebaseConfig
      .database()
      .ref(`data/${props.detail.IDcontroller}`);
    mydata.on("value", (datasnap) => setSensor(datasnap.val()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (dataItem) {
    return (
      <>
        {props.st === 1 ? (
          <TableCell align="right">{dataItem.humadity}</TableCell>
        ) : (
          <TableCell align="right">{dataItem.ligth}</TableCell>
        )}
      </>
    );
  }
  return <></>;
}
