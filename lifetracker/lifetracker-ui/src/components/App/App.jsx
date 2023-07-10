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
  const url = "http://localhost:3001/profile"
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
        <Route path='/' element={<LoginForm signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing} setUser={setUser} setToken={setToken}/>}/>
        <Route path='/home' element={<Home user={user} setToken={setToken} token={token}/>}/>
        <Route path='/exercise' element={<ExercisePage user={user} token={token} />}/>
        <Route path='/nutrition' element={<NutritionPage user={user} token={token} />}/>
        <Route path='/sleep' element={<SleepPage user={user} token={token} />}/>
      </Routes>
    </>
  )
}

export default App



function NavBar(){
  return(
    <div>

    </div>
  )
}

function LoginForm({signUpShowing, setSignUpShowing, setUser, setToken, user}){

  const [canSubmit, setCanSubmit] = useState(false)
  const [creds, setCreds] = useState({email: "", username: "", fullname: "", password:""})
  const [error, SetError] = useState("")
  const navigate = useNavigate()
  
    useEffect(()=>{
      if (signUpShowing){
        if(creds.email.length && creds.username.length && creds.fullname.length && creds.password.length){
          setCanSubmit(true)
        }
        else{
          setCanSubmit(false)
        }
      }else {
        if(creds.username.length && creds.password.length){
          setCanSubmit(true)
        }
        else{
          setCanSubmit(false)
        }
      }
    },[creds])

    async function onFormSubmit(isLogin){
      const url = isLogin ? "http://localhost:3001/auth/login" : "http://localhost:3001/auth/signup"
      const req = isLogin ? {username : creds.username, password: creds.password} : creds
      try {
        const res = await axios.post(url, req)
        if (res?.data?.message){SetError(res?.data?.message)}
        else {
          setUser(res?.data)
          localStorage.setItem("token", res?.data.token)
          setToken(res?.data.token)
          setCreds({email: "", username: "", fullname: "", password:""})
          navigate('/home')
        }
      } catch (error) {
        console.log("error during axios call")
      }
    }

  return (
    <div id='Form'>
      <h1>Lifetracker</h1>
      {
        error ? (<p className='error'>{error}</p>) : (<></>)
      }
      <form onSubmit={(e)=>{
        e.preventDefault()
        if (!canSubmit){return}
        SetError(null)
        onFormSubmit(signUpShowing ? false : true)
      }}>
      {
        signUpShowing ? (<>
            <input type="email" value={creds.email} id='email' name='email' placeholder='Email' required onInput={(e)=>{setCreds({...creds, email: e.target.value})}}/> 
            <input type="text" value={creds.fullname} id='fullname' name='fullname' placeholder='Full name' required onInput={(e)=>{setCreds({...creds, fullname: e.target.value})}}/>
            <input type="text" value={creds.username} id='username' name='username' placeholder='Username' required onInput={(e)=>{setCreds({...creds, username: e.target.value})}}/>
            <input type="password" value={creds.password} id='password' name='password' placeholder='Password' required onInput={(e)=>{setCreds({...creds, password: e.target.value})}}/>

            <button disabled={!canSubmit} style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "rgb(199, 199, 200)", cursor : canSubmit ? "pointer" : "", color: canSubmit ? "white" : "black"}} > Sign Up </button>
            <br />
            <p> Have an account? </p>
            <p className='pbutton' onClick={()=>{
              setSignUpShowing(!signUpShowing)
              SetError(null)
              }}> Log in </p>
        </>) 
        : 
        (<>
            <input type="text" id='username' value={creds.username} name='username' placeholder='Username' required onInput={(e)=>{setCreds({...creds, username: e.target.value})}}/>
            <input type="password" id='password' value={creds.password} name='password' placeholder='Password' required  onInput={(e)=>{setCreds({...creds, password: e.target.value})}}/>
            
            <button disabled={!canSubmit} style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "rgb(199, 199, 200)", cursor : canSubmit ? "pointer" : "", color: canSubmit ? "white" : "black"}} > Log in </button>
            <br />
            <p> Don't have an account? </p>
            <p className='pbutton' onClick={()=>{
              setSignUpShowing(!signUpShowing)
              SetError(null)
            }}> Sign up </p>
        </>)
      }
      </form>
    </div>
  )
}