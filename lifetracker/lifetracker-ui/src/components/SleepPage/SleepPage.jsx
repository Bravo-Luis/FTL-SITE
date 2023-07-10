import { useEffect, useState } from 'react';
import './SleepPage.css'
import axios from "axios"

function SleepPage({user, token}){

    const [sleepForm, setSleepForm]  = useState({
        start_time: "",
        end_time: ""
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
    return(
        <div id="sleep-form">
            <input type="text" placeholder='Start Time' value={sleepForm.start_time} onChange={(e)=>{setSleepForm({...sleepForm, start_time: e.target.value})}} /> 
            <input type="text" placeholder='End Time' value={sleepForm.end_time} onChange={(e)=>{setSleepForm({...sleepForm, end_time: e.target.value})}} />
            <button onClick={createSleep}>Create</button>
        </div>

    )
}

function SleepCard({sleep}){
    return(
    <div className='sleep-card'>
        <h1>{sleep.start_time}</h1>
        <h1>{sleep.end_time}</h1>
    </div>
    )
}

export default SleepPage;