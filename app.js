// backend
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const dormRoutes = require('./routes/dormRoutes');
const roommateRoutes = require('./routes/roommateRoutes');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 

const mongoURI = 'mongodb+srv://admin:admin123@cluster0.cdzdp.mongodb.net/ninermatch?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
  .then(() => {
    app.listen(port, host, () => {
      console.log('Server is running on port', port);
    });
  })
  .catch(err => console.log(err.message));

app.use(
  session({
    secret: 'jhsabdajd27812381bdhass',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongoUrl: mongoURI}),
    cookie: {maxAge: 60*60*1000}
  })
);  

app.use((req, res, next) => {
  res.locals.user = req.session.user||null;
  next()
});

app.get('/', (req, res) => {
  res.render('index');  
});

app.use('/roommate', roommateRoutes);

app.use('/dorm', dormRoutes);

app.use('/user', userRoutes);  
