const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/students.js');
const News = require('../models/news.js');
const Events = require('../models/events.js');
const MenuItems = require('../models/menuItems.js');


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
  News.create({
		id: req.body.id,
		title: req.body.title,
		newsPreview: req.body.newsPreview,
		newsText: req.body.newsText
	}, (err, post) => {
		if (err) return next(err);
	});
	MenuItems.create({title : req.body.title, id: req.body.id}, (err, post) => {
		if(err) return next(err);
		res.json(post);
	});
});

/* POST SINGLE EVENT  */
router.post('/events', (req, res, next) => {
  Events.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET MENU */
router.get('/menu', (req, res, next) => {
  MenuItems.find(req.body, (err, menuItems) => {
    if (err) return next(err);
    res.json(menuItems);
	});
});

/* GET ALL NEWS */
router.get('/news', (req, res, next) => {
  News.find( (err, products) => {
    if (err) return next(err);
		let items = []; 
		products.forEach( (item) => {
			items.push({ 
				title: item.title,
				newsPreview: item.newsPreview
			});
		})
		res.json(products);
  });
});

/* GET ALL EVENTS */
router.get('/events', (req, res, next) => {
  Events.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});


/* GET SINGLE STUDENT BY ID */
router.get('/news/:id', (req, res, next) => {
  News.findOne( {id : req.params.id}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
