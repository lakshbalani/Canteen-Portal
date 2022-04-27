const express = require("express");
const router = express.Router();

// Load User model
const Food = require("../models/FoodItems");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Food.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/addfood", (req, res) => {
    // console.log(req.body);
    const newFood = new Food({
        Name: req.body.Name,
        Shop: req.body.Shop,
        Price: req.body.Price,
        Rating1: 0,
        Rating2: 0,
        Veg: req.body.Veg,
        AddOns: req.body.AddOns,
        Tags: req.body.Tags,
        date: req.body.date
    });

            newFood
                .save()
                .then(Food => res.json(Food))
                .catch(err => res.send(err));
});

router.post("/delfood", (req, res) => {
    // console.log(req.body);
    Food.findOneAndRemove(req.body,function(err,obj)
    {
        if (err) throw err;
        else {
            res.status(200).json(obj)
        }

    });
});

router.post("/editfood", (req, res) => {
    // console.log(req.body);
    console.log(req.body);
    // Find user by email
    Food.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
            return ;
        } else {
            res.json(user);
            return ;
        }
    }); 
});


module.exports = router;