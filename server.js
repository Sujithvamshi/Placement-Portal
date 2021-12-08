const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoute = require('./routes/users')
const userModRoute = require('./routes/usermodify')
const userDashboardRoute = require('./routes/dashboard')
const url = 'mongodb+srv://sujith:sujith@cluster0.sigbx.mongodb.net/pp?retryWrites=true&w=majority'
mongoose.connect(url,{useNewUrlParser:true},()=>{
    console.log("successfully connected to MongoDB");
})
app.get('/',(req, res) => {
    res.send("we are on home page")
})
app.use(bodyParser.json());
app.use('/users',userRoute)
app.use('/modify',userModRoute)
app.use('/dashboard',userDashboardRoute)
app.listen(8080,()=>{
    console.log("listening to port")
});