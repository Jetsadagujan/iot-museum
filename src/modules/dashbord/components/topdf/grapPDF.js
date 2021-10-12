/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";
import firebaseConfig from "../../../../firebase/config/config";
import Loading from "../Loading";
import { Skeleton } from "@material-ui/lab";

export default function GraphPDF(props) {
  const [loading, setLoading] = useState(true);
  const { controller, dateSelect } = props;
  const [dataGraph, setDatagraph] = useState(undefined);
  const [idDoc, setIddoc] = useState(undefined);
  var series = [
    {
      name: "humadity",
      data: [0],
    },
    {
      name: "ligth",
      data: [0],
    },
  ];
  var options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "string",
      categories: ["00:00"],
    },
    tooltip: {
      x: {
        format: "HH:mm",
      },
    },
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const check = () => {
      setDatagraph(null);
      try {
        firebaseConfig
          .firestore()
          .collection(`${controller}`)
          .where("createdAt", "==", new Date(`${dateSelect}`))
          .onSnapshot((ss) => {
            const data = {};
            ss.forEach((document) => {
              data[document.id] = document.data();
              setIddoc(document.id);
            });
            setDatagraph(data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    check();
    setLoading(false);
  }, [controller, dateSelect, loading]);

  if (!controller || controller === "none") {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          "& > :not(style)": {
            m: 1,
            width: "100%",
            height: 128,
          },
        }}
      >
        <Paper
          elevation={5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
              "radial-gradient(circle, rgba(251,167,63,1) 11%, rgba(251,252,70,1) 100%)",
          }}
        >
          <Typography variant="h3" gutterBottom component="div">
            No Select
          </Typography>
        </Paper>
      </Box>
    );
  } else if (dataGraph) {
    try {
      series = [
        {
          name: "humadity",
          data: dataGraph[idDoc].humadity,
        },
        {
          name: "ligth",
          data: dataGraph[idDoc].ligth,
        },
      ];
      options = {
        chart: {
          height: 350,
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "string",
          categories: dataGraph[idDoc].time,
        },
        tooltip: {
          x: {
            format: "HH:mm",
          },
        },
      };
    } catch (error) {}
    return (
      <>
        {Object.keys(dataGraph).length === 0 &&
        dataGraph.constructor === Object ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: 128,
              },
            }}
          >
            <Paper
              elevation={5}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "radial-gradient(circle, rgba(63,251,167,1) 11%, rgba(70,252,106,1) 100%)",
              }}
            >
              <Typography variant="h3" gutterBottom component="div">
                No Data in Date
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Grid item xs={12}>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
            />
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Time</TableCell>
                    <TableCell align="right">maxHumidity</TableCell>
                    <TableCell align="right">minHumidity</TableCell>
                    <TableCell align="right">maxLight</TableCell>
                    <TableCell align="right">minLigth</TableCell>
                    <TableCell align="right">Humidity</TableCell>
                    <TableCell align="right">Light</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataGraph ? (
                    dataGraph[idDoc].humadity.map((id, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="right">
                          {dataGraph[idDoc].time[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].maxHumidity[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].minHumidity[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].maxLight[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].minLigth[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].humadity[index]}
                        </TableCell>
                        <TableCell align="right">
                          {dataGraph[idDoc].ligth[index]}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
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
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </>
    );
  }

  return (
    <>
      <Loading></Loading>
    </>
  );
}
