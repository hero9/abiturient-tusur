const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = require('../models/students.js');
const News = require('../models/news.js');
const Events = require('../models/events.js');
const MenuItems = require('../models/menuItems.js');
const Pages = require('../models/pages.js');


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

/* =======  POST Requests ======== */
router.post('/news', (req, res, next) => {
  News.create({
		id: req.body.id,
		title: req.body.title,
		newsPreview: req.body.newsPreview,
		newsText: req.body.newsText
	}, (err, post) => {
		if (err) return next(err);
		res.json(post);
	});
});

router.post('/events', (req, res, next) => {
  Events.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/pages', (req, res, next) => {
  Pages.create({
		id: req.body.id,
		title: req.body.title,
		content: req.body.content
	}, (err, post) => {
		if (err) return next(err);
	});
	MenuItems.create({title : req.body.title, id: req.body.id}, (err, post) => {
		if(err) return next(err);
		res.json(post);
	});
});

/* =======  GET Requests ======== */
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

router.get('/menu', (req, res, next) => {
  MenuItems.find(req.body, (err, menuItems) => {
    if (err) return next(err);
    res.json(menuItems);
	});
});

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

router.get('/events', (req, res, next) => {
  Events.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/pages', (req, res, next) => {
  Pages.find( (err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/pages/:id', (req, res, next) => {
  Pages.findOne( { _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/news/:id', (req, res, next) => {
  News.findOne( { _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/events/:id', (req, res, next) => {
  Events.findOne( { _id : req.params.id}, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* =======  UPDATE Requests ======== */
router.put('/news/:id', (req, res, next) => {
  News.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/events/:id', (req, res, next) => {
  Events.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/pages/:id', (req, res, next) => {
  Pages.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

/* =======  DELETE Requests ======== */
router.delete('/news/:id', (req, res) => {
	News.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "This news successfully deleted",
        id: req.params.id
    };
    return res.status(200).send(response);
	});
});

router.delete('/events/:id', (req, res) => {
	Events.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Event successfully deleted",
        id: req.params.id
    };
    return res.status(200).send(response);
	});
});

router.delete('/pages/:id', (req, res) => {
	Pages.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Event successfully deleted",
        id: req.params.id
    };
    return res.status(200).send(response);
	});
});

module.exports = router;