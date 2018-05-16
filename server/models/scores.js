const mongoose = require('mongoose');

const ScoresSchema = new mongoose.Schema({
	userId: String,
	quizScore: Number,
	answeredQuestions: Array
});

module.exports = mongoose.model('Scores', ScoresSchema);