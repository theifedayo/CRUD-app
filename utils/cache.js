const mongoose = require("mongoose");
const redis = require("redis");
const util = require("util");
const dotenv = require('dotenv');
const keys = require("../config/config.env");


dotenv.config({path: './config/config.env'});





//Redis setup
const client = redis.createClient({
  host: process.env.redisHost,
  port: process.env.redisPort,
  retry_strategy: () => 1000
});




client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;
mongoose.Query.prototype.cache = function(options = { time: 60 }) {
  this.useCache = true;
  this.time = options.time;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);
  return this;
};


//check if data is stored already in redis, if it 
//isn't we cache else we return cached data

mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }
  const key = JSON.stringify({
    ...this.getQuery()
  });
  const cacheValue = await client.hget(this.hashKey, key);
  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    console.log("Response from Redis");
    return Array.isArray(doc)
      ? doc.map(d => new this.model(d))
      : new this.model(doc);
  }

  const result = await exec.apply(this, arguments);
  client.hset(this.hashKey, key, JSON.stringify(result));
  client.expire(this.hashKey, this.time);
  console.log("Response from MongoDB");
  return result;
};



module.exports = {
  //delete cache data
  clearKey(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
};