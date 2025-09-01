/*

session ( connection between front end and backend, from one login to logout) and cookie( data that is saved on browser : token )

*/
const express = require('express')
const app = express()

app.use(express.json()); //for frameworks
app.use(express.urlencoded({extended:true})); 