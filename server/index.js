require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const jwt = require('jsonwebtoken');

const cors = require('cors')        //to avoid cross origin policy error
app.use(cors())

const mongoose = require('mongoose')
app.use(express.json())

//DB Connection
mongoose.connect("mongodb://localhost:27017/mern-app", { useNewUrlParser: true }, (err) => {
    if(err){
        console.log("We have an Error!")
    }
    else {
        console.log("Database Connection established")
    }
})

//Controllers
const userController = require('./controllers/UserController')
const blogController = require('./controllers/BlogController')

//Routes
app.post("/api/register", userController.register)
app.post("/api/login", userController.login)
app.get("/api/fetch-blogs", blogController.fetchBlogs)
app.post("/api/add-blog", blogController.createBlog)

app.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
})