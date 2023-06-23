const bcrypt = require('bcryptjs');

class UserModel {
    constructor(data, email, db) {
        this.email = email
        this.name = data.name
        this.db = db
        this.reciepts = data.reciepts || []
        this.passwordHash = data.passwordHash;
    }

    fetchReciepts() {
        return this.reciepts
    }

    fetchNames() {
        return this.name
    }

    addReciept(newReciept) {
        this.reciepts.push(newReciept);
    }

    setPassword(password) {
        this.passwordHash = bcrypt.hashSync(password, 10)
    }

    checkPassword(password) {
        return bcrypt.compareSync(password, this.passwordHash)
    }

    printJSON() {
        return {
            email: this.email,
            data: {
                name: this.name,
                reciepts: this.reciepts,
                passwordHash: this.passwordHash
            }
        };
    }
    
}

module.exports = UserModel