import { useEffect, useState } from 'react';
import './SleepPage.css'
import axios from "axios"

function SleepPage({user, token}){

    const [sleepForm, setSleepForm]  = useState({
        start_time: "",
        end_time: "",
        date: ""
    })

    const [sleepList, setSleepList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
          await fetchSleep();
        };
      
        fetchData();
      }, [token]);

    async function fetchSleep(){
        const url = 'http://localhost:3001/sleeps'
        try {
            const res = await axios.post(url, {token: token})
            setSleepList(res?.data?.rows?.reverse())
        } catch (error) {
            console.log(error)
        }
    }

    async function createSleep(){
        const url = 'http://localhost:3001/sleep'
        try {
            const res = await axios.post(url, {token: token, sleepForm: sleepForm})
            setSleepList(res?.data?.rows?.reverse())
            setSleepForm({
                start_time: "",
                end_time: ""
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div id="sleep-page">
            <SleepForm sleepForm={sleepForm} setSleepForm={setSleepForm} createSleep={createSleep}/>
            <div id="sleep-list">
                {sleepList?.map((sleep, idx)=>{
                    return (
                        <SleepCard key={idx} sleep={sleep}/>
                    )
                })}
            </div>
        </div>
    )
}

function SleepForm({sleepForm, setSleepForm, createSleep}){

    function checkField(){
        return sleepForm.date && sleepForm.start_time && sleepForm.end_time
    }

    const [isValid, setIsValid] = useState(false)

    useEffect(()=>{
        if(checkField()){
            setIsValid(true)
        }else{
            setIsValid(false)
        }
    },[sleepForm])

    return(
        <div id="sleep-form">
            <input type="date" placeholder='date' value={sleepForm.date} onChange={(e)=>{setSleepForm({...sleepForm, date: e.target.value})}} />
            <input type="time" placeholder='Start Time' value={sleepForm.start_time} onChange={(e)=>{setSleepForm({...sleepForm, start_time: e.target.value})}} /> 
            <input type="time" placeholder='End Time' value={sleepForm.end_time} onChange={(e)=>{setSleepForm({...sleepForm, end_time: e.target.value})}} />
            <button disabled={!isValid}  style={{backgroundColor: isValid ? "rgb(125, 160, 235)" : "grey", cursor: isValid ? "pointer" : "default"}} onClick={createSleep}>Create</button>
        </div>

    )
}

function SleepCard({sleep}){
    return(
    <div className='sleep-card'>
        <h2>{sleep.date}</h2>
        <h1> start: {sleep.start_time}</h1>
        <h1>end: {sleep.end_time}</h1>
    </div>
    )
}

export default SleepPage;

