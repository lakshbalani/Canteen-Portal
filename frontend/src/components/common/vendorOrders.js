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
  const [Acc, setAcc] = useState(0); 
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


  const onAccept = (event) => {
    // event.preventDefault();
    const order1={
        _id:localStorage.getItem('orderid')
    };
    const updatevendor={
      Current: +localStorage.getItem('current')+1,
      email: localStorage.getItem('email')
    }
    console.log(localStorage.getItem('orderid'));
        axios
        .post("http://localhost:4000/order/accOrder",order1)
        .then((response) => {
        });
        axios
        .post("http://localhost:4000/user/vendorct",updatevendor)
        .then((response) => {
            localStorage.setItem('current', +localStorage.getItem('current')+1)
            window.location='/vendorOrders'
        });
  }
  const onReject = (event) => {
    // event.preventDefault();
    const order1={
        _id:localStorage.getItem('orderid')
    };
    const getcurrent={
      email: localStorage.getItem('buyer_email')
    }
    
    console.log(localStorage.getItem('buyer_email'));
        axios
        .post("http://localhost:4000/order/rejOrder",order1)
        .then((response) => {
        });
        axios
        .post("http://localhost:4000/user/vendorProf",getcurrent)
        .then((response) => {
          localStorage.setItem("user_curr_wal",response.data.user.Wallet)
          console.log(response.data)
        });
        // console.log(cur_wallet)
        const returnmoney={
          email: localStorage.getItem('buyer_email'),
          Wallet: String(+localStorage.getItem("user_curr_wal") + +localStorage.getItem("money_return"))
        }
        axios
        .post("http://localhost:4000/user/walletupdate",returnmoney)
        .then((response) => {
        });
        localStorage.setItem("user_curr_wal",returnmoney.Wallet)

  
    
  }

  const onCooking = (event) => {
    // event.preventDefault();
    const order1={
        _id:localStorage.getItem('orderid')
    };
    console.log(localStorage.getItem('orderid'));
        axios
        .post("http://localhost:4000/order/cooking",order1)
        .then((response) => {
            window.location='/vendorOrders'
        });
  }

  const onReady = (event) => {
    // event.preventDefault();
    const order1={
        _id:localStorage.getItem('orderid')
    };
    const updatevendor={
       Current: +localStorage.getItem('current')-1,
       email: localStorage.getItem('email')
    }
    console.log(localStorage.getItem('orderid'));
        axios
        .post("http://localhost:4000/order/ready",order1)
        .then((response) => {
        });
        axios
        .post("http://localhost:4000/user/vendorct",updatevendor)
        .then((response) => {
            localStorage.setItem('current', +localStorage.getItem('current')-1)
            window.location='/vendorOrders'
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
                  {(order.Shop===localStorage.getItem('shop'))&&
                  <>
                  <TableRow key={ind}>
                    <TableCell>{ind}</TableCell>
                    <TableCell>{order.Name}</TableCell>
                    <TableCell>{order.Price}</TableCell>
                    <TableCell>{order.Veg}</TableCell>
                    <TableCell>{order.AddOns}</TableCell>
                    <TableCell>{order.Quantity}</TableCell>
                    <TableCell>{order.TotalPrice}</TableCell>
                    {order.Status==="Placed"&&
                        <TableCell>
                        <Button variant="contained" onClick={()=>{
                            localStorage.setItem('orderid',order._id)
                            {localStorage.getItem('current')<10&&
                             onAccept()
                            };
                            {localStorage.getItem('current')>=10&&
                              alert("Order limit reached")
                            };
                        }}>
                        Accept
                        </Button>
                        <Button variant="contained" onClick={()=>{
                            localStorage.setItem('orderid',order._id)
                            localStorage.setItem('buyer_email',order.Buyer)
                            localStorage.setItem('money_return',order.TotalPrice)
                            onReject()
                        }}>
                        Reject
                        </Button>
                        </TableCell>
                    }
                    {order.Status==="Accepted"&&
                       <TableCell>
                       <Button variant="contained" onClick={()=>{
                           localStorage.setItem('orderid',order._id)
                           onCooking()
                       }}>
                         Move To Next Step
                       </Button>
                       </TableCell>
                    }
                    {order.Status==="Cooking"&&
                       <TableCell>
                       <Button variant="contained" onClick={()=>{
                           localStorage.setItem('orderid',order._id)
                           onReady()
                       }}>
                         Move To Next Step
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
