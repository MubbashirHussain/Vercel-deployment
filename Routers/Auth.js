const express = require('express')
const route = express.Router()
const AuthControllers = require('../controllers/Auth')

route.post('/signup', AuthControllers.Signup)
route.post('/login', AuthControllers.Login)

module.exports = route


