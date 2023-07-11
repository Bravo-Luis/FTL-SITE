import './Navbar.css'
import { useNavigate } from "react-router-dom";

function Navbar({user, token, setUser, setToken}){
    const navigate = useNavigate()

    function signOut(){
        localStorage.removeItem("token")
        setUser(null)
        setToken(null)
    }

    return(
        <div id="Navbar">
            {
                user && token ? (
                <>
                <ul>
                    <li onClick={()=>{navigate('/home')}}> Lifetracker </li>
                    <li onClick={()=>{navigate('/exercise')}}> Exercise </li>
                    <li onClick={()=>{navigate('/nutrition')}}> Nutrition </li>
                    <li onClick={()=>{navigate('/sleep')}}> Sleep </li>
                    <li className='log-out' onClick={signOut}> Log Out </li>
                </ul>
                </>) : 
                (
                <>
                    <ul>
                
                    <li className='log-out' onClick={()=>{navigate('/')}}> Lifetracker </li>
                    <li className='log-out' onClick={()=>{navigate('/login')}}> Log in </li>
                    </ul>
                    
                </>)
            }
        </div>
    )
}

export default Navbar