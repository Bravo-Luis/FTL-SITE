const express = require("express");
const cors = require("cors");
const {User, DataManager} = require("./data");
const morgan = require("morgan")

const app = express();
app.use(morgan("tiny"))
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send({message: "hey"})
});

app.post("/auth/signup", async(req, res) => {
    const {email, username, fullname, password} = req.body
    try{
        const newUser = new User(username, password, email, fullname)
        const result = await DataManager.createUser(newUser)
        if (result == "Email Already Exists"){
            res.send({message: "Email Already Exists"})
        }
        else if(result == "Username Already Exists"){
            res.send({message: "Username Already Exists"})
        }
        else if(result == "Success"){
            res.send({result})
        }
        else{
            res.send({message: result.error})
        }
    }catch(error){
        res.send({message: "Error"})
    
    }
});

app.post("/auth/login", async(req, res) => {
  const {username, password} = req.body
  try{
        const queryRes = await DataManager.fetchUser(username, password)

        if (queryRes === "Not Found"){
            res.send({message:"User not found"}
            )}
            else{
                const existingUser = new User(queryRes.username, queryRes.password, queryRes.fullname, queryRes.email, queryRes.id)
                if (existingUser.checkPassword(password)){
                    let token = User.generateAuthToken(existingUser)
                    res.send({username: existingUser.username, fullname: existingUser.fullname, email: existingUser.email, token: token})
                }
            }
    }catch(error){
        console.log("Error")
        res.send({message: error})
    }
});

app.get("/auth/user", async (req, res)=>{
    const {email, username, fullname, password} = req.body
    const result = await DataManager.fetchUser(username)
    res.send(result)
})

app.post('/profile', async (req, res) => {
    let token = req.body.existingToken;
    console.log(token)
    if (token) {
        let userInfo = User.verifyToken(token)

        console.log(userInfo)
        res.send(userInfo)
    }
    else {
        res.send({ error: 'no token received'})
    }
})

app.post("/available", async (req, res)=>{
    const {username} = req.body
    const result = await DataManager.fetchUser(username)
    if(result === "Not Found"){res.send({message: "Available"})}
    else res.send({message: "Not Available"})
})

app.post("/exercise", async (req,res)=>{
    const {token, exerciseForm} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.createExercise(decodedToken.id, exerciseForm)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

app.post("/exercises", async (req,res)=>{
    const {token} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.fetchExercise(decodedToken.id)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

app.post("/nutrition", async (req,res)=>{
    const {token, nutritionForm} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.createNutrition(decodedToken.id, nutritionForm)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

app.post("/nutritions", async (req,res)=>{
    const {token} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.fetchNutrition(decodedToken.id)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

app.post("/sleep", async (req,res)=>{
    const {token, sleepForm} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.createSleep(decodedToken.id, sleepForm)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

app.post("/sleeps", async (req,res)=>{
    const {token} = req.body
    const decodedToken = User.verifyToken(token)
    console.log(decodedToken)
    try {
        const result = await DataManager.fetchSleep(decodedToken.id)
        res.send(result)
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})

module.exports = app;
