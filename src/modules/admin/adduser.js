import React, { useState } from "react";
// import { AuthContext } from "../../context/componentss/context";
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
import firebaseConfig from "../../firebase/config/config";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  titleapp: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  addButton: {
    position: "fixed",
    bottom: "7%",
    right: 160,
  },
}));

export default function Adduser() {
  const { enqueueSnackbar } = useSnackbar();
  const deFault = {
    email: ``,
    fullname: ``,
    Token: ``,
    tell: ``,
    work: ``,
  };
  const [open, setOpen] = useState(false);
  //   const [user, setUser] = useState();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        fullname: yup.string().required(),
        Token: yup.string().required(),
        tell: yup.number().min(10).required(),
        work: yup.string().required(),
      })
    ),
  });

  const submit = async (loginInfo) => {
    try {
      //   console.log(loginInfo);
      await firebaseConfig.firestore().collection("user").add({
        email: loginInfo.email,
        fullname: loginInfo.fullname,
        Token: loginInfo.Token,
        tell: loginInfo.tell,
        work: loginInfo.work,
      });
      reset(deFault);
      const handleClick = () => {
        enqueueSnackbar("Add room success!", {
          variant: "success",
        });
      };

      return handleClick() || handleClose();
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

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        className={classes.addButton}
      >
        CreateUser
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
                {...register("email")}
                autoFocus
                margin="dense"
                id="email"
                label="email"
                name="email"
                type="email"
                fullWidth
                helperText={errors.email?.message || ""}
                error={!!errors.email}
              />
              <TextField
                {...register("fullname")}
                margin="dense"
                id="fullname"
                label="fullname"
                name="fullname"
                type="fullname"
                fullWidth
                helperText={errors.fullname?.message || ""}
                error={!!errors.fullname}
              />

              <TextField
                {...register("Token")}
                margin="dense"
                id="Token"
                label="Token"
                name="Token"
                type="Token"
                fullWidth
                helperText={errors.Token?.message || ""}
                error={!!errors.Token}
              />
              <TextField
                {...register("tell")}
                margin="dense"
                id="tell"
                label="tell"
                name="tell"
                type="tell"
                fullWidth
                helperText={errors.tell?.message || ""}
                error={!!errors.tell}
              />

              <TextField
                {...register("work")}
                margin="dense"
                id="work"
                label="work"
                name="work"
                type="work"
                fullWidth
                helperText={errors.work?.message || ""}
                error={!!errors.work}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              CreateUser
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
