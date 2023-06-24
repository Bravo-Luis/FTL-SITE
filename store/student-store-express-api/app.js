const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./data/db.json')
const pdb = require('./data/users.json')
const UserModel = require('./models/users')
const fs = require('fs');
const crypto = require('crypto')
const bodyParser = require('body-parser');
const { request } = require('http')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    const newUser = new UserModel({ name }, email);
    newUser.setPassword(password);
    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    users[email] = newUser.printJSON();
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.status(200).send({ message: 'User created' });
});

app.post('/receipts', (req, res) => {
    const { email, name, password, newReceipt } = req.body;
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
    console.log(req.body)
    
    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    if (!users[email]) {
        res.status(404).send({ message: 'User not found' });
        return;
    }
    let user = new UserModel(users[email].data, email);
    if (!user.checkPassword(password)) {
        res.status(404).send({ message: 'Incorrect Password' });
        return;
    }

    let products = JSON.parse(fs.readFileSync('./data/db.json')).products;

    let enhancedReceipt = newReceipt.map(item => {
        let product = products.find(product => product.id === item.id);
        return product ? { ...item, price: product.price, name: product.name } : item;
    });

    const input = {data : enhancedReceipt, date: formattedDate, total: calculateTotal(newReceipt)}
    user.addReciept({[crypto.randomUUID()] : input});
    users[email].data.reciepts = user.fetchReciepts();
    fs.writeFileSync('./data/users.json', JSON.stringify(users));
    res.status(200).send(user.fetchReciepts());
});

app.post('/login', (req,res)=>{
    const { email, name, password } = req.body;
    console.log(req.body)
    let users = JSON.parse(fs.readFileSync('./data/users.json'));
    if (!users[email]) {
        res.status(404).send({ message: 'User not found' });
        return;
    }
    let user = new UserModel(users[email].data, email)
    if (!user.checkPassword(password)) {
        res.status(404).send({ message: 'Incorrect Password' });
        return;
    }
    res.status(200).send(user.printJSON());

})

app.get('/products/:id', (req,res)=>{
    const { id } = req.params;
    let productList = JSON.parse(fs.readFileSync('./data/db.json'));
    if (!productList.products[id]) {
        res.status(404).send({ message: 'Product Not Found' });
        return;
    }
    else{
        res.status(200).send(productList.products[id])
    }
})

app.get('/products', (req,res)=>{
    res.status(200).send(db.products)
})

function calculateTotal(cart){
    let productList = JSON.parse(fs.readFileSync('./data/db.json')).products;

    return cart.reduce((total, item) => {
        let product = productList.find(product => product.id === item.id);
        return product ? total + product.price * item.quantity : total;
    }, 0);
}

module.exports = app