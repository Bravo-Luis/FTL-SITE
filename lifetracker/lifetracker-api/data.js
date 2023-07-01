const bcrypt = require("bcrypt")
const pool = require("./database.js")

class User {
    constructor(username, password, email, fullname){
         this.username = username
         this.password = password
         this.email = email
         this.fullname = fullname
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
                    await pool.query("INSERT INTO users(username, password, fullname, email) VALUES($1, $2, $3, $4);", [user.username, user.password, user.fullname, user.email])
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
                const newUser = new User(usr.username, usr.password, usr.email, usr.fullname, )
                return newUser
            } else {
                return "Not Found"
            }
        }catch(error){
            throw error
        }
    }

}

module.exports = {User, DataManager}