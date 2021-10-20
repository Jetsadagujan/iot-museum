import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Toolbar,
  FormControl,
  Link,
  DialogContentText,
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
}));

export default function Forgotpass() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    //mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
      })
    ),
  });

  const submit = async (Changpass) => {
    try {
      await firebaseConfig.auth().sendPasswordResetEmail(Changpass.email);
      const handleClick = () => {
        enqueueSnackbar("Check your email to change your password.!", {
          variant: "success",
        });
      };
      return handleClick();
      //console.log(loginInfo);
    } catch (error) {
      const handleClick = () => {
        enqueueSnackbar("This email is not signUp.!", {
          variant: "error",
        });
      };
      return handleClick();
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
      <Link onClick={handleClickOpen}>Forgot password.</Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Toolbar className={classes.titleapp}>
          <DialogTitle id="form-dialog-title">Change your password</DialogTitle>
        </Toolbar>
        <form onSubmit={handleSubmit(submit)} noValidate autoComplete="off">
          <DialogContent>
            <DialogContentText>
              Enter your email to change your password.
            </DialogContentText>
            <FormControl style={{ display: "flex", justifyContent: "center" }}>
              <TextField
                {...register("email")}
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                name="email"
                type="email"
                fullWidth
                helperText={errors.email?.message || ""}
                error={!!errors.email}
              />
              <Button
                type="submit"
                onClick={handleClose}
                color="primary"
                variant="outlined"
              >
                SEND
              </Button>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
