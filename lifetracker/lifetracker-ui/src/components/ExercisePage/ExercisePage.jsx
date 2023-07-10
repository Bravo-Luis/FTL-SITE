import { useEffect, useState } from 'react';
import './ExercisePage.css'
import axios from "axios"

function ExercisePage({user, token}){

    const [exerciseForm, setExerciseForm]  = useState({
        name: "",
        category: "",
        duration: "",
        intensity: ""
    })

    const [exerciseList, setExerciseList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await fetchExercises();
        };
      
        fetchData();
      }, [token]);

    async function fetchExercises(){
        const url = 'http://localhost:3001/exercises'
        try {
            const res = await axios.post(url, {token: token})
            setExerciseList(res?.data?.rows?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    async function createExercise(){
        const url = 'http://localhost:3001/exercise'
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
            <ExerciseForm exerciseForm={exerciseForm} setExerciseForm={setExerciseForm} createExercise={createExercise}/>
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
    return(
        <div id="exercise-form">
            <input type="text" placeholder='Name' value={exerciseForm.name} onChange={(e)=>{setExerciseForm({...exerciseForm, name: e.target.value})}} /> 
            <select  value={exerciseForm.category} name="category" id="category" placeholder='category' onChange={(e)=>{setExerciseForm({...exerciseForm, category: e.target.value})}} >
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
            <button onClick={createExercise}>Create</button>
        </div>

    )
}

function ExerciseCard({exercise}){
    return(
    <div className='exercise-card'>
        <h1>{exercise.name}</h1>
    </div>
    )
}

export default ExercisePage;