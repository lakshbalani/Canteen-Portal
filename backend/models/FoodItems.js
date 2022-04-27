const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FoodItems = new Schema({
	Name: {
		type: String,
		required: false
	},
	Shop: {
		type: String,
		required: false
	},
    Price: {
        type: String,
        required: false
    },
    Rating1: {
        type: String,
        required: false
    },
    Rating2: {
        type: String,
        required: false
    },
    Veg: {
        type: String,
        required: false
    },
    AddOns: {
        type: String,
        required: false
    },
    Tags: {
        type: String,
        required: false
    },
	date: {
		type: Date,
		required: false
	}
});


module.exports = Food = mongoose.model("Foods", FoodItems);
