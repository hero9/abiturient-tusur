const mongoose = require('mongoose');

const ScoresSchema = new mongoose.Schema({
	userId: String,
	quizScore: Number
});

module.exports = mongoose.model('Scores', ScoresSchema);