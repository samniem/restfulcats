const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const port = 5000
const app = express()
app.use(bodyParser.json())

//Define client
app.use(express.static(__dirname+'/client'))

//Schema
const Cats = require('./models/cats')

//Mongoose connection
mongoose.connect('mongodb://localhost/cats')
const db = mongoose.connection

app.get('/', (req, res) => {
    res.send('Please, use api/cats')
})

//Routes

//All cats
app.get('/api/cats', (req, res) =>{
    Cats.getCats((err, cats) => {
        if(err){
            throw err
        }
        res.json(cats)
    })
})

//Get cats by id
app.get('/api/cats/:_id', (req,res) => {
    Cats.getCatById(req.params._id, (err, cat) => {
        if(err){
            throw err
        }
        res.json(cat)
    })
})

//Get by name
app.get('/api/cats/breed/:name', (req, res) => {
    Cats.getCatByName(req.params.name, (err, cat) => {
        if(err){
            throw err
        }
        res.json(cat)
    })
})

app.listen(5000)
console.log(`Server running on port ${port}`)