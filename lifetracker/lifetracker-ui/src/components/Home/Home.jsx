import { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from "react-router-dom";

function Home({user}){
    const navigator = useNavigate()
    return (
      <div id="home">
        <section onClick={()=>{navigator('/exercise')}} style={{backgroundColor:"rgb(245, 142, 142)"}} >
            <h1>Exercise</h1>
            <img id="exercise-img" src='https://i.pinimg.com/originals/39/b2/be/39b2be478b2bfe2ce2f1e12b057fdc22.png' alt="running-logo" />
        </section>
        <section onClick={()=>{navigator('/nutrition')}} style={{backgroundColor:"rgb(113, 143, 117)"}}>
            <h1>Nutrition</h1>
            <img id="nutrition-img" src="https://www.pngall.com/wp-content/uploads/2016/03/Food-PNG.png" alt="food-logo" />
        </section>
        <section onClick={()=>{navigator('/sleep')}} style={{backgroundColor:"rgb(106, 115, 249)"}}>
            <h1>Sleep</h1>
            <img id="sleep-img" src="https://www.centralbarkusa.com/york/wp-content/uploads/sites/29/2020/07/dog-sleeping.png" alt="sleep-logo" />
        </section>
      </div>
    )
}

export default Home
