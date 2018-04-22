const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
	id: String,
	title: String,
	newsPreview: String,
	newsText: String,
  publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);