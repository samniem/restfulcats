const mongoose = require('mongoose')

const breedSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    temperament:{
        type: Array
    },
    origin:{
        type: String
    }

})

const Cats = module.exports = mongoose.model('Cats', breedSchema)

//Get cats
module.exports.getCats = (callback, limit) => {
    Cats.find(callback).limit(limit)
}

//Get by id
module.exports.getCatById = (id, callback) => {
    Cats.findById(id, callback)
}

//Get by name
module.exports.getCatByName = (breed, callback) => {
    Cats.find({name:breed}, callback)
}