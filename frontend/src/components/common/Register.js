import { useState } from "react";
import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Register = (props) => {
  const [Name, setName] = useState("");
  const [Shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Opening, setOpening] = React.useState(new Date());
  const [Closing, setClosing] = React.useState(new Date());
  const [Type, setType] = useState("");
  const [Batch, setBatch] = useState("");
  const [Age, setAge] = useState("");
  const [Pass, setPass] = useState("");
  const [date, setDate] = useState(null);

  const [values, setValues] = React.useState({
    showPassword: false,
  });


  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangeShop = (event) => {
    setShop(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeMobile = (event) => {
    setMobile(event.target.value);
  };

  const onChangeOpening = (newValue) => {
    setOpening(newValue);
  };

  const onChangeClosing = (newValue) => {
    setClosing(newValue);
  };

  const onChangeType = (event) => {
    setType(event.target.value);
  };

  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };

  const onChangeAge = (event) => {
    setAge(event.target.value);
  };

  const onChangePass = (event) => {
    setPass(event.target.value);
  };



  const resetInputs = () => {
    setName("");
    setShop("");
    setEmail("");
    setMobile("");
    setOpening("");
    setClosing("");
    setType("");
    setBatch("");
    setAge("");
    setPass("");
    setDate(null);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      Name: Name,
      Shop: Shop,
      email: email,
      Mobile: Mobile,
      Opening: Opening,
      Closing: Closing,
      Type: Type,
      Batch: Batch,
      Age: Age,
      Pass: Pass,
      date: Date.now(),
    };

    console.log(newUser);

    axios
      .post("http://localhost:4000/user/register", newUser)
      .then((response) => {
        alert("Created\t" + response.data.Name);
        console.log(response.data);
      });


    resetInputs();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
          <FormControl style={{ minWidth: 235 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={Type}
              label="Type"
              onChange={onChangeType}
            >
              <MenuItem value="vendor">Vendor</MenuItem>
              <MenuItem value="buyer">Buyer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <br></br>
      {Type == "vendor" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={Name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={Shop}
              onChange={onChangeShop}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: 235 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.Pass}
                onChange={onChangePass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.Pass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              value={Mobile}
              onChange={onChangeMobile}
            />
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              label="Opening Time"
              value={Opening}
              onChange={onChangeOpening}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              label="Closing Time"
              value={Closing}
              onChange={onChangeClosing}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Register
        </Button>
          </Grid>
        </Grid>
      }
      {Type == "buyer" &&
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={Name}
              onChange={onChangeUsername}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={onChangeEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ maxWidth: 235 }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={Pass}
                onChange={onChangePass}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {Pass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              value={Mobile}
              onChange={onChangeMobile}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={Age}
              onChange={onChangeAge}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: 235 }}>
              <InputLabel>Batch</InputLabel>
              <Select
                value={Batch}
                label="Batch"
                onChange={onChangeBatch}
              >
                <MenuItem value="UG1">UG1</MenuItem>
                <MenuItem value="UG2">UG2</MenuItem>
                <MenuItem value="UG3">UG3</MenuItem>
                <MenuItem value="UG4">UG4</MenuItem>
                <MenuItem value="UG5">UG5</MenuItem>
                <MenuItem value="PG1">PG1</MenuItem>
                <MenuItem value="PG2">PG2</MenuItem>
                <MenuItem value="PHD">PHD</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Register
        </Button>
          </Grid>
        </Grid>
      }
    </LocalizationProvider>
  );
};

export default Register;
