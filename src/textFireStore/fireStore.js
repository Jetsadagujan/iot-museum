import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase/config/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, FormControl } from "@material-ui/core";
import SearchFiretrue from "./search copy";

export default function FireStore() {
  const [user, setUser] = useState(undefined);
  const deFault = { email: "", fullname: "", work: "" };
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
        email: yup.string().email().required(),
        fullname: yup.string().required(),
        work: yup.string().required(),
      })
    ),
  });

  useEffect(() => {
    if (user) {
      firebaseConfig.firestore().collection("user").add(user);
      console.log(user);
      setUser(undefined);
    } else {
      console.log(user);
    }
  }, [user]);

  const Submit = (valueinfo) => {
    try {
      setUser(valueinfo);
      reset(deFault);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        backgroundColor: "tan",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit(Submit)} noValidate autoComplete="off">
        <FormControl>
          <TextField
            {...register("email")}
            margin="dense"
            id="email"
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            color="primary"
            //autoFocus
            helperText={errors.email?.message || ""}
            error={!!errors.email}
          ></TextField>
          <TextField
            {...register("fullname")}
            margin="dense"
            id="fullname"
            label="Full-Name"
            name="fullname"
            type="fullname"
            fullWidth
            color="primary"
            helperText={errors.fullname?.message || ""}
            error={!!errors.fullname}
          ></TextField>
          <TextField
            margin="dense"
            id="work"
            label="You-Work"
            name="work"
            type="work"
            {...register("work")}
            fullWidth
            color="primary"
            helperText={errors.work?.message || ""}
            error={!!errors.work}
          ></TextField>
          <Button variant="contained" color="secondary" type="submit">
            submit
          </Button>
        </FormControl>
      </form>
      <SearchFiretrue></SearchFiretrue>
    </div>
  );
}
