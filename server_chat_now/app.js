const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const messageRoutes = require('./api/router/message');
const loginRoutes = require('./api/router/login');
const signupRoutes = require('./api/router/signup');
app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1/chat_now',{
  useMongoClient:true
});

app.use('/login',loginRoutes);
app.use('/signup',signupRoutes);
app.use('/message',messageRoutes);

module.exports = app;
