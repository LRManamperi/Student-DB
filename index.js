require('./models/db');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const studentController = require('./controllers/studentController');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome to the Student Database</h2>
        <h3>Click here to get acces to the <b> <a href = "/student/list"> Database</a></b> </h3>
    `);
});

app.set('views', path.join(__dirname, 'views'));

const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: path.join(__dirname, 'views/layouts/')
});

app.engine('hbs', hbs.engine);

app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});

app.use('/student', studentController);
