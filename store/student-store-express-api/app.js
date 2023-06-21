const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./data/db.json')

app.use(cors())
app.use(express.json())



app.get('/', (req,res)=>{
    res.status(200)
    res.send(db)
})


app.post('/', (req,res)=>{
    console.log("POST HIT")
    console.log(req.body)
})

module.exports = app