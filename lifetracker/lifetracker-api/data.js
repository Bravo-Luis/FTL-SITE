const bcrypt = require("bcrypt")
const pool = require("./database.js")

class User {
    constructor(username, passwordHash, email, firstName, lastName){
         this.username = username
         this.passwordHash = passwordHash
         this.email = email
         this.firstName = firstName
         this.lastName = lastName
    }


    checkPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash)
    }

    asJSON(){
        return {
            username : this.username,
            email: this.email,
            firstName : this.firstName,
            lastName : this.lastName
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

    static async fetchUser(email){
        try{
            const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
            if (result.rows.length){
                // Found
                const usr = result.rows[0]
                const newUser = new User(usr.username, usr.passwordHash, usr.email, usr.firstName, usr.lastName)
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