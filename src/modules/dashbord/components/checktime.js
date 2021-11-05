import React, { useState, useEffect } from "react";
// import firebaseConfig from "../../../firebase/config/config";
import { TableCell } from "@material-ui/core";

const date = new Date();

export default function CheckTime(props) {
  const { time } = props;
  // const [count, setCount] = useState(0);
  //   const [lcount, setLcount] = useState(0);
  const [dateTime, setDateTime] = useState(date.getSeconds());
  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime(date.getHours() + date.getMinutes() + date.getSeconds());
      // setCount(+time);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {+time < +dateTime + 10 && +time > +dateTime - 10 ? (
        <TableCell
          align="right"
          style={{ backgroundColor: "white", color: "green" }}
        >
          Online
        </TableCell>
      ) : (
        <TableCell
          align="right"
          style={{ backgroundColor: "white", color: "red" }}
        >
          Offline
        </TableCell>
      )}
    </>
  );
}
