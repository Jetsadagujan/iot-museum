import React, { useContext } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { AuthContext } from "../../../context/componentss/context";
import { TableCell, TableRow, Button, IconButton } from "@material-ui/core";
import DashValue from "./dashValue";
import Editmaster from "./editmastes";
import Delete from "@material-ui/icons/Delete";

export default function Tabledata(props) {
  const { row, id } = props;
  const { userContext } = useContext(AuthContext);

  return (
    <React.Fragment>
      {/* {console.log(id)} */}
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Editmaster row={row} id={id}></Editmaster>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.titleRoom}
        </TableCell>
        <TableCell align="right">{row.IDcontroller}</TableCell>
        {/* <TableCell align="right">{row.maxHumidity}</TableCell>
        <TableCell align="right">{row.minHumidity}</TableCell>
        <TableCell align="right">{row.maxLight}</TableCell>
        <TableCell align="right">{row.minLigth}</TableCell> */}
        <DashValue detail={row} st={1} key={id}></DashValue>
        <DashValue detail={row} st={2} key={row.titleRoom}></DashValue>
        <TableCell align="right">
          {/* <Button
            variant="outlined"
            color="primary"
          >
            Delete
          </Button> */}
          <IconButton
            aria-label="expand row"
            size="small"
            color="primary"
            onClick={() =>
              firebaseConfig
                .firestore()
                .collection(`${userContext[0].work}`)
                .doc(`${id}`)
                .delete()
            }
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
