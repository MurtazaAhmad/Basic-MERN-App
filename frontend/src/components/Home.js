import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';
import Nav from './Nav'

const Home = () => {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState({})
    
    const [blogs, setBlogs] = useState([])

    // const { token } = useJwt(token);

    

    const fetchBlogs = () => {

        console.log('Populate Quote Function Called!');
        axios.get("/api/fetch-blogs", {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        .then((response) => {
            console.log(response.data);
            // setQuote(response.data.quote)
            console.log(response.data)
        })
        .catch((error) => {
            console.log(`Error: ${error}`);
        })
    }
    

    useEffect(() => {
        // console.log("Use Effect Ran")
        const token = localStorage.getItem('token')
        console.log(`Local Token: ${token}`);
        if(token){
            const user = decodeToken(token);
            if(user){
                setLoggedUser(user)
                console.log(`Token:${JSON.stringify(user)}`);
                fetchQuotes()
            }
            else {
                  // Token Does Not Exist
                  localStorage.removeItem('token')
                    navigate('/login')
            }
        }
        else {
            console.log("Local Storage is Empty.")
            navigate('/login')
        }
    }, [])

    function fetchQuotes(){
        axios.get("http://localhost:5000/api/fetch-blogs",
        {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('token')
        }
    })
    .then((response) => {
        if(response.data.status === 'Success'){
            console.log(response.data.data);
            setBlogs(response.data.data)
  
    }
    else {
        // setQuote('Quote Not Found')
        // setNewQuote('')
        console.log('We have an error');
    }
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    }

    return (
        <>
        <Nav/>
    <h2 className="heading">WELCOME {loggedUser.firstName ?? ''}!</h2>
        <div className="container mt-4">
            <div className="row justify-content-md-center">
                <div className="col-md-10">
                    <div className="card">
                        <div className="card-header"> 
                            <h3> Recently Added Blogs </h3>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Blog Title</th>
                                    <th>Description</th>
                                    <th>Added On</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                    blogs.map((blog, index) => {
                                        return (
                                            <tr>
                                            <th>{index}</th>
                                            <td>{blog.blogTitle}</td>
                                            <td>{blog.blogDescription}</td>
                                            <td>{ blog.blogDate}</td>
                                            </tr>
                                            )        
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
            
            

            
        </>
    )
}

export default Home