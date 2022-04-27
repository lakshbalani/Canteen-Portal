import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ls from "local-storage";

const Login = (props) => {
  const [email, setEmail] = useState("");
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

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePass = (event) => {
    setPass(event.target.value);
  };



  const resetInputs = () => {
    setEmail("");
    setPass("");
    setDate(null);
  };

  const navigate = useNavigate();


  const onSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      email: email,
      Pass: Pass,
      date: Date.now(),
    };
    // console.log(newUser);

    axios
      .post("http://localhost:4000/user/login", newUser)

      .then(res => {
        alert("Login successful");
        if(res.data.user.Type==="vendor")
        {
          localStorage.setItem('email',res.data.user.email);
          localStorage.setItem('type',res.data.user.Type);
          localStorage.setItem('shop',res.data.user.Shop);
          localStorage.setItem('current',res.data.user.Current);
          navigate("/vendorProf");
        }
        else{
          localStorage.setItem('email',res.data.user.email);
          localStorage.setItem('type',res.data.user.Type);
          navigate("/vendorProf");
        }
        // console.log(res.data.user);
      });


    resetInputs();
  };

  return (
    <Grid container align={"center"} spacing={2}>
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
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};

export default Login;
