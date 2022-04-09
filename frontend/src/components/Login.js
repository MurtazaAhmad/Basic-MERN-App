import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
const Login = () => { 

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function submitHandler(e){
    e.preventDefault();
    if(email === '' || password === ''){
      setErrorMessage('Email or Password cannot be empty')
      
    }
    else {
      setErrorMessage('')
      axios.post("http://localhost:5000/api/login", {email, password})
      .then((res)=> {
          console.log(res.data);  
          if(res.data.user){
            //If Login Is Successful, store Token in Local Storage
            localStorage.setItem('token', res.data.user)
  
            console.log("User Logged In!")
            navigate('/')
  
          }
          else {  
            console.log(res.data.data);
            if(res.data.data === 'Error'){
              setErrorMessage(res.data.message)
            }
            console.log(`Message in Hook: ${errorMessage}`)
  
          }
      })
      .catch(err => {
        console.log('Error!');
      })
    }
    

    //One way of doing it.
    /*
    const response = await fetch("http://localhost:5000/home", {fname, lname, email, password})
    const data = await response.json()
    console.log(data);
    */

  }

  return (
    <section className="entry-page">
      <form onSubmit={(e) => submitHandler(e)}>        
      <h2>Welcome Back!</h2>
      { 
        errorMessage ? <p className="error-msg">{errorMessage}</p> : ''
      }
        <fieldset>
          <legend>Log In</legend>
          <ul>
            <li>
          <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />        
            </li>
            <li>
          <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </li>
          </ul>
        </fieldset>
              <button type="submit" className="submit-btn" onClick={(e) => submitHandler(e)}>Login</button>
              <button type="button"><Link to="/register" className="redirection">Create an Account</Link></button>     
      </form>
    </section>
  )
}

export default Login