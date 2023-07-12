import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'
import { useNavigate, useParams } from "react-router-dom";
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
        <Route path='/:activity/:id' element={
        <div className='fetched'>
          <FetchPage token={token}/>
        </div>
        }/>
        <Route path='/login' element={<LoginForm signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing} setUser={setUser} setToken={setToken}/>}/>
        <Route path='/home' element={<Home user={user} setToken={setToken} token={token}/>}/>
        <Route path='/exercise' element={<ExercisePage user={user} token={token} />}/>
        <Route path='/nutrition' element={<NutritionPage user={user} token={token} />}/>
        <Route path='/sleep' element={<SleepPage user={user} token={token} />}/>
      </Routes>
    </>
  )
}

function FetchPage({token}){
  const { activity, id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      await fetchItem()
    };
  
    fetchData();
  }, [token]);

async function fetchItem(){
    const url = `https://lifetracker-backend-1zz3.onrender.com/${activity}/${id}`
    try {
        const res = await axios.post(url, {token: token})
        console.log(res.data)
        setData(res.data)
    } catch (error) {
        console.log(error)
    }
}

  if (activity === "sleep"){
    return(
      <div >
        <p>id: {data?.id}</p>
        <h2>{data?.date}</h2>
        <h1> start: {data?.start_time}</h1>
        <h1>end: {data?.end_time}</h1>
    </div>
    )
  }else if(activity === "exercise"){
    return(<div >
    <div className='show-on-hover'>
    <p>id: {data?.id}</p>
    <p>{data?.date}</p>
    <h2>{data?.name}</h2>
    <h3>{data?.category}</h3>
    <p>Duration: {data?.duration} {data?.duration === "1" ? (<>min</>) : (<>mins</>)}</p>
    <p>Intensity: {data?.intensity} </p>
    </div>
    <div className='show-not-hover'>
        <h1>{data?.name}</h1>
    </div>
</div >)
  }else if(activity === "nutrition"){
    return(
      <div >
      <p>id: {data?.id}</p>
      <h3>{data?.date}</h3>
      <h1>{data?.name}</h1>
      <h3>{data?.category}</h3>
      <h3>{data?.calories}</h3>
  </div>
)
  }
}


export default App

