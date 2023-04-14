const fastify = require('fastify')()

fastify.register(require('fastify-cors'),{
})

const mongoose = require('mongoose');

//mongo db connection
mongoose
  .connect('mongodb://localhost:27017/task-backend', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo is ready !"))
  .catch((err) => console.log(err));

// Declare a route
fastify.get('/', function (request, reply) {
    reply.send({ working: 'successfull' })
})

const User = require("./models/user");

fastify.post('/create',async (req, reply) => { 
    try { 

        console.log(req.body)
        const createUser = await new User({...req.body,}).save();
        
        reply.send({createUser,"message": 'Profile Created'})
    } 
    catch(error){
        console.log(error)
        reply.send ({ "error" : 'Creation Failed' })    
    } 
})

fastify.listen(5000, err => {
    if (err) throw err
    console.log(`server listening on ${fastify.server.address().port}`)
})