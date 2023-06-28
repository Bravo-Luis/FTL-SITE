const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/signup", (req, res) => {
    const {username, password, firstName, lastName, email} = req.body
    try{
        // Hanlde Sign Up
    }catch(error){
        res.send({message: error})
    }
});

app.post("/login", (req, res) => {
  const {username, password} = req.body
  try{
        // Hanlde Log In
    }catch(error){
        res.send({message: error})
    }
});

module.exports = app;
