const mongoose = require('mongoose');

const FroalaImagesSchema = new mongoose.Schema({
	url: String
});

module.exports = mongoose.model('FroalaImages', FroalaImagesSchema);