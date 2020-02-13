<h1 id='summar'>Summary</h1>

* [Installation](#installation)

<h1 id='installation'>Installation</h1>

[Go Back to Summary](#summary)

* Create React Front-End

  * `npx create-react-app pennypincher`

* Start the Server 3000

  * `npm start`

* Install all server side dependencies

  * `npm i express morgan serve-favicon mongoose dotenv`

* Create server

  * `touch server.js`

* Create Procfile
  
  * `touch Procfile` (named exactly without a file extension)

* Create dotenv file
  * `touch src/.env`

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
        │   ├── .env
        │   ├── App.css
        │   ├── App.js
        │   ├── App.test.js
        │   ├── index.css
        │   ├── index.js
        │   ├── logo.svg
        │   ├── serviceWorker.js
        │   └── setupTests.js
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

<h1 id='deployingheroku'>Deploying to Heroku</h1>

[Go Back to Summary](#summary)

* Run React Front-End (`localhost:3000`) and Express Back-End (`localhost:3001`)

    ```Bash
        nodemon                 # Run our front-end at port 3000
        nodemon server.js       # Run our back-end  at port 3001
    ```

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