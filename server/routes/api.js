const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require('path');
const upload_image = require("../froala/image_upload.js");
const bcrypt = require("bcrypt");

const Student = require("../models/students.js");
const News = require("../models/news.js");
const Events = require("../models/events.js");
const MenuItems = require("../models/menuItems.js");
const Pages = require("../models/pages.js");
const Users = require("../models/users.js");
const Quizes = require("../models/quizes.js");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/check-auth');
const Scores = require('../models/scores');
const Faculties = require('../models/faculties');


mongoose.connect("mongodb://localhost:27017/tusur");
db = mongoose.connection;

const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

// Image
router.post("/image_upload", (req, res) => {
  upload_image(req, function(err, data) {
 
    if (err) {
			return res.status(404).end(JSON.stringify(err));
    }
 
    res.send(data);
  });
});

router.get("/:foldername/:childfoldername/:filename", function(req, res) {
	const foldername = req.params.foldername;
	const childFoldername = req.params.childfoldername;
	const fileName = req.params.filename;
	const rootPath = path.resolve(`../server/`);
	res.download(`${rootPath}/${foldername}/${childFoldername}/${fileName}`);
});
 
 
// Create folder for uploading files.
var filesDir = path.join(path.dirname(require.main.filename), "froala/uploads");
if (!fs.existsSync(filesDir)){
  fs.mkdirSync(filesDir);
}

/* =======  POST Requests ======== */
router.post("/news", checkAuth, (req, res, next) => {
  News.create(
    {
			id: req.body.id,
			title: req.body.title,
			imagePreview: req.body.imagePreview,
      newsPreview: req.body.newsPreview,
      newsText: req.body.newsText
    },
    (err, post) => {
      if (err) return next(err);
      res.json(post);
    }
  );
});

