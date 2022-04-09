import React, {useState} from 'react'
import axios from 'axios'
import './styles.scss'

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const Register = () => {

  const navigate = useNavigate()

  const [fname, setFName] = useState("")
  const [lname, setLName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMessage, setErrMessage] = useState("")

  function submitHandler(e) {
  e.preventDefault();

    axios.post("http://localhost:5000/api/register", {fname, lname, email, password})
    .then((res)=> {
        console.log(res.data);
        if(res.data.data === 'Success'){
          navigate('/login')  //If Successful, redirect to login

        }
        if(res.data.error){
          console.log('We have An Error!');
        }
        
    })
    .catch(err => console.log(err))

    //One way of doing it.
    /*
    And use 'async' with function
    const response = await fetch("http://localhost:5000/home", {fname, lname, email, password})
    const data = await response.json()
    console.log(data);
    */

  }

  return (
    <section className="entry-page">
      <form onSubmit={(e) => submitHandler(e)}>
      <h2>Sign Up!</h2>
      <fieldset>
      <legend>Create Account</legend>
      <ul>
       <li>
        <label>First Name</label>
        <input type="text" value={fname} onChange={(e) => setFName(e.target.value)} required/>
        </li>
       <li>
          <label>Last Name</label>
          <input type="text" value={lname} onChange={(e) => setLName(e.target.value)} required />
          </li>
       <li>
        <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </li>
       <li>
        <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </li>
          </ul>
        </fieldset>
        <button type="submit" className="submit-btn">Submit</button>
        <button type="button" className="submit-btn"><Link to="/login" className="redirection">Already have an Account?</Link></button>
        
      </form>
      </section>
  )
}

export default Register