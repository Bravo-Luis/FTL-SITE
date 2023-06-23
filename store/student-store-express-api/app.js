const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./data/db.json')
const pdb = require('./data/purchases.json')

app.use(cors())
app.use(express.json())



app.get('/products', (req,res)=>{
    res.status(200)
    res.send(db)
})


app.post('/', (req,res)=>{
    console.log("POST HIT")
    console.log(req.body)
})

app.post('/history', (req, res)=> {
    res.status(200)
    JSON.parse(pdb)
})

module.exports = app