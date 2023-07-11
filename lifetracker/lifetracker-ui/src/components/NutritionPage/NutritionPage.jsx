import { useEffect, useState } from 'react';
import './NutritionPage.css'
import axios from "axios"

function NutritionPage({user, token}){

    const [nutritionForm, setNutritionForm]  = useState({
        name: "",
        category: "",
        calories: "",
        date: ""
    })

    const [nutritionList, setNutritionList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await fetchNutrition();
        };
      
        fetchData();
      }, [token]);

    async function fetchNutrition(){
        const url = 'https://lifetracker-backend-1zz3.onrender.com/nutritions'
        try {
            const res = await axios.post(url, {token: token})
            setNutritionList(res?.data?.rows?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    async function createNutrition(){
        const url = 'https://lifetracker-backend-1zz3.onrender.com/nutrition'
        try {
            const res = await axios.post(url, {token: token, nutritionForm: nutritionForm})
            setNutritionList(res?.data?.rows?.reverse())
            setNutritionForm({
                name: "",
                category: "",
                calories: "",
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div id="nutrition-page">
            <NutritionForm nutritionForm={nutritionForm} setNutritionForm={setNutritionForm} createNutrition={createNutrition}/>
            <div id="nutrition-list">
                {nutritionList?.map((nutrition, idx)=>{
                    return (
                        <NutritionCard key={idx} nutrition={nutrition}/>
                    )
                })}
            </div>
        </div>
    )
}

function NutritionForm({nutritionForm, setNutritionForm, createNutrition}){

    function checkField(){
        return nutritionForm.name && nutritionForm.category && nutritionForm.calories
    }
    const [isValid, setIsValid] = useState(false)

    useEffect(()=>{
        if(checkField()){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
    },[nutritionForm])

    return(
        <div id="nutrition-form">
            <input type="date" placeholder='date' value={nutritionForm.date} onChange={(e)=>{setNutritionForm({...nutritionForm, date: e.target.value})}} />
            <input type="text" placeholder='Name' value={nutritionForm.name} onChange={(e)=>{setNutritionForm({...nutritionForm, name: e.target.value})}} /> 
            <select  value={nutritionForm.category} name="category" id="category" placeholder='category' onChange={(e)=>{setNutritionForm({...nutritionForm, category: e.target.value})}} >
                <option value="">Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
            <input type="number" placeholder='Calories' value={nutritionForm.calories} onChange={(e)=>{
                if (e.target.value >= 0){
                    setNutritionForm({...nutritionForm, calories: e.target.value})
                    }
                }
            } />

            <button disabled={!isValid}  style={{backgroundColor: isValid ? "rgb(125, 160, 235)" : "grey", cursor: isValid ? "pointer" : "default"}} onClick={createNutrition}>Create</button>
        </div>

    )
}

function NutritionCard({nutrition}){
    return(
    <div className='nutrition-card'>
        <h3>{nutrition.date}</h3>
        <h1>{nutrition.name}</h1>
        <h3>{nutrition.category}</h3>
        <h3>{nutrition.calories}</h3>
    </div>
    )
}

export default NutritionPage;