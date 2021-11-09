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
import { useSnackbar } from "notistack";

const useStyles = makeStyles((theme) => ({
  titleapp: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export default function Editmaster(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { row, id } = props;
  const [datacheck, setDatacheck] = useState(null);
  const [info, setInfo] = useState();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState();
  const classes = useStyles();
  const { userContext } = useContext(AuthContext);
  const deFault = {
    IDcontroller: `${row.IDcontroller}`,
    TitleRoom: `${row.titleRoom}`,
    maxHumidity: `${row.maxHumidity}`,
    minHumidity: `${row.minHumidity}`,
    maxLigth: `${row.maxLigth}`,
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
        maxLigth: yup.string().required(),
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

  useEffect(() => {
    if (datacheck) {
      const add = async () => {
        await firebaseConfig
          .firestore()
          .collection(`${user[0].work}`)
          .doc(`${id}`)
          .update({
            IDcontroller: `${info.IDcontroller}`,
            titleRoom: `${info.TitleRoom}`,
            maxHumidity: `${info.maxHumidity}`,
            minHumidity: `${info.minHumidity}`,
            maxLigth: `${info.maxLigth}`,
            minLigth: `${info.minLigth}`,
            createdAt: new Date(Date.now()),
          });
        const mydata = await firebaseConfig
          .database()
          .ref(`data/${info.IDcontroller}`)
          .update({
            titleRoom: `${info.TitleRoom}`,
            maxHumidity: `${info.maxHumidity}`,
            minHumidity: `${info.minHumidity}`,
            maxLigth: `${info.maxLigth}`,
            minLigth: `${info.minLigth}`,
            IDmuseum: `${user[0].work}`,
          });
        const handleClick = () => {
          enqueueSnackbar("Edit room success!", {
            variant: "success",
          });
        };
        return handleClick() || handleClose() || mydata;
      };
      add();
      setDatacheck(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);

  const submit = (loginInfo) => {
    try {
      const getdata = async () => {
        const mydata = await firebaseConfig
          .database()
          .ref(`data/${loginInfo.IDcontroller}`)
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
                  {...register("maxLigth")}
                  margin="dense"
                  id="maxLigth"
                  label="maxLigth"
                  name="maxLigth"
                  type="maxLigth"
                  fullWidth
                  color="primary"
                  //autoFocus
                  helperText={errors.maxLigth?.message || ""}
                  error={!!errors.maxLigth}
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
