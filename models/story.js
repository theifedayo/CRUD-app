const mongoose = require('mongoose');




const StorySchema = new mongoose.Schema({
	title: {
		type: String,
		index: true,
		trim: true
	},
	content: {
		type: String,
		trim: true
	},
	timeStamp: {
		type: Date,
		default: Date.now
	}
});


module.exports = mongoose.model('Story', StorySchema);
