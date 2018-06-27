const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const port = process.env.PORT || 3000;

//db connection
mongoose.connect(config.database);
//on connected
mongoose.connection.on('connected', () => {
    console.log(`Connected to DB ${config.database}`);
});
mongoose.connection.on('error', (err) => {
    console.log(err);

});
const app = express();

const users = require('./routes/users');
// CORS middleware
app.use(cors());
// bodyParser middleware
app.use(bodyParser.json());

//serving public
app.use(express.static(path.join(__dirname, 'public')));


//passport for authentication
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

app.get('/', (req, res) => {
    res.send("Invalid Endpoint!")
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(port, () => {
    console.log(`Started at port ${port}`);

});