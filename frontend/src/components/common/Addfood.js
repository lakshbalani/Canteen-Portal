import { useState } from "react";
import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const Addfood = (props) => {
  const [Name, setName] = useState("");
  const [Shop, setShop] = useState("");
  const [VendorName, setVendorName] = useState("");
  const [Price, setPrice] = useState("");
  const [Rating1, setRating1] = useState("");
  const [Rating2, setRating2] = useState("");
  const [Veg, setVeg] = useState("");
  const [AddOns, setAddOns] = useState("");
  const [Tags, setTags] = useState("");

  const [date, setDate] = useState(null);


  const onChangeName = (event) => {
    setName(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const onChangeRating1 = (event) => {
    setRating1(event.target.value);
  };

  const onChangeRating2 = (event) => {
    setRating2(event.target.value);
  };

  const onChangeVeg = (event) => {
    setVeg(event.target.value);
  };

  const onChangeAddOns = (event) => {
    setAddOns(event.target.value);
  };

  const onChangeTags = (event) => {
    setTags(event.target.value);
  };


  const resetInputs = () => {
    setName("");
    setShop("");
    setPrice("");
    setRating1("");
    setRating2("");
    setVeg("");
    setAddOns("");
    setTags("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newFood = {
      Name: Name,
      Shop: localStorage.getItem('shop'),
      Price: Price,
      Rating1: Rating1,
      Rating2: Rating2,
      Veg: Veg,
      AddOns: AddOns,
      Tags: Tags,
      date: Date.now(),
    };

    // console.log(newFood);

    axios
      .post("http://localhost:4000/food/addfood", newFood)
      .then((response) => {
        alert("Created\t" + response.data.Name);
        // console.log(response.data);
      });


    resetInputs();
  };

  return (
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={Name}
              onChange={onChangeName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              value={Price}
              onChange={onChangePrice}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: 235 }}>
              <InputLabel>Food Type</InputLabel>
              <Select
                value={Veg}
                label="Veg/Non-veg"
                onChange={onChangeVeg}
              >
                <MenuItem value="Veg">Veg</MenuItem>
                <MenuItem value="Non-veg">Non-veg</MenuItem>
              </Select>
            </FormControl>          
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="AddOns"
              variant="outlined"
              value={AddOns}
              onChange={onChangeAddOns}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Tags"
              variant="outlined"
              value={Tags}
              onChange={onChangeTags}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Add
        </Button>
          </Grid>
        </Grid>
        // <h1>hii</h1>
  );
};

export default Addfood;
