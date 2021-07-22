const mongoose = require('mongoose')


const connectDB = async ()=>{
	try{
		//connection setup in development ot production
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		console.log(`MongoDB connected succesfully to ${conn.connection.host}`)
	}catch(error){
		console.error(error)
		process.exit(1)
	}
}

module.exports = connectDB