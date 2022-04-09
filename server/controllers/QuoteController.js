const jwt = require('jsonwebtoken');
const User = require("./../models/User");

module.exports = {
    quotes: async (req, res) => {
        //req.headers is an Array...
        const token = req.headers['x-access-token']
        try {

            //Synchronous Request
            const decoded = jwt.verify(token, 'secret')
            const mail = decoded.email //Email of Logged In User
            console.log(mail);
            //user contains the Logged In user
            const user = await User.findOne({ email: mail})
           
            console.log(user);
            res.send({data: "Success", quote: user.quote})
            
        }
        catch(err){
            console.log(err)
            res.send({data: "Error", message: err})
        }
    },
    createQuote: async (req, res) => {
        
        //req.headers is an Array...
        const token = req.headers['x-access-token']
        try {

            //Synchronous Request
            const decoded = jwt.verify(token, 'secret')
            const mail = decoded.email //Email of Logged In User
            const quote = req.body.quote
            
            
            //user contains the Logged In user
            // const user = User.findOne({ email: email})
            const user = await User.updateOne({email: mail}, {$set: {"quote": quote}})
            
            res.send({data: "Success", message: "Quote Updated Successfully!"})
        }
        catch(err){
            console.log(err)
            res.send({data: "Error", message: err})
        }
    },


};