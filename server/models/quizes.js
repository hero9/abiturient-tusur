const mongoose = require('mongoose');

const QuizesSchema = new mongoose.Schema({
	question: String,
	options: [
		{
			id: String,
			text: String,
			isCorrect: Boolean
		}
	],
	cost: Number
});

module.exports = mongoose.model('Quizes', QuizesSchema);