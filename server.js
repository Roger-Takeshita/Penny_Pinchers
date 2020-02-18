const express = require('express');
const path = require('path');                                       //! Used to figure out where I am going to serve my html from
const favicon = require('serve-favicon');                           //! Just the website icon
const logger = require('morgan');                                   //! Morgan is used for logging request details
require('dotenv').config();                                         //! Require dotenv module before the database, we need the dotenv path to load our database
require('./config/database');                                       //! Require the database

const app = express();                                                  //+ Create express app

//! Middleware
app.use(logger('dev'));                                                 //+ Mount my loggger middleware       
app.use(express.json());                                                //+ Mount my json midleware - to response as JSON requests
                                                                            //- For React back-end, we dont need method-override because we don't have any forms to submit
app.set('view engine', 'ejs');                                          //+ Use .ejs as the default view engine

//! Configure both serve-favicon & static middlewares to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));                 //+ looking for static assets, we are going to look into this folder (html file, css, image)
                                                                            //- static files don't have any logic
//! Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use('/api/mylists', require('./routes/api/lists'));

//! API Routes -  Put them before the "catch all" route - The following "catch all" route (note the *)is necessary for a SPA's client-side routing to properly work
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//! Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
const port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});