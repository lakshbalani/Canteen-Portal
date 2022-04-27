const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const Vendor = new Schema({
	Name: {
		type: String,
		required: false
	},
	Shop: {
		type: String,
		required: false
	},
	email: {
		type: String,
		required: false
	},
	Mobile: {
		type: String,
		required: false
	},
	Opening: {
		type: String, 
		required: false
	},
	Closing: {
		type: String,
		required: false
	},
	Type: {
		type: String,
		required: false
	},	
	Batch: {
		type: String,
		required: false
	},
	Age: {
		type: String,
		required: false
	},
	Pass: {
		type: String,
		required: false
	},
	Wallet:{
		type: String,
		required:false
	},
	Current:{
		type: String,
		required:false
	},
	date:{
		type: Date,
		required: false
	}
});


module.exports = User = mongoose.model("Users", Vendor);
