import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import './LoginForm.css'
import axios from "axios"

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
        const url = isLogin ? "https://lifetracker-backend-1zz3.onrender.com/auth/login" : "https://lifetracker-backend-1zz3.onrender.com/auth/signup"
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
      <div id="Form-bg">
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
      </div>
    )
  }

  export default LoginForm