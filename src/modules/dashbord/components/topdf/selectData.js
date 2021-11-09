import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
  Grid,
} from "@material-ui/core";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GraphPDF from "./grapPDF";
import "react-datepicker/dist/react-datepicker.css";
import "./DateStyles.css";

export default function SelectData(props) {
  const [selectDate, setSelectDate] = useState(null);

  const { IDctl } = props;
  const [age, setAge] = useState("");

  useEffect(() => {
    // console.log(selectDate);
  }, [age, selectDate]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container spacing={2} justifyContent={"center"}>
      <Grid item md={6}>
        <Box
          sx={{ m: 1, minWidth: 120 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            style={{ padding: "20px" }}
          >
            Select Room
          </Typography>
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled-label">
              Display
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              autoWidth
              value={age}
              label="Display"
              onChange={handleChange}
              style={{
                width: "200px",
              }}
            >
              <MenuItem value={"none"}>none</MenuItem>
              {Object.keys(IDctl).map((id) => (
                <MenuItem key={id} value={IDctl[id].IDcontroller}>
                  {IDctl[id].titleRoom}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid
        item
        md={6}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ padding: "20px" }}
        >
          Select Date
        </Typography>
        <ReactDatePicker
          selected={selectDate}
          onChange={(date) => setSelectDate(date)}
          dateFormat="dd/MM/yyyy"
        ></ReactDatePicker>
      </Grid>
      <Grid item xs={10}>
        <GraphPDF controller={age} dateSelect={selectDate}></GraphPDF>
      </Grid>
    </Grid>
  );
}
