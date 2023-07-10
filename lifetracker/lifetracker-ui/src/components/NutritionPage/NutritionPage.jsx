import { useEffect, useState } from 'react';
import './NutritionPage.css'
import axios from "axios"

function NutritionPage({user, token}){

    const [nutritionForm, setNutritionForm]  = useState({
        name: "",
        category: "",
        calories: "",
    })

    const [nutritionList, setNutritionList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await fetchNutrition();
        };
      
        fetchData();
      }, [token]);

    async function fetchNutrition(){
        const url = 'http://localhost:3001/nutritions'
        try {
            const res = await axios.post(url, {token: token})
            setNutritionList(res?.data?.rows?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    async function createNutrition(){
        const url = 'http://localhost:3001/nutrition'
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
    return(
        <div id="nutrition-form">
            <input type="text" placeholder='Name' value={nutritionForm.name} onChange={(e)=>{setNutritionForm({...nutritionForm, name: e.target.value})}} /> 
            <select  value={nutritionForm.category} name="category" id="category" placeholder='category' onChange={(e)=>{setNutritionForm({...nutritionForm, category: e.target.value})}} >
                <option value="category">Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
            <input type="text" placeholder='Calories' value={nutritionForm.duration} onChange={(e)=>{setNutritionForm({...nutritionForm, calories: e.target.value})}} />
            <button onClick={createNutrition}>Create</button>
        </div>

    )
}

function NutritionCard({nutrition}){
    return(
    <div className='nutrition-card'>
        <h1>{nutrition.name}</h1>
    </div>
    )
}

export default NutritionPage;