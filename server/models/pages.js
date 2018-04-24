const mongoose = require('mongoose');

const PagesSchema = new mongoose.Schema({
	id: String,
	title: String,
	content: String
});

module.exports = mongoose.model('Pages', PagesSchema);