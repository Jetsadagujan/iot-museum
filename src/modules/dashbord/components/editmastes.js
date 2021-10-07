import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/componentss/context";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  FormControl,
  IconButton,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import firebaseConfig from "../../../firebase/config/config";
import { Edit } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  titleapp: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function Editmaster(props) {
  const { row, id } = props;
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const classes = useStyles();
  const { userContext } = useContext(AuthContext);
  const deFault = {
    IDcontroller: `${row.IDcontroller}`,
    TitleRoom: `${row.titleRoom}`,
    maxHumidity: `${row.maxHumidity}`,
    minHumidity: `${row.minHumidity}`,
    maxLight: `${row.maxLight}`,
    minLigth: `${row.minLigth}`,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    //mode: "onBlur",
    defaultValues: deFault,
    resolver: yupResolver(
      yup.object().shape({
        IDcontroller: yup.string().required(),
        TitleRoom: yup.string().required(),
        maxHumidity: yup.string().required(),
        minHumidity: yup.string().required(),
        maxLight: yup.string().required(),
        minLigth: yup.string().required(),
      })
    ),
  });

  useEffect(() => {
    if (userContext) {
      setUser(userContext);
    } else {
      setUser(undefined);
    }
    reset(deFault);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [row]);

  const submit = async (loginInfo) => {
    try {
      await firebaseConfig
        .firestore()
        .collection(`${user[0].work}`)
        .doc(`${id}`)
        .set({
          IDcontroller: `${loginInfo.IDcontroller}`,
          titleRoom: `${loginInfo.TitleRoom}`,
          maxHumidity: `${loginInfo.maxHumidity}`,
          minHumidity: `${loginInfo.minHumidity}`,
          maxLight: `${loginInfo.maxLight}`,
          minLigth: `${loginInfo.minLigth}`,
          createdAt: new Date(Date.now()),
        });
    } catch (error) {
      alert(error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (user) {
    return (
      <>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={handleClickOpen}
        >
          <Edit />
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Toolbar className={classes.titleapp}>
            <DialogTitle id="form-dialog-title">EditRoom</DialogTitle>
          </Toolbar>
          <form onSubmit={handleSubmit(submit)} noValidate autoComplete="off">
            <DialogContent>
              <FormControl>
                <TextField
                  {...register("IDcontroller")}
                  margin="dense"
                  id="IDcontroller"
                  label="IDcontroller"
                  name="IDcontroller"
                  type="IDcontroller"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.IDcontroller?.message || ""}
                  error={!!errors.IDcontroller}
                ></TextField>

                <TextField
                  {...register("TitleRoom")}
                  margin="dense"
                  id="TitleRoom"
                  label="TitleRoom"
                  name="TitleRoom"
                  type="TitleRoom"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.TitleRoom?.message || ""}
                  error={!!errors.TitleRoom}
                ></TextField>

                <TextField
                  {...register("maxHumidity")}
                  margin="dense"
                  id="maxHumidity"
                  label="maxHumidity"
                  name="maxHumidity"
                  type="maxHumidity"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.maxHumidity?.message || ""}
                  error={!!errors.maxHumidity}
                ></TextField>

                <TextField
                  {...register("minHumidity")}
                  margin="dense"
                  id="minHumidity"
                  label="minHumidity"
                  name="minHumidity"
                  type="minHumidity"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.minHumidity?.message || ""}
                  error={!!errors.minHumidity}
                ></TextField>

                <TextField
                  {...register("maxLight")}
                  margin="dense"
                  id="maxLight"
                  label="maxLight"
                  name="maxLight"
                  type="maxLight"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.maxLight?.message || ""}
                  error={!!errors.maxLight}
                ></TextField>

                <TextField
                  {...register("minLigth")}
                  margin="dense"
                  id="minLigth"
                  label="minLigth"
                  name="minLigth"
                  type="minLigth"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.minLigth?.message || ""}
                  error={!!errors.minLigth}
                ></TextField>
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
  return <></>;
}
