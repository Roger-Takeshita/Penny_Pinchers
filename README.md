<h1 id='summary'>Summary</h1>

* [Installation](#installation)
* [React Front-End & Express Back-End](#reactserver)
  * [Config Server.js](#configserver)
  * [Configure REACT for Full-Stack Development](#configreact)
* [Deploying to Heroku](#deployingheroku)
  * [Procfile](#procfile)
  * [Create the App in Your Heroku Account](#createheroku)
  * [Set the Environment Variables on Heroku](#herokuvariables)

<h1 id='installation'>Installation</h1>

[Go Back to Summary](#summary)

* Create React Front-End

  * `npx create-react-app pennypincher`

* Start the Server 3000

  * `npm start`

* Install all server side dependencies

  * `npm i express morgan serve-favicon mongoose dotenv`

* Install bcrypt to hash the password

  * `npm install bcrypt` 

* Install jsonwebtoken to verify the token
  * `npm install jsonwebtoken`

* Create server

  * `touch server.js`

* Create Procfile
  
  * `touch Procfile` (named exactly without a file extension)

* Create dotenv file
  * `touch .env`

* In the end your project file will look like this:

    ```Bash
        .
        ├── node_modules
        ├── public
        │   ├── faicon.ico
        │   ├── index.html
        │   ├── logo192.png
        │   ├── logo512.png
        │   ├── manifest.json
        │   └── robots.txt
        ├── src
        │   ├── App.css
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   ├── logo.svg
        │   ├── serviceWorker.js
        │   └── setupTests.js
        ├── .env
        ├── package-lock.json
        ├── package.json
        ├── Procfile
        └── server.js
    ```

<h1 id='reactserver'>React Front-End & Express Back-End</h1>

<h2 id='configserver'>Config <Strong>Server.js</Strong></h2>

[Go Back to Summary](#summary)

* In `server.js`

    ```JavaScript
        const express = require('express');
        const path = require('path');                                       //! Used to figure out where I am going to serve my html from
        const favicon = require('serve-favicon');                           //! Just the website icon
        const logger = require('morgan');                                   //! Morgan is used for logging request details

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

        //! API Routes -  Put them before the "catch all" route - The following "catch all" route (note the *)is necessary for a SPA's client-side routing to properly work
        app.get('/*', function(req, res) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
        
        //! Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
        const port = process.env.PORT || 3001;
        app.listen(port, function() {
        console.log(`Express app running on port ${port}`)
        });
    ```

<h2 id='configreact'>Configure REACT for Full-Stack Development</h2>

[Go Back to Summary](#summary)

* In `package.json`

  * Add a `proxy` key to handle the port conflit **during the development** (not production). Because the REACT app is being server from `localhost:3000`, that's where all AJAX calls made from the browser to the the server.
  * For example, our REACT app might make a fetch request like `GET /api/products`. And that path is automatically appended to the domain of origin(`localhost:3000`).
  * However, our Express server is listening for AJAX calls at `localhost:3001`.
  * The React development server allows us to configure a `proxy` which specifies the host to send API/AJAX calls to.

    ```JavaScript
        "proxy": "http://localhost:3001"
    ```

  * Now **during development**, the SPA can make AJAX calls to the server, such as `fetch('/api/products')`, and they will send to `localhost:3001` insteado of `localhost:3000`


* Run React Front-End (`localhost:3000`) and Express Back-End (`localhost:3001`)

    ```Bash
        nodemon                 # Run our front-end at port 3000
        nodemon server.js       # Run our back-end  at port 3001
    ```

<h1 id='deployingheroku'>Deploying to Heroku</h1>

<h2 id='procfile'>Procfile</h2>

[Go Back to Summary](#summary)

* Add a `Procfile`
  * After the coe has been uploaded using `git push heroku master`, Heroku checks to see if the project has a **Procfile** which specifies how to start up the application.
  * If **no** Procfile exists, Heroku will run the command assigned to the `start` script in `package.json`. We have a `start` script but it's configures to start React's dev server instead of `node server.js`.

* Create Procfile `touch Procfile`
* In `Procfile` add:

```Bash
    web: node server.js
```

<h2 id='createheroku'>Create the App in Your Heroku Account</h2>

[Go Back to Summary](#summary)

* Now let's use the Heroku CLI to create the project in your Heroku dashboard:

    ```Bash
        heroku create <optional_preferred_subdomain>
    ```

* The above command also creates a git remote named heroku that we push to in order to deploy.

* Now you are set to deploy to Heroku:

  1. Make a commit (if you haven't already): `git add -A && git commit -m "Deploy"`
  2. Push to Heroku: `git push heroku master`

<h2 id='herokuvariables'>Set the Environment Variables on Heroku</h2>

[Go Back to Summary](#summary)

* The last step is to ensure that every KEY=VALUE pair in the `.env` file is set in the Heroku project.
* No different than with the two previous projects deployed to Heroku. For each KEY=VALUE:

    ```Bash
        heroku config:set KEY=VALUE
    ```

<h1 id='tokenjwt'>Token-based Auth with React & JWTs</h1>

[Go Back to Summary](#summary)

<h2 id='jwt'>JSON Web Token - <a href="https://jwt.io/" target="_blank">JWT</a></h2>

[Go Back to Summary](#summary)

![](https://i.imgur.com/TZoeAVv.png)

* A JSON Web Token is a single encoded (not encrypted) string that plays the role of a "token"
* The key points about a JWT are:
  * The token can contain whatever custom data (called claims) we want to put in it.
  * The token is cryptographically signed by the server when it is created so that if the token is changed in any way, it is considered invalid.
  * The token is encoded, but **not encrypted**. It's encoded using a standard known as base64uls encoding so that it can easily serialized across the internet or even included in a URL's querystring. It's easy to look at **encoded** data and think that its content cannot be read.

![](https://i.imgur.com/8J6Rhx9.jpg)

    ```JavaScript
        let jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
        let payload = jwt.split('.')[1]  // only interested in the payload (claims)
        window.atob(payload)
        // "{"sub":"1234567890","name":"John Doe","admin":true}"
    ```

  * The `atob()` method decodes a base-64 encoded string and `btoa()` base-64 encodes data.

<h2 id='flowtoken'>Flow of Token-based Authentication</h2>

[Go Back to Summary](#summary)

![](https://i.imgur.com/3quZxs4.png)

1. Attempts to log in a user by sending a HTTP POST request, sending along the user's credentials.
2. The server will, if the credentials check out, generate a JWT and send it back to the client. It may be sent back as JSON or in a header (usually named **token**).
3. Not shown on the diagram, but important, is the fact that the token needs to be persisted somewhere on the client. In a web app, the token is typically persisted in `localStorage`.
4. The reason a client needs to persit a token is that now, whenever the client makes a request, it can send along the token in the HTTP request, either as a querystring, in the request's body, or, as a **best practice**, in a **header** named `Authorization`.
5. The server will then validate the token and respond to the request.

<h2 id='adavantages'>Advantages of JWT-based Authorization</h2>

[Go Back to Summary](#summary)

![](https://i.imgur.com/HlzMMRq.jpg)

* Sessions are stateful on the server - they have to be maintained in a server's memory or a database. The more active users there are, the more sessions there are to keep track of. High-volume websites require multiple servers and would therefore require special software to manage the sessions.
* The key to **token-based authentication is that it's stateless**, meaning there is no state being stored on the server regarding the session/login.
* A `JSON web token` is **self-contained**, it can itself contain the user's identity, etc. There's no need to fetch the user from a database with each request on the server (an expensive operation). You will only have to query the database for the user if you need to modify the user or obtain additional information from the user document that is not included in the JWT.
* The stateless nature of token-based auth allows the implementation of single sign-on (SSO) - where the same token can be used to access several different applications, for example, Google Mail, Google Docs, etc.
* When making an HTTP request, a token can be sent in an HTTP header (or even the HTTP body). They don't have to be sent in a cookie, which are implemented by web browsers. Thus, you can use token-based authentication without a web browser - great news for native mobile apps.


<h1 id='mongodb'>MongoDB</h1>

[Go Back to Summary](#summary)


* in `.env` file add:

    ```JavaScript
        DATABASE_URL=mongodb://localhost/pennydb
        SECRET_JWT=roger-takeshita-secret
    ```

* in `server.js`:

* After `const logger = require('morgan');` require the dotenv and database

    ```JavaScript
        const logger = require('morgan');                                   //! Morgan is used for logging request details
        require('dotenv').config();                                         //! Require dotenv module before the database, we need the dotenv path to load our database
        require('./config/database');                                       //! Require the database
    ```

* Create the user schema

* Create the following folder/file

    ```Bash
        touch models/user.js
        touch config/database.js
        touch controllers/users.js
    ```

* In `config/database.js`:

    ```JavaScript
        const mongoose = require('mongoose');       //! Require mongoose
        const db = mongoose.connection;             //! Shorthand for mongoose.connection

        //! Connect to mongodb
        mongoose.connect(
            process.env.DATABASE_URL, { 
                useNewUrlParser: true, 
                useCreateIndex: true, 
                useUnifiedTopology: true 
            }
        );

        //! Check if it's connectd
        db.once('connected', () => {
            console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
        });
    ```

* In `models/user.js`:

    ```JavaScript
        const mongoose = require('mongoose');       //! Require mongoose
        const Schema = mongoose.Schema;             //! Shorthand for mongoose.Schema
        const bcrypt = require('bcrypt');           //! Require bcrypt
        const SALT_ROUNDS = 6;                      //! bcrypt has a setting that tells it how many times to randomize the generation of salt. Usually 6 is enough.

        const userSchema = new Schema(
            {
                fistName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                email: {
                    type: String, 
                    required: true, 
                    lowercase: true, 
                    unique: true
                },
                password: {
                    type: String,
                    // select: false                //! Never query back the password
                },
                admn: {
                    type: Boolean,
                    default: false
                },
                avatar: {
                    type: String
                },
                googleId: {
                    type: String
                }
            }, 
            {
                timestamps: true
            }
        );

        //! Mongoose Middleware - Encrypt the password
        userSchema.pre('save', function(next) {                           //! pre middleware, also as known as 'hook'
            const user = this;                                                  //+ this will be set to the current user
            if (!user.isModified('password')) return next();                    //+ If the password hasn't changed, return call next() function
            bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {       //+ If password has changed - salt and hash it. This is an async function, so we pass a function
                if (err) return next(err);                                          //- check if you got any error
                user.password = hash;                                               //- replace the user provided password with the hased password
                next();                                                             //- I need to call the next() function
            });
        });

        module.exports = mongoose.model('User', userSchema);
    ```

* Create users controllers folder/file

    ```Bash
        touch  controllers/users.js
    ```

* In `constrollers/users.js`:


