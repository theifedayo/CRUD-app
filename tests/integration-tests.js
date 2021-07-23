//author: Ifedayo Adesiyan 2021

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');


chai.should();

chai.use(chaiHttp);



describe('CRUD app - Integration tests', () => {


    //Test GET Route
    
    describe("GET /api/v1/s/list-all-stories", () => {
        it("It should GET all the stories", (done) => {
            chai.request(app)
                .get("/api/v1/s/list-all-stories")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
         
                    response.body.data.should.be.a('array');
                    response.body.data[0].should.have.property('title');
                    response.body.data[0].should.have.property('content');
                done();
            });
        });
    });


   
    //Test POST route
    
    describe("POST /api/v1/s/create-story", () => {
        it("It should POST a new story", (done) => {
            const story = {
                title: "New title",
                content: "This is a new content"
            };
            chai.request(app)                
                .post("/api/v1/s/create-story")
                .send(story)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.data.should.have.property('title').eq('New title');
                    response.body.data.should.have.property('content').eq('This is a new content');
                done();
            });
        });
    });


     
     //Test PUT route
     
    describe("PUT /api/v1/s/update-story/:id", () => {
        it("It should PUT an existing story", (done) => {

        	//storyId should be a single String of 
        	//12 bytes or a string of 24 hex characters for MongoDB
            const storyId = "60f00de8c78dff18d9c3f377"; 

            const story = {
                title: "Story 1 changed",
                content: "This is story 1 content"
            };
            chai.request(app)                
                .put("/api/v1/s/update-story/" + storyId)
                .send(story)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');               
                done();
            });
        }); 

        it("It should NOT UPDATE a story that is not in the database", (done) => {
            const storyId = "60f00de8c78dff18d9c3f"; 
            chai.request(app)                
                .put("/api/v1/s/update-story/" + storyId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq("Story was not updated");
                done();
            });
        });       
    });

    

    //Test DELETE route

    describe("DELETE /api/v1/s/delete-story/:id", () => {
        it("It should DELETE an existing story", (done) => {
            const storyId = "60f00de8c78dff18d9c3f377"; 
            chai.request(app)                
                .delete("/api/v1/s/delete-story/" + storyId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                 
                done();
            });
        });

        it("It should NOT DELETE a story that is not in the database", (done) => {
            const storyId = "60f00de8c78dff18d9c3f"; 
            chai.request(app)                
                .delete("/api/v1/s/delete-story/" + storyId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq("Story was not deleted");
                done();
            });
        });
    });



});

