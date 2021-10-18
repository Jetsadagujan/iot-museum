import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import firebaseConfig from "../../../firebase/config/config";
import { Typography, Box, Paper } from "@material-ui/core";
import Loading from "./Loading";

export default function Graph(props) {
  const { controller } = props;
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
    const check = async () => {
      try {
        firebaseConfig
          .firestore()
          .collection(`${controller}`)
          .where(
            "createdAt",
            "==",
            new Date(
              `${
                new Date().getMonth() + 1
              }/${new Date().getDate()}/${new Date().getFullYear()}/00:00:00`
            )
          )
          .onSnapshot((ss) => {
            const data = {};
            ss.forEach((document) => {
              data[document.id] = document.data();
              setIddoc(document.id);
            });
            setDatagraph(data);
          });
      } catch (error) {}
    };
    check();
  }, [controller]);

  if (!controller || controller === "none") {
    return (
      <>
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
              No Display Select
            </Typography>
          </Paper>
        </Box>
        {/* <div>
          <Typography variant="h4" gutterBottom component="div">
            No Select
          </Typography>
        </div> */}
      </>
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
          <div>
            <>
              {console.log("1 ==> ", series)}
              {console.log("2 ==> ", options)}
            </>
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={350}
            />
          </div>
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
