import React, { useState, useEffect, useContext } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { AuthContext } from "../../../context/componentss/context";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Tabledata from "./row";
import Graph from "./graph";

export default function DashbordItem() {
  const [dash, setDash] = useState(undefined);
  const { userContext } = useContext(AuthContext);

  useEffect(() => {
    firebaseConfig
      .firestore()
      .collection(`${userContext[0].work}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((ss) => {
        // ตัวแปร local
        const users = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          users[document.id] = document.data();
        });

        // เปลี่ยนค่าตัวแปร state
        setDash(users);
      });

    // firebaseConfig.firestore().collection(`${userContext[0].work}`).orderBy;
  }, [userContext]);

  if (dash) {
    return (
      <>
        <Graph></Graph>
        {/* {Object.keys(dash).map((id) => {
          return <div key={id}>{console.log(dash[id].createdAt)}</div>;
        })} */}
        <Grid container spacing={2} justifyContent="center">
          {dash ? (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>TitleRoom</TableCell>
                    <TableCell align="right">maxHumidity</TableCell>
                    <TableCell align="right">minHumidity</TableCell>
                    <TableCell align="right">maxLight</TableCell>
                    <TableCell align="right">minLigth</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">Light</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(dash).map((id) => (
                    <Tabledata key={id} row={dash[id]} id={id} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <div>loading.........itemdash</div>
          )}
        </Grid>
      </>
    );
  }
  return <div>loading.........itemdash</div>;
}
