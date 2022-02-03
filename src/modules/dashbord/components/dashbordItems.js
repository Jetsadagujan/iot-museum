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
import Selectdisplay from "./selectdisplay";
import ButtonAdd from "./butaddroom";
import { Skeleton } from "@material-ui/lab";

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
  }, [userContext]);

  if (dash) {
    return (
      <>
        <Selectdisplay IDctl={dash}></Selectdisplay>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={10}>
            {dash ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Edit</TableCell>
                      <TableCell>TitleRoom</TableCell>
                      <TableCell align="right">IDcontroller</TableCell>
                      <TableCell align="right">Humidity</TableCell>
                      <TableCell align="right">Light</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Delete</TableCell>
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
        </Grid>
        <ButtonAdd work={userContext[0].work}></ButtonAdd>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="rect" width={"80%"} height={100} />
        <Skeleton variant="rect" width={"80%"} height={300} />
      </div>
    </>
  );
}
