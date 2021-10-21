import React, { useState, useEffect } from "react";
import firebaseConfig from "../../../firebase/config/config";

const date = new Date();

export default function CheckTime(props) {
  const { time, id } = props;
  const [count, setCount] = useState(0);
  //   const [lcount, setLcount] = useState(0);
  const [dateTime, setDateTime] = useState(date.getSeconds());
  useEffect(() => {
    setCount(time);
    const timer = setInterval(() => {
      const date = new Date();
      setDateTime(date.getSeconds());
    }, 1000);
    return () => clearInterval(timer);
    // let sumtime = time;
    // const updateData = () => {
    //   firebaseConfig.database().ref(`data/${id}`).update({
    //     online: sumtime,
    //   });
    //   //   setCount(time);
    // };
    // return updateData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* {console.log(dateTime)}
      {console.log(`${count} ${id}`)} */}
      {/* {dateTime < count ? (
        <div>{console.log(`online ${id}`)}</div>
      ) : (
        <div>{console.log(`offline ${id}`)}</div>
      )} */}
    </>
  );
}