router.post("/events", checkAuth, (req, res, next) => {
  Events.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/pages", checkAuth, (req, res, next) => {
  Pages.create(
    {
      id: req.body.id,
      title: req.body.title,
      content: req.body.content
    },
    (err, post) => {
      if (err) return next(err);
    }
  );
  MenuItems.create({ title: req.body.title, id: req.body.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.post("/signup", (req, res) => {
  Users.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Почта уже существует!"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new Users({
							_id: new mongoose.Types.ObjectId(),
							name: req.body.name,
							fullname: req.body.fullname,
              email: req.body.email,
							password: hash
						});
						user
							.save()
              .then(result => {
								Scores.create( {userId: result._id, quizScore: 0}, (err, res) => {
									if(err) return next(err);
								});
                res.status(200).json({
                  success: "Новый пользователь создан!"
                });
              })
              .catch(error => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
});

router.post("/signin", (req, res) => {
  Users.findOne({ email: req.body.email })
    .exec()
    .then(user => { 
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
        if (result) {
          const JWTToken = jwt.sign(
            {
              email: user.email,
							_id: user._id,
							quizScore: user.quizScore
            },
            "secret",
            {
              expiresIn: "2h"
            }
          );
          return res.status(200).json({
            success: "Welcome to the JWT Auth",
            token: JWTToken
          });
        }
        return res.status(401).json({
          failed: "Unauthorized Access"
        });
      });
    })
    .catch(error => {
      res.status(500).json({
        error: error
      });
    });
});

router.post("/quiz", checkAuth, (req, res, next) => {
  Quizes.create({
		question: req.body.question,
		options: req.body.options,
		cost: req.body.cost
	},(err, post) => {
		if (err) return next(err);
		res.json(post);
	});
});

router.post("/faculties", checkAuth, (req, res, next) => {
  Faculties.create({
		title: req.body.title,
		specialties: req.body.specialties,
		description: req.body.description,
		grants: req.body.grants
	},(err, post) => {
		if (err) return next(err);
		res.json(post);
	});
});

router.post("/quiz/answer/:id", checkAuth, (req, res, next) => {
	Scores.findOne({userId: req.userData._id}, (err, res) => {
		let answered = res.answeredQuestions;
		answered.push(req.params.id);
		Scores.update({ userId : req.userData._id }, { 
				answeredQuestions : answered
			},
			(err, res) => {
				if (err) return next(err);
		});
	});
	Quizes.find({"options._id": req.body.id}, (err, question) => {
		console.log(question[0].options);
		question[0].options.forEach( (option) => {
			if(req.body.id == option._id) {
				if(option.isCorrect) {
					Scores.findOne({userId: req.userData._id}, (err, res) => {
						Scores.update({ userId : req.userData._id }, { 
								quizScore : res.quizScore + question[0].cost,
							},
							(err, res) => {
								if (err) return next(err);
						});
					});
				}
			}
		});
		res.json(question);
	});
});

router.post('/froala-news', checkAuth, (req, res, next) => {
	FroalaImages.create({
		url: req.body.url
	}, (err, post) => {
		if (err) return next(err);
		res.json(post);
	});
});

/* =======  GET Requests ======== */
router.get("/quiz", checkAuth, (req, res, next) => {
  Quizes.find((err, questions) => {
		if (err) return next(err);
		res.json(questions);
  });
});

router.get("/faculties", checkAuth, (req, res, next) => {
  Faculties.find((err, faculties) => {
		if (err) return next(err);
		res.json(faculties);
  });
});

router.get("/students", checkAuth, (req, res) => {
  db.collection("students")
    .find()
    .toArray()
    .then(students => {
      response.data = students;
      res.json(response);
    })
    .catch(err => {
      sendError(err, res);
    });
});

router.get("/menu", checkAuth, (req, res, next) => {
  MenuItems.find(req.body, (err, menuItems) => {
    if (err) return next(err);
    res.json(menuItems);
  });
});

router.get("/news", checkAuth, (req, res, next) => {
  News.find((err, products) => {
    if (err) return next(err);
    let items = [];
    products.forEach(item => {
      items.push({
        title: item.title,
        newsPreview: item.newsPreview
      });
    });
    res.json(products);
  });
});

router.get("/events", checkAuth, (req, res, next) => {
  Events.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get("/pages", checkAuth, (req, res, next) => {
  Pages.find((err, products) => {
    if (err) return next(err);
    res.json(products);
  });
});

router.get("/users", checkAuth, (req, res, next) => {
  Users.findOne({ _id: req.userData._id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/pages/:id", checkAuth, (req, res, next) => {
  Pages.findOne({ _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/news/:id", checkAuth, (req, res, next) => {
  News.findOne({ _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/events/:id", checkAuth, (req, res, next) => {
  Events.findOne({ _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/quiz/:id", checkAuth, (req, res, next) => {
  Quizes.findOne({ _id: req.params.id }, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/score", checkAuth, (req, res, next) => {
  Scores.find({ userId: req.userData._id }, (err, post) => {
    if (err) return next(err);
    res.json(post[0].answeredQuestions);
  });
});

/* =======  UPDATE Requests ======== */
router.put("/news/:id", checkAuth, (req, res, next) => {
  News.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/events/:id", checkAuth, (req, res, next) => {
  Events.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/pages/:id", checkAuth, (req, res, next) => {
  Pages.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/quiz/:id", checkAuth, (req, res, next) => {
  Quizes.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put("/user", checkAuth, (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if(err){
			console.log(err);
		} else {
			Users.findByIdAndUpdate( {_id: req.userData._id}, {
				email: req.body.email,
				password: hash
			}, (err, post) => {
				if (err) {
					return next(err);
				}
				res.json(post);
			});
			
		}	
	})
});


/* =======  DELETE Requests ======== */
router.delete("/news/:id", checkAuth, (req, res) => {
  News.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "This news successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
});

router.delete("/events/:id", checkAuth, (req, res) => {
  Events.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Event successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
});

router.delete("/pages/:id", checkAuth, (req, res) => {
  Pages.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Event successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
});

router.delete("/quiz/:id", checkAuth, (req, res) => {
  Quizes.findByIdAndRemove(req.params.id, (err, post) => {
    if (err) return res.status(500).send(err);
    const response = {
      message: "Question successfully deleted",
      id: req.params.id
    };
    return res.status(200).send(response);
  });
});

module.exports = router;