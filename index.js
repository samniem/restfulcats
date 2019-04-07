const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const path = require('path')

const app = express()
app.use(bodyParser.json())

//Define client
app.use(express.static(path.join(__dirname+'/client')))

//production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build/index.html')))
}

//dev mode
app.get('', (req, res) => {
    res.sendFile(path.join(__dirname,'/client/public/index.html'))
})

//Schema
const Cats = require('./models/cats')

//Mongoose connection
const uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/cats'
mongoose.connect(uristring, {useNewUrlParser: true }, function(err, res){
    if(err) {
        console.log('Error connecting to MongoDB at ' + uristring + ' with error '+err)
    }else{
        console.log('Mongoose connected to ' + uristring)
    }
})
const db = mongoose.connection

////app.get('/', (req, res) => {
//   res.send('Please, use api/cats')
//})

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

app.listen(process.env.PORT || 5000)
console.log(`Server running on port ${process.env.PORT || 5000}`)

