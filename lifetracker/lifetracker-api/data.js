const bcrypt = require("bcrypt")
const pool = require("./database.js")
const jwt = require('jsonwebtoken')
const secretkey = 'ej3813e13jdcmweq*jxs8^#^@*!sjkNBUH7fdg6ag8GT^&TR&^TG@h1hs'
const crypto = require('crypto')
const { use } = require("./app.js")

class User {
    constructor(username, password, email, fullname, id){
         this.username = username
         this.password = password
         this.email = email
         this.fullname = fullname
         this.id = id
    }
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,10)
    }
    checkPassword(password) {
        return bcrypt.compareSync(password, this.password)
    }
    asJSON(){
        return {
            username : this.username,
            email: this.email,
            fullname: this.fullname
        }
    }
    static generateAuthToken(user) {
        console.log("generating token for: ", user)
        let payload = {
            email: user.emailaddress,
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            id: user.id
        }
        let token = jwt.sign(payload, secretkey, { expiresIn: '30d' })
        return token
    }
    static verifyToken(token) {
        if (typeof token !== 'string')
            return {error: `token not a string, its a ${typeof token}`}
        let verified = jwt.verify(token, secretkey)
        if (verified) {
            let decoded = jwt.decode(token)
            return decoded
        }
        else {
            return { error: 'invalid token' }
        }
    }
}

class DataManager {
    static async createUser(user){
        user.hashPassword()
        try {
            const emailExists = await pool.query("SELECT * FROM users WHERE email=$1;", [user.email]) 
            const usernameExists = await pool.query("SELECT * FROM users WHERE username=$1;", [user.username])
            if (emailExists.rows.length){
                return "Email Already Exists"
            }else if (usernameExists.rows.length){
                return "Username Already Exists"
            }else {
                try {
                    await pool.query("INSERT INTO users(username, password, fullname, email, id) VALUES($1, $2, $3, $4, $5);", [user.username, user.password, user.fullname, user.email, crypto.randomUUID()])
                    return "Success"
                } catch (error) {
                    console.log(error)
                    return {error: "Error"}
                }
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async fetchUser(username){
        try{
            const result = await pool.query("SELECT * FROM users WHERE username=$1", [username])
            if (result.rows.length){
                // Foundy
                const usr = result.rows[0]
                const newUser = new User(usr.username, usr.password, usr.email, usr.fullname, usr.id)
                return newUser
            } else {
                return "Not Found"
            }
        }catch(error){
            throw error
        }
    }

    static async createExercise(userID, exerciseForm){
        try{
            console.log(userID)
            await pool.query(`INSERT INTO 
            exercise(name, category, intensity, duration, user_id) 
            VALUES($1, $2, $3, $4, $5)
            `, 
            [exerciseForm.name, exerciseForm.category, exerciseForm.intensity, exerciseForm.duration, userID])
            
            const result = await pool.query(`SELECT * FROM exercise WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

    static async fetchExercise(userID){
        try{
            const result = await pool.query(`SELECT * FROM exercise WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

    static async createNutrition(userID, nutritionForm){
        try{
            console.log(userID)
            await pool.query(`INSERT INTO 
            nutrition(name, category, calories, user_id) 
            VALUES($1, $2, $3, $4)
            `, 
            [nutritionForm.name, nutritionForm.category, nutritionForm.calories, userID])
            
            const result = await pool.query(`SELECT * FROM nutrition WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

    static async fetchNutrition(userID){
        try{
            const result = await pool.query(`SELECT * FROM nutrition WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

    static async createSleep(userID, sleepForm){
        try{
            console.log(userID)
            await pool.query(`INSERT INTO 
            sleep(start_time, end_time, user_id) 
            VALUES($1, $2, $3)
            `, 
            [sleepForm.start_time, sleepForm.end_time, userID])
            
            const result = await pool.query(`SELECT * FROM sleep WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

    static async fetchSleep(userID){
        try{
            const result = await pool.query(`SELECT * FROM sleep WHERE user_id=$1`, [userID])
            return result
        }catch(error){
            throw error
        }
    }

}

module.exports = {User, DataManager}