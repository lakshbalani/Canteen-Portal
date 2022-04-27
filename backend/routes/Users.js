const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Load input validation
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");
const keys = require("../config/keys");

// Load User model
const User = require("../models/Users");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
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
router.post("/register", (req, res) => {
    const newUser = new User({
        Name: req.body.Name,
        Shop: req.body.Shop,
        email: req.body.email,
        Mobile: req.body.Mobile,
        Opening: req.body.Opening,
        Closing: req.body.Closing,
        Type: req.body.Type,
        Batch: req.body.Batch,
        Age: req.body.Age,
        Pass: req.body.Pass,
        Wallet: "0",
        Current: "0",
        date: req.body.date
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.Pass, salt, (err, hash) => {
            if (err) throw err;
            newUser.Pass = hash;
            newUser
                .save()
                .then(user => res.json(user))
                .catch(err => res.send(err));
        });
    });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    // console.log(req);
    // Find user by email
    User.findOne({ email:email },(err,user)=>{
        if (!user) {
			return res.status(404).json({
				error: "Email not found",
				emailnotfound: "Email not found"
			});
		}
		// Check password
		bcrypt.compare(req.body.Pass, user.Pass).then(isMatch => {
			if (isMatch) {
				// User matched
				// Create JWT Payload
				const payload = {
					email: user.email
				};
				// Sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926 // 1 year in seconds
					},
					(err, token) => {
						res.json({
							success: true,
							token: "Bearer " + token,
							user: user
						});
					}
				);
			} else {
				return res.status(400).json({
					error: "Password Incorrect",
					passwordincorrect: "Password incorrect"
				});
			}
		});
    })
});

router.post("/vendorProf", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOne({ email:email },(err,user)=>{
       res.json({
           user:user
       });    
    });   
});

router.post("/vendorProf2", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOneAndUpdate({ email:email },req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
            return ;
        } else {
            res.json(user);
            return ;
        }
    });   
});

router.post("/vendorProf3", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOneAndUpdate({ email:email },req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });   
});

router.post("/walletupdate", (req, res) => {
    const email = req.body.email;
    console.log(req.body);
    // Find user by email
    User.findOneAndUpdate({ email:email },req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });   
});

router.post("/vendorct", (req, res) => {
    const email = req.body.email;
    // Find user by email
    User.findOneAndUpdate({ email:email },req.body,{new:true},(err,user)=>{
        if(err) {
            res.status(500).json(error);
        } else {
            res.status(200).json(user);
        }
    });   
});

module.exports = router;