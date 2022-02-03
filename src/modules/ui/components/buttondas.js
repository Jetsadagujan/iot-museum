import React, { useContext, useState, useEffect } from "react";
import { Button, Link } from "@material-ui/core";
import { AuthContext } from "../../../context/componentss/context";
import { useSnackbar } from "notistack";

export default function ButtonDash() {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(AuthContext);
  const submit = () => {
    console.log(currentUser);
  };
  const [user, setUser] = useState(null);

  const handleClick = () => {
    enqueueSnackbar("Please login to use.!", {
      variant: "error",
    });
  };

  useEffect(() => {
    if (currentUser) {
      setUser({ currentUser });
    } else {
      setUser(null);
    }
  }, [currentUser]);

  if (user) {
    return (
      <>
        <Link href="/dashbord">
          <Button variant="contained" onClick={submit} color="primary">
            go to dashbord
          </Button>
        </Link>
      </>
    );
  }
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        go to dashbord
      </Button>
    </>
  );
}
