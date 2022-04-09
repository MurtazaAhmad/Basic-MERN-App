const jwt = require('jsonwebtoken');
const Blog = require("./../models/Blog");
const User = require("./../models/User");


module.exports = {
    createBlog: async (req, res) => {
        try {
        
            const token = req.headers['x-access-token']
            // console.log(token);
            const decoded = jwt.verify(token, 'secret')
            const mail = decoded.email //Email of Logged In User
            // console.log(mail);
            const user = await User.findOne({ email: mail})
            // console.log(user);
            if(user){
                const blogTitle = req.body.blogTitle
                const blogDescription = req.body.blogDescription
                const blogDate = req.body.blogDate
                
                const data = await Blog.create({ blogTitle, blogDescription, blogDate})
                if(data){
                    const blogs = await Blog.find({})
                    res.status(200).send({status: 'Success', data: blogs})
                }
                else 
                res.status(200).send({status: 'Error', data: 'Something went wrong!'})
            }
            else {
                res.send({status: 'Error', data: 'User does not exist!'})

            }
        }
        catch(err){
            res.send({status: 'Error', data: err})

        }
    },
    fetchBlogs: async (req, res) => {
        const token = req.headers['x-access-token']

        try {
            const decoded = jwt.verify(token, 'secret')
            const mail = decoded.email 
            const user = await User.findOne({ email: mail})
            if(user){
                const data = await Blog.find({})
                console.log(data)
                res.send({status: 'Success', data: data})
            }
            else {
                res.send({status: 'Error', data: 'User does not Exist!'})
                
            }
        }
        catch(err){
            console.log(err)
            res.send({status: 'Error', data: err})

        }


    },
    deleteBlogs: async(req, res) => {
        res.send({status: 'Success', data: 'Delete Blogs Function Connected'})
        
    }
}