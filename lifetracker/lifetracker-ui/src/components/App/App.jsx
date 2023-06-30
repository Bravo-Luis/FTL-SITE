import { useState } from 'react'
import './App.css'

function App() {

  const [signUpShowing, setSignUpShowing] = useState(false)

  return (
    <div>
      <Form signUpShowing={signUpShowing} setSignUpShowing={setSignUpShowing}/>
    </div>
  )
}

export default App


function Form({signUpShowing, setSignUpShowing}){

  const [canSubmit, setCanSubmit] = useState(false)

  function checkSubmission(event){
    const usernameCheck = event.target.username.value.length
    const passwordCheck = event.target.password.value.length > 5
    if (signUpShowing){
      const fullnameCheck = event.target.fullname.value.length
      const emailCheck = event.target.email.value.length > 5
      if(emailCheck && passwordCheck && fullnameCheck && usernameCheck){
        setCanSubmit(true)
      }
      else{
        setCanSubmit(false)
      }
    }else {
      if(usernameCheck && passwordCheck){
        setCanSubmit(true)
      }
      else{
        setCanSubmit(false)
      }
    }
  }

  return (
    <div id='Form'>
      <h1>Lifetracker</h1>
      <form onChange={checkSubmission}>
      {
        signUpShowing ? (<>
            <input type="email" id='email' name='email' placeholder='Email' required/> 
            <input type="text" id='fullname' name='fullname' placeholder='Full name' required/>
            <input type="text" id='username' name='username' placeholder='Username' required/>
            <input type="password" id='password' name='password' placeholder='Password' required/>

            <button style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "background-color: rgb(199, 199, 200);"}}> Sign Up </button>
            <br />
            <p> Have an account? </p>
            <p className='pbutton' onClick={()=>{setSignUpShowing(!signUpShowing)}}> Log in </p>
        </>) 
        : 
        (<>
           
            <input type="text" id='username' name='username' placeholder='Username' required/>
            <input type="password" id='password' name='password' placeholder='Password' required/>
            
            <button style={{backgroundColor: canSubmit ? "rgb(68, 142, 246)" : "background-color: rgb(199, 199, 200);"}} > Log in </button>
            <br />
            <p> Don't have an account? </p>
            <p className='pbutton' onClick={()=>{setSignUpShowing(!signUpShowing)}}> Sign up </p>
        </>)
      }
      </form>
    </div>
  )
}