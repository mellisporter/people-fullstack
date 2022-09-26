// require dependencies
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// const PORT = process.env.PORT || 4000;
// destrucutre object
const {PORT = 4000, MONGODB_URL} = process.env;
// require express
const express = require("express");
// create express app
const app = express();
//  import mongoose
const mongoose = require("mongoose");


/// MIDDLEWARE //////
const cors = require("cors");
const morgan = require("morgan");

////////////////////////
// DATABASE CONFIG ////
////////////////////////
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

/// connection event
mongoose.connection
    .on("open", function() {
        console.log("You are connected to Mongoose");
    })
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));

/////////////////////
////// MODELS ///////
////////////////////

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = mongoose.model("People" , PeopleSchema);

////// MIDDLEWARE ////////
app.use(cors());
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies


////////////////////////
////// ROUTES //////////
////////////////////////

// Test
app.get("/", function(req, res){
    res.send("Hello World!")
})

// Seed

// People Index Route
app.get("/people", async (req, res) => {
    try {
        // send all people
        res.json(await People.find({}))
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// New

// Delete

app.delete("/people/:id" , async(req, res) =>{
    try {
        // send all people
        res.json(await People.findByIdAndRemove(req.params.id))
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// Update

app.put("/people/:id" , async (req, res)=> {
    try {
        // send all people
        res.json(
            await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        )
    } catch (error) {
        // send error
        res.status(400).json(error)
    }
})

// Create
app.post("/people" , async (req, res) => {
    try {
        res.json(await People.create(req.body));
    } catch (error) {
        // send error
        res.status(400).json(error);
    }
})

// Edit

// SHow

// Add Listener

app.listen(PORT, function(){
    console.log(`Listening on PORT ${PORT}`)
})