const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Models
const User = require("./../models/User");

module.exports = {
    register: async (req, res) => {
        try {   
            //Hashing Password Before Storing
            //2nd parameter to hash is the number of cycles
                const hashedPassword = await bcrypt.hash(req.body.password, 10)
                //Creating a New Entry
                const user = await User.create({
                    firstName: req.body.fname,
                    lastName: req.body.lname,
                    email: req.body.email,
                    password: hashedPassword,
                    
                });
                res.status(200).send({data: "Success"});
        }
        catch(err){
            console.log(err)
            res.send({data: "Error", message: err})

        }
    },
    login: async (req, res) => {
        try {
                //Check whether Email exists or not!
                const user = await User.findOne({email: req.body.email});
                if(user){   //User Found with the Email

                    
                    const passValidation = await bcrypt.compare(req.body.password, user.password)

                    if(passValidation){
                    //Creating a New JWT Token
                    //First Parameter is the payload, second the secret key.
                    const token = jwt.sign({
                        firstName: user.firstName,
                        email: user.email,
                    }, "secret")

                    res.status(200).send({data: "Success", user: token});
                }
                else {
                    res.status(200).send({data:"Error", message: "Email or Password is Incorrect"})

                }
               
                }
                else {
                    res.status(200).send({data:"Error", message: "User Does Not Exist"})
                }
        }
        catch(err){
            console.log(err)
            res.send({data: "Error", message: err});

        }
    },
}
