import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase/config/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, FormControl } from "@material-ui/core";

export default function SearchFire() {
  const [search, setSearch] = useState();
  const [user, setUser] = useState();
  const deFault = { search: "" };
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
        search: yup.string().email().required(),
      })
    ),
  });

  useEffect(() => {
    async function getUser() {
      try {
        const data = await firebaseConfig.firestore().collection("user").get();
        const dataSearch = data.docs.map((eachDaea) => eachDaea.data());
        setUser(dataSearch);
      } catch (error) {}
    }
    if (search) {
      getUser();
      console.log(search);
    } else {
      console.log(search);
    }
  });

  console.log(user);

  const SubmitSearch = (searchInfo) => {
    try {
      setSearch(searchInfo);
      reset(deFault);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(SubmitSearch)} noValidate autoComplete="off">
        <FormControl>
          <TextField
            {...register("search")}
            margin="dense"
            id="search"
            label="Search"
            name="search"
            type="search"
            fullWidth
            color="primary"
            //autoFocus
            helperText={errors.search?.message || ""}
            error={!!errors.search}
          ></TextField>
          <Button variant="contained" color="secondary" type="submit">
            submit
          </Button>
          <div>
            {user
              ? user.map((item) => <div key={item.email}>{item.email}</div>)
              : ""}
          </div>
        </FormControl>
      </form>
    </div>
  );
}
