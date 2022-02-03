import React, { useRef, useState, useEffect, useContext } from "react";
import { useReactToPrint } from "react-to-print";
import { AuthContext } from "../../../../context/componentss/context";
import firebaseConfig from "../../../../firebase/config/config";
import SelectData from "./selectData";
import { Skeleton } from "@material-ui/lab";
import { Button, Grid } from "@material-ui/core";

const Todata = (props) => {
  const { data } = props;

  if (data) {
    return (
      <>
        <SelectData IDctl={data}></SelectData>
      </>
    );
  }
  return <div>Loading..............</div>;
};

class ComponentToPrint extends React.Component {
  render() {
    return <Todata data={this.props.data}></Todata>;
  }
}

const ExamplePDF = () => {
  const [data, setData] = useState();
  const { userContext } = useContext(AuthContext);
  const componentRef = useRef();

  useEffect(() => {
    firebaseConfig
      .firestore()
      .collection(`${userContext[0].work}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((ss) => {
        // ตัวแปร local
        const users = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          users[document.id] = document.data();
        });

        // เปลี่ยนค่าตัวแปร state
        setData(users);
      });
  }, [userContext]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (data) {
    return (
      <Grid container justifyContent={"center"} spacing={2}>
        <Grid item xs={12}>
          <ComponentToPrint ref={componentRef} data={data} />
        </Grid>
        <Grid item xs={10}>
          <Button variant="contained" onClick={handlePrint} color="primary">
            Print this
          </Button>
        </Grid>
      </Grid>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Skeleton variant="text" width={"80%"} />
        <Skeleton variant="rect" width={"80%"} height={100} />
        <Skeleton variant="rect" width={"80%"} height={300} />
      </div>
    </>
  );
};
export default ExamplePDF;
