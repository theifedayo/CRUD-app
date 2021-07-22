const story = require('../controllers/story')
const middleware = require('../middlewares/cache')
const express = require('express')
const router = express.Router()





///api/v1/s/<routes here>

router.get('/list-all-stories',  story.listAllStories) //add middleware

router.post('/create-story',  story.createStory)

router.post('/edit-story/:id',  story.editStory)

router.get('/delete-story/:id',  story.deleteStory)



module.exports = router