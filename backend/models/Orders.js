const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const OrderDetail = new Schema({
	Name: {
		type: String,
		required: false
	},
	Shop: {
		type: String,
		required: false
	},
    VendorName: {
        type: String,
		required: false
    },
    Buyer: {
        type: String,
		required: false
    },
    Price: {
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
    Quantity: {
        type: String,
        required: false
    },
    Status: {
        type: String,
        required: false
    },
    TotalPrice: {
        type: String,
        required: false
    },
	date: {
		type: Date,
		required: false
	}
});


module.exports = Order = mongoose.model("Orders", OrderDetail);
