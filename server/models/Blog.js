const mongoose = require("mongoose")

var BlogSchema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: "Required",
    },
    blogDescription: {
        type:String,
        required: "Required",
    },
    blogDate: {
        type:String,
        required: "Required",
    }
},
{collection: 'blogs'}  
)

//Defining User Model with UserSchema
const model = mongoose.model("Blog", BlogSchema)

//Exporting, so can be used anywhere
module.exports = model