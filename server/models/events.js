const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
	title: String,
	eventPreview: String,
	eventText: String,
  publishedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Events', EventSchema);