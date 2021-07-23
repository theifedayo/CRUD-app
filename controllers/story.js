const Story = require('../models/story');
const { clearKey } = require("../utils/cache");







//GET
///api/v1/s/list-all-stories
exports.listAllStories = async (req, res) =>{
	try{
		//List all stories in descending order => most recent to less recent
		const stories = await Story.find({}).sort({timeStamp: 'desc'}).cache({time: 1000000}) ;
		return res.json({
			status: true,
			message: "Stories successfully listed",
			data: stories
		});
		
	}catch(err){
		//catch all errors in listAllStories function
		res.status(500).json({
            success: false,
            message: "Server-error",
            data: {}
        });
	}
}





//POST
///api/v1/s/create-story
exports.createStory = async (req, res) =>{
	try{
		const title = req.body.title;
		const content = req.body.content;

		const newStory = await new Story({
			title: title,
			content: content
		})
	
		newStory.save((err, results)=>{
			clearKey(Story.collection.collectionName);
            return res.status(200).json({ 
                success: true,
                message: 'Story successfully created',
                data: results
            });
        });
	}catch(err){
		//catch all errors in createStory function
		res.status(500).json({
            success: false,
            message: "Server-error",
            data: {}
        });
	}
}




//PUT
///api/v1/s/update-story/:id
exports.updateStory = async (req, res) =>{
	var storyId = req.params.id;
	try{
		await Story.findOneAndUpdate({"_id": storyId}, {$set: {
			title: req.body.title, 
			content: req.body.content, 

		}}, (err, story) => {
			if(err){
        		return res.status(404).json({
	                success: false,
	                message: 'Story was not updated',
	                data: story
	            }); 
        	}
		
			clearKey(Story.collection.collectionName);
			return res.status(200).json({ 
				success: true,
				message: 'Story successfully updated',
				data: story
			});
					
		});
	}catch(err){
		//catch all errors in editStory function
		res.status(500).json({
            success: false,
            message: "Server-error",
            data: {}
        }) ;
	}
}





//DELETE
///api/v1/s/delete-story/:id
exports.deleteStory = async (req, res) =>{
	var storyId = req.params.id;
    try{

        await Story.findByIdAndRemove(storyId, (err, story)=>{
        	if(err){
        		return res.status(404).json({
	                success: false,
	                message: 'Story was not deleted',
	                data: story
	            }); 
        	}
        	clearKey(Story.collection.collectionName);
            return res.status(200).json({
                success: true,
                message: 'Story successfully deleted',
                data: story
            }); 
        });

    }catch(err){
    	//catch all errors in deleteStory function
        res.status(500).json({
            success: false,
            message: "Server-error",
            data: {}
        }); 
    }
}