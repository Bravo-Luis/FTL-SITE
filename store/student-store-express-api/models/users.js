/*
{email: "lbravo@salesforce.com", data: {
    name: "luis",
    reciepts: [{
        total: "$14.87",
        date: "11/09/2003",
        products: [{
            id: "id",
            name : "name",
            price : "price",
            quantity : 5
        }]
    }]
}}
*/

class userModel {
    constructor(data, email, db){
        this.email = email
        this.name = data.name
        this.db = db
        this.reciepts = data.reciepts
    }

    fetchReciepts(){
        return this.reciepts
    }

    fetchNames(){
        return this.name
    }

    addReciept(newReciept){
        this.reciepts = [...this.reciepts, ...newReciept]
    }

    printJSON(){
        return {
            email: this.email, data: {
                name: this.name,
                reciepts: this.reciepts
            }
        }
    }
    
}

module.exports = userModel