import { useState } from "react";
import React from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
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
import { filledInputClasses } from "@mui/material";
import { Navigate } from "react-router";


const VendorProf = (props) => {
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
  const [Wallet,setWallet]=useState("");
  const [edit, setEdit] = useState(0);
  const [Add, setAdd] = useState(0);
  const [Amount, setAmount] = useState(0);

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

  const onChangeAmt = (event) => {
    setAmount(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeWallet = (event) => {
    setWallet(event.target.value);
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
    setWallet("");
    setDate(null);
    setEdit(0);
  };
  const fillIt = (event) => {
    
    const info={
      email:localStorage.getItem('email')
    };
    setEdit(0);
    setAdd(0);

    axios
      .post("http://localhost:4000/user/vendorProf",info)
      .then(res => {
        setName(res.data.user.Name);
        setShop(res.data.user.Shop);
        setMobile(res.data.user.Mobile);
        setOpening(res.data.user.Opening);
        setClosing(res.data.user.Closing);
        setAge(res.data.user.Age);
        setBatch(res.data.user.Batch);
        setWallet(res.data.user.Wallet);
        localStorage.setItem('wallet',res.data.user.Wallet);
      });
  };

  const navigate = useNavigate();

  const onEditEnable =(event) =>{
    setEdit(1);
  };

  const AddMon =(event) =>{
    setAdd(1);
  };

  const onAddMon = (event) => {
    event.preventDefault();
    // console.log(+Amount + +Wallet)
    localStorage.setItem('wallet',+Amount + +Wallet);
    const newUser = {
      email: localStorage.getItem('email'),
      Wallet: +Amount + +Wallet,
      date: Date.now(),
    };

    console.log(newUser);

    axios
      .post("http://localhost:4000/user/vendorProf3", newUser)
      .then((response) => {
      });
    setAdd(0);
    fillIt();
    
  };


  const onEdit = (event) => {
    event.preventDefault();

    const newUser = {
      Name: Name,
      Shop: Shop,
      Mobile: Mobile,
      email: localStorage.getItem('email'),
      Opening: Opening,
      Closing: Closing,
      Age: Age,
      Batch: Batch,
      date: Date.now(),
    };

    console.log(newUser);

    axios
      .post("http://localhost:4000/user/vendorProf2", newUser)
      .then((response) => {
      });
    setEdit(0);
    navigate("/vendorProf");
    
  };
  
  
    

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {edit==0?
        <>
        {localStorage.getItem('type') == "vendor" &&
          <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
          <Button variant="contained" onClick={()=>{
                            fillIt()
                        }}>
                        Fill
                        </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={Name}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Shop Name"
              variant="outlined"
              value={Shop}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              value={Mobile}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              label="Opening Time"
              value={Opening}
              inputProps={{readonly:true}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <TimePicker
              label="Closing Time"
              value={Closing}
              inputProps={{readonly:true}}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={onEditEnable}>
              Edit
            </Button>
          </Grid>
        </Grid>
      }
      {localStorage.getItem('type') == "buyer" &&
      <>
        <Grid container align={"center"} spacing={2}>
          <Grid item xs={12}>
          <Button variant="contained" onClick={()=>{
                            fillIt()
                        }}>
                        Fill
                        </Button>
          </Grid>
          <Grid item xs={12}>
          Wallet Amount: {Wallet}
          <br></br>
          <br></br>
          <Button variant="contained" onClick={()=>{
                            AddMon()
                        }}>
                        Add Money
                        </Button>
          {Add===1&&
          <>
            <br></br>
            <br></br>
            <TextField
            label="Amount"
            variant="outlined"
            value={Amount}
            onChange={onChangeAmt}
            />
            <br></br>
            <br></br>
            <Button variant="contained" onClick={onAddMon}>
              Submit
            </Button>
          </>
          }
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={Name}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              value={Mobile}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              variant="outlined"
              value={Age}
              inputProps={{readonly:true}}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl style={{ minWidth: 235 }}>
              <InputLabel>Batch</InputLabel>
              <Select
                value={Batch}
                label="Batch"
                inputProps={{readonly:true}}
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
            <Button variant="contained" onClick={onEditEnable}>
              Edit
            </Button>
          </Grid>
        </Grid>
        </>
        }
        </>
        :
          <>
          {localStorage.getItem('type') == "vendor" &&
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
            <Button variant="contained" onClick={onEdit}>
              Submit
            </Button>
            </Grid>
          </Grid>
        }
        {localStorage.getItem('type') == "buyer" &&
        <>
        Wallet Amount: {Wallet}
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
            <Button variant="contained" onClick={onEdit}>
              Submit
            </Button>
          </Grid>
          </>
      }
      </>
    }
    </LocalizationProvider>

  );
};

export default VendorProf;
