const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDB', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB connection succeeded.');
}).catch(err => {
    console.log('Error in DB connection: ' + err);
});

require('./student.model');

module.exports = mongoose;

