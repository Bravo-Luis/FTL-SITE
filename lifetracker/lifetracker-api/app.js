const express = require("express");
const cors = require("cors");
const {User, DataManager} = require("./data");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "hey"})
});

app.post("/signup", (req, res) => {
    const {username, password, firstName, lastName, email} = req.body
    try{
        const newUser = new User(username, password, email, firstName, lastName)
        
    }catch(error){
        res.send({message: error})
    }
});

app.post("/auth/login", async(req, res) => {
  const {username, password} = req.body
  console.log("callmade")
  try{
        const queryRes = await DataManager.fetchUser(username, password)

        if (queryRes === "Not Found"){
            console.log("not found")
            res.send({message:"User not found"}
            )}
    }catch(error){
        console.log("Error")
        res.send({message: error})
    }
});

app.get("/auth/user", async (req, res)=>{
    const result = await DataManager.fetchUser("fake")
    res.send(result)
})

module.exports = app;
