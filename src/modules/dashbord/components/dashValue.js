import React, { useState, useEffect } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { TableCell } from "@material-ui/core";

export default function DashDeails(props) {
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
        {/* {console.log(+detail.maxHumidity)} */}
        {props.st === 1 ? (
          // <TableCell align="right">{dataItem.humadity}</TableCell>
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
        ) : // <TableCell align="right">{dataItem.ligth}</TableCell>
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
        )}
      </>
    );
  }
  return <></>;
}
