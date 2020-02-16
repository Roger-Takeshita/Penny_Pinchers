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