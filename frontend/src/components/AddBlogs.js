import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Nav from './Nav'
// import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import { useNavigate } from 'react-router-dom';

function AddBlogs() {
    const navigate = useNavigate();
    const [loggedUser, setLoggedUser] = useState({})
    const [blogTitle, setblogTitle] = useState('')
    const [blogDescription, setblogDescription] = useState('')
    const [blogDate, setblogDate] = useState('')
    const [errorMsg, seterrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const createBlog = (event) => {
        
        setSuccessMsg('')
        event.preventDefault();

        if(blogTitle === '' || blogDescription === '' || blogDate === ''){
               
            seterrorMsg('One of the fields is Empty')
        }
        else {
            console.log('data can be sent now!');
            axios.post("/api/add-blog",
                { 
                    blogTitle: blogTitle,
                    blogDescription: blogDescription,
                    blogDate: blogDate 
                }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token')
                }
            })
            .then((response) => {
                if(response.data.status === 'Success'){
                    console.log(response.data.data);

                    //Set Success Message
                    setSuccessMsg('Data Inserted Successfully!');
                    // Empty the Fields
                    setblogTitle('');
                    setblogDescription('');
                    setblogDate('');

               
            }
            else {
                
                console.log('We have an error');
            }
            })
            .catch((error) => {
                console.log(`Error: ${error}`);
            })
        }
    }


    useEffect(() => {
        // console.log("Use Effect Ran")
        const token = localStorage.getItem('token')
        console.log(`Local Token: ${token}`);
        if(token){
            const user = decodeToken(token);
            if(user){
                setLoggedUser(user)
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

  return (
      <>
        <Nav/>
    <h2 className="heading">ADD BLOG</h2>
    <div className='container mt-4'>
        <div className="row justify-content-md-center">
            <div className="col-md-6">
            { errorMsg ? 
            <p className="error-msg"> {errorMsg} </p> 
            :
            '' 
            }
            { successMsg ? 
            <p className="success-msg"> {successMsg} </p>  
            :
            '' 
            }
            <div className="card">
            <div className="card-header"> <h5> Add Blogs </h5> </div>
            <div className="card-body">
            <form onSubmit={(e) => createBlog(e)}>
               <div className="form-group m-2">
                    <label>Enter Title</label>
                    <input type="text" onChange={(e) => setblogTitle(e.target.value)}className="form-control"/>
               </div>
               <div className="form-group m-2">
                    <label>Enter Description</label>
                    <textarea className="form-control" onChange={(e) => setblogDescription(e.target.value)}></textarea>
               </div>
               <div className="form-group m-2">    
                    <label>Enter Date</label>
                    <input type="date" className="form-control" onChange={(e) => setblogDate(e.target.value) }/>
               </div>
           
            <button type="submit" onClick={(e) => createBlog} className="btn btn-primary mt-4">Create</button>
            </form>
            </div>
        </div>
            </div>
        </div>
        </div>
        </>
  )
}

export default AddBlogs