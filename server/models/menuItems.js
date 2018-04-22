const mongoose = require('mongoose');

const MenuItemsSchema = new mongoose.Schema({
	title: String,
	id: String,
});

module.exports = mongoose.model('MenuItems', MenuItemsSchema);