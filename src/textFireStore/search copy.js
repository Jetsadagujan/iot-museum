import React, { useEffect, useState } from "react";
import firebaseConfig from "../firebase/config/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField, FormControl } from "@material-ui/core";

export default function SearchFiretrue() {
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
        const data = await firebaseConfig
          .firestore()
          .collection("user")
          .where("email", "==", `${search}`)
          .get();
        const dataSearch = data.docs.map((eachDaea) => eachDaea.data());
        setUser(dataSearch);
      } catch (error) {
        console.log("error");
      }
    }
    if (search) {
      getUser();
      //console.log(search);
    } else {
      //console.log(search);
    }
  }, [search]);

  //console.log(user);

  const SubmitSearch = (searchInfo) => {
    const { search } = searchInfo;
    try {
      setSearch(search);
      reset(deFault);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {console.log(user.length)}
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
            {user ? user.map(({ work }) => <div key={work}>{work}</div>) : ""}
          </div>
        </FormControl>
      </form>
    </div>
  );
}
