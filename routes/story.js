const story = require('../controllers/story');
const express = require('express');
const router = express.Router();





///api/v1/s/<routes here>

router.get('/list-all-stories',  story.listAllStories); //add middleware

router.post('/create-story',  story.createStory);

router.put('/update-story/:id',  story.updateStory);

router.delete('/delete-story/:id',  story.deleteStory);



module.exports = router;