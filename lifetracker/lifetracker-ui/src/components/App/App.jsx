import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../Home/Home';
import ExercisePage from '../ExercisePage/ExercisePage';
import NutritionPage from '../NutritionPage/NutritionPage';
import SleepPage from '../SleepPage/SleepPage';
import Navbar from '../Navbar/Navbar';
import LandingPage from '../LandingPage/LandingPage';
import LoginForm from '../LoginForm/LoginForm';


function App() {
  const [signUpShowing, setSignUpShowing] = useState(false)
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null);
  const navigate = useNavigate()


  useEffect(() => {
    let existingToken = localStorage.getItem("token")
    if (existingToken == "undefined"){
      localStorage.removeItem("token")
      navigate('/') 
    }
    if (!user){
      if (existingToken) {
          setToken(existingToken) 
          fetchUserInfo(existingToken)
          navigate('/home')
      }else{
        navigate('/')
      }
    }
    
}, [token])

async function fetchUserInfo(existingToken){
  const url = "https://lifetracker-backend-1zz3.onrender.com/profile"
  try {
    const res = await axios.post(url, {existingToken})
    if (res?.data?.message){SetError(res?.data?.message)}
    else {
      setUser(res?.data)
    }
  } catch (error) {
    console.log("error during axios call")
  }

}

  return (
    <>
    <Navbar user={user} token={token} setUser={setUser} setToken={setToken} />
      <Routes>
        <Route path='/' element={<LandingPage user={user} token={token}  signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing} setUser={setUser} setToken={setToken}/>}/>
        <Route path='/login' element={<LoginForm signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing} setUser={setUser} setToken={setToken}/>}/>
        <Route path='/home' element={<Home user={user} setToken={setToken} token={token}/>}/>
        <Route path='/exercise' element={<ExercisePage user={user} token={token} />}/>
        <Route path='/nutrition' element={<NutritionPage user={user} token={token} />}/>
        <Route path='/sleep' element={<SleepPage user={user} token={token} />}/>
      </Routes>
    </>
  )
}

export default App

