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



const FoodDash = (props) => {
  const [foodItems, setFoodItems] = useState([]);
  const [edit,setEdit]=useState(0);
  const [Name, setName] = useState("");
  const [Shop, setShop] = useState("");
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
  
  const navigate = useNavigate();
  const onAdd = (event) => {
    console.log(localStorage.getItem('shop'));
    navigate("/addfood");
  };

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

  const onEdit=()=>{
    setEdit(1)
    console.log(edit);
  }

  const onSubmit = (event) => {
    event.preventDefault();

    const edited = {
      _id: localStorage.getItem('id'),
      Name: Name,
      Shop: Shop,
      Price: Price,
      Veg: Veg,
      AddOns: AddOns,
      Tags: Tags,
      date: Date.now(),
    };

    console.log(edited);

    axios
      .post("http://localhost:4000/food/editfood", edited)
      .then((response) => {

      });
    setEdit(0);
    navigate("/foodDash");
  };


  return (
    <div>
        <Button variant="contained" onClick={onAdd}>
              Add Food
        </Button>
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
                  <>
                  {(food.Shop===localStorage.getItem('shop'))&&
                  <>
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
                      localStorage.setItem('id',food._id);
                      setName(food.Name);
                      setPrice(food.Price);
                      setVeg(food.Veg);
                      setAddOns(food.AddOns);
                      setTags(food.Tags);
                      onEdit();
                    }}>
                      Edit
                    </Button>
                    </TableCell>
                    <TableCell>
                    <Button variant="contained" onClick={()=>{
                      axios
                        .post("http://localhost:4000/food/delfood",food)
                        .then((response) => {
                          alert("Deleted 1\t");
                          window.location='/foodDash';
                          // console.log(response.data);
                        });
                      navigate("/foodDash");
                    }}>
                      Delete
                    </Button>
                    </TableCell>
                  </TableRow>
                  </>
                  }
                  </>
                ))}
              </TableBody>
            </Table>
          </Paper>
          <br></br>
          <br></br>
          {edit===1?
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
                            Submit
                      </Button>
                        </Grid>
                      </Grid>
                    :null
                  }
    </div>
  );
};

export default FoodDash;
