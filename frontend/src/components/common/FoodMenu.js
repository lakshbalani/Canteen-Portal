import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



const FoodMenu = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [buy,setBuy]=useState(0);
  const [Quantity,setQuantity]=useState("1");
  const [AddOns,setAddOns]=useState("");
  const [TotalPrice,setTotalPrice]=useState("");
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/food")
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onBuy=()=>{
    setBuy(1)
  }
  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const orderDetail = {
      Name: localStorage.getItem('food_name'),
      Shop: localStorage.getItem('food_shop'),
      Price: localStorage.getItem('food_price'),
      Veg: localStorage.getItem('food_veg'),
      AddOns: AddOns,
      Quantity: Quantity,
      TotalPrice: localStorage.getItem('food_price')*Quantity,
      Buyer: localStorage.getItem('email'),
      date: Date.now(),
    };

    const buyerdet = {
      email: localStorage.getItem('email'),
    };

    axios
        .post("http://localhost:4000/user/vendorProf",buyerdet)
        .then((response) => {
          localStorage.setItem('wallet',response.data.user.Wallet)
          // console.log(response.data)
        });
    const userupdate={
      email: localStorage.getItem('email'),
      Wallet: +localStorage.getItem('wallet')- +orderDetail.TotalPrice
    }
    if(orderDetail.TotalPrice > +localStorage.getItem('wallet')){
     alert("Insufficient Amount in User wallet")
    }
    if(orderDetail.TotalPrice <= +localStorage.getItem('wallet')){
          // console.log(orderDetail);
        axios
          .post("http://localhost:4000/order/placeOrder", orderDetail)
          .then((response) => {
          });
        }
        if(orderDetail.TotalPrice <= +localStorage.getItem('wallet')){
        axios
          .post("http://localhost:4000/user/walletupdate", userupdate)
          .then((response) => { 
            console.log(response.data)
          });
        }
        if(orderDetail.TotalPrice <= +localStorage.getItem('wallet')){
        setBuy(0);
        }
        if(orderDetail.TotalPrice <= +localStorage.getItem('wallet')){
         localStorage.setItem('wallet',+localStorage.getItem('wallet')- +(localStorage.getItem('food_price')*Quantity))
        // navigate("/foodMenu");
    }
  };


  return (
    <div>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Shop</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Add-ons</TableCell>
                  <TableCell>Tags</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {foodItems.map((food, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{food.Name}</TableCell>
                    <TableCell>{food.Shop}</TableCell>
                    <TableCell>{food.Price}</TableCell>
                    <TableCell>{food.Rating1}</TableCell>
                    <TableCell>{food.Veg}</TableCell>
                    <TableCell>{food.AddOns}</TableCell>
                    <TableCell>{food.Tags}</TableCell>
                    <TableCell>
                    <Button variant="contained" onClick={()=>{
                      localStorage.setItem('food_name',food.Name);
                      localStorage.setItem('food_shop',food.Shop);
                      localStorage.setItem('food_price',food.Price);
                      localStorage.setItem('food_addOns',food.AddOns);
                      localStorage.setItem('food_veg',food.Veg);
                      onBuy();
                    }}>
                      Buy Now
                    </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <br></br>
          <br></br>
          {buy===1?
                    <Grid container align={"center"} spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Name"
                            variant="outlined"
                            value={localStorage.getItem('food_name')}
                            inputProps={{readOnly:true}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Shop"
                            variant="outlined"
                            value={localStorage.getItem('food_shop')}
                            inputProps={{readOnly:true}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Veg/Non-veg"
                            variant="outlined"
                            value={localStorage.getItem('food_veg')}
                            inputProps={{readOnly:true}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Price"
                            variant="outlined"
                            value={localStorage.getItem('food_price')}
                            inputProps={{readOnly:true}}
                          />        
                        </Grid>
                        <Grid item xs={12}>
                        <Box sx={{ width: 300 }}>
                        <Slider
                            aria-label="Quantity"
                            valueLabelDisplay="auto"
                            onChange={onChangeQuantity}
                            style={{minWidth:"235"}}
                            value={Quantity}
                            step={1}
                            marks
                            min={1}
                            max={10}
                        />
                        </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="AddOns"
                            variant="outlined"
                            value={localStorage.getItem('food_addOns')}
                            inputProps={{readOnly:true}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Total Cost"
                            variant="outlined"
                            value={localStorage.getItem('food_price')*Quantity}
                            inputProps={{readOnly:true}}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="contained" 
                          onClick={onSubmit}
                        >
                            Place Order
                      </Button>
                        </Grid>
                    </Grid>
                    :null
                  }
    </div>
  );
};

export default FoodMenu;
