const UserModel = require('../models/user-models')
const bcrypt = require('bcrypt');
const uuid = require('uuid')
const mailService = require('./mail-service');
const tokenService = require('./token-service');
class UserService {
    async registration (email , password) {
        const candidate = await UserModel.findOne({email})
        if(candidate) {
            throw new Error(`user already exist ${email}`)
        }
        const hashPassword = await bcrypt.hash(password, 3) // это для хэширования пароля
        const activationLink = uuid.v4() // это случайно сгенерированная линка которая будет у юзера для подтверждения что это он
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, activationLink)
        const tokens = tokenService.generateTokens()
    }
}

module.exports = new UserService()