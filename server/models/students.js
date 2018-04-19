const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	position : Number,
	fullName : String,
	dateOfBirth : Date,
	spec : String
});

module.exports = mongoose.model('Student', StudentSchema);