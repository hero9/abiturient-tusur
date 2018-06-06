const mongoose = require('mongoose');

const FacultiesSchema = new mongoose.Schema({
	title: String,
	specialties: [
		{
			title: String,
			points: Number
		}
	],
	description: String,
	grants: Number
});

module.exports = mongoose.model('Faculties', FacultiesSchema);