import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import Delete from "@material-ui/icons/Delete";
import { useSnackbar } from "notistack";
import firebaseConfig from "../../firebase/config/config";
import Editmaster from "../dashbord/components/editmastes";
import ButtonAdd from "../dashbord/components/butaddroom";
import Adduser from "./adduser";

export default function Selectmuseum(props) {
  const { data } = props;
  const [detail, setDetail] = useState();
  const [age, setAge] = useState("");
  const [count, setCount] = useState("");
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getdata = () => {
      const mydata = firebaseConfig.firestore().collection(`${age.work}`);
      mydata.onSnapshot((snap) => {
        let sum = 0;
        const dataIn = {};
        snap.forEach((doc) => {
          sum = sum + 1;
          dataIn[doc.id] = doc.data();
        });
        setDetail(dataIn);
        setCount(sum);
      });
    };
    getdata();
  }, [age]);

  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value === "none") {
      setCount(0);
    }
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

  if (data) {
    return (
      <>
        <Grid item xs={10}>
          <Box
            sx={{ m: 1, minWidth: 120 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              component="div"
              style={{ padding: "20px" }}
            >
              Select museum
            </Typography>
            <FormControl variant="filled">
              <InputLabel id="demo-simple-select-filled-label">
                Display
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                autoWidth
                value={age}
                label="Display"
                onChange={handleChange}
                style={{
                  width: "150px",
                }}
              >
                <MenuItem value={"none"}>none</MenuItem>
                {Object.keys(data).map((id) => (
                  <MenuItem key={id} value={data[id]}>
                    {data[id].work}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        {console.log(detail)}
        {age === "" || age === "none" ? (
          <Grid item xs={10}></Grid>
        ) : (
          <>
            <Grid item xs={10}>
              <div
                style={{
                  backgroundColor: "#A9A9A9",
                  // height: "60px",
                  alignItems: "center",
                  justifyContent: "space-between",
                  display: "flex",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  {age.work}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                  Token : {age.Token}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                  Summary : {count}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={10}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Edit</TableCell>
                      <TableCell align="center">TitleRoom</TableCell>
                      <TableCell align="center">IDcontroller</TableCell>
                      <TableCell align="center">Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(detail).map((id) => (
                      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                        <TableCell align="center">
                          <Editmaster
                            row={detail[id]}
                            id={id}
                            token={age.Token}
                          ></Editmaster>
                        </TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {detail[id].titleRoom}
                        </TableCell>
                        <TableCell align="center">
                          {detail[id].IDcontroller}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            color="primary"
                            onClick={handleClickOpen}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
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
                              After deleting the data will disappear
                              immediately.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() => deletethis(age.work, id)}
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ButtonAdd work={age.work}></ButtonAdd>
            </Grid>
          </>
        )}
        <Adduser></Adduser>
      </>
    );
  }
  return <></>;
}
