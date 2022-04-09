const mongoose = require("mongoose")

//Defining Schema of the Collection
var UserSchema = new mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type:String
        },
        email: {
            type:String,
            required: "Required",
            unique: true
        },
        password: {
            type:String,
            required: "Required"
        }
}, 
//Optional Parameter, used to define the collection name.
{collection: 'users'}    
)

//Defining User Model with UserSchema
const model = mongoose.model("User", UserSchema)

//Exporting, so can be used anywhere
module.exports = model