const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWt_ACCESS_SECRET, {expiresIn: '30m'}) // второй парам получ из конфига доп настройка токену
        const refreshToken = jwt.sign(payload, process.env.JWt_REFRESH_SECRET , {expiresIn: '30d'}) 
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken; // перезапись токена
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken})
        return token 
    }
}

module.exports = new TokenService()