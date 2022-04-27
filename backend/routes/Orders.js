const express = require("express");
const router = express.Router();

// Load User model
const Order = require("../models/Orders");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Order.find(function (err, Orders) {
        if (err) {
            console.log(err);
        } else {
            res.json(Orders);
        }
    })
});

router.post("/placeOrder", (req, res) => {
    const newOrder = new Order({
        Name: req.body.Name,
        Shop: req.body.Shop,
        VendorName: req.body.VendorName,
        Price: req.body.Price,
        Veg: req.body.Veg,
        AddOns: req.body.AddOns,
        Quantity: req.body.Quantity,
        TotalPrice: req.body.TotalPrice,
        date: req.body.date,
        Buyer: req.body.Buyer,
        Status: "Placed"
    });
            newOrder
                .save()
                .then(Order => res.json(Order))
                .catch(err => res.send(err));
});

router.post("/accOrder", (req, res) => {
    Order.findOneAndUpdate({_id:req.body._id},{Status:"Accepted"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    }); 
});

router.post("/rejOrder", (req, res) => {
    Order.findOneAndUpdate({_id:req.body._id},{Status:"Rejected"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    }); 
});

router.post("/cooking", (req, res) => {
    Order.findOneAndUpdate({_id:req.body._id},{Status:"Cooking"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    }); 
});

router.post("/ready", (req, res) => {
    Order.findOneAndUpdate({_id:req.body._id},{Status:"Ready for pick up"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    }); 
});

router.post("/pick", (req, res) => {
    Order.findOneAndUpdate({_id:req.body._id},{Status:"Completed"},{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    }); 
});



module.exports = router;