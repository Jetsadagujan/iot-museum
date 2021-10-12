import React, { useContext } from "react";
import {
  Toolbar,
  Container,
  Grid,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";
import HeaderSignUp from "./headerSignUp";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import firebaseConfig from "../../../firebase/config/config";
import { Link } from "@material-ui/core";
import { Redirect } from "react-router";
import { AuthContext } from "../../../context/componentss/context";

export default function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        passwordConfirm: yup
          .string()
          .min(6)
          .required()
          .oneOf([yup.ref("password"), null, ""]),
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        IDworkPlace: yup.string().min(6).required(),
        TelephoneNumber: yup.string().min(6).required(),
        Address: yup.string().required(),
      })
    ),
  });
  const submit = async (signUpInfo) => {
    try {
      await firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(signUpInfo.email, signUpInfo.password);
      // eslint-disable-next-line no-unused-expressions
      await firebaseConfig
        .firestore()
        .collection("user")
        .add({
          email: `${signUpInfo.email}`,
          fullname: `${signUpInfo.firstName} ${signUpInfo.lastName}`,
          work: `${signUpInfo.IDworkPlace}`,
          tell: `${signUpInfo.TelephoneNumber}`,
          address: `${signUpInfo.Address}`,
        });
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/"></Redirect>;
  }
  return (
    <>
      <HeaderSignUp></HeaderSignUp>
      <Toolbar></Toolbar>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(submit)} noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("email")}
                    margin="dense"
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    fullWidth
                    autoFocus
                    helperText={errors.email?.message || ""}
                    error={!!errors.email}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl>
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
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("passwordConfirm")}
                    margin="dense"
                    id="passwordConfirm"
                    label="passwordConfirm"
                    name="passwordConfirm"
                    type="password"
                    fullWidth
                    helperText={errors.passwordConfirm?.message || ""}
                    error={!!errors.passwordConfirm}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("firstName")}
                    margin="dense"
                    id="firstName"
                    label="firstName"
                    name="firstName"
                    type="firstName"
                    fullWidth
                    helperText={errors.firstName?.message || ""}
                    error={!!errors.firstName}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("lastName")}
                    margin="dense"
                    id="lastName"
                    label="lastName"
                    name="lastName"
                    type="lastName"
                    fullWidth
                    helperText={errors.lastName?.message || ""}
                    error={!!errors.lastName}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("IDworkPlace")}
                    margin="dense"
                    id="IDworkPlace"
                    label="IDworkPlace"
                    name="IDworkPlace"
                    type="IDworkPlace"
                    fullWidth
                    helperText={errors.IDworkPlace?.message || ""}
                    error={!!errors.IDworkPlace}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl>
                  <TextField
                    {...register("TelephoneNumber")}
                    margin="dense"
                    id="TelephoneNumber"
                    label="TelephoneNumber"
                    name="TelephoneNumber"
                    type="TelephoneNumber"
                    fullWidth
                    helperText={errors.TelephoneNumber?.message || ""}
                    error={!!errors.TelephoneNumber}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl>
                <TextField
                  multiline
                  rows={4}
                  {...register("Address")}
                  margin="dense"
                  id="Address"
                  label="Address"
                  name="Address"
                  type="Address"
                  fullWidth
                  helperText={errors.Address?.message || ""}
                  error={!!errors.Address}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Link href="/" underline="none">
                <Button type="submit" variant="contained" color="primary">
                  SignUp
                </Button>
              </Link>
              <Link href="/" underline="none">
                <Button variant="contained" color="secondary">
                  Close
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}
