const bcrypt = require("bcrypt")
const pool = require("./database.js")

class User {
    constructor(username, password, email, fullname){
         this.username = username
         this.password = password
         this.email = email
         this.fullname = fullname
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

    static async createUser(){
        try {
            const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
            if (result.rows.length){
                // User exists : Return Error
            }else{
                // User doesnt exist : Create New User
            }
        } catch (error) {
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