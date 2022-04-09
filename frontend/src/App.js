import React from 'react'
import './App.css'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import AddBlogs from './components/AddBlogs'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <>
      <Router>
      <Routes>
      <Route path="/register" exact element={<Register/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="/" exact element={<Home/>} />
      <Route path="/add-blogs" exact element={<AddBlogs/>} />
    </Routes>
     </Router>
     </>
  )
}


export default App