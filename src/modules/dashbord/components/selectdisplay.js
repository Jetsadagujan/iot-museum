import React, { useState, useEffect } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";
import Graph from "./graph";

export default function Selectdisplay(props) {
  const { IDctl } = props;
  const [age, setAge] = useState("");

  useEffect(() => {
    console.log(age);
  }, [age]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Box
        sx={{ m: 1, minWidth: 120 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          style={{ padding: "20px" }}
        >
          Select display :
        </Typography>
        <FormControl variant="filled">
          <InputLabel id="demo-simple-select-filled-label">Display</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            autoWidth
            value={age}
            label="Display"
            onChange={handleChange}
            style={{
              width: "150px",
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
      <Graph controller={age}></Graph>
    </div>
  );
}
