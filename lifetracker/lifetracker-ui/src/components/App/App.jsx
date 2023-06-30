import { useEffect, useState } from 'react'
import axios from "axios"
import './App.css'

function App() {

  const [signUpShowing, setSignUpShowing] = useState(false)
  const [user, setUser] = useState(null)
  return (
    <div>
      <Form signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing} setUser={setUser}/>
    </div>
  )
}

export default App


function Form({signUpShowing, setSignUpShowing, setUser}){

  const [canSubmit, setCanSubmit] = useState(false)
  const [creds, setCreds] = useState({email: "", username: "", fullname: "", password:""})
  const [error, SetError] = useState("")
  
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
        else {setUser(res?.data)}
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
        SetError(null)
        onFormSubmit(signUpShowing ? false : true)
      }}>
      {
        signUpShowing ? (<>
            <input type="email" id='email' name='email' placeholder='Email' required onInput={(e)=>{setCreds({...creds, email: e.target.value})}}/> 
            <input type="text" id='fullname' name='fullname' placeholder='Full name' required onInput={(e)=>{setCreds({...creds, fullname: e.target.value})}}/>
            <input type="text" id='username' name='username' placeholder='Username' required onInput={(e)=>{setCreds({...creds, username: e.target.value})}}/>
            <input type="password" id='password' name='password' placeholder='Password' required onInput={(e)=>{setCreds({...creds, password: e.target.value})}}/>

            <button style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "rgb(199, 199, 200)"}}> Sign Up </button>
            <br />
            <p> Have an account? </p>
            <p className='pbutton' onClick={()=>{
              setSignUpShowing(!signUpShowing)
              SetError(null)
              }}> Log in </p>
        </>) 
        : 
        (<>
            <input type="text" id='username' name='username' placeholder='Username' required onInput={(e)=>{setCreds({...creds, username: e.target.value})}}/>
            <input type="password" id='password' name='password' placeholder='Password' required  onInput={(e)=>{setCreds({...creds, password: e.target.value})}}/>
            
            <button style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "rgb(199, 199, 200)"}} > Log in </button>
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