import './NavBar.css'
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
                    <li> Home </li>
                    <li> Exercise </li>
                    <li> Nutrition </li>
                    <li> Sleep </li>
                    <li onClick={signOut}> Log Out </li>
                </ul>
                </>) : 
                (
                <>
                    <ul>
                    <li> Log in </li>
                    </ul>
                    
                </>)
            }
        </div>
    )
}

export default Navbar