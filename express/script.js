/*what is express: express js aik npm package hai aur aik framework hai
framework basically aik flow hota hai, hmein flow btadeta hai
express manages everything from recieving the request and till the response

npm i nodemon -g (so that we dont need to restart the server again and again after small changes)
run krny ky liye terminal py, npx nodemon script.js

*/
const express = require('express')
const app = express()

app.get('/',function(req,res){ //yeh functin aik middleware hai
    res.send('hello world')
})

app.get('/profile',function(req,res){
    res.send("champion")
})

app.listen(3000)
//routes create krna