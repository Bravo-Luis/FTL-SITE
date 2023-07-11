import { useEffect, useState } from 'react';
import './ExercisePage.css'
import axios from "axios"

function ExercisePage({user, token}){

    const [exerciseForm, setExerciseForm]  = useState({
        name: "",
        category: "",
        duration: "",
        intensity: "",
        date: ""
    })

    const [exerciseList, setExerciseList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await fetchExercises();
        };
      
        fetchData();
      }, [token]);

    async function fetchExercises(){
        const url = 'https://lifetracker-backend-1zz3.onrender.com/exercises'
        try {
            const res = await axios.post(url, {token: token})
            setExerciseList(res?.data?.rows?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    async function createExercise(){
        const url = 'https://lifetracker-backend-1zz3.onrender.com/exercise'
        try {
            const res = await axios.post(url, {token: token, exerciseForm: exerciseForm})
            setExerciseList(res?.data?.rows?.reverse())
            setExerciseForm({
                name: "",
                category: "",
                duration: "",
                intensity: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div id="exercise-page">
            <div><ExerciseForm exerciseForm={exerciseForm} setExerciseForm={setExerciseForm} createExercise={createExercise}/></div>
            <div id="exercise-list">
                {exerciseList?.map((exercise, idx)=>{
                    return (
                        <ExerciseCard key={idx} exercise={exercise}/>
                    )
                })}
            </div>
        </div>
    )
}

function ExerciseForm({exerciseForm, setExerciseForm, createExercise}){

    function checkField(){
        return exerciseForm.name && exerciseForm.category && exerciseForm.duration && exerciseForm.intensity && exerciseForm.date
    }
    const [isValid, setIsValid] = useState(false)

    useEffect(()=>{
        if(checkField()){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
    },[exerciseForm])

    return (
        <div id="exercise-form">
            <input type="date" placeholder='date' value={exerciseForm.date} onChange={(e)=>{setExerciseForm({...exerciseForm, date: e.target.value})}} />
            <input type="text" placeholder='Name' value={exerciseForm.name} onChange={(e)=>{setExerciseForm({...exerciseForm, name: e.target.value})}} /> 
            <select  value={exerciseForm.category} name="category" id="category" placeholder='category' onChange={(e)=>{setExerciseForm({...exerciseForm, category: e.target.value})}} >
                <option value="">Category</option>
                <option value="run">Run</option>
                <option value="walk">Walk</option>
                <option value="lift">Lift</option>
                <option value="bike">Bike</option>
                <option value="swim">Swim</option>
                <option value="other">Other</option>
            </select>
            <input type="number" placeholder='Duration (minutes)' value={exerciseForm.duration} onChange={(e)=>{
                if(e.target.value >= 1){
                    setExerciseForm({...exerciseForm, duration: e.target.value})
                }
            }} />
            <input type="number" placeholder='Intensity (1-10)' value={exerciseForm.intensity} onChange={(e)=>{
                if((e.target.value >= 1 && e.target.value <= 10) || e.target.value === ""){setExerciseForm({...exerciseForm, intensity: e.target.value})}
                }} />
            <button disabled={!isValid}  style={{backgroundColor: isValid ? "rgb(125, 160, 235)" : "grey", cursor: isValid ? "pointer" : "default"}}onClick={()=>{if(checkField()){createExercise()}}}>Create</button>
        </div>
    )
}

function ExerciseCard({exercise}){
    return(

    <div className='exercise-card'>
        <div className='show-on-hover'>
        <p>{exercise.date}</p>
        <h2>{exercise.name}</h2>
        <h3>{exercise.category}</h3>
        <p>Duration: {exercise.duration} {exercise.duration === "1" ? (<>min</>) : (<>mins</>)}</p>
        <p>Intensity: {exercise.intensity} </p>
        </div>
        <div className='show-not-hover'>
            <h1>{exercise.name}</h1>
        </div>

    </div>
    )
}

export default ExercisePage;