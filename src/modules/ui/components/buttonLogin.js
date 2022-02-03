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
  // Link,
  Typography,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import firebaseConfig from "../../../firebase/config/config";
import Forgotpass from "./buttonforgotpass";
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  titleapp: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function ButtonLogin() {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const deFault = {
    email: ``,
    password: ``,
  };
  const classes = useStyles();
  const { userContext } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    //mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
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

  const submit = async (loginInfo) => {
    try {
      await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(loginInfo.email, loginInfo.password);
      const handleClick = () => {
        enqueueSnackbar("Login success!", {
          variant: "success",
        });
      };
      return handleClick() || handleClose() || reset(deFault);
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" gutterBottom>
          {user[0]?.fullname}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => firebaseConfig.auth().signOut()}
        >
          Logout
        </Button>
      </div>
    );
  }
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Toolbar className={classes.titleapp}>
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
        </Toolbar>
        <form onSubmit={handleSubmit(submit)} noValidate autoComplete="off">
          <DialogContent>
            <FormControl>
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
              <TextField
                {...register("password")}
                margin="dense"
                id="password"
                label="Password"
                name="password"
                type="password"
                fullWidth
                helperText={errors.password?.message || ""}
                error={!!errors.password}
              />
            </FormControl>
          </DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {/* <Link href="/signUp" underline="always">
              signUp
            </Link> */}
            {/* <Typography variant="body2" gutterBottom>
              ro
            </Typography> */}
            <Forgotpass></Forgotpass>
          </div>
          <DialogActions>
            <Button type="submit" color="primary">
              Login
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
