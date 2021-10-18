import React, { useContext } from "react";
import firebaseConfig from "../../../firebase/config/config";
import { AuthContext } from "../../../context/componentss/context";
import {
  TableCell,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import DashValue from "./dashValue";
import Editmaster from "./editmastes";
import Delete from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";

export default function Tabledata(props) {
  const { row, id } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { userContext } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletethis = async (work, idDoc) => {
    const deleteit = await firebaseConfig
      .firestore()
      .collection(`${work}`)
      .doc(`${idDoc}`)
      .delete();
    const handleClick = () => {
      enqueueSnackbar("Delete room success!", {
        variant: "success",
      });
    };
    return handleClick() || deleteit;
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Editmaster row={row} id={id}></Editmaster>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.titleRoom}
        </TableCell>
        <TableCell align="right">{row.IDcontroller}</TableCell>
        <DashValue detail={row} st={1} key={id}></DashValue>
        <DashValue detail={row} st={2} key={row.titleRoom}></DashValue>
        <TableCell align="right">
          <IconButton
            aria-label="expand row"
            size="small"
            color="primary"
            onClick={handleClickOpen}
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" Are you sure to delete ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After deleting the data will disappear immediately.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={
              () => deletethis(userContext[0].work, id)
              // firebaseConfig
              //   .firestore()
              //   .collection(`${userContext[0].work}`)
              //   .doc(`${id}`)
              //   .delete()
            }
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
