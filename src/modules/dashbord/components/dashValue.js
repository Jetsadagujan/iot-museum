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

  // const sumCount = async (sum) => {
  //   setCount(sum);
  //   // console.log(count);
  // };

  if (dataItem) {
    return (
      <>
        {/* <CheckTime
          time={dataItem.time}
          id={props.detail.IDcontroller}
        ></CheckTime> */}
        {props.st === 1 ? (
          // <TableCell align="right">{dataItem.humadity}</TableCell>
          dataItem.humadity > +detail.maxHumidity ||
          dataItem.humadity < +detail.minHumidity ? (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "red" }}
            >
              {dataItem.humadity}
              {/* <div onChange={sumCount(dataItem.time)}></div> */}
            </TableCell>
          ) : (
            <TableCell
              align="right"
              style={{ backgroundColor: "white", color: "green" }}
            >
              {dataItem.humadity}
            </TableCell>
          )
        ) : // <TableCell align="right">{dataItem.ligth}</TableCell>
        props.st === 2 ? (
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
