const express = require("express");
const cors = require("cors");
const {User, DataManager} = require("./data");

const app = express();

app.use(cors());
app.use(express.json());



app.post("auth/signup", (req, res) => {
    const {username, password, firstName, lastName, email} = req.body
    try{
        const newUser = new User(username, password, email, firstName, lastName)
        
    }catch(error){
        res.send({message: error})
    }
});

app.post("auth/login", (req, res) => {
  const {username, password} = req.body
  try{
        // Handle Log In
        DataManager.fetchUser()
    }catch(error){
        res.send({message: error})
    }
});

app.get("/user", async (req, res)=>{
    const result = await DataManager.fetchUser("fake")
    res.send(result)
})

module.exports = app;
