import React, { useState, useEffect } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { TableCell } from "@material-ui/core";
import CheckTime from "./checktime";

export default function DashDeails(props) {
  // const [count, setCount] = useState(0);
  const { detail } = props;
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
          dataItem.humadity > +detail.maxHumidity ||
          dataItem.humadity < +detail.minHumidity ? (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "red" }}
            >
              {dataItem.humadity}
            </TableCell>
          ) : (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "green" }}
            >
              {dataItem.humadity}
            </TableCell>
          )
        ) : props.st === 2 ? (
          dataItem.ligth > +detail.maxLigth ||
          dataItem.ligth < +detail.minLigth ? (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "red" }}
            >
              {dataItem.ligth}
            </TableCell>
          ) : (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "green" }}
            >
              {dataItem.ligth}
            </TableCell>
          )
        ) : (
          <CheckTime
            time={dataItem.time}
            id={props.detail.IDcontroller}
          ></CheckTime>
        )}
      </>
    );
  }
  return <></>;
}
