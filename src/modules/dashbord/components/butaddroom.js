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
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import firebaseConfig from "../../../firebase/config/config";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  titleapp: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  addButton: {
    position: "fixed",
    bottom: "7%",
    left: "100",
    right: 50,
  },
}));

export default function ButtonAdd(props) {
  const { work } = props;
  const { enqueueSnackbar } = useSnackbar();
  const deFault = {
    IDcontroller: ``,
    TitleRoom: ``,
    maxHumidity: ``,
    minHumidity: ``,
    maxLigth: ``,
    minLigth: ``,
  };
  const [datacheck, setDatacheck] = useState(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const [info, setInfo] = useState();
  const classes = useStyles();
  const { userContext } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        contlroller: yup.string().required(),
        titleRoom: yup.string().required(),
        maxHumadity: yup.string().required(),
        minHumadity: yup.string().required(),
        maxLigth: yup.string().required(),
        minLigth: yup.string().required(),
      })
    ),
  });

  useEffect(() => {
    if (userContext) {
      setUser(userContext);
    } else {
      setUser(userContext);
    }
  }, [userContext]);

  useEffect(() => {
    if (datacheck) {
      // console.log(datacheck._delegate.size);
      if (datacheck._delegate.size === 0) {
        const handleClick = () => {
          enqueueSnackbar("No IDcontroller", {
            variant: "error",
          });
        };
        reset(deFault);
        return handleClick() || handleClose();
      } else {
        const add = async () => {
          await firebaseConfig
            .firestore()
            .collection(`${work}`)
            .add({
              IDcontroller: `${info.contlroller}`,
              titleRoom: `${info.titleRoom}`,
              maxHumidity: `${info.maxHumadity}`,
              minHumidity: `${info.minHumadity}`,
              maxLigth: `${info.maxLigth}`,
              minLigth: `${info.minLigth}`,
              createdAt: new Date(Date.now()),
            });

          await firebaseConfig
            .database()
            .ref(`data/${info.contlroller}`)
            .update({
              titleRoom: `${info.titleRoom}`,
              maxHumidity: `${info.maxHumadity}`,
              minHumidity: `${info.minHumadity}`,
              maxLigth: `${info.maxLigth}`,
              minLigth: `${info.minLigth}`,
              IDmuseum: `${user[0].work}`,
              Token: `${userContext[0].Token}`,
            });
          reset(deFault);
          const handleClick = () => {
            enqueueSnackbar("Add room success!", {
              variant: "success",
            });
          };

          return handleClick() || handleClose();
        };
        add();
      }

      setDatacheck(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const submit = (loginInfo) => {
    try {
      const getdata = async () => {
        const mydata = await firebaseConfig
          .database()
          .ref(`data/${loginInfo.contlroller}`)
          .get();
        setDatacheck(mydata);
        setInfo(loginInfo);
      };

      getdata();
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          className={classes.addButton}
        >
          AddRoom
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <Toolbar className={classes.titleapp}>
            <DialogTitle id="form-dialog-title">AddRoom</DialogTitle>
          </Toolbar>
          <form onSubmit={handleSubmit(submit)} noValidate autoComplete="off">
            <DialogContent>
              <FormControl>
                <TextField
                  {...register("contlroller")}
                  autoFocus
                  margin="dense"
                  id="contlroller"
                  label="ID-contlroller"
                  name="contlroller"
                  type="contlroller"
                  fullWidth
                  helperText={errors.contlroller?.message || ""}
                  error={!!errors.contlroller}
                />
                <TextField
                  {...register("titleRoom")}
                  margin="dense"
                  id="titleRoom"
                  label="titleRoom"
                  name="titleRoom"
                  type="titleRoom"
                  fullWidth
                  helperText={errors.titleRoom?.message || ""}
                  error={!!errors.titleRoom}
                />

                <TextField
                  {...register("maxHumadity")}
                  margin="dense"
                  id="maxHumadity"
                  label="maxHumadity"
                  name="maxHumadity"
                  type="maxHumadity"
                  fullWidth
                  helperText={errors.maxHumadity?.message || ""}
                  error={!!errors.maxHumadity}
                />
                <TextField
                  {...register("minHumadity")}
                  margin="dense"
                  id="minHumadity"
                  label="minHumadity"
                  name="minHumadity"
                  type="minHumadity"
                  fullWidth
                  helperText={errors.minHumadity?.message || ""}
                  error={!!errors.minHumadity}
                />

                <TextField
                  {...register("maxLigth")}
                  margin="dense"
                  id="maxLigth"
                  label="maxLigth"
                  name="maxLigth"
                  type="maxLigth"
                  fullWidth
                  helperText={errors.maxLigth?.message || ""}
                  error={!!errors.maxLigth}
                />
                <TextField
                  {...register("minLigth")}
                  margin="dense"
                  id="minLigth"
                  label="minLigth"
                  name="minLigth"
                  type="minLigth"
                  fullWidth
                  helperText={errors.minLigth?.message || ""}
                  error={!!errors.minLigth}
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                addRoom
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    );
  }
  return <></>;
}
