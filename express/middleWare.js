//something after server get the request and before it reach route
//between server and route


/*


// Route-level middleware

const express = require('express');
const app = express();


function checkAuth(req, res, next) {
    console.log("Checking authentication...");
    // Example: pretend the user is not authenticated
    let isAuthenticated = false;
    if (isAuthenticated) {
        next(); // allow request to continue
    } else {
        res.status(403).send("Access denied");
    }
}

app.get('/profile', checkAuth, (req, res) => {
    res.send('This is the profile page');
});

app.listen(3000, () => console.log('Server running on port 3000'));


 */


/*

//default error handling


app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
  
*/



const express = require('express')
const app = express()

app.use(function(req, res, next){  //yeh function aik middleware hai, we can do this for a specific route as well  by giving the route to it
    console.log("hello from middleware")
    next();
})

app.get('/',function(req,res){
    res.send('hello world')
})

app.get('/profile',function(req,res){
    res.send("champion")
})

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(3000)



