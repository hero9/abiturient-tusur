const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/tusur');
db = mongoose.connection;

const sendError = (err, res) => {
	response.status = 501;
	response.message = typeof err == 'object' ? err.message : err ;
	res.status(501).json(response);
};

let response = {
	status : 200,
	data : [],
	message: null
};

router.get('/students', (req, res) => {
		db.collection('students')
			.find()
			.toArray()
			.then((students) => {
				response.data = students;
				res.json(response);
			})
			.catch((err) => {
				sendError(err, res);
			});
});

module.exports = router;
