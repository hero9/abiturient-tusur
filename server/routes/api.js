const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/students.js');
const News = require('../models/news.js');


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

/* POST SINGLE NEWS  */
router.post('/news', (req, res, next) => {
  News.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET ALL NEWS */
router.get('/news', (req, res, next) => {
  News.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE STUDENT BY ID */
router.get('/news/:id', (req, res, next) => {
  News.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
