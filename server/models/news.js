const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
	title: String,
	newsPreview: String,
	newsText: String,
  publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('News', NewsSchema);