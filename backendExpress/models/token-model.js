const { Schema, model} = require('mongoose');


const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId,  ref: 'User'}, // отсылка на модель пользователя
    refreshToken: {type: String, required: true}, // рефреш токен который мы будем генерировать и сохранять в базе данных 
})


model.exports = ('User', TokenSchema)