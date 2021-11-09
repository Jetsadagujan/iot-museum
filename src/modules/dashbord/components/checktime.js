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
      setDateTime(
        `${date.getHours() + 11}${date.getMinutes() + 11}${
          date.getSeconds() + 11
        }`
      );
      // setCount(+time);
    }, 3);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {console.log(dateTime)} */}
      {+time < +dateTime + 7 && +time > +dateTime - 7 ? (
        <TableCell
          align="right"
          style={{ backgroundColor: "white", color: "green" }}
        >
          {/* {console.log(`${time}    ${dateTime}`)} */}
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
