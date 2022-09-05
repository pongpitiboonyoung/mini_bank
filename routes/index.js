var express = require('express');
var router = express.Router();
const User = require('../controller/user/user')
var Auth = require('../controller/auth/auth');

module.exports = async function (app) {

    app.get('/',Auth.auth_r,async function(req , res){
        res.render('../views/index')
    })
    app.get('/login',Auth.auth_login,async function(req , res){
        res.render('../views/login')
    })
    app.get('/register',async function(req , res){
        res.render('../views/register')
    })

};