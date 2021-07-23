# CRUD app

This is a simple CRUD-Create Read Update & Delete application built with a mindset of 100,000 users making request to it.

## Installation

Run the following command to install the required packages in package.json file:
```shell
$npm install
```
Also make sure Redis server is installed on your computer : https://redis.io/topics/quickstart

When all has been installed, you can start the express server by running simultaneously:

```shell
$redis-server
```
with nodemon
```shell
$npm run dev
```
or without nodemon:
```shell
npm start
```

## Usage

>**NOTE**<br>
>The routes below are prefixed with `localhost:PORT` which is the default configuration set in the `config/config.env`
>file which has been ignored by git. 

|Route|Description|Request|
|:------------- | :----------: |:----------: |
|`/api/v1/s/list-all-stories`|return all stories|GET|
|`/api/v1/s/create-story`|add a new story|POST|
|`/api/v1/s/update-story/:id`|update a story by its ID|PUT|
|`/api/v1/s/delete-story/:id`|delete a story by its ID|DELETE|


**Response**
Response data are formatted as JSON and returned in this structure
	
	{
		"success": [boolean],
		"message": [string],
		"data": [List] || [Object]
	}


## Test
Run the following commands to run unit tests:
```shell
$npm run unit-tests
```
and integration tests:
```shell
$npm run integration-tests
```
## Stack Choice

MongoDB - It lets the application run while it is fetching data from the backend server which won't make our large users always wait for response. It is asynchronous and event-driven. Schema doesn't have to be well structured, which makes it perfect for frequently changing data. MongoDB is also a distributed database which allows ad-hoc queries, real-time integration, and indexing efficient.

Redis - <You can connect to mongoAtlas to see the effect of Redis clearly - reduction in data retrieval time>
Since Redis is an in-memory database, its data access operations are faster than any other disk-bound database could deliver. It makes Redis the perfect choice for caching. Its key-value data storage is another plus because it makes data storage and retrieval much simpler. 
Our large users don't always have to fetch data from our database everytime, they can always have in-memory storage to retrieve data from therefore reducing stress on DB.



