const { Schema, model} = require('mongoose');


const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String,  required: true},
    isActivated: {type: Boolean,  default: false}, // по дефолту тайп фолс но если юхер перешел по ссылке то будет тру
    activationLink: {type: String},
})


model.exports = ('User', userSchema)