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



const VendorOrders = (props) => {
  const [orderDetail, setOrderDetail] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/order")
      .then((response) => {
        setOrderDetail(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const onPick = (event) => {
    // event.preventDefault();
    const order1={
        _id:localStorage.getItem('orderid')
    };
    console.log(localStorage.getItem('orderid'));
        axios
        .post("http://localhost:4000/order/pick",order1)
        .then((response) => {
            window.location='/buyerOrders'
        });
  }

  return (
    <div>
          <Paper>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell> Sr No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Veg/Non-Veg</TableCell>
                  <TableCell>Add-ons</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total Price</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderDetail.map((order, ind) => (
                  <>
                  {order.Buyer===localStorage.getItem('email')&&
                  <>
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{order.Name}</TableCell>
                    <TableCell>{order.Price}</TableCell>
                    <TableCell>{order.Veg}</TableCell>
                    <TableCell>{order.AddOns}</TableCell>
                    <TableCell>{order.Quantity}</TableCell>
                    <TableCell>{order.TotalPrice}</TableCell>
                    {order.Status==="Ready for pick up"&&
                       <TableCell>
                       <Button variant="contained" onClick={()=>{
                           localStorage.setItem('orderid',order._id)
                           onPick()
                       }}>
                         Picked Up
                       </Button>
                       </TableCell>
                    }
                    <TableCell>{order.Status}</TableCell>
                  </TableRow>
                  </>
                  }
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
    </div>
  );
};

export default VendorOrders;
