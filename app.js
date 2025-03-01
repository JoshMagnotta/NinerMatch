// backend
const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const roommateRoutes = require('./routes/roommateRoutes');
const dormRoutes = require('./routes/dormRoutes');

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');
app.use(express.static('public'));
const mongoURI = 'mongodb+srv://admin:admin123@cluster0.cdzdp.mongodb.net/ninermatch?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoURI)
.then(() => {
    app.listen(port, host, ()=>{
        console.log('Server is running on port', port);
    });
})
.catch(err=>console.log(err.message));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/roommate', roommateRoutes);
 
app.use('/dorm', dormRoutes);
