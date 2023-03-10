const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const router = new Router();

// /api + /registration
router.post('/registration', userController.registration);
router.post('/login', userController.login)
router.post('/logout', userController.logout) // тут будет удалятся рефреш токен
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh) 
router.get('/users', userController.getUsers) // получ список пользователей только для авторизованых юзеров


module.exports = router